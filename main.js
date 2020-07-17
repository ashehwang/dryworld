/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var svg = d3.select("svg.dry-map"); // const projection = d3.geoNaturalEarth1();

var projection = d3.geoEckert4();
var pathGenerator = d3.geoPath().projection(projection);
var g = svg.append('g');
g.append('path').attr('class', 'sphere'); // .attr('d', pathGenerator({type: 'Sphere'}))

svg.call(d3.zoom().on('zoom', function () {
  g.attr('transform', d3.event.transform);
}));
var colorScale = d3.scaleOrdinal();

var colorValue = function colorValue(d) {
  return d.properties.risk;
};

Promise.all([// d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
// d3.tsv('./src/waterdata.tsv'),
d3.tsv('./src/fullwaterdata.tsv'), // d3.tsv('./src/finalwaterdata.tsv'),
d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      tsvData = _ref2[0],
      topoJSONdata = _ref2[1];

  var rowById = {};
  tsvData.forEach(function (d) {
    rowById[d.iso_n3] = d;
  });
  console.log(topoJSONdata);
  var countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
  countries.features.forEach(function (d) {
    Object.assign(d.properties, rowById[d.id]);
  });
  colorScale.domain(countries.features.map(colorValue)).domain(colorScale.domain().sort().reverse()).range(d3.schemeYlOrRd[colorScale.domain().length]); // .range(d3.schemeYlGn[colorScale.domain().length])

  console.log(colorScale.domain().sort());
  var myColorScale = d3.scaleOrdinal().domain(["", "Low", "Low-Medium", "Medium-High", "High", "Extremely High"]).range(['white', '#ffff99', '#ffe600', '#ff9900', '#ff1900', '#9a0500']);
  g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', pathGenerator) // .attr('fill', d => colorScale(colorValue(d)))
  .attr('fill', function (d) {
    return myColorScale(colorValue(d));
  }).append('title').text(function (d) {
    return d.properties.name + ': ' + colorValue(d) + ' Risk';
  });
});
var svg2 = d3.select('svg.water-bars'); // svg2.style('background-color', 'red')

var width = +svg2.attr("width");
var height = +svg2.attr("height");

var render = function render(data, filter) {
  var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 80
  };
  var innerHeight = height - margin.top - margin.bottom;
  var innerWidth = width - margin.left - margin.right;

  var yValue = function yValue(d) {
    return d.water;
  };

  var xValue = function xValue(d) {
    return d.action;
  };

  var filteredData = data.filter(function (d) {
    return d.filter === filter;
  });
  var xScale = d3.scaleBand() // .domain(data.filter( d => d.filter === filter).map(xValue))
  // .domain(data.map(xValue))
  .domain(filteredData.map(xValue)).range([0, innerWidth]).padding(0.1);
  console.log(xScale.domain());
  var yScale = d3.scaleLinear().domain([0, d3.max(filteredData, yValue)]) // .domain([0, d3.max(data, yValue)])
  // .domain([0, data.filter( d => d.filter === filter).d3.max(yValue)])
  .range([innerHeight, 0]);
  var g = svg2.append('g').attr('transform', "translate(".concat(margin.left, ", ").concat(margin.top, ")"));
  g.append('g').call(d3.axisLeft(yScale)); // .tickSize(10)
  // .tickFormat('.3s')
  // .select('.domain')
  // .remove();

  g.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate(0, ".concat(innerHeight, ")")); //   .append('text')
  //     .attr('y', 0)
  //     .attr('fill', 'black')
  //     .text('water spent in gallons')
  // .selectAll('.domain, .tick line')
  // .remove();

  g.selectAll('rect').data(filteredData).enter().append('rect').attr('class', 'bar').attr('x', function (d) {
    return xScale(d.action);
  }).attr('y', function (d) {
    return yScale(d.water);
  }).attr('width', xScale.bandwidth()).attr('height', function (d) {
    return innerHeight - yScale(d.water);
  });
};

d3.csv('./src/data.csv').then(function (data) {
  data.forEach(function (d) {
    d.water = +d.water;
  });
  var selector = "flush";
  var myFilter = document.getElementsByName('filter');
  console.log(myFilter);
  render(data, selector);
  myFilter.forEach(function (node) {
    return node.addEventListener('change', function () {
      if (node.checked) selector = node.value;
      var target = document.querySelector('.water-bars');
      target.innerHTML = "";
      render(data, selector);
      d3.selectAll('rect').transition().duration(2000).style('fill', 'lightblue'); // console.log(node)
    });
  });
  console.log(selector);
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map