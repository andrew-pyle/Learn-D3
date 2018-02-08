// Adapted from:
// http://www.puzzlr.org/force-directed-graph-minimal-working-example/

$(document).ready(function() {
    var vis = d3.select("svg"),
        width = +vis.attr("width"),
        height = +vis.attr("height");
  
    // TODO Read data from JSON
    var node_data = [
      {"node_id": "1", "node_label": "dev1"},
      {"node_id": "2", "node_label": "dev2"},
      {"node_id": "3", "node_label": "python"},
      {"node_id": "4", "node_label": "ruby"},
      {"node_id": "5", "node_label": "java"},
      {"node_id": "6", "node_label": "C"},
      {"node_id": "7", "node_label": "Lisp"}
    ];

    var link_data = [
        {"source": "dev1", "target": "python"},
        {"source": "dev1", "target": "java"},
        {"source": "dev2", "target": "python"},
        {"source": "dev2", "target": "ruby"},
        {"source": "dev2", "target": "java"},
        {"source": "dev2", "target": "C"},
        {"source": "dev2", "target": "Lisp"},
    ];
  
    // Create simulation with charged particle force and centering force
    var simulation = d3.forceSimulation()
                       .nodes(node_data)
                       .force("charge", d3.forceManyBody())
                       .force("center", d3.forceCenter(width / 2, height / 2));
  
    var node = vis.append("g")
                  .attr("class", "nodes")
                  .selectAll("circle")
                  .data(node_data)
                  .enter()
                  .append("circle")
                  .attr("r", 5)
                  .attr("fill", "red");

    var link_force = d3.forceLink(link_data)
                       .id(function(d) {return d.node_label; });

    simulation.force("links", link_force)

    var link = vis.append("g")
                  .attr("class", "links")
                  .selectAll("line")
                  .data(link_data)
                  .enter()
                  .append("line")
                  .attr("stroke-width", 2);
  
    // Update SVG
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

    // Create SVG
    simulation.on("tick", tickActions);
})  