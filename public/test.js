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
    left: 70,
  };

  const filteredTweets = tweets.filter(tweet => tweet.count > 0);

  const data = filteredTweets.map(tweet => ({
    favorite_count: tweet.favorite_count,
    word_count: tweet.count,
    words: tweet.words,
  }));

  console.log(data);

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
    .domain(d3.extent(data, d => d.favorite_count));

  const xAxis = d3.axisBottom()
    .scale(xAxisScale);

    /* Y */

  const yAxisScale = d3.scaleLinear()
    .range([(windowDimensions.height / 2) - (margin.top + margin.bottom), 0])
    .domain([0, d3.max(data, d => d.word_count)]);

  const yAxis = d3.axisLeft()
    .scale(yAxisScale)
    .ticks(1);

  d3graphContainer.selectAll('dot')
    .data(data)
    .enter().append('circle')
    .attr('r', d => d.word_count)
    .attr('cx', d => xAxisScale(d.favorite_count))
    .attr('cy', d => yAxisScale(d.word_count))
    .style('transform', transformY)
    .style('fill', 'yellow');

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
