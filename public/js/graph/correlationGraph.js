const getWindowInnerDimension = margin => ({
  width: 960 - margin.left - margin.right,
  height: 500 - margin.top - margin.bottom,
});

const createGraph = (data) => {
  const { d3 } = window;
  const margin = {
    top: 20,
    right: 10,
    bottom: 20,
    left: 100,
  };
  const windowDimensions = getWindowInnerDimension(margin);


  const transformX = `translate(${margin.left / 2}px, ${windowDimensions.height / 3}px)`;
  const transformY = `translate(${margin.left / 2}px, ${windowDimensions.height / 3}px)`;

  const d3graphContainer = d3.select('.correlation-graph-container')
    .append('svg')
    .attr('width', windowDimensions.width + margin.left + margin.right)
    .attr('height', windowDimensions.height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .style('background-color', 'black')
    .style('color', 'white');

  /* X */

  const xAxisScale = d3.scaleLinear()
    .domain(d3.extent(data.tweets, d => d.favorite_count))
    .range([0, windowDimensions.width]);

  const xAxis = d3.axisBottom()
    .scale(xAxisScale);

    /* Y */
  const colorScale = data.words.map((word, i) => ({ color: d3.schemeCategory20[i], word }));

  const yAxisScale = d3.scalePoint()
    .range([windowDimensions.height, 0])
    .domain(data.words);

  const yAxis = d3.axisLeft()
    .scale(yAxisScale);

  const circles = d3graphContainer.append('g')
    .attr('class', 'circles')
    .selectAll('dot')
    .data(data.tweets)
    .enter()
    .append('circle')
    .attr('r', 2)
    .attr('cx', d => xAxisScale(d.favorite_count))
    .attr('cy', d => yAxisScale(d.words.word))
    .style('fill', (d) => {
      const colorObj = colorScale.find(elem => elem.word === d.words.word);
      return colorObj.color;
    });


  const yAxisGroup = d3graphContainer.append('g')
    .call(yAxis)
    .attr('class', 'yAxis');

  const xAxisGroup = d3graphContainer.append('g')
    .call(xAxis)
    .attr('class', 'xAxis')
    .attr('transform', `translate(${0}, ${windowDimensions.height})`);

  const zoomed = () => {
    const newXScale = d3.event.transform.rescaleX(xAxisScale);
    xAxisGroup.call(xAxis.scale(newXScale));

    circles.attr('cx', d => newXScale(d.favorite_count));
  };

  d3.select('svg').call(d3.zoom()
    .scaleExtent([1, 1000])
    .translateExtent([[0, 0], [windowDimensions.width, windowDimensions.height]])
    .extent([[0, 0], [windowDimensions.width, windowDimensions.height]])
    .on('zoom', () => zoomed()));
};

fetch('/graph/correlation/fetch_graph')
  .then(res => res.json())
  .then((data) => {
    createGraph(data);
  })
  .catch(err => err);
