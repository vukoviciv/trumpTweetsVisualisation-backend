let width = window.innerWidth - 10,
    height = window.innerHeight - 10;

let nodes = tweets,
    color = d3.scaleOrdinal(d3.schemeCategory20);

const forceX = d3.forceX(width / 2).strength(0.07);
const forceY = d3.forceY(height / 2).strength(0.07);

let force = d3.forceSimulation()
    .velocityDecay(0.1)
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
    .data(nodes.filter(node => node.count > 0))
    .enter()
    .append('circle');

let circlesAttributes = circles
    .attr('r', getRadius)
    .style('fill', (d, i) => color(i))
    .append('title')
    .text(d => `${d.word} (${d.count})`);


let texts = textContainer
    .selectAll('text')
    .data(nodes.filter(node => node.count > 30))
    .enter().append('text')
    .attr('text-anchor', 'middle')
    .style('font-size', d => getFontSizeInUnits(d))
    .text(d => d.word);

/* LEGEND */

let legendContainer = svg
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
    .attr('y', (d, i)=> (30 * (i + 2) + 15));

/* HELPER FUNCTIONS */

function getRadius(d) {
    return d.count * 0.8;
}

function getFontSizeInUnits(d) {
    return d.count / 2;
}

function ticked(e) {
    circlesContainer.selectAll('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

    textContainer.selectAll('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y + getFontSizeInUnits(d) / 3);
}
