// Load data
d3.tsv("./data/data.tsv", d3.autoType).then(data => {
  // Explain autotype
  drawLineChart(data.slice(-21), data.columns.slice(1));
  drawStreamGraph(data, data.columns.slice(1));
  drawArcs(data, data.columns.slice(1));
});