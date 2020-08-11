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

var svg = d3.select("svg.dry-map");
var projection = d3.geoNaturalEarth1(); // const projection = d3.geoEckert4();

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

Promise.all([d3.tsv('./src/fullwaterdata.tsv'), d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      tsvData = _ref2[0],
      topoJSONdata = _ref2[1];

  var rowById = {};
  tsvData.forEach(function (d) {
    rowById[d.iso_n3] = d;
  });
  var countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
  countries.features.forEach(function (d) {
    Object.assign(d.properties, rowById[d.id]);
  });
  colorScale.domain(countries.features.map(colorValue)).domain(colorScale.domain().sort().reverse()).range(d3.schemeYlOrRd[colorScale.domain().length]); // .range(d3.schemeYlGn[colorScale.domain().length])

  var myColorScale = d3.scaleOrdinal().domain(["", "Low", "Low-Medium", "Medium-High", "High", "Extremely High"]).range(['white', '#ffff99', '#ffe600', '#ff9900', '#ff1900', '#9a0500']);
  g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', pathGenerator) // .attr('fill', d => colorScale(colorValue(d)))
  .attr('fill', function (d) {
    return myColorScale(colorValue(d));
  }).append('title').text(function (d) {
    return d.properties.name + ': ' + colorValue(d) + ' Risk';
  });
});
var svg2 = d3.select('svg.water-bars'); // const width = +svg2.attr("width");

var width = 550;
var height = 500; // const height = +svg2.attr("height");

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
  .domain(filteredData.map(xValue)).range([0, innerWidth]).padding(0.1); // console.log(xScale.domain())

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
  render(data, selector);
  myFilter.forEach(function (node) {
    return node.addEventListener('change', function () {
      if (node.checked) selector = node.value;
      var target = document.querySelector('.water-bars');
      target.innerHTML = "";
      render(data, selector);
      d3.selectAll('rect').transition().duration(2000).style('fill', '#9AB9D5'); // .style('fill', 'url(#gradient)')
    });
  });
  var svg3 = d3.select('svg.pie'); // .style("background-color", "pink")

  var details = [{
    water: "Earth covered with Land",
    number: 30
  }, {
    water: "Earth covered with Water",
    number: 68
  }, {
    water: "Water Locked in Glaciers",
    number: 1.6
  }, {
    water: "Fresh Water for Us to User",
    number: 0.4
  }]; // const pieColors = d3.scaleOrdinal(d3.schemePastel1)

  var mypieColorScale = d3.scaleOrdinal().domain([30, 68, 0.4, 1.6]).range(['#F6F4F5', '#cfddec', 'blue', '#a5c0db']); // .range(['#ebf1f7', '#cfddec', '#5185b9', '#a5c0db'])
  // const width3 = +svg3.attr("width");
  // const height3 = +svg3.attr("height");

  var data3 = d3.pie().sort(null).value(function (d) {
    return d.number;
  })(details); // console.log(data3)

  var segments = d3.arc().innerRadius(0).outerRadius(200).padAngle(0.05).padRadius(50);
  var sections = svg3.append("g").attr("transform", "translate(250, 250)").selectAll("path").data(data3);
  sections.enter().append("path").attr("d", segments).attr("fill", function (d) {
    return mypieColorScale(d.data.number);
  });
  var content = d3.select("g").selectAll("text").data(data3);
  content.enter().append('text').each(function (d) {
    var center = segments.centroid(d);
    d3.select(this).attr("x", center[0]).attr("y", center[1]); // .text(d.data.water);
  });
  var legends = svg3.append('g').attr('transform', 'translate(500, 300)').selectAll(".legends").data(data3);
  var legend = legends.enter().append('g').classed("legends", true).attr("transform", function (d, i) {
    return "translate(0," + (i + 1) * 30 + ")";
  });
  legend.append("rect").attr("width", 20).attr("height", 20).attr("fill", function (d) {
    return mypieColorScale(d.data.number);
  }); // legend.append("rect").attr("width", 20).attr("height", 20).attr("fill", function(d){return colors3(d.data.number);});

  legend.append("text").classed("label", true).text(function (d) {
    return d.data.water;
  }).attr("fill", function (d) {
    return mypieColorScale(d.data.number);
  }).attr("x", 30).attr("y", 20);
});
var svg4 = d3.select('svg.waterwater'); // const width4 = +svg4.attr("width");

var width4 = 1160;
var height4 = 500; // const height4 = +svg4.attr("height");

var render2 = function render2(data) {
  var margin4 = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 80
  };
  var innerHeight = height4 - margin4.top - margin4.bottom;
  var innerWidth = width4 - margin4.left - margin4.right;

  var yValue = function yValue(d) {
    return d.water;
  };

  var xValue = function xValue(d) {
    return d.country;
  };

  var xScale = d3.scaleBand().domain(data.map(xValue)).range([0, innerWidth]).padding(0.2);
  var yScale = d3.scaleLinear().domain([0, d3.max(data, yValue)]).range([innerHeight, 0]);
  var g = svg4.append('g').attr('transform', "translate(".concat(margin4.left, ", ").concat(margin4.top, ")"));
  g.append('g').call(d3.axisLeft(yScale));
  g.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate(0, ".concat(innerHeight, ")"));
  g.selectAll('rect').data(data).enter().append('rect').attr('class', 'bar2').attr('x', function (d) {
    return xScale(d.country);
  }).attr('y', function (d) {
    return yScale(d.water);
  }).attr('width', xScale.bandwidth()).attr('height', function (d) {
    return innerHeight - yScale(d.water);
  });
};

d3.csv('./src/data2.csv').then(function (data) {
  data.forEach(function (d) {
    d.water = +d.water;
  }); // console.log(data)

  render2(data);
  d3.selectAll('.bar2').style('fill', '#9AB9D5');
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map