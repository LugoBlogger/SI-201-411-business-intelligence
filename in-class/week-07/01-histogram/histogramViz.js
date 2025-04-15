function createHistogramChartViz() {
  d3.json("../../datasets/tweets.json")
  .then(data => {overallViz(data.tweets)})
  .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  // console.log(incomingData);
  let xScale = d3.scaleLinear().domain([0, 5])
    .range([0, 500]);
  let yScale = d3.scaleLinear().domain([0, 10])
    .range([400, 0]);

  let xAxis = d3.axisBottom().scale(xScale).ticks(5);

  let binGenerator = d3.bin().domain(xScale.domain())
    .thresholds(xScale.ticks(6))
    .value(d => d.favorites.length);
  
  let bins = binGenerator(incomingData);
  // console.log(bins);

  const widthRatio = 0.8;

  d3.select("svg").selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => xScale(d.x0) + xScale(d.x1 - d.x0)*(1.-widthRatio)/2.)
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1 - d.x0)*widthRatio)
    .attr("height", d => 400 - yScale(d.length))
    .on("click", retweets)
    .style("fill", "#fcd88b");

  function retweets() {
    binGenerator.value(d => d.retweets.length);
    bins = binGenerator(incomingData);

    d3.selectAll("rect").data(bins)
      .transition().duration(500)
      .attr("x", d => xScale(d.x0) + xScale(d.x1 - d.x0)*(1.-widthRatio)/2.)
      .attr("y", d => yScale(d.length))
      .attr("width", d => xScale(d.x1 - d.x0)*widthRatio)
      .attr("height", d => 400 - yScale(d.length))
  }


  d3.select("svg")
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, 400)")
    .call(xAxis);

  d3.select("g.axis")
    .selectAll("text")
    .attr("dx", 50);

  
}


function errorHandling(err) {
  console.log(err);
}