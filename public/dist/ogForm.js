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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.Selector = function () {
	function _class(eleStr) {
		_classCallCheck(this, _class);

		this._eles = document.querySelectorAll(eleStr);
		this._list = new Set();
		this.setValidator();
	}

	_createClass(_class, [{
		key: 'setValidator',
		value: function setValidator() {
			var _this = this;

			this._eles.forEach(function (el) {
				if (!el.ogInput) {
					//validator 가 등록된 input
					el.ogInput = true;
					var i = _this.getInputType(el);
					i && _this._list.add(i);
				}
			});
		}
	}, {
		key: 'getInputType',
		value: function getInputType(el) {
			if (el.tagName === 'textarea' || /(text|email|number|tel)/.test(el.type)) return new textValidator(el);
			var childInput = el.querySelector('input');
			if (childInput && childInput.type === "checkbox") return new checkValidator(el);
		}
	}]);

	return _class;
}();

var Validator = function () {
	_createClass(Validator, [{
		key: 'toggleClass',
		value: function toggleClass(flag, trueCls, falseCls) {
			var _this2 = this;

			[flag, !flag].forEach(function (b, i) {
				_this2._el.classList[b ? 'add' : 'remove'](i ? falseCls : trueCls);
			});
		}
	}]);

	function Validator(el) {
		_classCallCheck(this, Validator);

		this._el = el;
		this._state = { isTouched: false, isPristine: true, isValid: false };
		this.stateReady = false;
	}

	_createClass(Validator, [{
		key: 'setState',
		value: function setState(obj) {
			var _this3 = this;

			this.stateReady = true;
			for (var v in obj) {
				this._state[v] = obj[v];
			}
			setTimeout(function () {
				if (_this3.stateReady) {
					_this3.render();
					_this3.stateReady = false;
				}
			}, 0);
		}
	}, {
		key: 'render',
		value: function render() {
			this.toggleClass(this._state.isValid, 'og-valid', 'og-invalid');
			this._render();
		}
	}, {
		key: '_render',
		value: function _render() {
			throw 'must be override';
		}
	}, {
		key: 'state',
		get: function get() {
			return this._state;
		}
	}]);

	return Validator;
}();

var textValidator = function (_Validator) {
	_inherits(textValidator, _Validator);

	function textValidator(el) {
		_classCallCheck(this, textValidator);

		var _this4 = _possibleConstructorReturn(this, (textValidator.__proto__ || Object.getPrototypeOf(textValidator)).call(this, el));

		_this4._pattern = _this4._el.getAttribute('pattern') ? new RegExp(_this4._el.getAttribute('pattern')) : null;
		_this4.onChecking();
		return _this4;
	}

	_createClass(textValidator, [{
		key: 'validateMaxLen',
		value: function validateMaxLen(val) {
			if (this._el.maxLength === -1) return true;
			return this._el.maxLength >= val.length;
		}
	}, {
		key: 'validateMinLen',
		value: function validateMinLen(val) {
			if (this._el.minLength === -1) return true;
			return this._el.minLength <= val.length;
		}
	}, {
		key: 'validatePattern',
		value: function validatePattern(val) {
			if (this._pattern === null) return true;
			return this._pattern.test(val);
		}
	}, {
		key: 'validateRequire',
		value: function validateRequire(val) {
			if (!this._el.required) return true;
			return val !== "";
		}
	}, {
		key: '_render',
		value: function _render() {
			this.toggleClass(this.state.isTouched, 'og-touched', 'og-untouched');
			this.toggleClass(this.state.isPristine, 'og-pristine', 'og-dirty');
		}
	}, {
		key: 'onChecking',
		value: function onChecking() {
			var _this5 = this;

			var checkValidate = function checkValidate(val) {
				var valid = _this5.validateMaxLen(val) && _this5.validateMinLen(val) && _this5.validatePattern(val) && _this5.validateRequire(val);
				valid !== _this5.state.isValid && _this5.setState({ isValid: valid });
			};
			this._el.addEventListener('input', function (e) {
				_this5.state.isPristine && _this5.setState({ isPristine: false });
				var val = e.target.value;
				checkValidate(val);
			});

			this._el.addEventListener('focus', function (e) {
				_this5.setState({ isTouched: true });
			});
			this._el.addEventListener('blur', function (e) {
				_this5.setState({ isTouched: false });
			});
		}
	}]);

	return textValidator;
}(Validator);

var checkValidator = function (_Validator2) {
	_inherits(checkValidator, _Validator2);

	function checkValidator(el) {
		_classCallCheck(this, checkValidator);

		var _this6 = _possibleConstructorReturn(this, (checkValidator.__proto__ || Object.getPrototypeOf(checkValidator)).call(this, el));

		_this6._inputs = el.querySelectorAll('input');
		_this6.onChecking();
		return _this6;
	}

	_createClass(checkValidator, [{
		key: 'validateMaxCheck',
		value: function validateMaxCheck(cnt) {
			var max = this._el.getAttribute('maxCheck');
			if (max === null) return true;
			return max >= cnt;
		}
	}, {
		key: 'validateMinCheck',
		value: function validateMinCheck(cnt) {
			var min = this._el.getAttribute('minCheck');
			if (min === null) return true;
			return min <= cnt;
		}
	}, {
		key: 'onChecking',
		value: function onChecking() {
			var _this7 = this;

			this._inputs.forEach(function (ipt) {
				ipt.addEventListener('click', function () {
					_this7.state.isPristine && _this7.setState({ isPristine: false });
					var cnt = [].concat(_toConsumableArray(_this7._inputs)).filter(function (v) {
						return v.checked;
					}).length;
					var valid = _this7.validateMaxCheck(cnt) && _this7.validateMinCheck(cnt);
					valid !== _this7.state.isValid && _this7.setState({ isValid: valid });
				});
			});
		}
	}, {
		key: '_render',
		value: function _render() {
			this.toggleClass(this.state.isPristine, 'og-pristine', 'og-dirty');
		}
	}]);

	return checkValidator;
}(Validator);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ClassList

var indexOf = __webpack_require__(3),
    trim = __webpack_require__(4),
    arr = Array.prototype

/**
 * ClassList(elem) is kind of like Element#classList.
 *
 * @param {Element} elem
 * @return {ClassList}
 */
function ClassList (elem) {
  if (!(this instanceof ClassList))
    return new ClassList(elem)

  var classes = trim(elem.className).split(/\s+/),
      i

  this._elem = elem

  this.length = 0

  for (i = 0; i < classes.length; i += 1) {
    if (classes[i])
      arr.push.call(this, classes[i])
  }
}

/**
 * add(class1 [, class2 [, ...]]) adds the given class(es) to the
 * element.
 *
 * @param {String} ...
 * @return {Context}
 */
ClassList.prototype.add = function () {
  var name,
      i

  for (i = 0; i < arguments.length; i += 1) {
    name = '' + arguments[i]

    if (indexOf(this, name) >= 0)
      continue

    arr.push.call(this, name)
  }

  this._elem.className = this.toString()

  return this
}

/**
 * remove(class1 [, class2 [, ...]]) removes the given class(es) from
 * the element.
 *
 * @param {String} ...
 * @return {Context}
 */
ClassList.prototype.remove = function () {
  var index,
      name,
      i

  for (i = 0; i < arguments.length; i += 1) {
    name = '' + arguments[i]
    index = indexOf(this, name)

    if (index < 0) continue

    arr.splice.call(this, index, 1)
  }

  this._elem.className = this.toString()

  return this
}

/**
 * contains(name) determines if the element has a given class.
 *
 * @param {String} name
 * @return {Boolean}
 */
ClassList.prototype.contains = function (name) {
  name += ''
  return indexOf(this, name) >= 0
}

/**
 * toggle(name [, force]) toggles a class. If force is a boolean,
 * this method is basically just an alias for add/remove.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {Context}
 */
ClassList.prototype.toggle = function (name, force) {
  name += ''

  if (force === true) return this.add(name)
  if (force === false) return this.remove(name)

  return this[this.contains(name) ? 'remove' : 'add'](name)
}

/**
 * toString() returns the className of the element.
 *
 * @return {String}
 */
ClassList.prototype.toString = function () {
  return arr.join.call(this, ' ')
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};


/***/ })
/******/ ]);