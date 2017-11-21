(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

var _legend = require('./legend');

var _legend2 = _interopRequireDefault(_legend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createGraph = function createGraph(nodes) {
  var _window = window,
      d3 = _window.d3;

  var windowDimensions = _lib2.default.getWindowInnerDimension();
  var forceX = d3.forceX(windowDimensions.width / 2).strength(0.09);
  var forceY = d3.forceY(windowDimensions.height / 2).strength(0.09);
  var unitConstant = windowDimensions.width * 0.0005;
  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var d3graphContainer = d3.select('#graph-container');
  d3graphContainer.selectAll('*').remove();

  d3graphContainer.attr('width', windowDimensions.width).attr('height', windowDimensions.height);

  var circlesContainer = d3graphContainer.append('g').attr('class', 'circles-container');

  var textContainer = d3graphContainer.append('g').attr('class', 'text-container');

  var circles = circlesContainer.selectAll('circle').data(nodes.filter(function (node) {
    return node.count > 0;
  })).enter().append('circle');

  // Circles attributes
  circles.attr('r', function (d) {
    return _lib2.default.getRadius(d, unitConstant);
  }).style('fill', function (d, i) {
    return color(i);
  }).append('title').text(function (d) {
    return d.word + ' (' + d.count + ')';
  });

  // Text
  textContainer.selectAll('text').data(nodes.filter(function (node) {
    return node.count > 30;
  })).enter().append('text').attr('text-anchor', 'middle').style('font-size', function (d) {
    return _lib2.default.getFontSizeInUnits(d, unitConstant);
  }).text(function (d) {
    return d.word;
  });

  // Force
  d3.forceSimulation().velocityDecay(0.1).force('x', forceX).force('y', forceY).force('collide', d3.forceCollide().radius(function (d) {
    return _lib2.default.getRadius(d, unitConstant);
  }).iterations(1)).nodes(nodes).on('tick', function () {
    return _lib2.default.ticked(circlesContainer, textContainer, unitConstant);
  });

  (0, _legend2.default)(nodes, color);
};

var fetchGraph = function fetchGraph() {
  return fetch('/graph/fetch_graph').then(function (res) {
    return res.json();
  }).then(function (data) {
    return createGraph(data);
  }).catch(function (err) {
    return err;
  });
};

module.exports = {
  fetchGraph: fetchGraph,
  createGraph: createGraph
};

},{"./legend":2,"./lib":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createLegend;
function createLegend(nodes, color) {
  var legendContainer = window.d3.select('#legend-container');
  legendContainer.selectAll('*').remove();

  legendContainer.append('g').attr('class', 'legend-container').attr('x', 0).attr('y', 50);

  legendContainer.selectAll('rect').data(nodes).enter().append('rect').style('fill', function (d, i) {
    return color(i);
  }).attr('width', 20).attr('height', 20).attr('x', 50).attr('y', function (d, i) {
    return 30 * (i + 2);
  });

  legendContainer.selectAll('text').data(nodes).enter().append('text').text(function (d) {
    return d.word;
  }).attr('x', 80).attr('y', function (d, i) {
    return 30 * (i + 2) + 15;
  });
}

},{}],3:[function(require,module,exports){
'use strict';

var getWindowInnerDimension = function getWindowInnerDimension() {
  return {
    width: window.innerWidth - 310,
    height: window.innerHeight - 10
  };
};

var getRadius = function getRadius(d, unitConstant) {
  return d.count * unitConstant;
};

var getFontSizeInUnits = function getFontSizeInUnits(d, unitConstant) {
  return getRadius(d, unitConstant) / 2;
};

var ticked = function ticked(circlesContainer, textContainer, unitConstant) {
  circlesContainer.selectAll('circle').attr('cx', function (d) {
    return d.x;
  }).attr('cy', function (d) {
    return d.y;
  });

  textContainer.selectAll('text').attr('x', function (d) {
    return d.x;
  }).attr('y', function (d) {
    return d.y + getFontSizeInUnits(d, unitConstant) / 3;
  });
};

module.exports = {
  getWindowInnerDimension: getWindowInnerDimension,
  getRadius: getRadius,
  ticked: ticked,
  getFontSizeInUnits: getFontSizeInUnits
};

},{}],4:[function(require,module,exports){
'use strict';

var _d3graph = require('./d3graph/d3graph');

var _d3graph2 = _interopRequireDefault(_d3graph);

var _modalHandlers = require('./modal/modalHandlers');

var _modalHandlers2 = _interopRequireDefault(_modalHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var submitWordButton = document.querySelector('.modal #add-word');
var closeModalButton = document.getElementById('cancel');
var inputWord = document.getElementById('input-word');
var submitList = document.querySelector('.modal #submit');
var openModalButton = document.getElementById('words-modal');

var modalBody = document.getElementById('edit-words-list');

_d3graph2.default.fetchGraph();

submitWordButton.onclick = function () {
  return _modalHandlers2.default.submitWord(submitList);
};
closeModalButton.onclick = function () {
  return _modalHandlers2.default.close(modalBody);
};
inputWord.onkeyup = function (event) {
  return _modalHandlers2.default.onKeyUp(event, submitWordButton);
};
submitList.onclick = function () {
  _modalHandlers2.default.submitList();
  _modalHandlers2.default.close(modalBody);
};
openModalButton.onclick = _modalHandlers2.default.open;

},{"./d3graph/d3graph":1,"./modal/modalHandlers":6}],5:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListItem = function ListItem(word) {
  var _this = this;

  _classCallCheck(this, ListItem);

  var el = window.redom.el;

  this.elem = el('li.word-wrapper', this.word = el('span', word), this.removeIcon = el('i.fa.fa-times', { 'aria-hidden': true }));
  this.removeIcon.onclick = function () {
    _this.elem.remove();
  };
};

module.exports = ListItem;

},{}],6:[function(require,module,exports){
'use strict';

var _listItem = require('./listItem');

var _listItem2 = _interopRequireDefault(_listItem);

var _d3graph = require('../d3graph/d3graph');

var _d3graph2 = _interopRequireDefault(_d3graph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* Helper functions */

var updateGraph = function updateGraph(words) {
  var url = new URL(window.location.href + '/fetch_graph');
  var params = { words: words };
  Object.keys(params).forEach(function (key) {
    return url.searchParams.append(key, params[key]);
  });

  fetch(url).then(function (res) {
    return res.json();
  }).then(function (data) {
    return _d3graph2.default.createGraph(data);
  }).catch(function (err) {
    return console.log(err);
  });
};

/* Handlers */

var submitWordHandler = function submitWordHandler(submitList) {
  var inputElement = document.getElementById('input-word');
  var text = inputElement.value;
  var wordsList = document.getElementById('new-words-list');
  var backgroundOverlay = document.querySelector('.modal .background-overlay');
  var modalBodyContent = document.querySelector('.modal .modal-card-body');

  if (!text) return;

  var newListItem = new _listItem2.default(text);
  wordsList.append(newListItem.elem);

  inputElement.value = '';
  inputElement.focus();

  backgroundOverlay.style.opacity = 1 - wordsList.children.length * 0.05;
  modalBodyContent.scrollTop = modalBodyContent.scrollHeight;

  submitList.removeAttribute('disabled');
};

var closeModalHandler = function closeModalHandler(modalBody) {
  var backgroundOverlay = document.querySelector('.modal .background-overlay');
  var newWordsList = document.getElementById('new-words-list');

  if (newWordsList) newWordsList.remove();

  modalBody.classList.remove('is-active');
  document.getElementById('input-word').value = '';

  backgroundOverlay.style.opacity = 1;
};

var submitListHandler = function submitListHandler() {
  var wordsList = document.getElementById('new-words-list').children;
  if (wordsList.length < 1) return;

  var listElements = new (Function.prototype.bind.apply(Array, [null].concat(_toConsumableArray(wordsList))))();
  var wordsData = listElements.map(function (item) {
    return item.textContent.toUpperCase();
  });

  updateGraph(wordsData);
};

var onKeyUpHandler = function onKeyUpHandler(event, button) {
  if (event.key === 'Enter') {
    button.click();
    event.preventDefault();
  }
};

var openModalHandler = function openModalHandler() {
  var _window$redom = window.redom,
      el = _window$redom.el,
      mount = _window$redom.mount;

  var modalBody = document.getElementById('edit-words-list');

  modalBody.classList.add('is-active');
  document.getElementById('input-word').focus();
  var modalContent = document.querySelector('.modal-card .content');

  var wordList = el('ol#new-words-list');
  mount(modalContent, wordList, modalContent.firstChild);
};

module.exports = {
  submitWord: submitWordHandler,
  submitList: submitListHandler,
  close: closeModalHandler,
  onKeyUp: onKeyUpHandler,
  open: openModalHandler
};

},{"../d3graph/d3graph":1,"./listItem":5}]},{},[4]);
