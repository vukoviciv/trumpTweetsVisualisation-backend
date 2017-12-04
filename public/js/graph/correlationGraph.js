const getWindowInnerDimension = margin => ({
  width: window.innerWidth - margin.left - margin.right,
  height: window.innerHeight - margin.top - margin.bottom,
});

const createGraph = (data) => {
  const { d3 } = window;
  const margin = {
    top: 40,
    right: 10,
    bottom: 40,
    left: 100,
  };
  const windowDimensions = getWindowInnerDimension(margin);

  const d3graphContainer = d3.select('.correlation-graph-container')
    .append('svg')
    .attr('width', windowDimensions.width + margin.left + margin.right)
    .attr('height', windowDimensions.height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .style('background-color', 'black')
    .style('color', 'white');


  const colorScale = data.words.map(word =>
    ({ color: d3.schemeCategory20[Math.floor(Math.random() * 20)], word }));

  const tooltip = d3.select('.correlation-graph-container')
    .append('div')
    .attr('class', 'tooltip hidden');

  /* X */
  const xAxisScale = d3.scaleLinear()
    .domain(d3.extent(data.tweets, d => d.favorite_count))
    .range([0, windowDimensions.width]);

  const xAxis = d3.axisBottom()
    .scale(xAxisScale);

  /* Y */
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
    .attr('r', 5)
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
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [windowDimensions.width, windowDimensions.height]])
    .extent([[0, 0], [windowDimensions.width, windowDimensions.height]])
    .on('zoom', () => zoomed()));

  circles
    .on('mouseover', (d) => {
      tooltip.html(`${d.full_text} <br /> ${d.favorite_count}`)
        .style('left', `${d3.event.pageX - 50}px`)
        .style('top', `${d3.event.pageY - 60}px`)
        .classed('hidden', false);
    })
    .on('mouseout', () => tooltip.classed('hidden', true));
};

fetch('/graph/correlation/fetch_graph')
  .then(res => res.json())
  .then((data) => {
    createGraph(data);
  })
  .catch(err => err);
