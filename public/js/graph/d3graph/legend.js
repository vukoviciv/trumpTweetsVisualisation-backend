const createLegend = (nodes, color) => {
  const legendContainer = window.d3.select('#legend-container');
  legendContainer.selectAll('*').remove();

  legendContainer
    .append('g')
    .attr('class', 'legend-container')
    .attr('x', 0)
    .attr('y', 50);

  legendContainer.selectAll('rect')
    .data(nodes)
    .enter().append('rect')
    .style('fill', (d, i) => color(i))
    .attr('width', 20)
    .attr('height', 20)
    .attr('x', 50)
    .attr('y', (d, i) => 30 * (i + 2));

  legendContainer.selectAll('text')
    .data(nodes)
    .enter().append('text')
    .text(d => d.word)
    .attr('x', 80)
    .attr('y', (d, i) => ((30 * (i + 2)) + 15));
};

module.exports = {
  createLegend,
};
