function getWindowInnerDimension() {
  return {
    width: window.innerWidth - 310,
    height: window.innerHeight - 10,
  };
}

function getRadius(d, unitConstant) {
  return d.count * unitConstant;
}

function getFontSizeInUnits(d, unitConstant) {
  return getRadius(d, unitConstant) / 2;
}

function ticked(circlesContainer, textContainer, unitConstant) {
  circlesContainer.selectAll('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  textContainer.selectAll('text')
    .attr('x', d => d.x)
    .attr('y', d => d.y + (getFontSizeInUnits(d, unitConstant) / 3));
}

const color = d3.scaleOrdinal(d3.schemeCategory20);
const nodes = tweets;


function createGraph() {
  const windowDimensions = getWindowInnerDimension();
  const forceX = d3.forceX(windowDimensions.width / 2).strength(0.09);
  const forceY = d3.forceY(windowDimensions.height / 2).strength(0.09);
  const unitConstant = windowDimensions.width * 0.0005;

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

  const circlesAttributes = circles
    .attr('r', d => getRadius(d, unitConstant))
    .style('fill', (d, i) => color(i))
    .append('title')
    .text(d => `${d.word} (${d.count})`);

  const texts = textContainer
    .selectAll('text')
    .data(nodes.filter(node => node.count > 30))
    .enter().append('text')
    .attr('text-anchor', 'middle')
    .style('font-size', d => getFontSizeInUnits(d, unitConstant))
    .text(d => d.word);

  const force = d3.forceSimulation()
    .velocityDecay(0.1)
    .force('x', forceX)
    .force('y', forceY)
    .force('collide', d3.forceCollide().radius(d => getRadius(d, unitConstant)).iterations(1))
    .nodes(nodes)
    .on('tick', () => ticked(circlesContainer, textContainer, unitConstant));
}

createGraph();

/* LEGEND */

const legendContainer = d3.select('#legend-container')
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

window.addEventListener('resize', _.throttle(createGraph, 1000));
