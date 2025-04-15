function createWorldCloudViz() {
  d3.csv("../../datasets/worddata.csv")
    .then(data => {overallViz(data)})
    .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  console.log(incomingData);
  let wordScale = d3.scaleLinear().domain([0, 75]).range([10, 120]);

  // 2) for randomly rotating the words
  let randomRotate = d3.scaleLinear().domain([0, 1]).range([-20, 20]);

  // 3) for selecting specific words and left the non-selected word to be rotated 90 degrees
  let keywords = ["layout", "zoom", "circle", "style", "append", "attr"];

  // A new code using d3.layout.cloud() instead d3.cloud()
  d3.layout.cloud()
    .size([500, 500])
    .words(incomingData)
    // .rotate(0)
    // .rotate(() => randomRotate(Math.random()))      // 2) for randomly rotating the words
    .rotate(d => d.text.length > 5 ? 0 : 90)            // for modification in 3)
    .fontSize(d => {
      // console.log(parseInt(d.frequency))
      return wordScale(parseInt(d.frequency))})
    .on("end", draw)
    .start();

  function draw(words) {
    let wordG = d3.select("svg").append("g")
      .attr("id", "wordCloudG")
      .attr("transform", "translate(250, 250)");
    
      wordG.selectAll("text")
        .data(words)
        .join("text")
        .style("font-size", d => {
          // console.log(d.size)
          return d.size + "px"})
        // .style("fill", "#4f442b")
        .style("fill", d => {
          return keywords.indexOf(d.text) > -1 ? "#fe9922" : "#4f442b"})    // for modification in 3)
        .attr("text-anchor", "middle")
        .style("opacity", .75)
        .attr("transform", d => {
          // console.log(d.x, d.y, d.rotate)
          return `translate(${d.x}, ${d.y}) rotate(${d.rotate})`})
        .text(d => {
          // console.log(d)
          return d.text});
  }

}

function errorHandling(err) {
  console.log(err);
}