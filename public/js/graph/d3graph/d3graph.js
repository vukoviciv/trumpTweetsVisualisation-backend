const createLegend = (nodes, color) => {
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
};

const createGraph = (nodes) => {  
  const windowDimensions = getWindowInnerDimension();
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

  createLegend(nodes, color);
};

//createGraph(nodes);

//window.addEventListener('resize', _.throttle(createGraph(nodes), 1000));

fetch('/graph/fetch_graph')
  .then(res => res.json())
  .then(data => createGraph(data))
  .catch(err => console.log(err));
