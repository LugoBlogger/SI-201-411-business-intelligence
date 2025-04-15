function createViolinPlotViz() {
  d3.csv("../../datasets/tips.csv")
    .then(data => overallViz(data))
    .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  console.log(incomingData);

  let violinData = {};

  for (const obj of incomingData) {
    const day = obj.day;
    const tipValue = parseFloat(obj.tip);
    if (!violinData[day]) { 
      violinData[day] = { day, "tip": []}; }
    violinData[day].tip.push(tipValue);
  }

  violinData = Object.values(violinData);

  console.log(violinData);

  let yScale = d3.scaleLinear()
    .domain([-2, 12])
    .range([400, 40]);

  let fillScale = d3.scaleOrdinal()
    .range(["#fcd88a", "#cf8c1c", "#93c464", "#75734f"]);

  let yAxis = d3.axisRight()
    .scale(yScale).ticks(8).tickSize(400);

  let binGenerator = d3.bin()
    .domain(yScale.domain())
    .thresholds(yScale.ticks(8))
    .value((d, i) => d);

  // violinData.forEach(
  //   d => console.log(binGenerator(d["tip"]))
  // )

  d3.select("svg").append("g").call(yAxis);

  let area = d3.area()
    .x0(d => -d.length)
    .x1(d => d.length)
    .y(d => yScale(d.x0))
    .curve(d3.curveCatmullRom)

  d3.select("svg").selectAll("g.violin")
    .data(violinData)
    .join("g")
    .attr("class", "violin")
    .attr("transform", (d, i) => `translate(${50 + i * 110}, 0)`)
    .append("path")
    .style("stroke", "black")
    .style("fill", (d, i) => fillScale(i))
    .attr("d", (d, i) => area(binGenerator(d["tip"])));
}

function errorHandling(err) {
  console.log(err);
}