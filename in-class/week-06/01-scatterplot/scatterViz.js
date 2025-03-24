function createScatterViz() {
  d3.csv("../../datasets/friend-salary.csv")
    .then(data => {overallViz(data)})
    .catch(err => errorHandling(err))
}

function overallViz(scatterData) {
  console.log(scatterData);

  // 1) representing the data using circle
  // the x coordinate uses the index position instead salary to avoid
  // plotting outside the SVG area
  // d3.select("svg").selectAll("circle")
  //   .data(scatterData)
  //   .join("circle")
  //   .attr("r", 5)
  //   .attr("cx", (d, i) => i*10)
  //   .attr("cy", d => parseFloat(d.num_of_friends))

  // 2) build scales 
  let xExtent = d3.extent(scatterData, d => parseInt(d.salary));
  let yExtent = d3.extent(scatterData, d => parseInt(d.num_of_friends));
  console.log(xExtent, yExtent);
  const xMargin = 0;     // change into 5_000
  const yMargin = 0;       // change into 10
  let xScale = d3.scaleLinear().domain([0, xExtent[1]+xMargin]).range([40, 460]);
  let yScale = d3.scaleLinear().domain([0, yExtent[1]+yMargin]).range([460, 40]);
  console.log(xScale(xExtent[0]), yScale(yExtent[0]));

  d3.select("svg").selectAll("circle")
    .data(scatterData)
    .join("circle")
    .attr("r", 5)
    .attr("cx", d => xScale(parseInt(d.salary)))
    .attr("cy", d => yScale(parseInt(d.num_of_friends)));

  // // 3) add axes
  let yAxis = d3.axisLeft().scale(yScale);
  d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);
  d3.selectAll("#yAxisG").attr("transform", "translate(40, 0)");

  let xAxis = d3.axisBottom().scale(xScale);
  d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);
  d3.selectAll("#xAxisG").attr("transform", "translate(0, 460)");

  // // 4) set ticks
  // d3.selectAll("#xAxisG").call(
  //   xAxis.ticks(8).tickSizeOuter(0).tickSizeInner(5));
  // d3.selectAll("#yAxisG").call(
  //   yAxis.ticks(8).tickSizeOuter(0).tickSizeInner(5));
  
  // // 5) set gridlines
  // d3.selectAll("#yAxisG g.tick")
  //   .append("line")
  //   .attr("class", "gridline")
  //   .attr("x1", 0)
  //   .attr("y1", 0)
  //   .attr("x2", 420)
  //   .attr("y2", 0)
  //   .attr("stroke", "#9ca5aecf")
  //   .attr("stroke-dasharray", "4");

  // d3.selectAll("#xAxisG g.tick")
  //   .append("line")
  //   .attr("class", "gridline")
  //   .attr("x1", 0)
  //   .attr("y1", 0)
  //   .attr("x2", 0)
  //   .attr("y2", -420)
  //   .attr("stroke", "#9ca5aecf")
  //   .attr("stroke-dasharray", "4")

  // d3.select("#xAxisG g.tick line.gridline").remove()

}


function errorHandling(err) {
  console.log(err);
}