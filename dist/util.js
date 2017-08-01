(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var clazz = __webpack_require__(1);
	var event = __webpack_require__(2);
	var style = __webpack_require__(3);
	var create = __webpack_require__(4);
	var util = __webpack_require__(5);
	
	module.exports = {
	  on: event.on,
	  off: event.off,
	  once: event.once,
	  getStyle: style.getStyle,
	  setStyle: style.setStyle,
	  removeClass: clazz.removeClass,
	  addClass: clazz.addClass,
	  hasClass: clazz.hasClass,
	  create: create,
	  formatStr: util.formatStr,
	  formatDate: util.formatDate,
	  formatMoney: util.formatMoney,
	  filterHtml: util.filterHtml,
	  queryString: util.queryString,
	  queryStringAll: util.queryStringAll
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	var trim = function trim(string) {
	  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
	};
	
	var hasClass = function hasClass(el, cls) {
	  if (!el || !cls) return false;
	  if (cls.indexOf(' ') != -1) throw new Error('className should not contain space.');
	  if (el.classList) {
	    return el.classList.contains(cls);
	  } else {
	    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
	  }
	};
	
	var addClass = function addClass(el, cls) {
	  if (!el) return;
	  var curClass = el.className;
	  var classes = (cls || '').split(' ');
	
	  for (var i = 0, j = classes.length; i < j; i++) {
	    var clsName = classes[i];
	    if (!clsName) continue;
	
	    if (el.classList) {
	      el.classList.add(clsName);
	    } else {
	      if (!hasClass(el, clsName)) {
	        curClass += ' ' + clsName;
	      }
	    }
	  }
	  if (!el.classList) {
	    el.className = curClass;
	  }
	};
	
	var removeClass = function removeClass(el, cls) {
	  if (!el || !cls) return;
	  var classes = cls.split(' ');
	  var curClass = ' ' + el.className + ' ';
	
	  for (var i = 0, j = classes.length; i < j; i++) {
	    var clsName = classes[i];
	    if (!clsName) continue;
	
	    if (el.classList) {
	      el.classList.remove(clsName);
	    } else {
	      if (hasClass(el, clsName)) {
	        curClass = curClass.replace(' ' + clsName + ' ', ' ');
	      }
	    }
	  }
	  if (!el.classList) {
	    el.className = trim(curClass);
	  }
	};
	
	module.exports = {
	  hasClass: hasClass,
	  addClass: addClass,
	  removeClass: removeClass
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	var bindEvent = function () {
	  if (document.addEventListener) {
	    return function (element, event, handler) {
	      if (element && event && handler) {
	        element.addEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function (element, event, handler) {
	      if (element && event && handler) {
	        element.attachEvent('on' + event, handler);
	      }
	    };
	  }
	}();
	
	var unbindEvent = function () {
	  if (document.removeEventListener) {
	    return function (element, event, handler) {
	      if (element && event) {
	        element.removeEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function (element, event, handler) {
	      if (element && event) {
	        element.detachEvent('on' + event, handler);
	      }
	    };
	  }
	}();
	
	var bindOnce = function bindOnce(el, event, fn) {
	  var listener = function listener() {
	    if (fn) {
	      fn.apply(this, arguments);
	    }
	    unbindEvent(el, event, listener);
	  };
	  bindEvent(el, event, listener);
	};
	
	module.exports = {
	  on: bindEvent,
	  off: unbindEvent,
	  once: bindOnce
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
	var MOZ_HACK_REGEXP = /^moz([A-Z])/;
	
	function camelCase(name) {
	  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
	    return offset ? letter.toUpperCase() : letter;
	  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
	}
	
	var ieVersion = Number(document.documentMode);
	var getStyle = ieVersion < 9 ? function (element, styleName) {
	  if (!element || !styleName) return null;
	  styleName = camelCase(styleName);
	  if (styleName === 'float') {
	    styleName = 'styleFloat';
	  }
	  try {
	    switch (styleName) {
	      case 'opacity':
	        try {
	          return element.filters.item('alpha').opacity / 100;
	        } catch (e) {
	          return 1.0;
	        }
	        break;
	      default:
	        return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null;
	    }
	  } catch (e) {
	    return element.style[styleName];
	  }
	} : function (element, styleName) {
	  if (!element || !styleName) return null;
	  styleName = camelCase(styleName);
	  if (styleName === 'float') {
	    styleName = 'cssFloat';
	  }
	  try {
	    var computed = document.defaultView.getComputedStyle(element, '');
	    return element.style[styleName] || computed ? computed[styleName] : null;
	  } catch (e) {
	    return element.style[styleName];
	  }
	};
	
	var setStyle = function setStyle(element, styleName, value) {
	  if (!element || !styleName) return;
	
	  if ((typeof styleName === 'undefined' ? 'undefined' : _typeof(styleName)) === 'object') {
	    for (var prop in styleName) {
	      if (styleName.hasOwnProperty(prop)) {
	        setStyle(element, prop, styleName[prop]);
	      }
	    }
	  } else {
	    styleName = camelCase(styleName);
	    if (styleName === 'opacity' && ieVersion < 9) {
	      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
	    } else {
	      element.style[styleName] = value;
	    }
	  }
	};
	
	module.exports = {
	  getStyle: getStyle,
	  setStyle: setStyle
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	//TODO decide the api.
	var create = function create(config, refs) {
	  if (!config) return null;
	  var dom, childElement;
	
	  if (typeof config === 'string') return document.createTextNode(config);
	
	  if (config.tag) {
	    dom = document.createElement(config.tag);
	    for (var prop in config) {
	      if (config.hasOwnProperty(prop)) {
	        if (prop === 'content' || prop === 'tag') continue;
	        if (prop === 'key' && refs) {
	          var key = config[prop];
	          if (key) {
	            refs[key] = dom;
	          }
	          continue;
	        }
	        dom[prop] = config[prop];
	      }
	    }
	    var content = config.content;
	    if (content) {
	      if (typeof content === 'string') {
	        childElement = document.createTextNode(content);
	        dom.appendChild(childElement);
	      } else {
	        if (!(content instanceof Array)) {
	          content = [content];
	        }
	        for (var i = 0, j = content.length; i < j; i++) {
	          var child = content[i];
	          childElement = create(child, refs);
	          dom.appendChild(childElement);
	        }
	      }
	    }
	  }
	  return dom;
	};
	
	module.exports = create;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	/*
	 * var a = "I Love {0}, and You Love {1},Where are {0}! {4}";
	 * String.format(a, "You","Me");
	 * a.format("You","Me");
	 */
	function formatStr(sSrc) {
	    var args = arguments;
	    return sSrc.replace(/\{(\d+)\}/g, function (m, i) {
	        return args[i];
	    });
	}
	/*  
	 * formatMoney(s,type)  
	 * 功能：金额按千位逗号分割  
	 * 参数：s，需要格式化的金额数值.  
	 * 参数：type,判断格式化后的金额是否需要小数位.  
	 * 返回：返回格式化后的数值字符串.  
	 */
	function formatMoney(s, type) {
	    if (/[^0-9\.]/.test(s)) return "0";
	    if (s == null || s == "") return "0";
	    s = s.toString().replace(/^(\d*)$/, "$1.");
	    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	    s = s.replace(".", ",");
	    var re = /(\d)(\d{3},)/;
	    while (re.test(s)) {
	        s = s.replace(re, "$1,$2");
	    }
	    s = s.replace(/,(\d\d)$/, ".$1");
	    if (type == 0) {
	        var a = s.split(".");
	        if (a[1] == "00") {
	            s = a[0];
	        }
	    }
	    return s;
	}
	/*
	* 对Date的扩展，将 Date 转化为指定格式的String 
	* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	* 例子： 
	* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	* (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	* 调用方法：
	* var time1 = new Date().format("yyyy-MM-dd HH:mm:ss"); 
	* var time2 = new Date().format("yyyy-MM-dd");
	*/
	function formatDate(oDate, fmt) {
	    var o = {
	        "M+": oDate.getMonth() + 1, //月份 
	        "d+": oDate.getDate(), //日 
	        "h+": oDate.getHours(), //小时 
	        "m+": oDate.getMinutes(), //分 
	        "s+": oDate.getSeconds(), //秒 
	        "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度 
	        "S": oDate.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) {
	        fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(fmt)) {
	            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return fmt;
	}
	//过滤html标签，空白，空行
	function filterHtml(str) {
	    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
	    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
	    str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
	    str = str.replace(/&+nbsp;/ig, ''); //去掉&+nbsp; 
	    str = str.replace(/^\s+/g, ''); //去掉空格，换行符，制表符
	    return str;
	}
	//get all query string
	function queryStringAll() {
	    var reg = /(?:^|&)([^&]+)=([^&]+)(?=&|$)/g,
	        args = {},
	        qs = location.search || location.hash;
	    qs = qs.slice(qs.indexOf('?') + 1);
	    while (result = reg.exec(qs)) {
	        args[result[1]] = result[2];
	    }
	    return args;
	}
	//get a query string
	function queryString(key) {
	    var reg = new RegExp('(?:^|&)' + key + '=([^&]+)(?=&|$)'),
	        qs = location.search || location.hash;
	    qs = qs.slice(qs.indexOf('?') + 1);
	    return (result = qs.match(reg)) == null ? null : result[1];
	}
	//判断元素是否在视口内
	function isElementInViewport(el, offset) {
	    var h = offset || 20,
	        box = el.getBoundingClientRect(),
	        top = box.top >= 0,
	        left = box.left >= 0,
	        bottom = box.bottom <= (window.innerHeight || document.documentElement.clientHeight) + h,
	        right = box.right <= (window.innerWidth || document.documentElement.clientWidth) + h;
	    return top && left && bottom && right;
	}
	//更新单个url参数，有则修改，无则添加
	function updateUrlParam(url, name, value) {
	    var r = url;
	    if (r != null && r != 'undefined' && r != "") {
	        value = encodeURIComponent(value);
	        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
	        var tmp = name + "=" + value;
	        if (url.match(reg) != null) {
	            r = url.replace(eval(reg), tmp);
	        } else {
	            if (url.match("[\?]")) {
	                r = url + "&" + tmp;
	            } else {
	                r = url + "?" + tmp;
	            }
	        }
	    }
	    return r;
	}
	//更新多个url参数，有则修改，无则添加
	function updateUrlParams(url, obj) {
	    for (var p in obj) {
	        url = updateUrlParam(url, p, obj[p]);
	    }
	    return url;
	}
	
	module.exports = {
	    formatStr: formatStr,
	    formatMoney: formatMoney,
	    formatDate: formatDate,
	    filterHtml: filterHtml,
	    queryString: queryString,
	    queryStringAll: queryStringAll,
	    isElementInViewport: isElementInViewport,
	    updateUrlParams: updateUrlParams
	};

/***/ })
/******/ ])));
//# sourceMappingURL=util.js.map