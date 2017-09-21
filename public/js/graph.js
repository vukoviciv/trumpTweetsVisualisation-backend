let svg = d3.select('svg')
    .attr('width', 960)
    .attr('height', 960);

let circle = svg.append('g')
    .selectAll('rect')
    .data(tweets)
    .enter()
    .append('circle')
    .attr('r', d => d.count)
    .attr('transform', d => `translate(${d.count*10},${d.count})`)
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .text(d => d.word)
    ;

let text = svg.append('g')
    .selectAll('text')
    .data(tweets)
    .enter()
    .append('text')
    .attr('transform', d => `translate(${d.count*10},${d.count})`)
    .text(d => d.word)
    ;

