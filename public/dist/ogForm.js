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

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

alert('aaqs');;;;;;;
window.Selector = function () {
	function _class(eleStr) {
		_classCallCheck(this, _class);

		this._list = new Set();
		this._container = undefined;
		this._init(eleStr);
	}

	_createClass(_class, [{
		key: '_init',
		value: function _init(_ref) {
			var form = _ref.form,
			    inputClass = _ref.inputClass;

			this._eles = document.querySelectorAll(inputClass);
			this.formEle = form && new ContainerValidator({ el: form, list: this._list });
			this.setValidator();
		}
	}, {
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
			if (el.tagName === 'textarea' || /(text|email|number|tel)/.test(el.type)) return new TextValidator(el, this.formEle);
			var childInput = el.querySelector('input');
			if (childInput && childInput.type === "checkbox") return new CheckboxValidator(el, this.formEle);
		}
	}, {
		key: 'isValidateAll',
		value: function isValidateAll() {
			return [].concat(_toConsumableArray(this._list.values())).every(function (v) {
				return v.state.isValid;
			});
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

	function Validator(el, container) {
		_classCallCheck(this, Validator);

		this._el = el;
		this._state = { isTouched: false, isPristine: true, isValid: false };
		this.stateReady = false;

		this._listeners = new Set();
		container && this.addListener(container);
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
					_this3._notify();
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
		key: 'addListener',
		value: function addListener(s) {
			this._listeners.add(s);
		}
	}, {
		key: 'removeListener',
		value: function removeListener() {
			this._listeners.remove(s);
		}
	}, {
		key: '_notify',
		value: function _notify() {
			this._listeners.forEach(function (v) {
				v.listen();
			});
		}
	}, {
		key: 'state',
		get: function get() {
			return this._state;
		}
	}]);

	return Validator;
}();

var ContainerValidator = function (_Validator) {
	_inherits(ContainerValidator, _Validator);

	function ContainerValidator(_ref2) {
		var el = _ref2.el,
		    list = _ref2.list;

		_classCallCheck(this, ContainerValidator);

		var _this4 = _possibleConstructorReturn(this, (ContainerValidator.__proto__ || Object.getPrototypeOf(ContainerValidator)).call(this, el));

		_this4._list = list;
		return _this4;
	}

	_createClass(ContainerValidator, [{
		key: 'isValidateAll',
		value: function isValidateAll() {
			return [].concat(_toConsumableArray(this._list.values())).every(function (v) {
				return v.state.isValid;
			});
		}
	}, {
		key: 'listen',
		value: function listen() {
			this.onChecking();
		}
	}, {
		key: 'onChecking',
		value: function onChecking() {
			this.setState({ isValid: this.isValidateAll() });
		}
	}, {
		key: '_render',
		value: function _render() {}
	}]);

	return ContainerValidator;
}(Validator);

var TextValidator = function (_Validator2) {
	_inherits(TextValidator, _Validator2);

	function TextValidator(el, formEle) {
		_classCallCheck(this, TextValidator);

		var _this5 = _possibleConstructorReturn(this, (TextValidator.__proto__ || Object.getPrototypeOf(TextValidator)).call(this, el, formEle));

		_this5._pattern = _this5._el.getAttribute('pattern') ? new RegExp(_this5._el.getAttribute('pattern')) : null;
		_this5.onChecking();
		return _this5;
	}

	_createClass(TextValidator, [{
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
			var _this6 = this;

			var checkValidate = function checkValidate(val) {
				var valid = _this6.validateMaxLen(val) && _this6.validateMinLen(val) && _this6.validatePattern(val) && _this6.validateRequire(val);
				valid !== _this6.state.isValid && _this6.setState({ isValid: valid });
			};
			this._el.addEventListener('input', function (e) {
				_this6.state.isPristine && _this6.setState({ isPristine: false });
				var val = e.target.value;
				checkValidate(val);
			});

			this._el.addEventListener('blur', function (e) {
				!_this6.state.isTouched && _this6.setState({ isTouched: true });
			});
		}
	}]);

	return TextValidator;
}(Validator);

var CheckboxValidator = function (_Validator3) {
	_inherits(CheckboxValidator, _Validator3);

	function CheckboxValidator(el, formEle) {
		_classCallCheck(this, CheckboxValidator);

		var _this7 = _possibleConstructorReturn(this, (CheckboxValidator.__proto__ || Object.getPrototypeOf(CheckboxValidator)).call(this, el, formEle));

		_this7._inputs = el.querySelectorAll('input');
		_this7.onChecking();
		return _this7;
	}

	_createClass(CheckboxValidator, [{
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
			var _this8 = this;

			this._inputs.forEach(function (ipt) {
				ipt.addEventListener('click', function () {
					_this8.state.isPristine && _this8.setState({ isPristine: false });
					var cnt = [].concat(_toConsumableArray(_this8._inputs)).filter(function (v) {
						return v.checked;
					}).length;
					var valid = _this8.validateMaxCheck(cnt) && _this8.validateMinCheck(cnt);
					valid !== _this8.state.isValid && _this8.setState({ isValid: valid });
				});
			});
		}
	}, {
		key: '_render',
		value: function _render() {
			this.toggleClass(this.state.isPristine, 'og-pristine', 'og-dirty');
		}
	}]);

	return CheckboxValidator;
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