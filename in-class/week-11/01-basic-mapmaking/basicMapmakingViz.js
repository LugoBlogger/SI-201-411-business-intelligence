function createBasicMapViz() {
  Promise.all([
    d3.json("../../datasets/world.geojson"),
    d3.csv("../../datasets/cities-high-precision.csv")])
      .then(data => {overallViz(data)})
      .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  // console.log(incomingData);
  let countries = incomingData[0];
  let cities = incomingData[1];
  // console.log(countries)
  // console.log(cities)

  let projection = d3.geoMercator()
    .scale(80).translate([250, 250])
  let geoPath = d3.geoPath().projection(projection);

  // -- scaling color
  let featureSize = d3.extent(countries.features, 
    d => geoPath.area(d))
  let countryColor = d3.scaleQuantize()
    .domain(featureSize).range(colorbrewer.Reds[7])

  d3.select("svg").selectAll("path")
    .data(countries.features)
    .join("path")
    .attr("d", geoPath)
    .attr("class", "countries")
    .style("fill", d => countryColor(geoPath.area(d)))
    .style("stroke", d => d3.rgb(countryColor(geoPath(d))));
  


}

function errorHandling(err) {
  console.log(err);
}