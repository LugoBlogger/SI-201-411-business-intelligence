function createSankeyViz() {
  d3.json("../../datasets/sitestats.json")
    .then(data => {overallViz(data)})
    .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  console.log(incomingData);
  
  const nodeWidth = 20, nodePadding = 200;
  let sankey = d3.sankey()
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .size([460, 460]);
    // .nodes(incomingData.nodes)
    // .links(incomingData.links);
    // the newer version no need to add .layout()

  console.log("sankey(incomingData)", sankey(incomingData))
  // console.log("sankey.links", sankey.links() )

  let intensityRamp = d3.scaleLinear()
    .domain([0, d3.max(incomingData.links, d => d.value)])
    .range(["#fcd88b", "#cf7d1c"])
  
  d3.select("svg").append("g")
    .attr("transform", "translate(20, 20)")
    .attr("id", "sankeyG")

  d3.select("#sankeyG").selectAll(".link")
    .data(sankey(incomingData).links)
    .join("path")
    .attr("class", "link")
    .attr("d", d3.sankeyLinkHorizontal())
    .style("stroke-width", d => {
      console.log(d);
      return d.width})
    .style("stroke-opacity", .5)
    .style("fill", "none")
    .style("stroke", d => intensityRamp(d.value))
    .sort((a, b) => b.width - a.width)
    .on("mouseover", function() {
      d3.select(this).style("stroke-opacity", .8); }) 
    .on("mouseout", () => {
      d3.selectAll("path.link").style("stroke-opacity", .5); });

  d3.select("#sankeyG").selectAll(".node")
    .data(incomingData.nodes)
    .join("g")
    .attr("class", "node")
    .attr("transform", d => {
      // console.log(d); 
      return `translate(${d.x0}, ${d.y0})`});
  
  d3.selectAll(".node").append("rect")
    .attr("height", d => d.y1 - d.y0)
    .attr("width", nodeWidth)
    .style("fill", "#83c464")
    .style("stroke", "gray")

  d3.selectAll(".node").append("text")
    .attr("x", d => 0)
    .attr("y", d => {
      // console.log(d)
      return (d.y1 - d.y0)/2})
    .attr("text-anchor", "middle")
    .style("fill", "black")
    .text(d => d.name);

}

function errorHandling(err) {
  console.log(err)
}