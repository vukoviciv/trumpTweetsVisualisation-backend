const getWindowInnerDimension = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});


const createGraph = (tweets) => {
  const { d3 } = window;
  const windowDimensions = getWindowInnerDimension();
  const margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 200,
  };

  const transformX = `translate(${margin.left / 2}px, ${windowDimensions.height - margin.bottom}px)`;
  const transformY = `translate(${margin.left / 2}px, ${margin.top + (windowDimensions.height / 2)}px)`;

  const d3graphContainer = d3.select('.main-graph-container')
    .append('svg')
    .attr('width', windowDimensions.width)
    .attr('height', windowDimensions.height)
    .style('background-color', 'black')
    .style('color', 'white');

  /* X */

  const xAxisScale = d3.scaleLinear()
    .range([0, windowDimensions.width - (margin.right + margin.left)])
    .domain(d3.extent(tweets, d => d.favorite_count));

  const xAxis = d3.axisBottom()
    .scale(xAxisScale);

    /* Y */

  const colorScale = words.map((word, i) => ({ color: d3.schemeCategory10[i], word }));

  const yAxisScale = d3.scalePoint()
    .domain(words)
    .range([(windowDimensions.height / 2) - (margin.top + margin.bottom), 0]);

  const yAxis = d3.axisLeft()
    .scale(yAxisScale);


  d3graphContainer.selectAll('dot')
    .data(tweets)
    .enter().append('circle')
    .attr('r', 1)
    .attr('cx', d => xAxisScale(d.favorite_count))
    .attr('cy', d => yAxisScale(d.words.word))
    .style('transform', transformY)
    .style('fill', (d) => {
      const colorObj = colorScale.find(elem => elem.word === d.words.word);
      return colorObj.color;
    });


  const yAxisGroup = d3graphContainer.append('g')
    .call(yAxis)
    .attr('class', 'yAxis');

  const xAxisGroup = d3graphContainer.append('g')
    .call(xAxis)
    .attr('class', 'xAxis');

  xAxisGroup.style('transform', transformX);
  yAxisGroup.style('transform', transformY);
};

createGraph(tweets);
