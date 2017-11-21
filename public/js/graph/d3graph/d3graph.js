import lib from './lib';
import createLegend from './legend';

const createGraph = (nodes) => {
  const { d3 } = window;
  const windowDimensions = lib.getWindowInnerDimension();
  const forceX = d3.forceX(windowDimensions.width / 2).strength(0.09);
  const forceY = d3.forceY(windowDimensions.height / 2).strength(0.09);
  const unitConstant = windowDimensions.width * 0.0005;
  const color = d3.scaleOrdinal(d3.schemeCategory20);

  const d3graphContainer = d3.select('#graph-container');
  d3graphContainer.selectAll('*').remove();

  d3graphContainer
    .attr('width', windowDimensions.width)
    .attr('height', windowDimensions.height);

  const circlesContainer = d3graphContainer
    .append('g')
    .attr('class', 'circles-container');

  const textContainer = d3graphContainer
    .append('g')
    .attr('class', 'text-container');

  const circles = circlesContainer
    .selectAll('circle')
    .data(nodes.filter(node => node.count > 0))
    .enter()
    .append('circle');

  // Circles attributes
  circles
    .attr('r', d => lib.getRadius(d, unitConstant))
    .style('fill', (d, i) => color(i))
    .append('title')
    .text(d => `${d.word} (${d.count})`);

  // Text
  textContainer
    .selectAll('text')
    .data(nodes.filter(node => node.count > 30))
    .enter().append('text')
    .attr('text-anchor', 'middle')
    .style('font-size', d => lib.getFontSizeInUnits(d, unitConstant))
    .text(d => d.word);

  // Force
  d3.forceSimulation()
    .velocityDecay(0.1)
    .force('x', forceX)
    .force('y', forceY)
    .force('collide', d3.forceCollide().radius(d => lib.getRadius(d, unitConstant)).iterations(1))
    .nodes(nodes)
    .on('tick', () => lib.ticked(circlesContainer, textContainer, unitConstant));

  createLegend(nodes, color);
};

const fetchGraph = () =>
  fetch('/graph/fetch_graph')
    .then(res => res.json())
    .then(data => createGraph(data))
    .catch(err => err);


module.exports = {
  fetchGraph,
  createGraph,
};
