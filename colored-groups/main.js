$(document).ready(function() {
    d3.json("graph.json", function(error, json) {
        if (error) {
            return console.error(error);
        }

        var nodeData = json.nodes;  // name, group
        var linkData = json.links;  // source, value, target
        var width  = 500;
        var height = 500;

        // Create SVG
        var svg = d3.select("div#svg-container")
          .append("svg")
            .attr("width", width)
            .attr("height", height);

        // 10 color categorical palette from D3.js
        // returns function which maps from number to color?
        var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

        // g element for all contents. Needed for zoom/pan
        var g = svg.append("g")
            .attr("class", "network-graph");

        var links = g.append("g")
            .attr("class", "links")
          .selectAll("line")
            .data(linkData).enter()
          .append("line")
            .attr("stroke-width", function(d) { return d.value; });

        var nodes = g.append("g")
            .attr("class", "nodes")
          .selectAll("circle")
            .data(nodeData).enter()
          .append("circle")
            .attr("r", 10)
            .attr("fill", function(d) { return colorScale(d.group); });

        var simulation = d3.forceSimulation()
            .nodes(nodeData)
            // Simulation stops when alpha < alphaMin
            .alphaMin(0.1)  // default 0.001, range [0,1]
            // .alphaDecay(0.03)
            // .velocityDecay()  
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(linkData))
            .force("center", d3.forceCenter(width / 2, height / 2))  // center
            .on("tick", function(d) {
                // Node Postions
                nodes.attr("cx", function(d) { return d.x; })
                     .attr("cy", function(d) { return d.y; });

                // Link Positions
                links.attr("x1", function(d) { return d.source.x; })
                     .attr("y1", function(d) { return d.source.y; })
                     .attr("x2", function(d) { return d.target.x; })
                     .attr("y2", function(d) { return d.target.y; });
            });

    });
});
