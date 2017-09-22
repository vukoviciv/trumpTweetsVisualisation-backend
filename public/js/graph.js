let width = window.innerWidth - 50,
    height = window.innerHeight - 50;

let nodes = tweets,
    color = d3.scaleOrdinal(d3.schemeCategory10);

const forceX = d3.forceX(width / 2).strength(0.045);
const forceY = d3.forceY(height / 2).strength(0.045);

let force = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', forceX)
    .force('y', forceY)
    .force('collide', d3.forceCollide().radius(getRadius).iterations(1))
    .nodes(nodes).on('tick', ticked);

let svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

let circlesContainer = svg
    .append('g')
    .attr('class', 'circles-container');

let textContainer = svg
    .append('g')
    .attr('class', 'text-container');

let circles = circlesContainer
    .selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('r', getRadius)
    .style('fill', (d, i) => color(i))
    .append('title')
    .text(d => `${d.word} (${d.count})`);

let texts = textContainer
    .selectAll('text')
    .data(nodes.filter(node=>node.count > 30))
    .enter().append('text')
    .attr('text-anchor', 'middle')
    .text(d => d.word);

function getRadius(d) {
    return d.count * 1.5;
}

function ticked(e) {
    svg.selectAll('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

    svg.selectAll('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y);
}
