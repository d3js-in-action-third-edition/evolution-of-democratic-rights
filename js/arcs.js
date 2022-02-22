const drawArcs = (data, regimes) => {
  const data2020 = data.find(d => d.year === 2020);
  console.log("data2020", data2020);

  const data2020Formatted = [
    {regime:"liberal_democracies", numPeople:1067360224},
    {regime:"electoral_democracies", numPeople:1435304399},
    {regime:"electoral_autocracies", numPeople:3366054285},
    {regime:"closed_autocracies", numPeople:1909939094},
    // {regime:"no_regime_data", numPeople:16140723},
  ];
  const totalPeople = d3.sum(data2020Formatted, d => d.numPeople);
  console.log("totalPeople", totalPeople);

  // Color scale
  colorScale = d3.scaleOrdinal()
    .domain(regimes)
    .range(regimesInfo.map(regime => regime.color));

  const pieChartHeight = 300;
  const svg = d3.select("#pie-chart")
    .append("svg")
      .attr("viewBox", [0, 0, width, pieChartHeight]);

  // Append text in the middle
  svg
    .append("text")
      .text("2020")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("x", width/2)
      .attr("y", pieChartHeight/2)
      .style("font-size", "20px");

  // Initialize the path generator
  // need to generate array with values or array of objects with key-value pair
  const arcs = d3.pie()
    .value(d => d.numPeople)(data2020Formatted);
  console.log("arcs", arcs);

  // Initialize arc generator
  const arcGenerator = d3.arc()
    .innerRadius(70)  // Show that if zero we get a pie chart
    .outerRadius(100)
    .padAngle(0.015)
    .cornerRadius(3);
  
  // Append arcs
  // Could I control the order?
  svg
    .append("g")
      .attr("transform", `translate(${width/2}, ${pieChartHeight/2})`)
    .selectAll("path.path-2020")
    .data(arcs)
    .join("path")
      .attr("class", "path-2020")
      .attr("d", d => {
        return arcGenerator({
          startAngle: d.startAngle,
          endAngle: d.endAngle
        });
      })
      .attr("fill", d => colorScale(d.data.regime));

  svg
    .append("g")
      .attr("class", "pie-labels")
    .selectAll(".arc-label")
    .data(arcs)
    .join("text")
      .attr("class", "arc-label")
      .text(d => `${regimesInfo.find(regime => regime.id === d.data.regime).label} ${d3.format(".0%")(d.data.numPeople/totalPeople)}`)
      // calculate position with centroid, as pro tip
      .attr("x", d => {
        switch (d.data.regime) {
          case "electoral_autocracies":
            return 510;
          case "closed_autocracies":
            return 350;
          case "electoral_democracies":
            return 115;
          case "liberal_democracies":
            return 185;
          // case "no_regime_data":
          //   return 320;
        }
      })
      .attr("y", d => {
        switch (d.data.regime) {
          case "electoral_autocracies":
            return 150;
          case "closed_autocracies":
            return 270;
          case "electoral_democracies":
            return 140;
          case "liberal_democracies":
            return 55;
          // case "no_regime_data":
          //   return 50;
        }
      })
      .attr("fill", d => colorScale(d.data.regime))
      .style("font-size", "15px");

};