function createAdjacencyMatrix() {
  Promise.all([
    d3.csv("../../datasets/nodelist.csv"),
    d3.csv("../../datasets/edgelist.csv")])
  .then(data => {overallViz(data)})
  .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  // console.log(incomingData);
  let nodes = incomingData[0];
  let edges = incomingData[1];

  console.log("nodes", nodes);
  console.log("edges", edges);

  let edgeHash = {};
  edges.forEach(edge => {
    let id = edge.source + "-" + edge.target;
    edgeHash[id] = edge;
  })
  console.log("edgeHash", edgeHash);

  let matrix = []
  nodes.forEach((source, a) => {
    nodes.forEach((target, b) => {
      let grid = {id: source.id + "-" + target.id, x: b, y: a, weight: 0};
      if (edgeHash[grid.id]) {
        grid.weight = edgeHash[grid.id].weight
      }
      matrix.push(grid);
    })
  })
  console.log("matrix", matrix);

  d3.select("svg").append("g")
    .attr("transform", "translate(60, 60)")
    .attr("id", "adjacencyG")
    .selectAll("rect")
    .data(matrix)
    .join("rect")
    .attr("class", "grid")
    .attr("width", 25)
    .attr("height", 25)
    .attr("x", d => d.x * 25)
    .attr("y", d => d.y * 25)
    .style("fill-opacity", d => d.weight * .2)

  d3.select("svg").append("g")
    .attr("transform", "translate(60, 60)")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("transform", "rotate(-90)")
    .attr("y", (d, i) => i*25 + 12.5)
    .text(d => d.id)
    .style("text-anchor", "left")

  d3.select("svg").append("g")
    .attr("transform", "translate(60, 60)")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("y", (d, i) => i*25 + 12.5)
    .text(d => d.id)
    .style("text-anchor", "end")
    
  d3.selectAll("rect.grid").on("mouseover", gridOver);
  function gridOver(d, i) {
    d3.selectAll("rect")
      .style("stroke-width", p => {
        // console.log(p.x)
        // console.log(i.x)
        return (p.x === i.x) || (p.y === i.y) ? 4 : 1
      });
  }
}


function errorHandling(err) {
  console.log(err);
}