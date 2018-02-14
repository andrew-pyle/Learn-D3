// Adapted from:
// http://www.puzzlr.org/zoomable-force-directed-graph/

$(document).ready(function() {
    d3.json("graph.json", function(data) {

        // Separate logical components of JSON file
        var nodes = data.nodes;
        var links = data.links;

        var width  = 400;
        var height = 400;

        // SVG area
        var svg = d3.select("div#graph")
                    .append("svg")
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .attr("viewBox", "0 0" + " " + width + " " + height)
                    .classed("svg-content", true);
        
        // g to hold nodes & links so they both zoom together
        var g = svg.append("g")
                   .classed("network-base", true);

        // Return node_id from dataset as node identification method for link 
        // connections
        var link_force = d3.forceLink(links)
                           .id(function(d) { return d.node_id; });

        // Engine
        var simulation = d3.forceSimulation()
                           .nodes(nodes)
        
        simulation.force("charge", d3.forceManyBody())
                  .force("center", d3.forceCenter(width / 2, height / 2))
                  .force("links", link_force);
              

        // 10 color categorical palette from D3.js
        var assignColor = d3.scaleOrdinal(d3.schemeCategory10);

        // Draw links first so they are underneath nodes
        var link = g.append("g")
                      .attr("class", "links")
                      .selectAll("line")
                      .data(links)
                      .enter()
                      .append("line")
                      .attr("stroke-width", linkWidthByWeight);
        
        // Draw nodes on top of links
        var node = g.append("g")
                  .attr("class", "nodes")
                  .selectAll("circle")
                  .data(nodes)
                  .enter()
                  .append("circle")
                  .attr("r", 10)
                  .attr("fill", colorById);
        
        // Drag-n-drop event handler
        var drag_handler = d3.drag()
            .on("start", function(d) {
                if (!d3.event.active) {
                    simulation.alphaTarget(0.9).restart();
                }
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", function(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            })
            .on("end", function(d) {
                if (!d3.event.active) {
                    simulation.alphaTarget(0);
                }
                d.fx = null;
                d.fy = null;
                // d.fx = d3.event.x;
                // d.fy = d3.event.y;
            });

        // Apply drag event handler to nodes
        drag_handler(node);

        // Zoom event handler
        var zoom_handler = d3.zoom()
            .on("zoom", function() {
                g.attr("transform", d3.event.transform)
            });
        
        zoom_handler(svg);

        // Make the SVG boogy!
        simulation.on("tick", tickActions);
        
        // Teach the SVG how to boogy!
        function tickActions() {
            // Update circle positions on simulation tick event
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        
            // Update link positions
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        }
        
        // nodes.node_id determines color palette index
        function colorById(d) {
            return assignColor(d.fsa_group_id);
        }

        // links.value determines link width
        function linkWidthByWeight(d) {
            return d.value;
        }
    })
});
