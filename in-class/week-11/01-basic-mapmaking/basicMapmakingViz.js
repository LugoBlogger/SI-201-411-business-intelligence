function createBasicMapViz() {
  Promise.all([
    d3.json("../../datasets/world.geojson"),
    d3.csv("../../datasets/cities-high-precision.csv")])
      .then(data => {overallViz(data)})
      .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  console.log(incomingData);
}

function errorHandling(err) {
  console.log(err);
}