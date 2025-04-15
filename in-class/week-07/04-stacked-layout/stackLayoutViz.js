function createStackLayoutViz() {
  d3.csv("../../datasets/movies.csv")
    .then(data => {overallViz(data)})
    .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  // console.log(incomingData);

  let xScale = d3.scaleLinear().domain([0, 10]).range([0, 440]);
  let yScale = d3.scaleLinear().domain([0, 100]).range([500, 0]);
  let movies = ["titanic", "avatar", "akira", "frozen", "deliverance", 
    "avengers"];

  // 3) scale for histogram stacked layout
  let heightScale = d3.scaleLinear().domain([0, 60]).range([0, 480]);

  let fillScale = d3.scaleOrdinal()
    .domain(movies)
    .range(["#fcd88a", "#cf8c1c", "#93c464", "#75734f", "#5eafc6", "#41a368"]);

  let stackLayout = d3.stack()
    .keys(movies)

  let stackArea = d3.area()
    .x((d, i) => xScale(i))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]));

  // -- Please comment out one of these options

  // 1) stackArea only
  // d3.select("svg").selectAll("path")
  //   .data(stackLayout(incomingData))
  //   .join("path")
  //   .style("fill", d => fillScale(d.key))
  //   .attr("d", d => stackArea(d));

  // 2) Update stackLayout, stackArea and yScale to create a steamgraph
  // stackLayout.offset(d3.stackOffsetSilhouette).order(d3.stackOrderInsideOut);
  // stackArea.curve(d3.curveBasis);
  // yScale.domain([-50, 50]);

  // d3.select("svg").selectAll("path")
  //   .data(stackLayout(incomingData))
  //   .join("path")
  //   .style("fill", d => fillScale(d.key))
  //   .attr("d", d => stackArea(d));

  // 3) histogram stacked layout
  d3.select("svg").selectAll("g.bar")
    .data(stackLayout(incomingData))
    .join("g")
    .attr("class", "bar")
    .each(function(d) {
      d3.select(this).selectAll("rect")
        .data(d)
        .join("rect")
        .attr("x", (p, q) => xScale(q) + 30)
        .attr("y", p => yScale(p[1]))
        .attr("height", p => heightScale(p[1] - p[0]))
        .attr("width", 40)
        .style("fill", fillScale(d.key))
    })


}

function errorHandling(err) {
  console.log(err)
}