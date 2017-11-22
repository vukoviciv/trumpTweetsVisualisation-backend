const getWindowInnerDimension = () => ({
  width: window.innerWidth - 310,
  height: window.innerHeight - 10,
});

const getRadius = (d, unitConstant) => d.count * unitConstant;

const getFontSizeInUnits = (d, unitConstant) => getRadius(d, unitConstant) / 2;

const ticked = (circlesContainer, textContainer, unitConstant) => {
  circlesContainer.selectAll('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  textContainer.selectAll('text')
    .attr('x', d => d.x)
    .attr('y', d => d.y + (getFontSizeInUnits(d, unitConstant) / 3));
};

const customDataExists = () => window.sessionStorage.getItem('graphData');

const getDefaultData = () => JSON.parse(window.sessionStorage.getItem('defaultData'));

module.exports = {
  getWindowInnerDimension,
  getRadius,
  ticked,
  getFontSizeInUnits,
  customDataExists,
  getDefaultData,
};
