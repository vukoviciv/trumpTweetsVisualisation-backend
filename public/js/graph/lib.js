import lib from './d3graph/lib';
import graph from './d3graph/d3graph';

const resetToDefaultDataHandler = () => {
  const defaultData = lib.getDefaultData();
  window.sessionStorage.removeItem('graphData');

  graph.create(defaultData);
};

module.exports = {
  resetToDefaultDataHandler,
};
