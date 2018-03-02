// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({18:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],15:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;

},{"./bundle-url":18}],13:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./../imgs/banner.jpg":[["70786728de56c8d905bc13a4c05a078d.jpg",16],16],"_css_loader":15}],14:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":15}],20:[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],24:[function(require,module,exports) {
var process = require("process");
!function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.AV = e() : t.AV = e();
}(this, function () {
  return function (t) {
    function e(r) {
      if (n[r]) return n[r].exports;var i = n[r] = { i: r, l: !1, exports: {} };return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }var n = {};return e.m = t, e.c = n, e.i = function (t) {
      return t;
    }, e.d = function (t, n, r) {
      e.o(t, n) || Object.defineProperty(t, n, { configurable: !1, enumerable: !0, get: r });
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };return e.d(n, "a", n), n;
    }, e.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 35);
  }([function (t, e, n) {
    var r, i;(function () {
      function n(t) {
        function e(e, n, r, i, s, o) {
          for (; s >= 0 && s < o; s += t) {
            var a = i ? i[s] : s;r = n(r, e[a], a, e);
          }return r;
        }return function (n, r, i, s) {
          r = S(r, s, 4);var o = !x(n) && O.keys(n),
              a = (o || n).length,
              u = t > 0 ? 0 : a - 1;return arguments.length < 3 && (i = n[o ? o[u] : u], u += t), e(n, r, i, o, u, a);
        };
      }function s(t) {
        return function (e, n, r) {
          n = A(n, r);for (var i = j(e), s = t > 0 ? 0 : i - 1; s >= 0 && s < i; s += t) if (n(e[s], s, e)) return s;return -1;
        };
      }function o(t, e, n) {
        return function (r, i, s) {
          var o = 0,
              a = j(r);if ("number" == typeof s) t > 0 ? o = s >= 0 ? s : Math.max(s + a, o) : a = s >= 0 ? Math.min(s + 1, a) : s + a + 1;else if (n && s && a) return s = n(r, i), r[s] === i ? s : -1;if (i !== i) return s = e(p.call(r, o, a), O.isNaN), s >= 0 ? s + o : -1;for (s = t > 0 ? o : a - 1; s >= 0 && s < a; s += t) if (r[s] === i) return s;return -1;
        };
      }function a(t, e) {
        var n = P.length,
            r = t.constructor,
            i = O.isFunction(r) && r.prototype || h,
            s = "constructor";for (O.has(t, s) && !O.contains(e, s) && e.push(s); n--;) (s = P[n]) in t && t[s] !== i[s] && !O.contains(e, s) && e.push(s);
      }var u = this,
          c = u._,
          l = Array.prototype,
          h = Object.prototype,
          f = Function.prototype,
          d = l.push,
          p = l.slice,
          _ = h.toString,
          v = h.hasOwnProperty,
          y = Array.isArray,
          m = Object.keys,
          g = f.bind,
          b = Object.create,
          w = function () {},
          O = function (t) {
        return t instanceof O ? t : this instanceof O ? void (this._wrapped = t) : new O(t);
      };void 0 !== t && t.exports && (e = t.exports = O), e._ = O, O.VERSION = "1.8.3";var S = function (t, e, n) {
        if (void 0 === e) return t;switch (null == n ? 3 : n) {case 1:
            return function (n) {
              return t.call(e, n);
            };case 2:
            return function (n, r) {
              return t.call(e, n, r);
            };case 3:
            return function (n, r, i) {
              return t.call(e, n, r, i);
            };case 4:
            return function (n, r, i, s) {
              return t.call(e, n, r, i, s);
            };}return function () {
          return t.apply(e, arguments);
        };
      },
          A = function (t, e, n) {
        return null == t ? O.identity : O.isFunction(t) ? S(t, e, n) : O.isObject(t) ? O.matcher(t) : O.property(t);
      };O.iteratee = function (t, e) {
        return A(t, e, 1 / 0);
      };var C = function (t, e) {
        return function (n) {
          var r = arguments.length;if (r < 2 || null == n) return n;for (var i = 1; i < r; i++) for (var s = arguments[i], o = t(s), a = o.length, u = 0; u < a; u++) {
            var c = o[u];e && void 0 !== n[c] || (n[c] = s[c]);
          }return n;
        };
      },
          E = function (t) {
        if (!O.isObject(t)) return {};if (b) return b(t);w.prototype = t;var e = new w();return w.prototype = null, e;
      },
          T = function (t) {
        return function (e) {
          return null == e ? void 0 : e[t];
        };
      },
          N = Math.pow(2, 53) - 1,
          j = T("length"),
          x = function (t) {
        var e = j(t);return "number" == typeof e && e >= 0 && e <= N;
      };O.each = O.forEach = function (t, e, n) {
        e = S(e, n);var r, i;if (x(t)) for (r = 0, i = t.length; r < i; r++) e(t[r], r, t);else {
          var s = O.keys(t);for (r = 0, i = s.length; r < i; r++) e(t[s[r]], s[r], t);
        }return t;
      }, O.map = O.collect = function (t, e, n) {
        e = A(e, n);for (var r = !x(t) && O.keys(t), i = (r || t).length, s = Array(i), o = 0; o < i; o++) {
          var a = r ? r[o] : o;s[o] = e(t[a], a, t);
        }return s;
      }, O.reduce = O.foldl = O.inject = n(1), O.reduceRight = O.foldr = n(-1), O.find = O.detect = function (t, e, n) {
        var r;if (void 0 !== (r = x(t) ? O.findIndex(t, e, n) : O.findKey(t, e, n)) && -1 !== r) return t[r];
      }, O.filter = O.select = function (t, e, n) {
        var r = [];return e = A(e, n), O.each(t, function (t, n, i) {
          e(t, n, i) && r.push(t);
        }), r;
      }, O.reject = function (t, e, n) {
        return O.filter(t, O.negate(A(e)), n);
      }, O.every = O.all = function (t, e, n) {
        e = A(e, n);for (var r = !x(t) && O.keys(t), i = (r || t).length, s = 0; s < i; s++) {
          var o = r ? r[s] : s;if (!e(t[o], o, t)) return !1;
        }return !0;
      }, O.some = O.any = function (t, e, n) {
        e = A(e, n);for (var r = !x(t) && O.keys(t), i = (r || t).length, s = 0; s < i; s++) {
          var o = r ? r[s] : s;if (e(t[o], o, t)) return !0;
        }return !1;
      }, O.contains = O.includes = O.include = function (t, e, n, r) {
        return x(t) || (t = O.values(t)), ("number" != typeof n || r) && (n = 0), O.indexOf(t, e, n) >= 0;
      }, O.invoke = function (t, e) {
        var n = p.call(arguments, 2),
            r = O.isFunction(e);return O.map(t, function (t) {
          var i = r ? e : t[e];return null == i ? i : i.apply(t, n);
        });
      }, O.pluck = function (t, e) {
        return O.map(t, O.property(e));
      }, O.where = function (t, e) {
        return O.filter(t, O.matcher(e));
      }, O.findWhere = function (t, e) {
        return O.find(t, O.matcher(e));
      }, O.max = function (t, e, n) {
        var r,
            i,
            s = -1 / 0,
            o = -1 / 0;if (null == e && null != t) {
          t = x(t) ? t : O.values(t);for (var a = 0, u = t.length; a < u; a++) (r = t[a]) > s && (s = r);
        } else e = A(e, n), O.each(t, function (t, n, r) {
          ((i = e(t, n, r)) > o || i === -1 / 0 && s === -1 / 0) && (s = t, o = i);
        });return s;
      }, O.min = function (t, e, n) {
        var r,
            i,
            s = 1 / 0,
            o = 1 / 0;if (null == e && null != t) {
          t = x(t) ? t : O.values(t);for (var a = 0, u = t.length; a < u; a++) (r = t[a]) < s && (s = r);
        } else e = A(e, n), O.each(t, function (t, n, r) {
          ((i = e(t, n, r)) < o || i === 1 / 0 && s === 1 / 0) && (s = t, o = i);
        });return s;
      }, O.shuffle = function (t) {
        for (var e, n = x(t) ? t : O.values(t), r = n.length, i = Array(r), s = 0; s < r; s++) e = O.random(0, s), e !== s && (i[s] = i[e]), i[e] = n[s];return i;
      }, O.sample = function (t, e, n) {
        return null == e || n ? (x(t) || (t = O.values(t)), t[O.random(t.length - 1)]) : O.shuffle(t).slice(0, Math.max(0, e));
      }, O.sortBy = function (t, e, n) {
        return e = A(e, n), O.pluck(O.map(t, function (t, n, r) {
          return { value: t, index: n, criteria: e(t, n, r) };
        }).sort(function (t, e) {
          var n = t.criteria,
              r = e.criteria;if (n !== r) {
            if (n > r || void 0 === n) return 1;if (n < r || void 0 === r) return -1;
          }return t.index - e.index;
        }), "value");
      };var U = function (t) {
        return function (e, n, r) {
          var i = {};return n = A(n, r), O.each(e, function (r, s) {
            var o = n(r, s, e);t(i, r, o);
          }), i;
        };
      };O.groupBy = U(function (t, e, n) {
        O.has(t, n) ? t[n].push(e) : t[n] = [e];
      }), O.indexBy = U(function (t, e, n) {
        t[n] = e;
      }), O.countBy = U(function (t, e, n) {
        O.has(t, n) ? t[n]++ : t[n] = 1;
      }), O.toArray = function (t) {
        return t ? O.isArray(t) ? p.call(t) : x(t) ? O.map(t, O.identity) : O.values(t) : [];
      }, O.size = function (t) {
        return null == t ? 0 : x(t) ? t.length : O.keys(t).length;
      }, O.partition = function (t, e, n) {
        e = A(e, n);var r = [],
            i = [];return O.each(t, function (t, n, s) {
          (e(t, n, s) ? r : i).push(t);
        }), [r, i];
      }, O.first = O.head = O.take = function (t, e, n) {
        if (null != t) return null == e || n ? t[0] : O.initial(t, t.length - e);
      }, O.initial = function (t, e, n) {
        return p.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)));
      }, O.last = function (t, e, n) {
        if (null != t) return null == e || n ? t[t.length - 1] : O.rest(t, Math.max(0, t.length - e));
      }, O.rest = O.tail = O.drop = function (t, e, n) {
        return p.call(t, null == e || n ? 1 : e);
      }, O.compact = function (t) {
        return O.filter(t, O.identity);
      };var k = function (t, e, n, r) {
        for (var i = [], s = 0, o = r || 0, a = j(t); o < a; o++) {
          var u = t[o];if (x(u) && (O.isArray(u) || O.isArguments(u))) {
            e || (u = k(u, e, n));var c = 0,
                l = u.length;for (i.length += l; c < l;) i[s++] = u[c++];
          } else n || (i[s++] = u);
        }return i;
      };O.flatten = function (t, e) {
        return k(t, e, !1);
      }, O.without = function (t) {
        return O.difference(t, p.call(arguments, 1));
      }, O.uniq = O.unique = function (t, e, n, r) {
        O.isBoolean(e) || (r = n, n = e, e = !1), null != n && (n = A(n, r));for (var i = [], s = [], o = 0, a = j(t); o < a; o++) {
          var u = t[o],
              c = n ? n(u, o, t) : u;e ? (o && s === c || i.push(u), s = c) : n ? O.contains(s, c) || (s.push(c), i.push(u)) : O.contains(i, u) || i.push(u);
        }return i;
      }, O.union = function () {
        return O.uniq(k(arguments, !0, !0));
      }, O.intersection = function (t) {
        for (var e = [], n = arguments.length, r = 0, i = j(t); r < i; r++) {
          var s = t[r];if (!O.contains(e, s)) {
            for (var o = 1; o < n && O.contains(arguments[o], s); o++);o === n && e.push(s);
          }
        }return e;
      }, O.difference = function (t) {
        var e = k(arguments, !0, !0, 1);return O.filter(t, function (t) {
          return !O.contains(e, t);
        });
      }, O.zip = function () {
        return O.unzip(arguments);
      }, O.unzip = function (t) {
        for (var e = t && O.max(t, j).length || 0, n = Array(e), r = 0; r < e; r++) n[r] = O.pluck(t, r);return n;
      }, O.object = function (t, e) {
        for (var n = {}, r = 0, i = j(t); r < i; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];return n;
      }, O.findIndex = s(1), O.findLastIndex = s(-1), O.sortedIndex = function (t, e, n, r) {
        n = A(n, r, 1);for (var i = n(e), s = 0, o = j(t); s < o;) {
          var a = Math.floor((s + o) / 2);n(t[a]) < i ? s = a + 1 : o = a;
        }return s;
      }, O.indexOf = o(1, O.findIndex, O.sortedIndex), O.lastIndexOf = o(-1, O.findLastIndex), O.range = function (t, e, n) {
        null == e && (e = t || 0, t = 0), n = n || 1;for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), s = 0; s < r; s++, t += n) i[s] = t;return i;
      };var I = function (t, e, n, r, i) {
        if (!(r instanceof e)) return t.apply(n, i);var s = E(t.prototype),
            o = t.apply(s, i);return O.isObject(o) ? o : s;
      };O.bind = function (t, e) {
        if (g && t.bind === g) return g.apply(t, p.call(arguments, 1));if (!O.isFunction(t)) throw new TypeError("Bind must be called on a function");var n = p.call(arguments, 2),
            r = function () {
          return I(t, r, e, this, n.concat(p.call(arguments)));
        };return r;
      }, O.partial = function (t) {
        var e = p.call(arguments, 1),
            n = function () {
          for (var r = 0, i = e.length, s = Array(i), o = 0; o < i; o++) s[o] = e[o] === O ? arguments[r++] : e[o];for (; r < arguments.length;) s.push(arguments[r++]);return I(t, n, this, this, s);
        };return n;
      }, O.bindAll = function (t) {
        var e,
            n,
            r = arguments.length;if (r <= 1) throw new Error("bindAll must be passed function names");for (e = 1; e < r; e++) n = arguments[e], t[n] = O.bind(t[n], t);return t;
      }, O.memoize = function (t, e) {
        var n = function (r) {
          var i = n.cache,
              s = "" + (e ? e.apply(this, arguments) : r);return O.has(i, s) || (i[s] = t.apply(this, arguments)), i[s];
        };return n.cache = {}, n;
      }, O.delay = function (t, e) {
        var n = p.call(arguments, 2);return setTimeout(function () {
          return t.apply(null, n);
        }, e);
      }, O.defer = O.partial(O.delay, O, 1), O.throttle = function (t, e, n) {
        var r,
            i,
            s,
            o = null,
            a = 0;n || (n = {});var u = function () {
          a = !1 === n.leading ? 0 : O.now(), o = null, s = t.apply(r, i), o || (r = i = null);
        };return function () {
          var c = O.now();a || !1 !== n.leading || (a = c);var l = e - (c - a);return r = this, i = arguments, l <= 0 || l > e ? (o && (clearTimeout(o), o = null), a = c, s = t.apply(r, i), o || (r = i = null)) : o || !1 === n.trailing || (o = setTimeout(u, l)), s;
        };
      }, O.debounce = function (t, e, n) {
        var r,
            i,
            s,
            o,
            a,
            u = function () {
          var c = O.now() - o;c < e && c >= 0 ? r = setTimeout(u, e - c) : (r = null, n || (a = t.apply(s, i), r || (s = i = null)));
        };return function () {
          s = this, i = arguments, o = O.now();var c = n && !r;return r || (r = setTimeout(u, e)), c && (a = t.apply(s, i), s = i = null), a;
        };
      }, O.wrap = function (t, e) {
        return O.partial(e, t);
      }, O.negate = function (t) {
        return function () {
          return !t.apply(this, arguments);
        };
      }, O.compose = function () {
        var t = arguments,
            e = t.length - 1;return function () {
          for (var n = e, r = t[e].apply(this, arguments); n--;) r = t[n].call(this, r);return r;
        };
      }, O.after = function (t, e) {
        return function () {
          if (--t < 1) return e.apply(this, arguments);
        };
      }, O.before = function (t, e) {
        var n;return function () {
          return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n;
        };
      }, O.once = O.partial(O.before, 2);var R = !{ toString: null }.propertyIsEnumerable("toString"),
          P = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];O.keys = function (t) {
        if (!O.isObject(t)) return [];if (m) return m(t);var e = [];for (var n in t) O.has(t, n) && e.push(n);return R && a(t, e), e;
      }, O.allKeys = function (t) {
        if (!O.isObject(t)) return [];var e = [];for (var n in t) e.push(n);return R && a(t, e), e;
      }, O.values = function (t) {
        for (var e = O.keys(t), n = e.length, r = Array(n), i = 0; i < n; i++) r[i] = t[e[i]];return r;
      }, O.mapObject = function (t, e, n) {
        e = A(e, n);for (var r, i = O.keys(t), s = i.length, o = {}, a = 0; a < s; a++) r = i[a], o[r] = e(t[r], r, t);return o;
      }, O.pairs = function (t) {
        for (var e = O.keys(t), n = e.length, r = Array(n), i = 0; i < n; i++) r[i] = [e[i], t[e[i]]];return r;
      }, O.invert = function (t) {
        for (var e = {}, n = O.keys(t), r = 0, i = n.length; r < i; r++) e[t[n[r]]] = n[r];return e;
      }, O.functions = O.methods = function (t) {
        var e = [];for (var n in t) O.isFunction(t[n]) && e.push(n);return e.sort();
      }, O.extend = C(O.allKeys), O.extendOwn = O.assign = C(O.keys), O.findKey = function (t, e, n) {
        e = A(e, n);for (var r, i = O.keys(t), s = 0, o = i.length; s < o; s++) if (r = i[s], e(t[r], r, t)) return r;
      }, O.pick = function (t, e, n) {
        var r,
            i,
            s = {},
            o = t;if (null == o) return s;O.isFunction(e) ? (i = O.allKeys(o), r = S(e, n)) : (i = k(arguments, !1, !1, 1), r = function (t, e, n) {
          return e in n;
        }, o = Object(o));for (var a = 0, u = i.length; a < u; a++) {
          var c = i[a],
              l = o[c];r(l, c, o) && (s[c] = l);
        }return s;
      }, O.omit = function (t, e, n) {
        if (O.isFunction(e)) e = O.negate(e);else {
          var r = O.map(k(arguments, !1, !1, 1), String);e = function (t, e) {
            return !O.contains(r, e);
          };
        }return O.pick(t, e, n);
      }, O.defaults = C(O.allKeys, !0), O.create = function (t, e) {
        var n = E(t);return e && O.extendOwn(n, e), n;
      }, O.clone = function (t) {
        return O.isObject(t) ? O.isArray(t) ? t.slice() : O.extend({}, t) : t;
      }, O.tap = function (t, e) {
        return e(t), t;
      }, O.isMatch = function (t, e) {
        var n = O.keys(e),
            r = n.length;if (null == t) return !r;for (var i = Object(t), s = 0; s < r; s++) {
          var o = n[s];if (e[o] !== i[o] || !(o in i)) return !1;
        }return !0;
      };var D = function (t, e, n, r) {
        if (t === e) return 0 !== t || 1 / t == 1 / e;if (null == t || null == e) return t === e;t instanceof O && (t = t._wrapped), e instanceof O && (e = e._wrapped);var i = _.call(t);if (i !== _.call(e)) return !1;switch (i) {case "[object RegExp]":case "[object String]":
            return "" + t == "" + e;case "[object Number]":
            return +t != +t ? +e != +e : 0 == +t ? 1 / +t == 1 / e : +t == +e;case "[object Date]":case "[object Boolean]":
            return +t == +e;}var s = "[object Array]" === i;if (!s) {
          if ("object" != typeof t || "object" != typeof e) return !1;var o = t.constructor,
              a = e.constructor;if (o !== a && !(O.isFunction(o) && o instanceof o && O.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1;
        }n = n || [], r = r || [];for (var u = n.length; u--;) if (n[u] === t) return r[u] === e;if (n.push(t), r.push(e), s) {
          if ((u = t.length) !== e.length) return !1;for (; u--;) if (!D(t[u], e[u], n, r)) return !1;
        } else {
          var c,
              l = O.keys(t);if (u = l.length, O.keys(e).length !== u) return !1;for (; u--;) if (c = l[u], !O.has(e, c) || !D(t[c], e[c], n, r)) return !1;
        }return n.pop(), r.pop(), !0;
      };O.isEqual = function (t, e) {
        return D(t, e);
      }, O.isEmpty = function (t) {
        return null == t || (x(t) && (O.isArray(t) || O.isString(t) || O.isArguments(t)) ? 0 === t.length : 0 === O.keys(t).length);
      }, O.isElement = function (t) {
        return !(!t || 1 !== t.nodeType);
      }, O.isArray = y || function (t) {
        return "[object Array]" === _.call(t);
      }, O.isObject = function (t) {
        var e = typeof t;return "function" === e || "object" === e && !!t;
      }, O.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (t) {
        O["is" + t] = function (e) {
          return _.call(e) === "[object " + t + "]";
        };
      }), O.isArguments(arguments) || (O.isArguments = function (t) {
        return O.has(t, "callee");
      }), "function" != typeof /./ && "object" != typeof Int8Array && (O.isFunction = function (t) {
        return "function" == typeof t || !1;
      }), O.isFinite = function (t) {
        return isFinite(t) && !isNaN(parseFloat(t));
      }, O.isNaN = function (t) {
        return O.isNumber(t) && t !== +t;
      }, O.isBoolean = function (t) {
        return !0 === t || !1 === t || "[object Boolean]" === _.call(t);
      }, O.isNull = function (t) {
        return null === t;
      }, O.isUndefined = function (t) {
        return void 0 === t;
      }, O.has = function (t, e) {
        return null != t && v.call(t, e);
      }, O.noConflict = function () {
        return u._ = c, this;
      }, O.identity = function (t) {
        return t;
      }, O.constant = function (t) {
        return function () {
          return t;
        };
      }, O.noop = function () {}, O.property = T, O.propertyOf = function (t) {
        return null == t ? function () {} : function (e) {
          return t[e];
        };
      }, O.matcher = O.matches = function (t) {
        return t = O.extendOwn({}, t), function (e) {
          return O.isMatch(e, t);
        };
      }, O.times = function (t, e, n) {
        var r = Array(Math.max(0, t));e = S(e, n, 1);for (var i = 0; i < t; i++) r[i] = e(i);return r;
      }, O.random = function (t, e) {
        return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1));
      }, O.now = Date.now || function () {
        return new Date().getTime();
      };var F = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
          L = O.invert(F),
          q = function (t) {
        var e = function (e) {
          return t[e];
        },
            n = "(?:" + O.keys(t).join("|") + ")",
            r = RegExp(n),
            i = RegExp(n, "g");return function (t) {
          return t = null == t ? "" : "" + t, r.test(t) ? t.replace(i, e) : t;
        };
      };O.escape = q(F), O.unescape = q(L), O.result = function (t, e, n) {
        var r = null == t ? void 0 : t[e];return void 0 === r && (r = n), O.isFunction(r) ? r.call(t) : r;
      };var M = 0;O.uniqueId = function (t) {
        var e = ++M + "";return t ? t + e : e;
      }, O.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };var B = /(.)^/,
          J = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" },
          Q = /\\|'|\r|\n|\u2028|\u2029/g,
          V = function (t) {
        return "\\" + J[t];
      };O.template = function (t, e, n) {
        !e && n && (e = n), e = O.defaults({}, e, O.templateSettings);var r = RegExp([(e.escape || B).source, (e.interpolate || B).source, (e.evaluate || B).source].join("|") + "|$", "g"),
            i = 0,
            s = "__p+='";t.replace(r, function (e, n, r, o, a) {
          return s += t.slice(i, a).replace(Q, V), i = a + e.length, n ? s += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? s += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : o && (s += "';\n" + o + "\n__p+='"), e;
        }), s += "';\n", e.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";try {
          var o = new Function(e.variable || "obj", "_", s);
        } catch (t) {
          throw t.source = s, t;
        }var a = function (t) {
          return o.call(this, t, O);
        };return a.source = "function(" + (e.variable || "obj") + "){\n" + s + "}", a;
      }, O.chain = function (t) {
        var e = O(t);return e._chain = !0, e;
      };var W = function (t, e) {
        return t._chain ? O(e).chain() : e;
      };O.mixin = function (t) {
        O.each(O.functions(t), function (e) {
          var n = O[e] = t[e];O.prototype[e] = function () {
            var t = [this._wrapped];return d.apply(t, arguments), W(this, n.apply(O, t));
          };
        });
      }, O.mixin(O), O.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t) {
        var e = l[t];O.prototype[t] = function () {
          var n = this._wrapped;return e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], W(this, n);
        };
      }), O.each(["concat", "join", "slice"], function (t) {
        var e = l[t];O.prototype[t] = function () {
          return W(this, e.apply(this._wrapped, arguments));
        };
      }), O.prototype.value = function () {
        return this._wrapped;
      }, O.prototype.valueOf = O.prototype.toJSON = O.prototype.value, O.prototype.toString = function () {
        return "" + this._wrapped;
      }, r = [], void 0 !== (i = function () {
        return O;
      }.apply(e, r)) && (t.exports = i);
    }).call(this);
  }, function (t, e, n) {
    "use strict";
    var r = (n(0), n(46).Promise);r._continueWhile = function (t, e) {
      return t() ? e().then(function () {
        return r._continueWhile(t, e);
      }) : r.resolve();
    }, t.exports = r;
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(50),
        s = n(0),
        o = s.extend,
        a = n(1),
        u = n(5),
        c = n(3),
        l = c.getSessionToken,
        h = c.ajax,
        f = function (t, e) {
      var n = new Date().getTime(),
          r = i(n + t);return e ? r + "," + n + ",master" : r + "," + n;
    },
        d = function (t, e) {
      e ? t["X-LC-Sign"] = f(u.applicationKey) : t["X-LC-Key"] = u.applicationKey;
    },
        p = function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = arguments[1],
          n = { "X-LC-Id": u.applicationId, "Content-Type": "application/json;charset=UTF-8" },
          r = !1;return "boolean" == typeof t.useMasterKey ? r = t.useMasterKey : "boolean" == typeof u._config.useMasterKey && (r = u._config.useMasterKey), r ? u.masterKey ? e ? n["X-LC-Sign"] = f(u.masterKey, !0) : n["X-LC-Key"] = u.masterKey + ",master" : (console.warn("masterKey is not set, fall back to use appKey"), d(n, e)) : d(n, e), u.hookKey && (n["X-LC-Hook-Key"] = u.hookKey), null !== u._config.production && (n["X-LC-Prod"] = String(u._config.production)), n["X-LC-UA"] = u._sharedConfig.userAgent, a.resolve().then(function () {
        var e = l(t);if (e) n["X-LC-Session"] = e;else if (!u._config.disableCurrentUser) return u.User.currentAsync().then(function (t) {
          return t && t._sessionToken && (n["X-LC-Session"] = t._sessionToken), n;
        });return n;
      });
    },
        _ = function (t) {
      var e = t.service,
          n = void 0 === e ? "api" : e,
          r = t.version,
          i = void 0 === r ? "1.1" : r,
          s = t.path,
          o = u._config.serverURLs[n];if (!o) throw new Error("undefined server URL for " + n);return "/" !== o.charAt(o.length - 1) && (o += "/"), o += i, s && (o += s), o;
    },
        v = function (t) {
      var e = t.service,
          n = t.version,
          i = t.method,
          s = t.path,
          o = t.query,
          a = t.data,
          c = void 0 === a ? {} : a,
          l = t.authOptions,
          f = t.signKey,
          d = void 0 === f || f;if (!u.applicationId || !u.applicationKey && !u.masterKey) throw new Error("Not initialized");u._appRouter.refresh();var v = u._config.requestTimeout,
          y = _({ service: e, path: s, version: n });return p(l, d).then(function (t) {
        return h({ method: i, url: y, query: o, data: c, headers: t, timeout: v }).catch(function (t) {
          var e = { code: t.code || -1, error: t.message || t.responseText };if (t.response && t.response.code) e = t.response;else if (t.responseText) try {
            e = JSON.parse(t.responseText);
          } catch (t) {}e.rawMessage = e.rawMessage || e.error, u._sharedConfig.keepErrorRawMessage || (e.error += " [" + (t.statusCode || "N/A") + " " + i + " " + y + "]");var n = new Error(e.error);throw delete e.error, r.extend(n, e);
        });
      });
    },
        y = function (t, e, n, r) {
      var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
          s = arguments[5],
          a = arguments[6],
          u = "";if (t && (u += "/" + t), e && (u += "/" + e), n && (u += "/" + n), i && i._fetchWhenSave) throw new Error("_fetchWhenSave should be in the query");if (i && i._where) throw new Error("_where should be in the query");return r && "get" === r.toLowerCase() && (a = o({}, a, i), i = null), v({ method: r, path: u, query: a, data: i, authOptions: s });
    };u.request = v, t.exports = { _request: y, request: v };
  }, function (t, e, n) {
    "use strict";
    function r(t) {
      var e = new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$"),
          n = e.exec(t);if (!n) return null;var r = n[1] || 0,
          i = (n[2] || 1) - 1,
          s = n[3] || 0,
          o = n[4] || 0,
          a = n[5] || 0,
          u = n[6] || 0,
          c = n[8] || 0;return new Date(Date.UTC(r, i, s, o, a, u, c));
    }var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    },
        s = n(0),
        o = n(7),
        a = n(6),
        u = a("leancloud:request"),
        c = a("leancloud:request:error"),
        l = n(1),
        h = 0,
        f = function (t) {
      var e = t.method,
          n = t.url,
          r = t.query,
          s = t.data,
          f = t.headers,
          d = void 0 === f ? {} : f,
          p = t.onprogress,
          _ = t.timeout,
          v = h++;u("request(" + v + ")", e, n, r, s, d);var y = {};if (r) for (var m in r) "object" === i(r[m]) ? y[m] = JSON.stringify(r[m]) : y[m] = r[m];return new l(function (t, i) {
        var l = o(e, n).set(d).query(y).send(s);p && l.on("progress", p), _ && l.timeout(_), l.end(function (o, l) {
          return o ? (l && (a.enabled("leancloud:request") || c("request(" + v + ")", e, n, r, s, d), c("response(" + v + ")", l.status, l.body || l.text, l.header), o.statusCode = l.status, o.responseText = l.text, o.response = l.body), i(o)) : (u("response(" + v + ")", l.status, l.body || l.text, l.header), t(l.body));
        });
      });
    },
        d = function (t) {
      return s.isNull(t) || s.isUndefined(t);
    },
        p = function (t) {
      return s.isArray(t) ? t : void 0 === t || null === t ? [] : [t];
    },
        _ = function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = t.keys,
          n = t.include,
          r = t.includeACL,
          i = {};return e && (i.keys = p(e).join(",")), n && (i.include = p(n).join(",")), r && (i.returnACL = r), i;
    },
        v = function (t) {
      return t.sessionToken ? t.sessionToken : t.user && "function" == typeof t.user.getSessionToken ? t.user.getSessionToken() : void 0;
    },
        y = function (t) {
      return function (e) {
        return t(e), e;
      };
    },
        m = function () {},
        g = function (t, e, n) {
      var r;return r = e && e.hasOwnProperty("constructor") ? e.constructor : function () {
        t.apply(this, arguments);
      }, s.extend(r, t), m.prototype = t.prototype, r.prototype = new m(), e && s.extend(r.prototype, e), n && s.extend(r, n), r.prototype.constructor = r, r.__super__ = t.prototype, r;
    },
        b = function (t, e, n) {
      var r = e.split("."),
          i = r.pop(),
          s = t;return r.forEach(function (t) {
        void 0 === s[t] && (s[t] = {}), s = s[t];
      }), s[i] = n, t;
    },
        w = function (t, e) {
      for (var n = e.split("."), r = n.pop(), i = t, s = 0; s < n.length; s++) if (void 0 === (i = i[n[s]])) return [void 0, void 0, r];return [i[r], i, r];
    };t.exports = { ajax: f, isNullOrUndefined: d, ensureArray: p, transformFetchOptions: _, getSessionToken: v, tap: y, inherits: g, parseDate: r, setValue: b, findValue: w };
  }, function (t, e, n) {
    "use strict";
    function r(t, e) {
      var n = new Error(e);return n.code = t, n;
    }n(0).extend(r, { OTHER_CAUSE: -1, INTERNAL_SERVER_ERROR: 1, CONNECTION_FAILED: 100, OBJECT_NOT_FOUND: 101, INVALID_QUERY: 102, INVALID_CLASS_NAME: 103, MISSING_OBJECT_ID: 104, INVALID_KEY_NAME: 105, INVALID_POINTER: 106, INVALID_JSON: 107, COMMAND_UNAVAILABLE: 108, NOT_INITIALIZED: 109, INCORRECT_TYPE: 111, INVALID_CHANNEL_NAME: 112, PUSH_MISCONFIGURED: 115, OBJECT_TOO_LARGE: 116, OPERATION_FORBIDDEN: 119, CACHE_MISS: 120, INVALID_NESTED_KEY: 121, INVALID_FILE_NAME: 122, INVALID_ACL: 123, TIMEOUT: 124, INVALID_EMAIL_ADDRESS: 125, MISSING_CONTENT_TYPE: 126, MISSING_CONTENT_LENGTH: 127, INVALID_CONTENT_LENGTH: 128, FILE_TOO_LARGE: 129, FILE_SAVE_ERROR: 130, FILE_DELETE_ERROR: 153, DUPLICATE_VALUE: 137, INVALID_ROLE_NAME: 139, EXCEEDED_QUOTA: 140, SCRIPT_FAILED: 141, VALIDATION_ERROR: 142, INVALID_IMAGE_DATA: 150, UNSAVED_FILE_ERROR: 151, INVALID_PUSH_TIME_ERROR: 152, USERNAME_MISSING: 200, PASSWORD_MISSING: 201, USERNAME_TAKEN: 202, EMAIL_TAKEN: 203, EMAIL_MISSING: 204, EMAIL_NOT_FOUND: 205, SESSION_MISSING: 206, MUST_CREATE_USER_THROUGH_SIGNUP: 207, ACCOUNT_ALREADY_LINKED: 208, LINKED_ID_MISSING: 250, INVALID_LINKED_SESSION: 251, UNSUPPORTED_SERVICE: 252, X_DOMAIN_REQUEST: 602 }), t.exports = r;
  }, function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(0),
          i = n(37),
          s = n(3),
          o = s.inherits,
          a = s.parseDate,
          u = e.AV || {};u._config = { serverURLs: {}, useMasterKey: !1, production: null, realtime: null, requestTimeout: null }, u._sharedConfig = { userAgent: i, liveQueryRealtime: null }, u._getAVPath = function (t) {
        if (!u.applicationId) throw new Error("You need to call AV.initialize before using AV.");if (t || (t = ""), !r.isString(t)) throw new Error("Tried to get a localStorage path that wasn't a String.");return "/" === t[0] && (t = t.substring(1)), "AV/" + u.applicationId + "/" + t;
      };var c = function () {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
      },
          l = function () {
        return "" + c() + c() + "-" + c() + "-" + c() + "-" + c() + "-" + c() + c() + c();
      };u._installationId = null, u._getInstallationId = function () {
        if (u._installationId) return u.Promise.resolve(u._installationId);var t = u._getAVPath("installationId");return u.localStorage.getItemAsync(t).then(function (e) {
          return u._installationId = e, u._installationId ? e : (u._installationId = e = l(), u.localStorage.setItemAsync(t, e).then(function () {
            return e;
          }));
        });
      }, u._subscriptionId = null, u._refreshSubscriptionId = function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u._getAVPath("subscriptionId"),
            e = u._subscriptionId = l();return u.localStorage.setItemAsync(t, e).then(function () {
          return e;
        });
      }, u._getSubscriptionId = function () {
        if (u._subscriptionId) return u.Promise.resolve(u._subscriptionId);var t = u._getAVPath("subscriptionId");return u.localStorage.getItemAsync(t).then(function (e) {
          return u._subscriptionId = e, u._subscriptionId || (e = u._refreshSubscriptionId(t)), e;
        });
      }, u._parseDate = a, u._extend = function (t, e) {
        var n = o(this, t, e);return n.extend = this.extend, n;
      }, u._encode = function (t, e, n) {
        var i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];if (t instanceof u.Object) {
          if (n) throw new Error("AV.Objects not allowed here");return e && !r.include(e, t) && t._hasData ? t._toFullJSON(e.concat(t), i) : t._toPointer();
        }if (t instanceof u.ACL) return t.toJSON();if (r.isDate(t)) return i ? { __type: "Date", iso: t.toJSON() } : t.toJSON();if (t instanceof u.GeoPoint) return t.toJSON();if (r.isArray(t)) return r.map(t, function (t) {
          return u._encode(t, e, n, i);
        });if (r.isRegExp(t)) return t.source;if (t instanceof u.Relation) return t.toJSON();if (t instanceof u.Op) return t.toJSON();if (t instanceof u.File) {
          if (!t.url() && !t.id) throw new Error("Tried to save an object containing an unsaved file.");return t._toFullJSON(e, i);
        }return r.isObject(t) ? r.mapObject(t, function (t, r) {
          return u._encode(t, e, n, i);
        }) : t;
      }, u._decode = function (t, e) {
        if (!r.isObject(t) || r.isDate(t)) return t;if (r.isArray(t)) return r.map(t, function (t) {
          return u._decode(t);
        });if (t instanceof u.Object) return t;if (t instanceof u.File) return t;if (t instanceof u.Op) return t;if (t instanceof u.GeoPoint) return t;if (t instanceof u.ACL) return t;if ("ACL" === e) return new u.ACL(t);if (t.__op) return u.Op._decode(t);var n;if ("Pointer" === t.__type) {
          n = t.className;var i = u.Object._create(n);if (Object.keys(t).length > 3) {
            var s = r.clone(t);delete s.__type, delete s.className, i._finishFetch(s, !0);
          } else i._finishFetch({ objectId: t.objectId }, !1);return i;
        }if ("Object" === t.__type) {
          n = t.className;var o = r.clone(t);delete o.__type, delete o.className;var a = u.Object._create(n);return a._finishFetch(o, !0), a;
        }if ("Date" === t.__type) return u._parseDate(t.iso);if ("GeoPoint" === t.__type) return new u.GeoPoint({ latitude: t.latitude, longitude: t.longitude });if ("Relation" === t.__type) {
          if (!e) throw new Error("key missing decoding a Relation");var c = new u.Relation(null, e);return c.targetClassName = t.className, c;
        }if ("File" === t.__type) {
          var l = new u.File(t.name),
              h = r.clone(t);return delete h.__type, l._finishFetch(h), l;
        }return r.mapObject(t, u._decode);
      }, u.parseJSON = u._decode, u._encodeObjectOrArray = function (t) {
        var e = function (t) {
          return t && t._toFullJSON && (t = t._toFullJSON([])), r.mapObject(t, function (t) {
            return u._encode(t, []);
          });
        };return r.isArray(t) ? t.map(function (t) {
          return e(t);
        }) : e(t);
      }, u._arrayEach = r.each, u._traverse = function (t, e, n) {
        if (t instanceof u.Object) {
          if (n = n || [], r.indexOf(n, t) >= 0) return;return n.push(t), u._traverse(t.attributes, e, n), e(t);
        }return t instanceof u.Relation || t instanceof u.File ? e(t) : r.isArray(t) ? (r.each(t, function (r, i) {
          var s = u._traverse(r, e, n);s && (t[i] = s);
        }), e(t)) : r.isObject(t) ? (u._each(t, function (r, i) {
          var s = u._traverse(r, e, n);s && (t[i] = s);
        }), e(t)) : e(t);
      }, u._objectEach = u._each = function (t, e) {
        r.isObject(t) ? r.each(r.keys(t), function (n) {
          e(t[n], n);
        }) : r.each(t, e);
      }, t.exports = u;
    }).call(e, n(8));
  }, function (t, e, n) {
    function r() {
      return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
    }function i(t) {
      var n = this.useColors;if (t[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + t[0] + (n ? "%c " : " ") + "+" + e.humanize(this.diff), n) {
        var r = "color: " + this.color;t.splice(1, 0, r, "color: inherit");var i = 0,
            s = 0;t[0].replace(/%[a-zA-Z%]/g, function (t) {
          "%%" !== t && (i++, "%c" === t && (s = i));
        }), t.splice(s, 0, r);
      }
    }function s() {
      return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }function o(t) {
      try {
        null == t ? e.storage.removeItem("debug") : e.storage.debug = t;
      } catch (t) {}
    }function a() {
      var t;try {
        t = e.storage.debug;
      } catch (t) {}return !t && "undefined" != typeof process && "env" in process && (t = undefined), t;
    }e = t.exports = n(45), e.log = s, e.formatArgs = i, e.save = o, e.load = a, e.useColors = r, e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function () {
      try {
        return window.localStorage;
      } catch (t) {}
    }(), e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], e.formatters.j = function (t) {
      try {
        return JSON.stringify(t);
      } catch (t) {
        return "[UnexpectedJSONParseError]: " + t.message;
      }
    }, e.enable(a());
  }, function (t, e, n) {
    function r() {}function i(t) {
      if (!_(t)) return t;var e = [];for (var n in t) s(e, n, t[n]);return e.join("&");
    }function s(t, e, n) {
      if (null != n) {
        if (Array.isArray(n)) n.forEach(function (n) {
          s(t, e, n);
        });else if (_(n)) for (var r in n) s(t, e + "[" + r + "]", n[r]);else t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n));
      } else null === n && t.push(encodeURIComponent(e));
    }function o(t) {
      for (var e, n, r = {}, i = t.split("&"), s = 0, o = i.length; s < o; ++s) e = i[s], n = e.indexOf("="), -1 == n ? r[decodeURIComponent(e)] = "" : r[decodeURIComponent(e.slice(0, n))] = decodeURIComponent(e.slice(n + 1));return r;
    }function a(t) {
      for (var e, n, r, i, s = t.split(/\r?\n/), o = {}, a = 0, u = s.length; a < u; ++a) n = s[a], -1 !== (e = n.indexOf(":")) && (r = n.slice(0, e).toLowerCase(), i = g(n.slice(e + 1)), o[r] = i);return o;
    }function u(t) {
      return (/[\/+]json($|[^-\w])/.test(t)
      );
    }function c(t) {
      this.req = t, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType) || void 0 === this.xhr.responseType ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText;var e = this.xhr.status;1223 === e && (e = 204), this._setStatusProperties(e), this.header = this.headers = a(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this._setHeaderProperties(this.header), null === this.text && t._responseType ? this.body = this.xhr.response : this.body = "HEAD" != this.req.method ? this._parseBody(this.text ? this.text : this.xhr.response) : null;
    }function l(t, e) {
      var n = this;this._query = this._query || [], this.method = t, this.url = e, this.header = {}, this._header = {}, this.on("end", function () {
        var t = null,
            e = null;try {
          e = new c(n);
        } catch (e) {
          return t = new Error("Parser is unable to parse the response"), t.parse = !0, t.original = e, n.xhr ? (t.rawResponse = void 0 === n.xhr.responseType ? n.xhr.responseText : n.xhr.response, t.status = n.xhr.status ? n.xhr.status : null, t.statusCode = t.status) : (t.rawResponse = null, t.status = null), n.callback(t);
        }n.emit("response", e);var r;try {
          n._isResponseOK(e) || (r = new Error(e.statusText || "Unsuccessful HTTP response"));
        } catch (t) {
          r = t;
        }r ? (r.original = t, r.response = e, r.status = e.status, n.callback(r, e)) : n.callback(null, e);
      });
    }function h(t, e, n) {
      var r = m("DELETE", t);return "function" == typeof e && (n = e, e = null), e && r.send(e), n && r.end(n), r;
    }var f;"undefined" != typeof window ? f = window : "undefined" != typeof self ? f = self : (console.warn("Using browser-only version of superagent in non-browser environment"), f = this);var d = n(43),
        p = n(53),
        _ = n(13),
        v = n(54),
        y = n(52),
        m = e = t.exports = function (t, n) {
      return "function" == typeof n ? new e.Request("GET", t).end(n) : 1 == arguments.length ? new e.Request("GET", t) : new e.Request(t, n);
    };e.Request = l, m.getXHR = function () {
      if (!(!f.XMLHttpRequest || f.location && "file:" == f.location.protocol && f.ActiveXObject)) return new XMLHttpRequest();try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (t) {}try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
      } catch (t) {}try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
      } catch (t) {}try {
        return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (t) {}throw Error("Browser-only version of superagent could not find XHR");
    };var g = "".trim ? function (t) {
      return t.trim();
    } : function (t) {
      return t.replace(/(^\s*|\s*$)/g, "");
    };m.serializeObject = i, m.parseString = o, m.types = { html: "text/html", json: "application/json", xml: "text/xml", urlencoded: "application/x-www-form-urlencoded", form: "application/x-www-form-urlencoded", "form-data": "application/x-www-form-urlencoded" }, m.serialize = { "application/x-www-form-urlencoded": i, "application/json": JSON.stringify }, m.parse = { "application/x-www-form-urlencoded": o, "application/json": JSON.parse }, v(c.prototype), c.prototype._parseBody = function (t) {
      var e = m.parse[this.type];return this.req._parser ? this.req._parser(this, t) : (!e && u(this.type) && (e = m.parse["application/json"]), e && t && (t.length || t instanceof Object) ? e(t) : null);
    }, c.prototype.toError = function () {
      var t = this.req,
          e = t.method,
          n = t.url,
          r = "cannot " + e + " " + n + " (" + this.status + ")",
          i = new Error(r);return i.status = this.status, i.method = e, i.url = n, i;
    }, m.Response = c, d(l.prototype), p(l.prototype), l.prototype.type = function (t) {
      return this.set("Content-Type", m.types[t] || t), this;
    }, l.prototype.accept = function (t) {
      return this.set("Accept", m.types[t] || t), this;
    }, l.prototype.auth = function (t, e, n) {
      1 === arguments.length && (e = ""), "object" == typeof e && null !== e && (n = e, e = ""), n || (n = { type: "function" == typeof btoa ? "basic" : "auto" });var r = function (t) {
        if ("function" == typeof btoa) return btoa(t);throw new Error("Cannot use basic auth, btoa is not a function");
      };return this._auth(t, e, n, r);
    }, l.prototype.query = function (t) {
      return "string" != typeof t && (t = i(t)), t && this._query.push(t), this;
    }, l.prototype.attach = function (t, e, n) {
      if (e) {
        if (this._data) throw Error("superagent can't mix .send() and .attach()");this._getFormData().append(t, e, n || e.name);
      }return this;
    }, l.prototype._getFormData = function () {
      return this._formData || (this._formData = new f.FormData()), this._formData;
    }, l.prototype.callback = function (t, e) {
      if (this._shouldRetry(t, e)) return this._retry();var n = this._callback;this.clearTimeout(), t && (this._maxRetries && (t.retries = this._retries - 1), this.emit("error", t)), n(t, e);
    }, l.prototype.crossDomainError = function () {
      var t = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");t.crossDomain = !0, t.status = this.status, t.method = this.method, t.url = this.url, this.callback(t);
    }, l.prototype.buffer = l.prototype.ca = l.prototype.agent = function () {
      return console.warn("This is not supported in browser version of superagent"), this;
    }, l.prototype.pipe = l.prototype.write = function () {
      throw Error("Streaming is not supported in browser version of superagent");
    }, l.prototype._isHost = function (t) {
      return t && "object" == typeof t && !Array.isArray(t) && "[object Object]" !== Object.prototype.toString.call(t);
    }, l.prototype.end = function (t) {
      return this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = t || r, this._finalizeQueryString(), this._end();
    }, l.prototype._end = function () {
      var t = this,
          e = this.xhr = m.getXHR(),
          n = this._formData || this._data;this._setTimeouts(), e.onreadystatechange = function () {
        var n = e.readyState;if (n >= 2 && t._responseTimeoutTimer && clearTimeout(t._responseTimeoutTimer), 4 == n) {
          var r;try {
            r = e.status;
          } catch (t) {
            r = 0;
          }if (!r) {
            if (t.timedout || t._aborted) return;return t.crossDomainError();
          }t.emit("end");
        }
      };var r = function (e, n) {
        n.total > 0 && (n.percent = n.loaded / n.total * 100), n.direction = e, t.emit("progress", n);
      };if (this.hasListeners("progress")) try {
        e.onprogress = r.bind(null, "download"), e.upload && (e.upload.onprogress = r.bind(null, "upload"));
      } catch (t) {}try {
        this.username && this.password ? e.open(this.method, this.url, !0, this.username, this.password) : e.open(this.method, this.url, !0);
      } catch (t) {
        return this.callback(t);
      }if (this._withCredentials && (e.withCredentials = !0), !this._formData && "GET" != this.method && "HEAD" != this.method && "string" != typeof n && !this._isHost(n)) {
        var i = this._header["content-type"],
            s = this._serializer || m.serialize[i ? i.split(";")[0] : ""];!s && u(i) && (s = m.serialize["application/json"]), s && (n = s(n));
      }for (var o in this.header) null != this.header[o] && this.header.hasOwnProperty(o) && e.setRequestHeader(o, this.header[o]);return this._responseType && (e.responseType = this._responseType), this.emit("request", this), e.send(void 0 !== n ? n : null), this;
    }, m.agent = function () {
      return new y();
    }, ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function (t) {
      y.prototype[t.toLowerCase()] = function (e, n) {
        var r = new m.Request(t, e);return this._setDefaults(r), n && r.end(n), r;
      };
    }), y.prototype.del = y.prototype.delete, m.get = function (t, e, n) {
      var r = m("GET", t);return "function" == typeof e && (n = e, e = null), e && r.query(e), n && r.end(n), r;
    }, m.head = function (t, e, n) {
      var r = m("HEAD", t);return "function" == typeof e && (n = e, e = null), e && r.query(e), n && r.end(n), r;
    }, m.options = function (t, e, n) {
      var r = m("OPTIONS", t);return "function" == typeof e && (n = e, e = null), e && r.send(e), n && r.end(n), r;
    }, m.del = h, m.delete = h, m.patch = function (t, e, n) {
      var r = m("PATCH", t);return "function" == typeof e && (n = e, e = null), e && r.send(e), n && r.end(n), r;
    }, m.post = function (t, e, n) {
      var r = m("POST", t);return "function" == typeof e && (n = e, e = null), e && r.send(e), n && r.end(n), r;
    }, m.put = function (t, e, n) {
      var r = m("PUT", t);return "function" == typeof e && (n = e, e = null), e && r.send(e), n && r.end(n), r;
    };
  }, function (t, e) {
    var n;n = function () {
      return this;
    }();try {
      n = n || Function("return this")() || (0, eval)("this");
    } catch (t) {
      "object" == typeof window && (n = window);
    }t.exports = n;
  }, function (t, e, n) {
    "use strict";
    var r = n(10),
        i = n(5),
        s = e.removeAsync = r.removeItemAsync.bind(r),
        o = function (t, e) {
      try {
        t = JSON.parse(t);
      } catch (t) {
        return null;
      }if (t) {
        return t.expiredAt && t.expiredAt < Date.now() ? s(e).then(function () {
          return null;
        }) : t.value;
      }return null;
    };e.getAsync = function (t) {
      return t = "AV/" + i.applicationId + "/" + t, r.getItemAsync(t).then(function (e) {
        return o(e, t);
      });
    }, e.setAsync = function (t, e, n) {
      var s = { value: e };return "number" == typeof n && (s.expiredAt = Date.now() + n), r.setItemAsync("AV/" + i.applicationId + "/" + t, JSON.stringify(s));
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(1),
        s = n(41),
        o = ["getItem", "setItem", "removeItem", "clear"];s.async ? r(o).each(function (t) {
      "function" != typeof s[t] && (s[t] = function () {
        var e = new Error("Synchronous API [" + t + "] is not available in this runtime.");throw e.code = "SYNC_API_NOT_AVAILABLE", e;
      });
    }) : r(o).each(function (t) {
      "function" == typeof s[t] && (s[t + "Async"] = function () {
        return i.resolve(s[t].apply(s, arguments));
      });
    }), t.exports = s;
  }, function (t, e, n) {
    "use strict";
    t.exports = "3.6.0";
  }, function (t, e) {
    var n = { utf8: { stringToBytes: function (t) {
          return n.bin.stringToBytes(unescape(encodeURIComponent(t)));
        }, bytesToString: function (t) {
          return decodeURIComponent(escape(n.bin.bytesToString(t)));
        } }, bin: { stringToBytes: function (t) {
          for (var e = [], n = 0; n < t.length; n++) e.push(255 & t.charCodeAt(n));return e;
        }, bytesToString: function (t) {
          for (var e = [], n = 0; n < t.length; n++) e.push(String.fromCharCode(t[n]));return e.join("");
        } } };t.exports = n;
  }, function (t, e, n) {
    "use strict";
    function r(t) {
      return null !== t && "object" == typeof t;
    }t.exports = r;
  }, function (t, e, n) {
    "use strict";
    var r = n(0);t.exports = function (t) {
      t.ACL = function (e) {
        var n = this;if (n.permissionsById = {}, r.isObject(e)) if (e instanceof t.User) n.setReadAccess(e, !0), n.setWriteAccess(e, !0);else {
          if (r.isFunction(e)) throw new Error("AV.ACL() called with a function.  Did you forget ()?");t._objectEach(e, function (e, i) {
            if (!r.isString(i)) throw new Error("Tried to create an ACL with an invalid userId.");n.permissionsById[i] = {}, t._objectEach(e, function (t, e) {
              if ("read" !== e && "write" !== e) throw new Error("Tried to create an ACL with an invalid permission type.");if (!r.isBoolean(t)) throw new Error("Tried to create an ACL with an invalid permission value.");n.permissionsById[i][e] = t;
            });
          });
        }
      }, t.ACL.prototype.toJSON = function () {
        return r.clone(this.permissionsById);
      }, t.ACL.prototype._setAccess = function (e, n, i) {
        if (n instanceof t.User ? n = n.id : n instanceof t.Role && (n = "role:" + n.getName()), !r.isString(n)) throw new Error("userId must be a string.");if (!r.isBoolean(i)) throw new Error("allowed must be either true or false.");var s = this.permissionsById[n];if (!s) {
          if (!i) return;s = {}, this.permissionsById[n] = s;
        }i ? this.permissionsById[n][e] = !0 : (delete s[e], r.isEmpty(s) && delete this.permissionsById[n]);
      }, t.ACL.prototype._getAccess = function (e, n) {
        n instanceof t.User ? n = n.id : n instanceof t.Role && (n = "role:" + n.getName());var r = this.permissionsById[n];return !!r && !!r[e];
      }, t.ACL.prototype.setReadAccess = function (t, e) {
        this._setAccess("read", t, e);
      }, t.ACL.prototype.getReadAccess = function (t) {
        return this._getAccess("read", t);
      }, t.ACL.prototype.setWriteAccess = function (t, e) {
        this._setAccess("write", t, e);
      }, t.ACL.prototype.getWriteAccess = function (t) {
        return this._getAccess("write", t);
      }, t.ACL.prototype.setPublicReadAccess = function (t) {
        this.setReadAccess("*", t);
      }, t.ACL.prototype.getPublicReadAccess = function () {
        return this.getReadAccess("*");
      }, t.ACL.prototype.setPublicWriteAccess = function (t) {
        this.setWriteAccess("*", t);
      }, t.ACL.prototype.getPublicWriteAccess = function () {
        return this.getWriteAccess("*");
      }, t.ACL.prototype.getRoleReadAccess = function (e) {
        if (e instanceof t.Role && (e = e.getName()), r.isString(e)) return this.getReadAccess("role:" + e);throw new Error("role must be a AV.Role or a String");
      }, t.ACL.prototype.getRoleWriteAccess = function (e) {
        if (e instanceof t.Role && (e = e.getName()), r.isString(e)) return this.getWriteAccess("role:" + e);throw new Error("role must be a AV.Role or a String");
      }, t.ACL.prototype.setRoleReadAccess = function (e, n) {
        if (e instanceof t.Role && (e = e.getName()), r.isString(e)) return void this.setReadAccess("role:" + e, n);throw new Error("role must be a AV.Role or a String");
      }, t.ACL.prototype.setRoleWriteAccess = function (e, n) {
        if (e instanceof t.Role && (e = e.getName()), r.isString(e)) return void this.setWriteAccess("role:" + e, n);throw new Error("role must be a AV.Role or a String");
      };
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(3),
        s = i.tap;t.exports = function (t) {
      t.Captcha = function (t, e) {
        this._options = t, this._authOptions = e, this.url = void 0, this.captchaToken = void 0, this.validateToken = void 0;
      }, t.Captcha.prototype.refresh = function () {
        var e = this;return t.Cloud._requestCaptcha(this._options, this._authOptions).then(function (t) {
          var n = t.captchaToken,
              i = t.url;return r.extend(e, { captchaToken: n, url: i }), i;
        });
      }, t.Captcha.prototype.verify = function (e) {
        var n = this;return t.Cloud.verifyCaptcha(e, this.captchaToken).then(s(function (t) {
          return n.validateToken = t;
        }));
      }, t.Captcha.prototype.bind = function (t, e) {
        var n = this,
            r = t.textInput,
            i = t.image,
            s = t.verifyButton,
            o = e.success,
            a = e.error;if ("string" == typeof r && !(r = document.getElementById(r))) throw new Error("textInput with id " + r + " not found");if ("string" == typeof i && !(i = document.getElementById(i))) throw new Error("image with id " + i + " not found");if ("string" == typeof s && !(s = document.getElementById(s))) throw new Error("verifyButton with id " + s + " not found");this.__refresh = function () {
          return n.refresh().then(function (t) {
            i.src = t, r && (r.value = "", r.focus());
          }).catch(function (t) {
            return console.warn("refresh captcha fail: " + t.message);
          });
        }, i && (this.__image = i, i.src = this.url, i.addEventListener("click", this.__refresh)), this.__verify = function () {
          var t = r.value;n.verify(t).catch(function (t) {
            throw n.__refresh(), t;
          }).then(o, a).catch(function (t) {
            return console.warn("verify captcha fail: " + t.message);
          });
        }, r && s && (this.__verifyButton = s, s.addEventListener("click", this.__verify));
      }, t.Captcha.prototype.unbind = function () {
        this.__image && this.__image.removeEventListener("click", this.__refresh), this.__verifyButton && this.__verifyButton.removeEventListener("click", this.__verify);
      }, t.Captcha.request = function (e, n) {
        var r = new t.Captcha(e, n);return r.refresh().then(function () {
          return r;
        });
      };
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(2),
        s = i._request,
        o = i.request,
        a = n(1);t.exports = function (t) {
      t.Cloud = t.Cloud || {}, r.extend(t.Cloud, { run: function (e, n, r) {
          return o({ service: "engine", method: "POST", path: "/functions/" + e, data: t._encode(n, null, !0), authOptions: r }).then(function (e) {
            return t._decode(e).result;
          });
        }, rpc: function (e, n, i) {
          return r.isArray(n) ? a.reject(new Error("Can't pass Array as the param of rpc function in JavaScript SDK.")) : o({ service: "engine", method: "POST", path: "/call/" + e, data: t._encodeObjectOrArray(n), authOptions: i }).then(function (e) {
            return t._decode(e).result;
          });
        }, getServerDate: function () {
          return s("date", null, null, "GET").then(function (e) {
            return t._decode(e);
          });
        }, requestSmsCode: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};if (r.isString(t) && (t = { mobilePhoneNumber: t }), !t.mobilePhoneNumber) throw new Error("Missing mobilePhoneNumber.");return e.validateToken && (t = r.extend({}, t, { validate_token: e.validateToken })), s("requestSmsCode", null, null, "POST", t, e);
        }, verifySmsCode: function (t, e) {
          if (!t) throw new Error("Missing sms code.");var n = {};return r.isString(e) && (n.mobilePhoneNumber = e), s("verifySmsCode", t, null, "POST", n);
        }, _requestCaptcha: function (t, e) {
          return s("requestCaptcha", null, null, "GET", t, e).then(function (t) {
            var e = t.captcha_url;return { captchaToken: t.captcha_token, url: e };
          });
        }, requestCaptcha: t.Captcha.request, verifyCaptcha: function (t, e) {
          return s("verifyCaptcha", null, null, "POST", { captcha_code: t, captcha_token: e }).then(function (t) {
            return t.validate_token;
          });
        } });
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(2),
        s = i._request,
        o = n(5);t.exports = o.Object.extend("_Conversation", { constructor: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};o.Object.prototype.constructor.call(this, null, null), this.set("name", t), void 0 !== e.isSystem && this.set("sys", !!e.isSystem), void 0 !== e.isTransient && this.set("tr", !!e.isTransient);
      }, getCreator: function () {
        return this.get("c");
      }, getLastMessageAt: function () {
        return this.get("lm");
      }, getMembers: function () {
        return this.get("m");
      }, addMember: function (t) {
        return this.add("m", t);
      }, getMutedMembers: function () {
        return this.get("mu");
      }, getName: function () {
        return this.get("name");
      }, isTransient: function () {
        return this.get("tr");
      }, isSystem: function () {
        return this.get("sys");
      }, send: function (t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};"function" == typeof e.toJSON && (e = e.toJSON()), "string" != typeof e && (e = JSON.stringify(e));var i = { from_peer: t, conv_id: this.id, transient: !1, message: e };return void 0 !== n.toClients && (i.to_peers = n.toClients), void 0 !== n.transient && (i.transient = !!n.transient), void 0 !== n.pushData && (i.push_data = n.pushData), s("rtm", "messages", null, "POST", i, r);
      }, broadcast: function (t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};"function" == typeof e.toJSON && (e = e.toJSON()), "string" != typeof e && (e = JSON.stringify(e));var o = { from_peer: t, conv_id: this.id, message: e };if (void 0 !== n.pushData && (o.push = n.pushData), void 0 !== n.validTill) {
          var a = n.validTill;r.isDate(a) && (a = a.getTime()), n.valid_till = a;
        }return s("rtm", "broadcast", null, "POST", o, i);
      } });
  }, function (t, e, n) {
    "use strict";
    var r = n(0);t.exports = function (t) {
      var e = /\s+/,
          n = Array.prototype.slice;t.Events = { on: function (t, n, r) {
          var i, s, o, a, u;if (!n) return this;for (t = t.split(e), i = this._callbacks || (this._callbacks = {}), s = t.shift(); s;) u = i[s], o = u ? u.tail : {}, o.next = a = {}, o.context = r, o.callback = n, i[s] = { tail: a, next: u ? u.next : o }, s = t.shift();return this;
        }, off: function (t, n, i) {
          var s, o, a, u, c, l;if (o = this._callbacks) {
            if (!(t || n || i)) return delete this._callbacks, this;for (t = t ? t.split(e) : r.keys(o), s = t.shift(); s;) if (a = o[s], delete o[s], a && (n || i)) {
              for (u = a.tail, a = a.next; a !== u;) c = a.callback, l = a.context, (n && c !== n || i && l !== i) && this.on(s, c, l), a = a.next;s = t.shift();
            }return this;
          }
        }, trigger: function (t) {
          var r, i, s, o, a, u, c;if (!(s = this._callbacks)) return this;for (u = s.all, t = t.split(e), c = n.call(arguments, 1), r = t.shift(); r;) {
            if (i = s[r]) for (o = i.tail; (i = i.next) !== o;) i.callback.apply(i.context || this, c);if (i = u) for (o = i.tail, a = [r].concat(c); (i = i.next) !== o;) i.callback.apply(i.context || this, a);r = t.shift();
          }return this;
        } }, t.Events.bind = t.Events.on, t.Events.unbind = t.Events.off;
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(38),
        s = n(39),
        o = n(40),
        a = n(4),
        u = n(2)._request,
        c = n(1),
        l = n(3),
        h = l.tap,
        f = l.transformFetchOptions,
        d = n(6)("leancloud:file"),
        p = n(42);t.exports = function (t) {
      var e = function () {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
      },
          n = function (t) {
        return r.isString(t) ? t.match(/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/)[4] : "";
      },
          l = function (t) {
        if (t < 26) return String.fromCharCode(65 + t);if (t < 52) return String.fromCharCode(t - 26 + 97);if (t < 62) return String.fromCharCode(t - 52 + 48);if (62 === t) return "+";if (63 === t) return "/";throw new Error("Tried to encode large digit " + t + " in base64.");
      },
          _ = function (t) {
        var e = [];return e.length = Math.ceil(t.length / 3), r.times(e.length, function (n) {
          var r = t[3 * n],
              i = t[3 * n + 1] || 0,
              s = t[3 * n + 2] || 0,
              o = 3 * n + 1 < t.length,
              a = 3 * n + 2 < t.length;e[n] = [l(r >> 2 & 63), l(r << 4 & 48 | i >> 4 & 15), o ? l(i << 2 & 60 | s >> 6 & 3) : "=", a ? l(63 & s) : "="].join("");
        }), e.join("");
      };t.File = function (e, i, s) {
        if (this.attributes = { name: e, url: "", metaData: {}, base64: "" }, r.isString(i)) throw new TypeError("Creating an AV.File from a String is not yet supported.");r.isArray(i) && (this.attributes.metaData.size = i.length, i = { base64: _(i) }), this._extName = "", this._data = i, this._uploadHeaders = {}, "undefined" != typeof Blob && i instanceof Blob && (i.size && (this.attributes.metaData.size = i.size), i.name && (this._extName = n(i.name)));var o = void 0;if (i && i.owner) o = i.owner;else if (!t._config.disableCurrentUser) try {
          o = t.User.current();
        } catch (t) {
          if ("SYNC_API_NOT_AVAILABLE" !== t.code) throw t;console.warn("Get current user failed. It seems this runtime use an async storage system, please create AV.File in the callback of AV.User.currentAsync().");
        }this.attributes.metaData.owner = o ? o.id : "unknown", this.set("mime_type", s);
      }, t.File.withURL = function (e, n, r, i) {
        if (!e || !n) throw new Error("Please provide file name and url");var s = new t.File(e, null, i);if (r) for (var o in r) s.attributes.metaData[o] || (s.attributes.metaData[o] = r[o]);return s.attributes.url = n, s.attributes.metaData.__source = "external", s;
      }, t.File.createWithoutData = function (e) {
        var n = new t.File();return n.id = e, n;
      }, r.extend(t.File.prototype, { className: "_File", _toFullJSON: function (e) {
          var n = this,
              i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
              s = r.clone(this.attributes);return t._objectEach(s, function (n, r) {
            s[r] = t._encode(n, e, void 0, i);
          }), t._objectEach(this._operations, function (t, e) {
            s[e] = t;
          }), r.has(this, "id") && (s.objectId = this.id), r(["createdAt", "updatedAt"]).each(function (t) {
            if (r.has(n, t)) {
              var e = n[t];s[t] = r.isDate(e) ? e.toJSON() : e;
            }
          }), i && (s.__type = "File"), s;
        }, toFullJSON: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];return this._toFullJSON(t);
        }, toJSON: function (t, e) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [this];return this._toFullJSON(n, !1);
        }, getACL: function () {
          return this._acl;
        }, setACL: function (e) {
          if (!(e instanceof t.ACL)) return new a(a.OTHER_CAUSE, "ACL must be a AV.ACL.");this._acl = e;
        }, name: function () {
          return this.get("name");
        }, url: function () {
          return this.get("url");
        }, get: function (t) {
          switch (t) {case "objectId":
              return this.id;case "url":case "name":case "mime_type":case "metaData":case "createdAt":case "updatedAt":
              return this.attributes[t];default:
              return this.attributes.metaData[t];}
        }, set: function () {
          for (var t = this, e = function (e, n) {
            switch (e) {case "name":case "url":case "mime_type":case "base64":case "metaData":
                t.attributes[e] = n;break;default:
                t.attributes.metaData[e] = n;}
          }, n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];switch (r.length) {case 1:
              for (var s in r[0]) e(s, r[0][s]);break;case 2:
              e(r[0], r[1]);}
        }, setUploadHeader: function (t, e) {
          return this._uploadHeaders[t] = e, this;
        }, metaData: function (t, e) {
          return t && e ? (this.attributes.metaData[t] = e, this) : t && !e ? this.attributes.metaData[t] : this.attributes.metaData;
        }, thumbnailURL: function (t, e, n, r, i) {
          var s = this.attributes.url;if (!s) throw new Error("Invalid url.");if (!t || !e || t <= 0 || e <= 0) throw new Error("Invalid width or height value.");if (n = n || 100, r = r || !0, n <= 0 || n > 100) throw new Error("Invalid quality value.");return i = i || "png", s + "?imageView/" + (r ? 2 : 1) + "/w/" + t + "/h/" + e + "/q/" + n + "/format/" + i;
        }, size: function () {
          return this.metaData().size;
        }, ownerId: function () {
          return this.metaData().owner;
        }, destroy: function (t) {
          return this.id ? u("files", null, this.id, "DELETE", null, t) : c.reject(new Error("The file id is not eixsts."));
        }, _fileToken: function (t) {
          var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "fileTokens",
              i = this.attributes.name,
              s = n(i);!s && this._extName && (i += this._extName, s = this._extName);var o = e() + e() + e() + e() + e() + s,
              a = { key: o, name: i, ACL: this._acl, mime_type: t, metaData: this.attributes.metaData };return this._qiniu_key = o, u(r, null, null, "POST", a);
        }, save: function (t) {
          var e = this;if (this.id) throw new Error("File already saved. If you want to manipulate a file, use AV.Query to get it.");if (!this._previousSave) if (this._data) {
            var n = this.get("mime_type");this._previousSave = this._fileToken(n).then(function (r) {
              return r.mime_type && (n = r.mime_type, e.set("mime_type", n)), e._token = r.token, c.resolve().then(function () {
                var t = e._data;if (t && t.base64) return p(t.base64, n);if (t && t.blob) return !t.blob.type && n && (t.blob.type = n), t.blob.name || (t.blob.name = e.get("name")), t.blob;if ("undefined" != typeof Blob && t instanceof Blob) return t;throw new TypeError("malformed file data");
              }).then(function (n) {
                switch (r.provider) {case "s3":
                    return o(r, n, e, t);case "qcloud":
                    return i(r, n, e, t);case "qiniu":default:
                    return s(r, n, e, t);}
              }).then(h(function () {
                return e._callback(!0);
              }), function (t) {
                throw e._callback(!1), t;
              });
            });
          } else if (this.attributes.url && "external" === this.attributes.metaData.__source) {
            var r = { name: this.attributes.name, ACL: this._acl, metaData: this.attributes.metaData, mime_type: this.mimeType, url: this.attributes.url };this._previousSave = u("files", this.attributes.name, null, "post", r).then(function (t) {
              return e.attributes.name = t.name, e.attributes.url = t.url, e.id = t.objectId, t.size && (e.attributes.metaData.size = t.size), e;
            });
          }return this._previousSave;
        }, _callback: function (t) {
          u("fileCallback", null, null, "post", { token: this._token, result: t }).catch(d), delete this._token, delete this._data;
        }, fetch: function (t, e) {
          return u("files", null, this.id, "GET", f(t), e).then(this._finishFetch.bind(this));
        }, _finishFetch: function (e) {
          var n = t.Object.prototype.parse(e);return n.attributes = { name: n.name, url: n.url, mime_type: n.mime_type, bucket: n.bucket }, n.attributes.metaData = n.metaData || {}, n.id = n.objectId, delete n.objectId, delete n.metaData, delete n.url, delete n.name, delete n.mime_type, delete n.bucket, r.extend(this, n), this;
        } });
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0);t.exports = function (t) {
      t.GeoPoint = function (e, n) {
        r.isArray(e) ? (t.GeoPoint._validate(e[0], e[1]), this.latitude = e[0], this.longitude = e[1]) : r.isObject(e) ? (t.GeoPoint._validate(e.latitude, e.longitude), this.latitude = e.latitude, this.longitude = e.longitude) : r.isNumber(e) && r.isNumber(n) ? (t.GeoPoint._validate(e, n), this.latitude = e, this.longitude = n) : (this.latitude = 0, this.longitude = 0);var i = this;this.__defineGetter__ && this.__defineSetter__ && (this._latitude = this.latitude, this._longitude = this.longitude, this.__defineGetter__("latitude", function () {
          return i._latitude;
        }), this.__defineGetter__("longitude", function () {
          return i._longitude;
        }), this.__defineSetter__("latitude", function (e) {
          t.GeoPoint._validate(e, i.longitude), i._latitude = e;
        }), this.__defineSetter__("longitude", function (e) {
          t.GeoPoint._validate(i.latitude, e), i._longitude = e;
        }));
      }, t.GeoPoint._validate = function (t, e) {
        if (t < -90) throw new Error("AV.GeoPoint latitude " + t + " < -90.0.");if (t > 90) throw new Error("AV.GeoPoint latitude " + t + " > 90.0.");if (e < -180) throw new Error("AV.GeoPoint longitude " + e + " < -180.0.");if (e > 180) throw new Error("AV.GeoPoint longitude " + e + " > 180.0.");
      }, t.GeoPoint.current = function () {
        return new t.Promise(function (e, n) {
          navigator.geolocation.getCurrentPosition(function (n) {
            e(new t.GeoPoint({ latitude: n.coords.latitude, longitude: n.coords.longitude }));
          }, n);
        });
      }, r.extend(t.GeoPoint.prototype, { toJSON: function () {
          return t.GeoPoint._validate(this.latitude, this.longitude), { __type: "GeoPoint", latitude: this.latitude, longitude: this.longitude };
        }, radiansTo: function (t) {
          var e = Math.PI / 180,
              n = this.latitude * e,
              r = this.longitude * e,
              i = t.latitude * e,
              s = t.longitude * e,
              o = n - i,
              a = r - s,
              u = Math.sin(o / 2),
              c = Math.sin(a / 2),
              l = u * u + Math.cos(n) * Math.cos(i) * c * c;return l = Math.min(1, l), 2 * Math.asin(Math.sqrt(l));
        }, kilometersTo: function (t) {
          return 6371 * this.radiansTo(t);
        }, milesTo: function (t) {
          return 3958.8 * this.radiansTo(t);
        } });
    };
  }, function (t, e, n) {
    "use strict";
    function r(t, e) {
      if ("us" === e) return h("https://us-api.leancloud.cn");var n = void 0;switch (t.slice(-9)) {case "-9Nh9j0Va":
          return h("https://e1-api.leancloud.cn");case "-MdYXbMMI":
          return h("https://us-api.leancloud.cn");default:
          return n = t.slice(0, 8).toLowerCase(), { push: "https://" + n + ".push.lncld.net", stats: "https://" + n + ".stats.lncld.net", engine: "https://" + n + ".engine.lncld.net", api: "https://" + n + ".api.lncld.net" };}
    }var i = n(5),
        s = n(34),
        o = n(3),
        a = o.isNullOrUndefined,
        u = n(0),
        c = u.extend,
        l = u.isObject,
        h = function (t) {
      return { push: t, stats: t, engine: t, api: t };
    },
        f = !1;i.init = function (t) {
      if (!l(t)) return i.init({ appId: t, appKey: arguments.length <= 1 ? void 0 : arguments[1], masterKey: arguments.length <= 2 ? void 0 : arguments[2], region: arguments.length <= 3 ? void 0 : arguments[3] });var e = t.appId,
          n = t.appKey,
          o = t.masterKey,
          a = (t.hookKey, t.region),
          u = void 0 === a ? "cn" : a,
          d = t.serverURLs,
          p = t.disableCurrentUser,
          _ = t.production,
          v = t.realtime;if (i.applicationId) throw new Error("SDK is already initialized.");if (!e) throw new TypeError("appId must be a string");if (!n) throw new TypeError("appKey must be a string");o && console.warn("MasterKey is not supposed to be used in browser."), i._config.applicationId = e, i._config.applicationKey = n, i._config.masterKey = o, void 0 !== _ && (i._config.production = _), void 0 !== p && (i._config.disableCurrentUser = p), i._appRouter = new s(i);var y = f || void 0 !== d || "cn" !== u;i._setServerURLs(c({}, r(e, u), i._config.serverURLs, "string" == typeof d ? h(d) : d), y), v ? i._config.realtime = v : i._sharedConfig.liveQueryRealtime && (i._config.realtime = new i._sharedConfig.liveQueryRealtime({ appId: e, appKey: n, region: u }));
    }, i.setProduction = function (t) {
      a(t) ? i._config.production = null : i._config.production = t ? 1 : 0;
    }, i._setServerURLs = function (t) {
      var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];"string" != typeof t ? c(i._config.serverURLs, t) : i._config.serverURLs = h(t), e && (i._appRouter ? i._appRouter.disable() : f = !0);
    }, i.setServerURLs = function (t) {
      return i._setServerURLs(t);
    }, i.keepErrorRawMessage = function (t) {
      i._sharedConfig.keepErrorRawMessage = t;
    }, i.setRequestTimeout = function (t) {
      i._config.requestTimeout = t;
    }, i.initialize = i.init, ["applicationId", "applicationKey", "masterKey", "hookKey"].forEach(function (t) {
      return Object.defineProperty(i, t, { get: function () {
          return i._config[t];
        }, set: function (e) {
          i._config[t] = e;
        } });
    });
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(4),
        s = n(2),
        o = s.request;t.exports = function (t) {
      t.Insight = t.Insight || {}, r.extend(t.Insight, { startJob: function (e, n) {
          if (!e || !e.sql) throw new Error("Please provide the sql to run the job.");var r = { jobConfig: e, appId: t.applicationId };return o({ path: "/bigquery/jobs", method: "POST", data: t._encode(r, null, !0), authOptions: n, signKey: !1 }).then(function (e) {
            return t._decode(e).id;
          });
        }, on: function (t, e) {} }), t.Insight.JobQuery = function (t, e) {
        if (!t) throw new Error("Please provide the job id.");this.id = t, this.className = e, this._skip = 0, this._limit = 100;
      }, r.extend(t.Insight.JobQuery.prototype, { skip: function (t) {
          return this._skip = t, this;
        }, limit: function (t) {
          return this._limit = t, this;
        }, find: function (e) {
          var n = { skip: this._skip, limit: this._limit };return o({ path: "/bigquery/jobs/" + this.id, method: "GET", query: n, authOptions: e, signKey: !1 }).then(function (e) {
            return e.error ? t.Promise.reject(new i(e.code, e.error)) : t.Promise.resolve(e);
          });
        } });
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(47),
        s = n(1),
        o = n(3),
        a = o.inherits,
        u = n(2),
        c = u.request;t.exports = function (t) {
      t.LiveQuery = a(i, { constructor: function (t, e) {
          i.apply(this), this.id = t, this._client = e, this._client.register(this), e.on("message", this._dispatch.bind(this));
        }, _dispatch: function (e) {
          var n = this;e.forEach(function (e) {
            var i = e.op,
                s = e.object,
                o = e.query_id,
                a = e.updatedKeys;if (o === n.id) {
              var u = t.parseJSON(r.extend({ __type: "_File" === s.className ? "File" : "Object" }, s));a ? n.emit(i, u, a) : n.emit(i, u);
            }
          });
        }, unsubscribe: function () {
          return this._client.deregister(this), c({ method: "POST", path: "/LiveQuery/unsubscribe", data: { id: this._client.id, query_id: this.id } });
        } }, { init: function (e) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = n.subscriptionId,
              i = void 0 === r ? t._getSubscriptionId() : r;if (!t._config.realtime) throw new Error("LiveQuery not supported. Please use the LiveQuery bundle. https://url.leanapp.cn/enable-live-query");if (!(e instanceof t.Query)) throw new TypeError("LiveQuery must be inited with a Query");var o = e.toJSON(),
              a = o.where,
              u = o.keys,
              l = o.returnACL;return s.resolve(i).then(function (n) {
            return c({ method: "POST", path: "/LiveQuery/subscribe", data: { query: { where: a, keys: u, returnACL: l, className: e.className }, id: n } }).then(function (e) {
              var r = e.query_id;return t._config.realtime.createLiveQueryClient(n).then(function (e) {
                return new t.LiveQuery(r, e);
              });
            });
          });
        } });
    };
  }, function (t, e, n) {
    "use strict";
    function r(t, e) {
      return t && t[e] ? s.isFunction(t[e]) ? t[e]() : t[e] : null;
    }var i = function () {
      function t(t, e) {
        var n = [],
            r = !0,
            i = !1,
            s = void 0;try {
          for (var o, a = t[Symbol.iterator](); !(r = (o = a.next()).done) && (n.push(o.value), !e || n.length !== e); r = !0);
        } catch (t) {
          i = !0, s = t;
        } finally {
          try {
            !r && a.return && a.return();
          } finally {
            if (i) throw s;
          }
        }return n;
      }return function (e, n) {
        if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return t(e, n);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        s = n(0),
        o = n(4),
        a = n(2),
        u = a._request,
        c = n(3),
        l = c.isNullOrUndefined,
        h = c.ensureArray,
        f = c.transformFetchOptions,
        d = c.setValue,
        p = c.findValue,
        _ = ["objectId", "createdAt", "updatedAt"],
        v = function (t) {
      if (-1 !== _.indexOf(t)) throw new Error("key[" + t + "] is reserved");
    },
        y = function (t) {
      var e = s.find(t, function (t) {
        return t instanceof Error;
      });if (!e) return t;var n = new o(e.code, e.message);throw n.results = t, n;
    };t.exports = function (t) {
      t.Object = function (e, n) {
        if (s.isString(e)) return t.Object._create.apply(this, arguments);e = e || {}, n && n.parse && (e = this.parse(e), e = this._mergeMagicFields(e));var i = r(this, "defaults");i && (e = s.extend({}, i, e)), n && n.collection && (this.collection = n.collection), this._serverData = {}, this._opSetQueue = [{}], this._flags = {}, this.attributes = {}, this._hashedJSON = {}, this._escapedAttributes = {}, this.cid = s.uniqueId("c"), this.changed = {}, this._silent = {}, this._pending = {}, this.set(e, { silent: !0 }), this.changed = {}, this._silent = {}, this._pending = {}, this._hasData = !0, this._previousAttributes = s.clone(this.attributes), this.initialize.apply(this, arguments);
      }, t.Object.saveAll = function (e, n) {
        return t.Object._deepSaveAsync(e, null, n);
      }, t.Object.fetchAll = function (e, n) {
        return t.Promise.resolve().then(function () {
          return u("batch", null, null, "POST", { requests: s.map(e, function (t) {
              if (!t.className) throw new Error("object must have className to fetch");if (!t.id) throw new Error("object must have id to fetch");if (t.dirty()) throw new Error("object is modified but not saved");return { method: "GET", path: "/1.1/classes/" + t.className + "/" + t.id };
            }) }, n);
        }).then(function (t) {
          var n = s.map(e, function (e, n) {
            return t[n].success ? (e._finishFetch(e.parse(t[n].success)), e) : null === t[n].success ? new o(o.OBJECT_NOT_FOUND, "Object not found.") : new o(t[n].error.code, t[n].error.error);
          });return y(n);
        });
      }, s.extend(t.Object.prototype, t.Events, { _fetchWhenSave: !1, initialize: function () {}, fetchWhenSave: function (t) {
          if (console.warn("AV.Object#fetchWhenSave is deprecated, use AV.Object#save with options.fetchWhenSave instead."), !s.isBoolean(t)) throw new Error("Expect boolean value for fetchWhenSave");this._fetchWhenSave = t;
        }, getObjectId: function () {
          return this.id;
        }, getCreatedAt: function () {
          return this.createdAt || this.get("createdAt");
        }, getUpdatedAt: function () {
          return this.updatedAt || this.get("updatedAt");
        }, toJSON: function (t, e) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];return this._toFullJSON(n, !1);
        }, toFullJSON: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];return this._toFullJSON(t);
        }, _toFullJSON: function (e) {
          var n = this,
              r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
              i = s.clone(this.attributes);if (s.isArray(e)) var o = e.concat(this);return t._objectEach(i, function (e, n) {
            i[n] = t._encode(e, o, void 0, r);
          }), t._objectEach(this._operations, function (t, e) {
            i[e] = t;
          }), s.has(this, "id") && (i.objectId = this.id), s(["createdAt", "updatedAt"]).each(function (t) {
            if (s.has(n, t)) {
              var e = n[t];i[t] = s.isDate(e) ? e.toJSON() : e;
            }
          }), r && (i.__type = "Object", s.isArray(e) && e.length && (i.__type = "Pointer"), i.className = this.className), i;
        }, _refreshCache: function () {
          var e = this;e._refreshingCache || (e._refreshingCache = !0, t._objectEach(this.attributes, function (n, r) {
            n instanceof t.Object ? n._refreshCache() : s.isObject(n) && e._resetCacheForKey(r) && e.set(r, new t.Op.Set(n), { silent: !0 });
          }), delete e._refreshingCache);
        }, dirty: function (t) {
          return this._refreshCache(), this._dirty();
        }, _dirty: function (t) {
          var e = s.last(this._opSetQueue);return t ? !!e[t] : !this.id || s.keys(e).length > 0;
        }, _toPointer: function () {
          return { __type: "Pointer", className: this.className, objectId: this.id };
        }, get: function (t) {
          switch (t) {case "objectId":
              return this.id;case "createdAt":case "updatedAt":
              return this[t];default:
              return this.attributes[t];}
        }, relation: function (e) {
          var n = this.get(e);if (n) {
            if (!(n instanceof t.Relation)) throw new Error("Called relation() on non-relation field " + e);return n._ensureParentAndKey(this, e), n;
          }return new t.Relation(this, e);
        }, escape: function (t) {
          var e = this._escapedAttributes[t];if (e) return e;var n,
              r = this.attributes[t];return n = l(r) ? "" : s.escape(r.toString()), this._escapedAttributes[t] = n, n;
        }, has: function (t) {
          return !l(this.attributes[t]);
        }, _mergeMagicFields: function (e) {
          var n = this,
              r = ["objectId", "createdAt", "updatedAt"];return t._arrayEach(r, function (r) {
            e[r] && ("objectId" === r ? n.id = e[r] : "createdAt" !== r && "updatedAt" !== r || s.isDate(e[r]) ? n[r] = e[r] : n[r] = t._parseDate(e[r]), delete e[r]);
          }), e;
        }, _startSave: function () {
          this._opSetQueue.push({});
        }, _cancelSave: function () {
          var e = s.first(this._opSetQueue);this._opSetQueue = s.rest(this._opSetQueue);var n = s.first(this._opSetQueue);t._objectEach(e, function (t, r) {
            var i = e[r],
                s = n[r];i && s ? n[r] = s._mergeWithPrevious(i) : i && (n[r] = i);
          }), this._saving = this._saving - 1;
        }, _finishSave: function (e) {
          var n = {};t._traverse(this.attributes, function (e) {
            e instanceof t.Object && e.id && e._hasData && (n[e.id] = e);
          });var r = s.first(this._opSetQueue);this._opSetQueue = s.rest(this._opSetQueue), this._applyOpSet(r, this._serverData), this._mergeMagicFields(e);var i = this;t._objectEach(e, function (e, r) {
            i._serverData[r] = t._decode(e, r);var s = t._traverse(i._serverData[r], function (e) {
              if (e instanceof t.Object && n[e.id]) return n[e.id];
            });s && (i._serverData[r] = s);
          }), this._rebuildAllEstimatedData(), this._saving = this._saving - 1;
        }, _finishFetch: function (e, n) {
          this._opSetQueue = [{}], this._mergeMagicFields(e);var r = this;t._objectEach(e, function (e, n) {
            r._serverData[n] = t._decode(e, n);
          }), this._rebuildAllEstimatedData(), this._refreshCache(), this._opSetQueue = [{}], this._hasData = n;
        }, _applyOpSet: function (e, n) {
          var r = this;t._objectEach(e, function (e, s) {
            var o = p(n, s),
                a = i(o, 3),
                u = a[0],
                c = a[1],
                l = a[2];d(n, s, e._estimate(u, r, s)), c && c[l] === t.Op._UNSET && delete c[l];
          });
        }, _resetCacheForKey: function (e) {
          var n = this.attributes[e];if (s.isObject(n) && !(n instanceof t.Object) && !(n instanceof t.File)) {
            n = n.toJSON ? n.toJSON() : n;var r = JSON.stringify(n);if (this._hashedJSON[e] !== r) {
              var i = !!this._hashedJSON[e];return this._hashedJSON[e] = r, i;
            }
          }return !1;
        }, _rebuildEstimatedDataForKey: function (e) {
          var n = this;delete this.attributes[e], this._serverData[e] && (this.attributes[e] = this._serverData[e]), t._arrayEach(this._opSetQueue, function (r) {
            var s = r[e];if (s) {
              var o = p(n.attributes, e),
                  a = i(o, 3),
                  u = a[0],
                  c = a[1],
                  l = a[2];d(n.attributes, e, s._estimate(u, n, e)), c && c[l] === t.Op._UNSET ? delete c[l] : n._resetCacheForKey(e);
            }
          });
        }, _rebuildAllEstimatedData: function () {
          var e = this,
              n = s.clone(this.attributes);this.attributes = s.clone(this._serverData), t._arrayEach(this._opSetQueue, function (n) {
            e._applyOpSet(n, e.attributes), t._objectEach(n, function (t, n) {
              e._resetCacheForKey(n);
            });
          }), t._objectEach(n, function (t, n) {
            e.attributes[n] !== t && e.trigger("change:" + n, e, e.attributes[n], {});
          }), t._objectEach(this.attributes, function (t, r) {
            s.has(n, r) || e.trigger("change:" + r, e, t, {});
          });
        }, set: function (e, n, r) {
          var i;if (s.isObject(e) || l(e) ? (i = s.mapObject(e, function (e, n) {
            return v(n), t._decode(e, n);
          }), r = n) : (i = {}, v(e), i[e] = t._decode(n, e)), r = r || {}, !i) return this;i instanceof t.Object && (i = i.attributes), r.unset && t._objectEach(i, function (e, n) {
            i[n] = new t.Op.Unset();
          });var o = s.clone(i),
              a = this;t._objectEach(o, function (e, n) {
            e instanceof t.Op && (o[n] = e._estimate(a.attributes[n], a, n), o[n] === t.Op._UNSET && delete o[n]);
          }), this._validate(i, r), r.changes = {};var u = this._escapedAttributes;this._previousAttributes;return t._arrayEach(s.keys(i), function (e) {
            var n = i[e];n instanceof t.Relation && (n.parent = a), n instanceof t.Op || (n = new t.Op.Set(n));var o = !0;n instanceof t.Op.Set && s.isEqual(a.attributes[e], n.value) && (o = !1), o && (delete u[e], r.silent ? a._silent[e] = !0 : r.changes[e] = !0);var c = s.last(a._opSetQueue);c[e] = n._mergeWithPrevious(c[e]), a._rebuildEstimatedDataForKey(e), o ? (a.changed[e] = a.attributes[e], r.silent || (a._pending[e] = !0)) : (delete a.changed[e], delete a._pending[e]);
          }), r.silent || this.change(r), this;
        }, unset: function (t, e) {
          return e = e || {}, e.unset = !0, this.set(t, null, e);
        }, increment: function (e, n) {
          return (s.isUndefined(n) || s.isNull(n)) && (n = 1), this.set(e, new t.Op.Increment(n));
        }, add: function (e, n) {
          return this.set(e, new t.Op.Add(h(n)));
        }, addUnique: function (e, n) {
          return this.set(e, new t.Op.AddUnique(h(n)));
        }, remove: function (e, n) {
          return this.set(e, new t.Op.Remove(h(n)));
        }, bitAnd: function (e, n) {
          return this.set(e, new t.Op.BitAnd(n));
        }, bitOr: function (e, n) {
          return this.set(e, new t.Op.BitOr(n));
        }, bitXor: function (e, n) {
          return this.set(e, new t.Op.BitXor(n));
        }, op: function (t) {
          return s.last(this._opSetQueue)[t];
        }, clear: function (t) {
          t = t || {}, t.unset = !0;var e = s.extend(this.attributes, this._operations);return this.set(e, t);
        }, _getSaveJSON: function () {
          var e = s.clone(s.first(this._opSetQueue));return t._objectEach(e, function (t, n) {
            e[n] = t.toJSON();
          }), e;
        }, _canBeSerialized: function () {
          return t.Object._canBeSerializedAsValue(this.attributes);
        }, fetch: function (t, e) {
          var n = this;return u("classes", this.className, this.id, "GET", f(t), e).then(function (t) {
            return n._finishFetch(n.parse(t), !0), n;
          });
        }, save: function (e, n, r) {
          var i, o, a;s.isObject(e) || l(e) ? (i = e, a = n) : (i = {}, i[e] = n, a = r), a = s.clone(a) || {}, a.wait && (o = s.clone(this.attributes));var c = s.clone(a) || {};c.wait && (c.silent = !0), i && this.set(i, c);var h = this,
              f = [],
              d = [];return t.Object._findUnsavedChildren(h, f, d), f.length + d.length > 1 ? t.Object._deepSaveAsync(this, h, a) : (this._startSave(), this._saving = (this._saving || 0) + 1, this._allPreviousSaves = this._allPreviousSaves || t.Promise.resolve(), this._allPreviousSaves = this._allPreviousSaves.catch(function (t) {}).then(function () {
            var t = h.id ? "PUT" : "POST",
                e = h._getSaveJSON(),
                n = {};if ((h._fetchWhenSave || a.fetchWhenSave) && (n.new = "true"), a.query) {
              var r;if ("function" == typeof a.query.toJSON && (r = a.query.toJSON()) && (n.where = r.where), !n.where) {
                throw new Error("options.query is not an AV.Query");
              }
            }s.extend(e, h._flags);var l = "classes",
                f = h.className;"_User" !== h.className || h.id || (l = "users", f = null);var d = a._makeRequest || u,
                p = d(l, f, h.id, t, e, a, n);return p = p.then(function (t) {
              var e = h.parse(t);return a.wait && (e = s.extend(i || {}, e)), h._finishSave(e), a.wait && h.set(o, c), h;
            }, function (t) {
              throw h._cancelSave(), t;
            });
          }), this._allPreviousSaves);
        }, destroy: function (t) {
          t = t || {};var e = this,
              n = function () {
            e.trigger("destroy", e, e.collection, t);
          };return this.id ? (t.wait || n(), u("classes", this.className, this.id, "DELETE", this._flags, t).then(function () {
            return t.wait && n(), e;
          })) : n();
        }, parse: function (e) {
          var n = s.clone(e);return s(["createdAt", "updatedAt"]).each(function (e) {
            n[e] && (n[e] = t._parseDate(n[e]));
          }), n.createdAt && !n.updatedAt && (n.updatedAt = n.createdAt), n;
        }, clone: function () {
          return new this.constructor(this.attributes);
        }, isNew: function () {
          return !this.id;
        }, change: function (e) {
          e = e || {};var n = this._changing;this._changing = !0;var r = this;t._objectEach(this._silent, function (t) {
            r._pending[t] = !0;
          });var i = s.extend({}, e.changes, this._silent);if (this._silent = {}, t._objectEach(i, function (t, n) {
            r.trigger("change:" + n, r, r.get(n), e);
          }), n) return this;for (var o = function (t, e) {
            r._pending[e] || r._silent[e] || delete r.changed[e];
          }; !s.isEmpty(this._pending);) this._pending = {}, this.trigger("change", this, e), t._objectEach(this.changed, o), r._previousAttributes = s.clone(this.attributes);return this._changing = !1, this;
        }, hasChanged: function (t) {
          return arguments.length ? this.changed && s.has(this.changed, t) : !s.isEmpty(this.changed);
        }, changedAttributes: function (e) {
          if (!e) return !!this.hasChanged() && s.clone(this.changed);var n = {},
              r = this._previousAttributes;return t._objectEach(e, function (t, e) {
            s.isEqual(r[e], t) || (n[e] = t);
          }), n;
        }, previous: function (t) {
          return arguments.length && this._previousAttributes ? this._previousAttributes[t] : null;
        }, previousAttributes: function () {
          return s.clone(this._previousAttributes);
        }, isValid: function () {
          try {
            this.validate(this.attributes);
          } catch (t) {
            return !1;
          }return !0;
        }, validate: function (e) {
          if (s.has(e, "ACL") && !(e.ACL instanceof t.ACL)) throw new o(o.OTHER_CAUSE, "ACL must be a AV.ACL.");
        }, _validate: function (t, e) {
          !e.silent && this.validate && (t = s.extend({}, this.attributes, t), this.validate(t));
        }, getACL: function () {
          return this.get("ACL");
        }, setACL: function (t, e) {
          return this.set("ACL", t, e);
        }, disableBeforeHook: function () {
          this.ignoreHook("beforeSave"), this.ignoreHook("beforeUpdate"), this.ignoreHook("beforeDelete");
        }, disableAfterHook: function () {
          this.ignoreHook("afterSave"), this.ignoreHook("afterUpdate"), this.ignoreHook("afterDelete");
        }, ignoreHook: function (e) {
          s.contains(["beforeSave", "afterSave", "beforeUpdate", "afterUpdate", "beforeDelete", "afterDelete"], e) || console.trace("Unsupported hookName: " + e), t.hookKey || console.trace("ignoreHook required hookKey"), this._flags.__ignore_hooks || (this._flags.__ignore_hooks = []), this._flags.__ignore_hooks.push(e);
        } }), t.Object.createWithoutData = function (e, n, r) {
        var i = new t.Object(e);return i.id = n, i._hasData = r, i;
      }, t.Object.destroyAll = function (e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};if (!e || 0 === e.length) return t.Promise.resolve();var r = s.groupBy(e, function (t) {
          return JSON.stringify({ className: t.className, flags: t._flags });
        }),
            i = { requests: s.map(r, function (t) {
            var e = s.map(t, "id").join(",");return { method: "DELETE", path: "/1.1/classes/" + t[0].className + "/" + e, body: t[0]._flags };
          }) };return u("batch", null, null, "POST", i, n).then(function (t) {
          var e = s.find(t, function (t) {
            return !t.success;
          });if (e) throw new o(e.error.code, e.error.error);
        });
      }, t.Object._getSubclass = function (e) {
        if (!s.isString(e)) throw new Error("AV.Object._getSubclass requires a string argument.");var n = t.Object._classMap[e];return n || (n = t.Object.extend(e), t.Object._classMap[e] = n), n;
      }, t.Object._create = function (e, n, r) {
        return new (t.Object._getSubclass(e))(n, r);
      }, t.Object._classMap = {}, t.Object._extend = t._extend, t.Object.new = function (e, n) {
        return new t.Object(e, n);
      }, t.Object.extend = function (e, n, r) {
        if (!s.isString(e)) {
          if (e && s.has(e, "className")) return t.Object.extend(e.className, e, n);throw new Error("AV.Object.extend's first argument should be the className.");
        }"User" === e && (e = "_User");var i = null;if (s.has(t.Object._classMap, e)) {
          var o = t.Object._classMap[e];if (!n && !r) return o;i = o._extend(n, r);
        } else n = n || {}, n._className = e, i = this._extend(n, r);return i.extend = function (n) {
          if (s.isString(n) || n && s.has(n, "className")) return t.Object.extend.apply(i, arguments);var r = [e].concat(s.toArray(arguments));return t.Object.extend.apply(i, r);
        }, Object.defineProperty(i, "query", Object.getOwnPropertyDescriptor(t.Object, "query")), i.new = function (t, e) {
          return new i(t, e);
        }, t.Object._classMap[e] = i, i;
      }, Object.defineProperty(t.Object.prototype, "className", { get: function () {
          var t = this._className || this.constructor._LCClassName || this.constructor.name;return "User" === t ? "_User" : t;
        } }), t.Object.register = function (e, n) {
        if (!(e.prototype instanceof t.Object)) throw new Error("registered class is not a subclass of AV.Object");var r = n || e.name;if (!r.length) throw new Error("registered class must be named");n && (e._LCClassName = n), t.Object._classMap[r] = e;
      }, Object.defineProperty(t.Object, "query", { get: function () {
          return new t.Query(this.prototype.className);
        } }), t.Object._findUnsavedChildren = function (e, n, r) {
        t._traverse(e, function (e) {
          return e instanceof t.Object ? void (e._dirty() && n.push(e)) : e instanceof t.File ? void (e.url() || e.id || r.push(e)) : void 0;
        });
      }, t.Object._canBeSerializedAsValue = function (e) {
        var n = !0;return e instanceof t.Object || e instanceof t.File ? n = !!e.id : s.isArray(e) ? t._arrayEach(e, function (e) {
          t.Object._canBeSerializedAsValue(e) || (n = !1);
        }) : s.isObject(e) && t._objectEach(e, function (e) {
          t.Object._canBeSerializedAsValue(e) || (n = !1);
        }), n;
      }, t.Object._deepSaveAsync = function (e, n, r) {
        var i = [],
            a = [];t.Object._findUnsavedChildren(e, i, a);var c = t.Promise.resolve();s.each(a, function (t) {
          c = c.then(function () {
            return t.save();
          });
        });var l = s.uniq(i),
            h = s.uniq(l);return c.then(function () {
          return t.Promise._continueWhile(function () {
            return h.length > 0;
          }, function () {
            var e = [],
                n = [];if (t._arrayEach(h, function (t) {
              if (e.length > 20) return void n.push(t);t._canBeSerialized() ? e.push(t) : n.push(t);
            }), h = n, 0 === e.length) return t.Promise.reject(new o(o.OTHER_CAUSE, "Tried to save a batch with a cycle."));var i = t.Promise.resolve(s.map(e, function (e) {
              return e._allPreviousSaves || t.Promise.resolve();
            })),
                a = i.then(function () {
              return u("batch", null, null, "POST", { requests: s.map(e, function (t) {
                  var e = t.id ? "PUT" : "POST",
                      n = t._getSaveJSON();s.extend(n, t._flags);var r = t.className,
                      i = "/classes/" + r;"_User" !== t.className || t.id || (i = "/users");var i = "/1.1" + i;return t.id && (i = i + "/" + t.id), t._startSave(), { method: e, path: i, body: n };
                }) }, r).then(function (t) {
                var n = s.map(e, function (e, n) {
                  return t[n].success ? (e._finishSave(e.parse(t[n].success)), e) : (e._cancelSave(), new o(t[n].error.code, t[n].error.error));
                });return y(n);
              });
            });return t._arrayEach(e, function (t) {
              t._allPreviousSaves = a;
            }), a;
          });
        }).then(function () {
          return e;
        });
      };
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0);t.exports = function (t) {
      t.Op = function () {
        this._initialize.apply(this, arguments);
      }, r.extend(t.Op.prototype, { _initialize: function () {} }), r.extend(t.Op, { _extend: t._extend, _opDecoderMap: {}, _registerDecoder: function (e, n) {
          t.Op._opDecoderMap[e] = n;
        }, _decode: function (e) {
          var n = t.Op._opDecoderMap[e.__op];return n ? n(e) : void 0;
        } }), t.Op._registerDecoder("Batch", function (e) {
        var n = null;return t._arrayEach(e.ops, function (e) {
          e = t.Op._decode(e), n = e._mergeWithPrevious(n);
        }), n;
      }), t.Op.Set = t.Op._extend({ _initialize: function (t) {
          this._value = t;
        }, value: function () {
          return this._value;
        }, toJSON: function () {
          return t._encode(this.value());
        }, _mergeWithPrevious: function (t) {
          return this;
        }, _estimate: function (t) {
          return this.value();
        } }), t.Op._UNSET = {}, t.Op.Unset = t.Op._extend({ toJSON: function () {
          return { __op: "Delete" };
        }, _mergeWithPrevious: function (t) {
          return this;
        }, _estimate: function (e) {
          return t.Op._UNSET;
        } }), t.Op._registerDecoder("Delete", function (e) {
        return new t.Op.Unset();
      }), t.Op.Increment = t.Op._extend({ _initialize: function (t) {
          this._amount = t;
        }, amount: function () {
          return this._amount;
        }, toJSON: function () {
          return { __op: "Increment", amount: this._amount };
        }, _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(this.amount());if (e instanceof t.Op.Set) return new t.Op.Set(e.value() + this.amount());if (e instanceof t.Op.Increment) return new t.Op.Increment(this.amount() + e.amount());throw new Error("Op is invalid after previous op.");
          }return this;
        }, _estimate: function (t) {
          return t ? t + this.amount() : this.amount();
        } }), t.Op._registerDecoder("Increment", function (e) {
        return new t.Op.Increment(e.amount);
      }), t.Op.BitAnd = t.Op._extend({ _initialize: function (t) {
          this._value = t;
        }, value: function () {
          return this._value;
        }, toJSON: function () {
          return { __op: "BitAnd", value: this.value() };
        }, _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(0);if (e instanceof t.Op.Set) return new t.Op.Set(e.value() & this.value());throw new Error("Op is invalid after previous op.");
          }return this;
        }, _estimate: function (t) {
          return t & this.value();
        } }), t.Op._registerDecoder("BitAnd", function (e) {
        return new t.Op.BitAnd(e.value);
      }), t.Op.BitOr = t.Op._extend({ _initialize: function (t) {
          this._value = t;
        }, value: function () {
          return this._value;
        }, toJSON: function () {
          return { __op: "BitOr", value: this.value() };
        }, _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(this.value());if (e instanceof t.Op.Set) return new t.Op.Set(e.value() | this.value());throw new Error("Op is invalid after previous op.");
          }return this;
        }, _estimate: function (t) {
          return t | this.value();
        } }), t.Op._registerDecoder("BitOr", function (e) {
        return new t.Op.BitOr(e.value);
      }), t.Op.BitXor = t.Op._extend({ _initialize: function (t) {
          this._value = t;
        }, value: function () {
          return this._value;
        }, toJSON: function () {
          return { __op: "BitXor", value: this.value() };
        }, _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(this.value());if (e instanceof t.Op.Set) return new t.Op.Set(e.value() ^ this.value());throw new Error("Op is invalid after previous op.");
          }return this;
        }, _estimate: function (t) {
          return t ^ this.value();
        } }), t.Op._registerDecoder("BitXor", function (e) {
        return new t.Op.BitXor(e.value);
      }), t.Op.Add = t.Op._extend({ _initialize: function (t) {
          this._objects = t;
        }, objects: function () {
          return this._objects;
        }, toJSON: function () {
          return { __op: "Add", objects: t._encode(this.objects()) };
        }, _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(this.objects());if (e instanceof t.Op.Set) return new t.Op.Set(this._estimate(e.value()));if (e instanceof t.Op.Add) return new t.Op.Add(e.objects().concat(this.objects()));throw new Error("Op is invalid after previous op.");
          }return this;
        }, _estimate: function (t) {
          return t ? t.concat(this.objects()) : r.clone(this.objects());
        } }), t.Op._registerDecoder("Add", function (e) {
        return new t.Op.Add(t._decode(e.objects));
      }), t.Op.AddUnique = t.Op._extend({ _initialize: function (t) {
          this._objects = r.uniq(t);
        }, objects: function () {
          return this._objects;
        }, toJSON: function () {
          return { __op: "AddUnique", objects: t._encode(this.objects()) };
        }, _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(this.objects());if (e instanceof t.Op.Set) return new t.Op.Set(this._estimate(e.value()));if (e instanceof t.Op.AddUnique) return new t.Op.AddUnique(this._estimate(e.objects()));throw new Error("Op is invalid after previous op.");
          }return this;
        }, _estimate: function (e) {
          if (e) {
            var n = r.clone(e);return t._arrayEach(this.objects(), function (e) {
              if (e instanceof t.Object && e.id) {
                var i = r.find(n, function (n) {
                  return n instanceof t.Object && n.id === e.id;
                });if (i) {
                  var s = r.indexOf(n, i);n[s] = e;
                } else n.push(e);
              } else r.contains(n, e) || n.push(e);
            }), n;
          }return r.clone(this.objects());
        } }), t.Op._registerDecoder("AddUnique", function (e) {
        return new t.Op.AddUnique(t._decode(e.objects));
      }), t.Op.Remove = t.Op._extend({ _initialize: function (t) {
          this._objects = r.uniq(t);
        }, objects: function () {
          return this._objects;
        }, toJSON: function () {
          return { __op: "Remove", objects: t._encode(this.objects()) };
        }, _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return e;if (e instanceof t.Op.Set) return new t.Op.Set(this._estimate(e.value()));if (e instanceof t.Op.Remove) return new t.Op.Remove(r.union(e.objects(), this.objects()));throw new Error("Op is invalid after previous op.");
          }return this;
        }, _estimate: function (e) {
          if (e) {
            var n = r.difference(e, this.objects());return t._arrayEach(this.objects(), function (e) {
              e instanceof t.Object && e.id && (n = r.reject(n, function (n) {
                return n instanceof t.Object && n.id === e.id;
              }));
            }), n;
          }return [];
        } }), t.Op._registerDecoder("Remove", function (e) {
        return new t.Op.Remove(t._decode(e.objects));
      }), t.Op.Relation = t.Op._extend({ _initialize: function (e, n) {
          this._targetClassName = null;var i = this,
              s = function (e) {
            if (e instanceof t.Object) {
              if (!e.id) throw new Error("You can't add an unsaved AV.Object to a relation.");if (i._targetClassName || (i._targetClassName = e.className), i._targetClassName !== e.className) throw new Error("Tried to create a AV.Relation with 2 different types: " + i._targetClassName + " and " + e.className + ".");return e.id;
            }return e;
          };this.relationsToAdd = r.uniq(r.map(e, s)), this.relationsToRemove = r.uniq(r.map(n, s));
        }, added: function () {
          var e = this;return r.map(this.relationsToAdd, function (n) {
            var r = t.Object._create(e._targetClassName);return r.id = n, r;
          });
        }, removed: function () {
          var e = this;return r.map(this.relationsToRemove, function (n) {
            var r = t.Object._create(e._targetClassName);return r.id = n, r;
          });
        }, toJSON: function () {
          var t = null,
              e = null,
              n = this,
              i = function (t) {
            return { __type: "Pointer", className: n._targetClassName, objectId: t };
          },
              s = null;return this.relationsToAdd.length > 0 && (s = r.map(this.relationsToAdd, i), t = { __op: "AddRelation", objects: s }), this.relationsToRemove.length > 0 && (s = r.map(this.relationsToRemove, i), e = { __op: "RemoveRelation", objects: s }), t && e ? { __op: "Batch", ops: [t, e] } : t || e || {};
        }, _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) throw new Error("You can't modify a relation after deleting it.");if (e instanceof t.Op.Relation) {
              if (e._targetClassName && e._targetClassName !== this._targetClassName) throw new Error("Related object must be of class " + e._targetClassName + ", but " + this._targetClassName + " was passed in.");var n = r.union(r.difference(e.relationsToAdd, this.relationsToRemove), this.relationsToAdd),
                  i = r.union(r.difference(e.relationsToRemove, this.relationsToAdd), this.relationsToRemove),
                  s = new t.Op.Relation(n, i);return s._targetClassName = this._targetClassName, s;
            }throw new Error("Op is invalid after previous op.");
          }return this;
        }, _estimate: function (e, n, r) {
          if (e) {
            if (e instanceof t.Relation) {
              if (this._targetClassName) if (e.targetClassName) {
                if (e.targetClassName !== this._targetClassName) throw new Error("Related object must be a " + e.targetClassName + ", but a " + this._targetClassName + " was passed in.");
              } else e.targetClassName = this._targetClassName;return e;
            }throw new Error("Op is invalid after previous op.");
          }new t.Relation(n, r).targetClassName = this._targetClassName;
        } }), t.Op._registerDecoder("AddRelation", function (e) {
        return new t.Op.Relation(t._decode(e.objects), []);
      }), t.Op._registerDecoder("RemoveRelation", function (e) {
        return new t.Op.Relation([], t._decode(e.objects));
      });
    };
  }, function (t, e, n) {
    "use strict";
  }, function (t, e, n) {
    "use strict";
    var r = n(2).request;t.exports = function (t) {
      t.Installation = t.Object.extend("_Installation"), t.Push = t.Push || {}, t.Push.send = function (t, e) {
        if (t.where && (t.where = t.where.toJSON().where), t.where && t.cql) throw new Error("Both where and cql can't be set");if (t.push_time && (t.push_time = t.push_time.toJSON()), t.expiration_time && (t.expiration_time = t.expiration_time.toJSON()), t.expiration_time && t.expiration_time_interval) throw new Error("Both expiration_time and expiration_time_interval can't be set");return r({ service: "push", method: "POST", path: "/push", data: t, authOptions: e });
      };
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(6)("leancloud:query"),
        s = n(1),
        o = n(4),
        a = n(2),
        u = a._request,
        c = a.request,
        l = n(3),
        h = l.ensureArray,
        f = l.transformFetchOptions,
        d = function (t, e) {
      if (void 0 === t) throw new Error(e);
    };t.exports = function (t) {
      t.Query = function (e) {
        r.isString(e) && (e = t.Object._getSubclass(e)), this.objectClass = e, this.className = e.prototype.className, this._where = {}, this._include = [], this._select = [], this._limit = -1, this._skip = 0, this._extraOptions = {};
      }, t.Query.or = function () {
        var e = r.toArray(arguments),
            n = null;t._arrayEach(e, function (t) {
          if (r.isNull(n) && (n = t.className), n !== t.className) throw new Error("All queries must be for the same class");
        });var i = new t.Query(n);return i._orQuery(e), i;
      }, t.Query.and = function () {
        var e = r.toArray(arguments),
            n = null;t._arrayEach(e, function (t) {
          if (r.isNull(n) && (n = t.className), n !== t.className) throw new Error("All queries must be for the same class");
        });var i = new t.Query(n);return i._andQuery(e), i;
      }, t.Query.doCloudQuery = function (e, n, i) {
        var s = { cql: e };return r.isArray(n) ? s.pvalues = n : i = n, u("cloudQuery", null, null, "GET", s, i).then(function (e) {
          var n = new t.Query(e.className);return { results: r.map(e.results, function (t) {
              var r = n._newObject(e);return r._finishFetch && r._finishFetch(n._processResult(t), !0), r;
            }), count: e.count, className: e.className };
        });
      }, t.Query._extend = t._extend, r.extend(t.Query.prototype, { _processResult: function (t) {
          return t;
        }, get: function (t, e) {
          if (!t) {
            throw new o(o.OBJECT_NOT_FOUND, "Object not found.");
          }var n = this._newObject();n.id = t;var i = this.toJSON(),
              s = {};return i.keys && (s.keys = i.keys), i.include && (s.include = i.include), i.includeACL && (s.includeACL = i.includeACL), u("classes", this.className, t, "GET", f(s), e).then(function (t) {
            if (r.isEmpty(t)) throw new o(o.OBJECT_NOT_FOUND, "Object not found.");return n._finishFetch(n.parse(t), !0), n;
          });
        }, toJSON: function () {
          var e = { where: this._where };return this._include.length > 0 && (e.include = this._include.join(",")), this._select.length > 0 && (e.keys = this._select.join(",")), void 0 !== this._includeACL && (e.returnACL = this._includeACL), this._limit >= 0 && (e.limit = this._limit), this._skip > 0 && (e.skip = this._skip), void 0 !== this._order && (e.order = this._order), t._objectEach(this._extraOptions, function (t, n) {
            e[n] = t;
          }), e;
        }, _newObject: function (e) {
          return e && e.className ? new t.Object(e.className) : new this.objectClass();
        }, _createRequest: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.toJSON(),
              e = arguments[1],
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "/classes/" + this.className;if (encodeURIComponent(JSON.stringify(t)).length > 2e3) {
            return c({ path: "/batch", method: "POST", data: { requests: [{ method: "GET", path: "/1.1" + n, params: t }] }, authOptions: e }).then(function (t) {
              var e = t[0];if (e.success) return e.success;var n = new Error(e.error.error || "Unknown batch error");throw n.code = e.error.code, n;
            });
          }return c({ method: "GET", path: n, query: t, authOptions: e });
        }, _parseResponse: function (t) {
          var e = this;return r.map(t.results, function (n) {
            var r = e._newObject(t);return r._finishFetch && r._finishFetch(e._processResult(n), !0), r;
          });
        }, find: function (t) {
          return this._createRequest(void 0, t).then(this._parseResponse.bind(this));
        }, scan: function () {
          var t = this,
              e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              n = e.orderedBy,
              o = e.batchSize,
              a = arguments[1],
              c = this.toJSON();i("scan %O", c), c.order && (console.warn("The order of the query is ignored for Query#scan. Checkout the orderedBy option of Query#scan."), delete c.order), c.skip && (console.warn("The skip option of the query is ignored for Query#scan."), delete c.skip), c.limit && (console.warn("The limit option of the query is ignored for Query#scan."), delete c.limit), n && (c.scan_key = n), o && (c.limit = o);var l = s.resolve([]),
              h = void 0,
              f = !1;return { next: function () {
              return l = l.then(function (e) {
                return f ? [] : e.length > 1 ? e : h || 0 === e.length ? u("scan/classes", t.className, null, "GET", h ? r.extend({}, c, { cursor: h }) : c, a).then(function (e) {
                  return h = e.cursor, t._parseResponse(e);
                }).then(function (t) {
                  return t.length || (f = !0), e.concat(t);
                }) : (f = !0, e);
              }), l.then(function (t) {
                return t.shift();
              }).then(function (t) {
                return { value: t, done: f };
              });
            } };
        }, destroyAll: function (e) {
          return this.find(e).then(function (n) {
            return t.Object.destroyAll(n, e);
          });
        }, count: function (t) {
          var e = this.toJSON();return e.limit = 0, e.count = 1, this._createRequest(e, t).then(function (t) {
            return t.count;
          });
        }, first: function (t) {
          var e = this,
              n = this.toJSON();return n.limit = 1, this._createRequest(n, t).then(function (t) {
            return r.map(t.results, function (t) {
              var n = e._newObject();return n._finishFetch && n._finishFetch(e._processResult(t), !0), n;
            })[0];
          });
        }, skip: function (t) {
          return d(t, "undefined is not a valid skip value"), this._skip = t, this;
        }, limit: function (t) {
          return d(t, "undefined is not a valid limit value"), this._limit = t, this;
        }, equalTo: function (e, n) {
          return d(e, "undefined is not a valid key"), d(n, "undefined is not a valid value"), this._where[e] = t._encode(n), this;
        }, _addCondition: function (e, n, r) {
          return d(e, "undefined is not a valid condition key"), d(n, "undefined is not a valid condition"), d(r, "undefined is not a valid condition value"), this._where[e] || (this._where[e] = {}), this._where[e][n] = t._encode(r), this;
        }, sizeEqualTo: function (t, e) {
          this._addCondition(t, "$size", e);
        }, notEqualTo: function (t, e) {
          return this._addCondition(t, "$ne", e), this;
        }, lessThan: function (t, e) {
          return this._addCondition(t, "$lt", e), this;
        }, greaterThan: function (t, e) {
          return this._addCondition(t, "$gt", e), this;
        }, lessThanOrEqualTo: function (t, e) {
          return this._addCondition(t, "$lte", e), this;
        }, greaterThanOrEqualTo: function (t, e) {
          return this._addCondition(t, "$gte", e), this;
        }, containedIn: function (t, e) {
          return this._addCondition(t, "$in", e), this;
        }, notContainedIn: function (t, e) {
          return this._addCondition(t, "$nin", e), this;
        }, containsAll: function (t, e) {
          return this._addCondition(t, "$all", e), this;
        }, exists: function (t) {
          return this._addCondition(t, "$exists", !0), this;
        }, doesNotExist: function (t) {
          return this._addCondition(t, "$exists", !1), this;
        }, matches: function (t, e, n) {
          return this._addCondition(t, "$regex", e), n || (n = ""), e.ignoreCase && (n += "i"), e.multiline && (n += "m"), n && n.length && this._addCondition(t, "$options", n), this;
        }, matchesQuery: function (t, e) {
          var n = e.toJSON();return n.className = e.className, this._addCondition(t, "$inQuery", n), this;
        }, doesNotMatchQuery: function (t, e) {
          var n = e.toJSON();return n.className = e.className, this._addCondition(t, "$notInQuery", n), this;
        }, matchesKeyInQuery: function (t, e, n) {
          var r = n.toJSON();return r.className = n.className, this._addCondition(t, "$select", { key: e, query: r }), this;
        }, doesNotMatchKeyInQuery: function (t, e, n) {
          var r = n.toJSON();return r.className = n.className, this._addCondition(t, "$dontSelect", { key: e, query: r }), this;
        }, _orQuery: function (t) {
          var e = r.map(t, function (t) {
            return t.toJSON().where;
          });return this._where.$or = e, this;
        }, _andQuery: function (t) {
          var e = r.map(t, function (t) {
            return t.toJSON().where;
          });return this._where.$and = e, this;
        }, _quote: function (t) {
          return "\\Q" + t.replace("\\E", "\\E\\\\E\\Q") + "\\E";
        }, contains: function (t, e) {
          return this._addCondition(t, "$regex", this._quote(e)), this;
        }, startsWith: function (t, e) {
          return this._addCondition(t, "$regex", "^" + this._quote(e)), this;
        }, endsWith: function (t, e) {
          return this._addCondition(t, "$regex", this._quote(e) + "$"), this;
        }, ascending: function (t) {
          return d(t, "undefined is not a valid key"), this._order = t, this;
        }, addAscending: function (t) {
          return d(t, "undefined is not a valid key"), this._order ? this._order += "," + t : this._order = t, this;
        }, descending: function (t) {
          return d(t, "undefined is not a valid key"), this._order = "-" + t, this;
        }, addDescending: function (t) {
          return d(t, "undefined is not a valid key"), this._order ? this._order += ",-" + t : this._order = "-" + t, this;
        }, near: function (e, n) {
          return n instanceof t.GeoPoint || (n = new t.GeoPoint(n)), this._addCondition(e, "$nearSphere", n), this;
        }, withinRadians: function (t, e, n) {
          return this.near(t, e), this._addCondition(t, "$maxDistance", n), this;
        }, withinMiles: function (t, e, n) {
          return this.withinRadians(t, e, n / 3958.8);
        }, withinKilometers: function (t, e, n) {
          return this.withinRadians(t, e, n / 6371);
        }, withinGeoBox: function (e, n, r) {
          return n instanceof t.GeoPoint || (n = new t.GeoPoint(n)), r instanceof t.GeoPoint || (r = new t.GeoPoint(r)), this._addCondition(e, "$within", { $box: [n, r] }), this;
        }, include: function (t) {
          var e = this;return d(t, "undefined is not a valid key"), r(arguments).forEach(function (t) {
            e._include = e._include.concat(h(t));
          }), this;
        }, includeACL: function () {
          var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];return this._includeACL = t, this;
        }, select: function (t) {
          var e = this;return d(t, "undefined is not a valid key"), r(arguments).forEach(function (t) {
            e._select = e._select.concat(h(t));
          }), this;
        }, each: function (e) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};if (this._order || this._skip || this._limit >= 0) {
            var i = new Error("Cannot iterate on a query with sort, skip, or limit.");return t.Promise.reject(i);
          }var s = new t.Query(this.objectClass);s._limit = n.batchSize || 100, s._where = r.clone(this._where), s._include = r.clone(this._include), s.ascending("objectId");var o = !1;return t.Promise._continueWhile(function () {
            return !o;
          }, function () {
            return s.find(n).then(function (n) {
              var i = t.Promise.resolve();return r.each(n, function (t) {
                i = i.then(function () {
                  return e(t);
                });
              }), i.then(function () {
                n.length >= s._limit ? s.greaterThan("objectId", n[n.length - 1].id) : o = !0;
              });
            });
          });
        }, subscribe: function (e) {
          return t.LiveQuery.init(this, e);
        } }), t.FriendShipQuery = t.Query._extend({ _objectClass: t.User, _newObject: function () {
          return new t.User();
        }, _processResult: function (t) {
          if (t && t[this._friendshipTag]) {
            var e = t[this._friendshipTag];return "Pointer" === e.__type && "_User" === e.className && (delete e.__type, delete e.className), e;
          }return null;
        } });
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0);t.exports = function (t) {
      t.Relation = function (t, e) {
        if (!r.isString(e)) throw new TypeError("key must be a string");this.parent = t, this.key = e, this.targetClassName = null;
      }, t.Relation.reverseQuery = function (e, n, r) {
        var i = new t.Query(e);return i.equalTo(n, r._toPointer()), i;
      }, r.extend(t.Relation.prototype, { _ensureParentAndKey: function (t, e) {
          if (this.parent = this.parent || t, this.key = this.key || e, this.parent !== t) throw new Error("Internal Error. Relation retrieved from two different Objects.");if (this.key !== e) throw new Error("Internal Error. Relation retrieved from two different keys.");
        }, add: function (e) {
          r.isArray(e) || (e = [e]);var n = new t.Op.Relation(e, []);this.parent.set(this.key, n), this.targetClassName = n._targetClassName;
        }, remove: function (e) {
          r.isArray(e) || (e = [e]);var n = new t.Op.Relation([], e);this.parent.set(this.key, n), this.targetClassName = n._targetClassName;
        }, toJSON: function () {
          return { __type: "Relation", className: this.targetClassName };
        }, query: function () {
          var e, n;return this.targetClassName ? (e = t.Object._getSubclass(this.targetClassName), n = new t.Query(e)) : (e = t.Object._getSubclass(this.parent.className), n = new t.Query(e), n._extraOptions.redirectClassNameForKey = this.key), n._addCondition("$relatedTo", "object", this.parent._toPointer()), n._addCondition("$relatedTo", "key", this.key), n;
        } });
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(4);t.exports = function (t) {
      t.Role = t.Object.extend("_Role", { constructor: function (e, n) {
          if (r.isString(e) ? (t.Object.prototype.constructor.call(this, null, null), this.setName(e)) : t.Object.prototype.constructor.call(this, e, n), n) {
            if (!(n instanceof t.ACL)) throw new TypeError("acl must be an instance of AV.ACL");this.setACL(n);
          }
        }, getName: function () {
          return this.get("name");
        }, setName: function (t, e) {
          return this.set("name", t, e);
        }, getUsers: function () {
          return this.relation("users");
        }, getRoles: function () {
          return this.relation("roles");
        }, validate: function (e, n) {
          if ("name" in e && e.name !== this.getName()) {
            var s = e.name;if (this.id && this.id !== e.objectId) return new i(i.OTHER_CAUSE, "A role's name can only be set before it has been saved.");if (!r.isString(s)) return new i(i.OTHER_CAUSE, "A role's name must be a String.");if (!/^[0-9a-zA-Z\-_ ]+$/.test(s)) return new i(i.OTHER_CAUSE, "A role's name can only contain alphanumeric characters, _, -, and spaces.");
          }return !!t.Object.prototype.validate && t.Object.prototype.validate.call(this, e, n);
        } });
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(2)._request;t.exports = function (t) {
      t.SearchSortBuilder = function () {
        this._sortFields = [];
      }, r.extend(t.SearchSortBuilder.prototype, { _addField: function (t, e, n, r) {
          var i = {};return i[t] = { order: e || "asc", mode: n || "avg", missing: "_" + (r || "last") }, this._sortFields.push(i), this;
        }, ascending: function (t, e, n) {
          return this._addField(t, "asc", e, n);
        }, descending: function (t, e, n) {
          return this._addField(t, "desc", e, n);
        }, whereNear: function (t, e, n) {
          n = n || {};var r = {},
              i = { lat: e.latitude, lon: e.longitude },
              s = { order: n.order || "asc", mode: n.mode || "avg", unit: n.unit || "km" };return s[t] = i, r._geo_distance = s, this._sortFields.push(r), this;
        }, build: function () {
          return JSON.stringify(t._encode(this._sortFields));
        } }), t.SearchQuery = t.Query._extend({ _sid: null, _hits: 0, _queryString: null, _highlights: null, _sortBuilder: null, _createRequest: function (t, e) {
          return i("search/select", null, null, "GET", t || this.toJSON(), e);
        }, sid: function (t) {
          return this._sid = t, this;
        }, queryString: function (t) {
          return this._queryString = t, this;
        }, highlights: function (t) {
          var e;return e = t && r.isString(t) ? arguments : t, this._highlights = e, this;
        }, sortBy: function (t) {
          return this._sortBuilder = t, this;
        }, hits: function () {
          return this._hits || (this._hits = 0), this._hits;
        }, _processResult: function (t) {
          return delete t.className, delete t._app_url, delete t._deeplink, t;
        }, hasMore: function () {
          return !this._hitEnd;
        }, reset: function () {
          this._hitEnd = !1, this._sid = null, this._hits = 0;
        }, find: function () {
          var t = this;return this._createRequest().then(function (e) {
            return e.sid ? (t._oldSid = t._sid, t._sid = e.sid) : (t._sid = null, t._hitEnd = !0), t._hits = e.hits || 0, r.map(e.results, function (n) {
              n.className && (e.className = n.className);var r = t._newObject(e);return r.appURL = n._app_url, r._finishFetch(t._processResult(n), !0), r;
            });
          });
        }, toJSON: function () {
          var e = t.SearchQuery.__super__.toJSON.call(this);if (delete e.where, this.className && (e.clazz = this.className), this._sid && (e.sid = this._sid), !this._queryString) throw new Error("Please set query string.");if (e.q = this._queryString, this._highlights && (e.highlights = this._highlights.join(",")), this._sortBuilder && e.order) throw new Error("sort and order can not be set at same time.");return this._sortBuilder && (e.sort = this._sortBuilder.build()), e;
        } });
    };
  }, function (t, e, n) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    },
        i = n(0),
        s = n(2)._request,
        o = n(3),
        a = o.getSessionToken;t.exports = function (t) {
      var e = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};return a(e) ? t.User._fetchUserBySessionToken(a(e)) : t.User.currentAsync();
      },
          n = function (n) {
        return e(n).then(function (e) {
          return t.Object.createWithoutData("_User", e.id)._toPointer();
        });
      };t.Status = function (t, e) {
        return this.data = {}, this.inboxType = "default", this.query = null, t && "object" === (void 0 === t ? "undefined" : r(t)) ? this.data = t : (t && (this.data.image = t), e && (this.data.message = e)), this;
      }, i.extend(t.Status.prototype, { get: function (t) {
          return this.data[t];
        }, set: function (t, e) {
          return this.data[t] = e, this;
        }, destroy: function (e) {
          return this.id ? s("statuses", null, this.id, "DELETE", e) : t.Promise.reject(new Error("The status id is not exists."));
        }, toObject: function () {
          return this.id ? t.Object.createWithoutData("_Status", this.id) : null;
        }, _getDataJSON: function () {
          var e = i.clone(this.data);return t._encode(e);
        }, send: function () {
          var e = this,
              r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};if (!a(r) && !t.User.current()) throw new Error("Please signin an user.");return this.query ? n(r).then(function (t) {
            var n = e.query.toJSON();n.className = e.query.className;var i = {};return i.query = n, e.data = e.data || {}, e.data.source = e.data.source || t, i.data = e._getDataJSON(), i.inboxType = e.inboxType || "default", s("statuses", null, null, "POST", i, r);
          }).then(function (n) {
            return e.id = n.objectId, e.createdAt = t._parseDate(n.createdAt), e;
          }) : t.Status.sendStatusToFollowers(this, r);
        }, _finishFetch: function (e) {
          this.id = e.objectId, this.createdAt = t._parseDate(e.createdAt), this.updatedAt = t._parseDate(e.updatedAt), this.messageId = e.messageId, delete e.messageId, delete e.objectId, delete e.createdAt, delete e.updatedAt, this.data = t._decode(e);
        } }), t.Status.sendStatusToFollowers = function (e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};if (!a(r) && !t.User.current()) throw new Error("Please signin an user.");return n(r).then(function (n) {
          var i = {};i.className = "_Follower", i.keys = "follower", i.where = { user: n };var o = {};return o.query = i, e.data = e.data || {}, e.data.source = e.data.source || n, o.data = e._getDataJSON(), o.inboxType = e.inboxType || "default", s("statuses", null, null, "POST", o, r).then(function (n) {
            return e.id = n.objectId, e.createdAt = t._parseDate(n.createdAt), e;
          });
        });
      }, t.Status.sendPrivateStatus = function (e, r) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};if (!a(o) && !t.User.current()) throw new Error("Please signin an user.");if (!r) throw new Error("Invalid target user.");var u = i.isString(r) ? r : r.id;if (!u) throw new Error("Invalid target user.");return n(o).then(function (n) {
          var r = {};r.className = "_User", r.where = { objectId: u };var i = {};return i.query = r, e.data = e.data || {}, e.data.source = e.data.source || n, i.data = e._getDataJSON(), i.inboxType = "private", e.inboxType = "private", s("statuses", null, null, "POST", i, o).then(function (n) {
            return e.id = n.objectId, e.createdAt = t._parseDate(n.createdAt), e;
          });
        });
      }, t.Status.countUnreadStatuses = function (n) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "default",
            o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};if (i.isString(r) || (o = r), !a(o) && null == n && !t.User.current()) throw new Error("Please signin an user or pass the owner objectId.");return e(o).then(function (e) {
          var n = {};return n.inboxType = t._encode(r), n.owner = t._encode(e), s("subscribe/statuses/count", null, null, "GET", n, o);
        });
      }, t.Status.resetUnreadCount = function (n) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "default",
            o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};if (i.isString(r) || (o = r), !a(o) && null == n && !t.User.current()) throw new Error("Please signin an user or pass the owner objectId.");return e(o).then(function (e) {
          var n = {};return n.inboxType = t._encode(r), n.owner = t._encode(e), s("subscribe/statuses/resetUnreadCount", null, null, "POST", n, o);
        });
      }, t.Status.statusQuery = function (e) {
        var n = new t.Query("_Status");return e && n.equalTo("source", e), n;
      }, t.InboxQuery = t.Query._extend({ _objectClass: t.Status, _sinceId: 0, _maxId: 0, _inboxType: "default", _owner: null, _newObject: function () {
          return new t.Status();
        }, _createRequest: function (e, n) {
          return t.InboxQuery.__super__._createRequest.call(this, e, n, "/subscribe/statuses");
        }, sinceId: function (t) {
          return this._sinceId = t, this;
        }, maxId: function (t) {
          return this._maxId = t, this;
        }, owner: function (t) {
          return this._owner = t, this;
        }, inboxType: function (t) {
          return this._inboxType = t, this;
        }, toJSON: function () {
          var e = t.InboxQuery.__super__.toJSON.call(this);return e.owner = t._encode(this._owner), e.inboxType = t._encode(this._inboxType), e.sinceId = t._encode(this._sinceId), e.maxId = t._encode(this._maxId), e;
        } }), t.Status.inboxQuery = function (e, n) {
        var r = new t.InboxQuery(t.Status);return e && (r._owner = e), n && (r._inboxType = n), r;
      };
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(0),
        i = n(4),
        s = n(2),
        o = s._request,
        a = s.request,
        u = n(1),
        c = function () {
      if ("undefined" == typeof wx || "function" != typeof wx.login) throw new Error("Weapp Login is only available in Weapp");return new u(function (t, e) {
        wx.login({ success: function (n) {
            var r = n.code,
                i = n.errMsg;r ? t(r) : e(new Error(i));
          }, fail: function () {
            return e(new Error("wx.login 失败"));
          } });
      });
    },
        l = function (t, e) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          s = n.unionIdPlatform,
          o = void 0 === s ? "weixin" : s,
          a = n.asMainAccount,
          u = void 0 !== a && a;if ("string" != typeof e) throw new i(i.OTHER_CAUSE, "unionId is not a string");if ("string" != typeof o) throw new i(i.OTHER_CAUSE, "unionIdPlatform is not a string");return r.extend({}, t, { platform: o, unionid: e, main_account: Boolean(u) });
    };t.exports = function (t) {
      t.User = t.Object.extend("_User", { _isCurrentUser: !1, _mergeMagicFields: function (e) {
          return e.sessionToken && (this._sessionToken = e.sessionToken, delete e.sessionToken), t.User.__super__._mergeMagicFields.call(this, e);
        }, _cleanupAuthData: function () {
          if (this.isCurrent()) {
            var e = this.get("authData");e && t._objectEach(this.get("authData"), function (t, n) {
              e[n] || delete e[n];
            });
          }
        }, _synchronizeAllAuthData: function () {
          if (this.get("authData")) {
            var e = this;t._objectEach(this.get("authData"), function (t, n) {
              e._synchronizeAuthData(n);
            });
          }
        }, _synchronizeAuthData: function (e) {
          if (this.isCurrent()) {
            var n;r.isString(e) ? (n = e, e = t.User._authProviders[n]) : n = e.getAuthType();var i = this.get("authData");if (i && e) {
              e.restoreAuthentication(i[n]) || this.dissociateAuthData(e);
            }
          }
        }, _handleSaveResult: function (e) {
          return e && !t._config.disableCurrentUser && (this._isCurrentUser = !0), this._cleanupAuthData(), this._synchronizeAllAuthData(), delete this._serverData.password, this._rebuildEstimatedDataForKey("password"), this._refreshCache(), !e && !this.isCurrent() || t._config.disableCurrentUser ? u.resolve() : u.resolve(t.User._saveCurrentUser(this));
        }, _linkWith: function (e, n) {
          var i,
              s = this;if (r.isString(e) ? (i = e, e = t.User._authProviders[e]) : i = e.getAuthType(), n) {
            var o = this.get("authData") || {};return o[i] = n, this.save({ authData: o }).then(function (t) {
              return t._handleSaveResult(!0).then(function () {
                return t;
              });
            });
          }return e.authenticate().then(function (t) {
            return s._linkWith(e, t);
          });
        }, associateWithAuthData: function (t, e) {
          return this._linkWith(e, t);
        }, associateWithAuthDataAndUnionId: function (t, e, n, r) {
          return this._linkWith(e, l(t, n, r));
        }, linkWithWeapp: function () {
          var t = this;return c().then(function (e) {
            return t._linkWith("lc_weapp", { code: e });
          });
        }, dissociateAuthData: function (t) {
          return this.unset("authData." + t), this.save().then(function (t) {
            return t._handleSaveResult(!0).then(function () {
              return t;
            });
          });
        }, _unlinkFrom: function (t) {
          return console.warn("DEPRECATED: User#_unlinkFrom 已废弃，请使用 User#dissociateAuthData 代替"), this.dissociateAuthData(t);
        }, _isLinked: function (t) {
          var e;return e = r.isString(t) ? t : t.getAuthType(), !!(this.get("authData") || {})[e];
        }, logOut: function () {
          this._logOutWithAll(), this._isCurrentUser = !1;
        }, _logOutWithAll: function () {
          if (this.get("authData")) {
            var e = this;t._objectEach(this.get("authData"), function (t, n) {
              e._logOutWith(n);
            });
          }
        }, _logOutWith: function (e) {
          this.isCurrent() && (r.isString(e) && (e = t.User._authProviders[e]), e && e.deauthenticate && e.deauthenticate());
        }, signUp: function (t, e) {
          var n = t && t.username || this.get("username");if (!n || "" === n) throw new i(i.OTHER_CAUSE, "Cannot sign up user with an empty name.");var r = t && t.password || this.get("password");if (!r || "" === r) throw new i(i.OTHER_CAUSE, "Cannot sign up user with an empty password.");return this.save(t, e).then(function (t) {
            return t._handleSaveResult(!0).then(function () {
              return t;
            });
          });
        }, signUpOrlogInWithMobilePhone: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = t && t.mobilePhoneNumber || this.get("mobilePhoneNumber");if (!n || "" === n) throw new i(i.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber with an empty mobilePhoneNumber.");var r = t && t.smsCode || this.get("smsCode");if (!r || "" === r) throw new i(i.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber  with an empty smsCode.");return e._makeRequest = function (t, e, n, r, i) {
            return o("usersByMobilePhone", null, null, "POST", i);
          }, this.save(t, e).then(function (t) {
            return delete t.attributes.smsCode, delete t._serverData.smsCode, t._handleSaveResult(!0).then(function () {
              return t;
            });
          });
        }, logIn: function () {
          var t = this;return o("login", null, null, "POST", this.toJSON()).then(function (e) {
            var n = t.parse(e);return t._finishFetch(n), t._handleSaveResult(!0).then(function () {
              return n.smsCode || delete t.attributes.smsCode, t;
            });
          });
        }, save: function (e, n, i) {
          var s, o;return r.isObject(e) || r.isNull(e) || r.isUndefined(e) ? (s = e, o = n) : (s = {}, s[e] = n, o = i), o = o || {}, t.Object.prototype.save.call(this, s, o).then(function (t) {
            return t._handleSaveResult(!1).then(function () {
              return t;
            });
          });
        }, follow: function (e, n) {
          if (!this.id) throw new Error("Please signin.");var i = void 0,
              s = void 0;e.user ? (i = e.user, s = e.attributes) : i = e;var a = r.isString(i) ? i : i.id;if (!a) throw new Error("Invalid target user.");var u = "users/" + this.id + "/friendship/" + a;return o(u, null, null, "POST", t._encode(s), n);
        }, unfollow: function (t, e) {
          if (!this.id) throw new Error("Please signin.");var n = void 0;n = t.user ? t.user : t;var i = r.isString(n) ? n : n.id;if (!i) throw new Error("Invalid target user.");var s = "users/" + this.id + "/friendship/" + i;return o(s, null, null, "DELETE", null, e);
        }, followerQuery: function () {
          return t.User.followerQuery(this.id);
        }, followeeQuery: function () {
          return t.User.followeeQuery(this.id);
        }, fetch: function (e, n) {
          return t.Object.prototype.fetch.call(this, e, n).then(function (t) {
            return t._handleSaveResult(!1).then(function () {
              return t;
            });
          });
        }, updatePassword: function (t, e, n) {
          var r = "users/" + this.id + "/updatePassword";return o(r, null, null, "PUT", { old_password: t, new_password: e }, n);
        }, isCurrent: function () {
          return this._isCurrentUser;
        }, getUsername: function () {
          return this.get("username");
        }, getMobilePhoneNumber: function () {
          return this.get("mobilePhoneNumber");
        }, setMobilePhoneNumber: function (t, e) {
          return this.set("mobilePhoneNumber", t, e);
        }, setUsername: function (t, e) {
          return this.set("username", t, e);
        }, setPassword: function (t, e) {
          return this.set("password", t, e);
        }, getEmail: function () {
          return this.get("email");
        }, setEmail: function (t, e) {
          return this.set("email", t, e);
        }, authenticated: function () {
          return console.warn("DEPRECATED: 如果要判断当前用户的登录状态是否有效，请使用 currentUser.isAuthenticated().then()，如果要判断该用户是否是当前登录用户，请使用 user.id === currentUser.id。"), !!this._sessionToken && !t._config.disableCurrentUser && t.User.current() && t.User.current().id === this.id;
        }, isAuthenticated: function () {
          var e = this;return u.resolve().then(function () {
            return !!e._sessionToken && t.User._fetchUserBySessionToken(e._sessionToken).then(function () {
              return !0;
            }, function (t) {
              if (211 === t.code) return !1;throw t;
            });
          });
        }, getSessionToken: function () {
          return this._sessionToken;
        }, refreshSessionToken: function (t) {
          var e = this;return o("users/" + this.id + "/refreshSessionToken", null, null, "PUT", null, t).then(function (t) {
            return e._finishFetch(t), e._handleSaveResult(!0).then(function () {
              return e;
            });
          });
        }, getRoles: function (e) {
          return t.Relation.reverseQuery("_Role", "users", this).find(e);
        } }, { _currentUser: null, _currentUserMatchesDisk: !1, _CURRENT_USER_KEY: "currentUser", _authProviders: {}, signUp: function (e, n, r, i) {
          return r = r || {}, r.username = e, r.password = n, t.Object._create("_User").signUp(r, i);
        }, logIn: function (e, n, r) {
          var i = t.Object._create("_User");return i._finishFetch({ username: e, password: n }), i.logIn(r);
        }, become: function (t) {
          return this._fetchUserBySessionToken(t).then(function (t) {
            return t._handleSaveResult(!0).then(function () {
              return t;
            });
          });
        }, _fetchUserBySessionToken: function (e) {
          var n = t.Object._create("_User");return a({ method: "GET", path: "/users/me", authOptions: { sessionToken: e } }).then(function (t) {
            var e = n.parse(t);return n._finishFetch(e), n;
          });
        }, logInWithMobilePhoneSmsCode: function (e, n, r) {
          var i = t.Object._create("_User");return i._finishFetch({ mobilePhoneNumber: e, smsCode: n }), i.logIn(r);
        }, signUpOrlogInWithMobilePhone: function (e, n, r, i) {
          return r = r || {}, r.mobilePhoneNumber = e, r.smsCode = n, t.Object._create("_User").signUpOrlogInWithMobilePhone(r, i);
        }, logInWithMobilePhone: function (e, n, r) {
          var i = t.Object._create("_User");return i._finishFetch({ mobilePhoneNumber: e, password: n }), i.logIn(r);
        }, signUpOrlogInWithAuthData: function (e, n) {
          return t.User._logInWith(n, e);
        }, signUpOrlogInWithAuthDataAndUnionId: function (t, e, n, r) {
          return this.signUpOrlogInWithAuthData(l(t, n, r), e);
        }, loginWithWeapp: function () {
          var t = this;return c().then(function (e) {
            return t.signUpOrlogInWithAuthData({ code: e }, "lc_weapp");
          });
        }, associateWithAuthData: function (t, e, n) {
          return console.warn("DEPRECATED: User.associateWithAuthData 已废弃，请使用 User#associateWithAuthData 代替"), t._linkWith(e, n);
        }, logOut: function () {
          return t._config.disableCurrentUser ? (console.warn("AV.User.current() was disabled in multi-user environment, call logOut() from user object instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"), u.resolve(null)) : (null !== t.User._currentUser && (t.User._currentUser._logOutWithAll(), t.User._currentUser._isCurrentUser = !1), t.User._currentUserMatchesDisk = !0, t.User._currentUser = null, t.localStorage.removeItemAsync(t._getAVPath(t.User._CURRENT_USER_KEY)).then(function () {
            return t._refreshSubscriptionId();
          }));
        }, followerQuery: function (e) {
          if (!e || !r.isString(e)) throw new Error("Invalid user object id.");var n = new t.FriendShipQuery("_Follower");return n._friendshipTag = "follower", n.equalTo("user", t.Object.createWithoutData("_User", e)), n;
        }, followeeQuery: function (e) {
          if (!e || !r.isString(e)) throw new Error("Invalid user object id.");var n = new t.FriendShipQuery("_Followee");return n._friendshipTag = "followee", n.equalTo("user", t.Object.createWithoutData("_User", e)), n;
        }, requestPasswordReset: function (t) {
          return o("requestPasswordReset", null, null, "POST", { email: t });
        }, requestEmailVerify: function (t) {
          return o("requestEmailVerify", null, null, "POST", { email: t });
        }, requestMobilePhoneVerify: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = { mobilePhoneNumber: t };return e.validateToken && (n.validate_token = e.validateToken), o("requestMobilePhoneVerify", null, null, "POST", n, e);
        }, requestPasswordResetBySmsCode: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = { mobilePhoneNumber: t };return e.validateToken && (n.validate_token = e.validateToken), o("requestPasswordResetBySmsCode", null, null, "POST", n, e);
        }, resetPasswordBySmsCode: function (t, e) {
          return o("resetPasswordBySmsCode", null, t, "PUT", { password: e });
        }, verifyMobilePhone: function (t) {
          return o("verifyMobilePhone", null, t, "POST", null);
        }, requestLoginSmsCode: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = { mobilePhoneNumber: t };return e.validateToken && (n.validate_token = e.validateToken), o("requestLoginSmsCode", null, null, "POST", n, e);
        }, currentAsync: function () {
          return t._config.disableCurrentUser ? (console.warn("AV.User.currentAsync() was disabled in multi-user environment, access user from request instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"), u.resolve(null)) : t.User._currentUser ? u.resolve(t.User._currentUser) : t.User._currentUserMatchesDisk ? u.resolve(t.User._currentUser) : t.localStorage.getItemAsync(t._getAVPath(t.User._CURRENT_USER_KEY)).then(function (e) {
            if (!e) return null;t.User._currentUserMatchesDisk = !0, t.User._currentUser = t.Object._create("_User"), t.User._currentUser._isCurrentUser = !0;var n = JSON.parse(e);return t.User._currentUser.id = n._id, delete n._id, t.User._currentUser._sessionToken = n._sessionToken, delete n._sessionToken, t.User._currentUser._finishFetch(n), t.User._currentUser._synchronizeAllAuthData(), t.User._currentUser._refreshCache(), t.User._currentUser._opSetQueue = [{}], t.User._currentUser;
          });
        }, current: function () {
          if (t._config.disableCurrentUser) return console.warn("AV.User.current() was disabled in multi-user environment, access user from request instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"), null;if (t.User._currentUser) return t.User._currentUser;if (t.User._currentUserMatchesDisk) return t.User._currentUser;t.User._currentUserMatchesDisk = !0;var e = t.localStorage.getItem(t._getAVPath(t.User._CURRENT_USER_KEY));if (!e) return null;t.User._currentUser = t.Object._create("_User"), t.User._currentUser._isCurrentUser = !0;var n = JSON.parse(e);return t.User._currentUser.id = n._id, delete n._id, t.User._currentUser._sessionToken = n._sessionToken, delete n._sessionToken, t.User._currentUser._finishFetch(n), t.User._currentUser._synchronizeAllAuthData(), t.User._currentUser._refreshCache(), t.User._currentUser._opSetQueue = [{}], t.User._currentUser;
        }, _saveCurrentUser: function (e) {
          var n;return n = t.User._currentUser !== e ? t.User.logOut() : u.resolve(), n.then(function () {
            e._isCurrentUser = !0, t.User._currentUser = e;var n = e.toJSON();return n._id = e.id, n._sessionToken = e._sessionToken, t.localStorage.setItemAsync(t._getAVPath(t.User._CURRENT_USER_KEY), JSON.stringify(n)).then(function () {
              return t.User._currentUserMatchesDisk = !0, t._refreshSubscriptionId();
            });
          });
        }, _registerAuthenticationProvider: function (e) {
          t.User._authProviders[e.getAuthType()] = e, !t._config.disableCurrentUser && t.User.current() && t.User.current()._synchronizeAuthData(e.getAuthType());
        }, _logInWith: function (e, n) {
          return t.Object._create("_User")._linkWith(e, n);
        } });
    };
  }, function (t, e, n) {
    "use strict";
    function r(t) {
      var e = this;this.AV = t, this.lockedUntil = 0, o.getAsync("serverURLs").then(function (t) {
        if (!t) return e.lock(0);var n = t.serverURLs,
            r = t.lockedUntil;e.AV._setServerURLs(n, !1), e.lockedUntil = r;
      }).catch(function () {
        return e.lock(0);
      });
    }var i = n(3),
        s = i.ajax,
        o = n(9);r.prototype.disable = function () {
      this.disabled = !0;
    }, r.prototype.lock = function (t) {
      this.lockedUntil = Date.now() + t;
    }, r.prototype.refresh = function () {
      var t = this;if (!(this.disabled || Date.now() < this.lockedUntil)) {
        this.lock(10);return s({ method: "get", url: "https://app-router.leancloud.cn/2/route", query: { appId: this.AV.applicationId } }).then(function (e) {
          if (!t.disabled) {
            var n = e.ttl;if (!n) throw new Error("missing ttl");n *= 1e3;var r = { push: "https://" + e.push_server, stats: "https://" + e.stats_server, engine: "https://" + e.engine_server, api: "https://" + e.api_server };return t.AV._setServerURLs(r, !1), t.lock(n), o.setAsync("serverURLs", { serverURLs: r, lockedUntil: t.lockedUntil }, n);
          }
        }).catch(function (e) {
          console.warn("refresh server URLs failed: " + e.message), t.lock(600);
        });
      }
    }, t.exports = r;
  }, function (t, e, n) {
    "use strict"; /*!
                  * LeanCloud JavaScript SDK
                  * https://leancloud.cn
                  *
                  * Copyright 2016 LeanCloud.cn, Inc.
                  * The LeanCloud JavaScript SDK is freely distributable under the MIT license.
                  */

    n(26);var r = n(5);r._ = n(0), r.version = n(11), r.Promise = n(1), r.localStorage = n(10), r.Cache = n(9), r.Error = n(4), n(21), n(18)(r), n(20)(r), n(14)(r), n(25)(r), n(29)(r), n(19)(r), n(24)(r), n(30)(r), n(33)(r), n(28)(r), n(23)(r), n(15)(r), n(16)(r), n(27)(r), n(32)(r), n(31)(r), n(22)(r), r.Conversation = n(17), t.exports = r;
  }, function (t, e, n) {
    "use strict";
    t.exports = [];
  }, function (t, e, n) {
    "use strict";
    var r = n(11),
        i = ["Browser"].concat(n(36));t.exports = "LeanCloud-JS-SDK/" + r + " (" + i.join("; ") + ")";
  }, function (t, e, n) {
    "use strict";
    var r = n(7),
        i = n(6)("cos"),
        s = n(1);t.exports = function (t, e, n) {
      var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};n.attributes.url = t.url, n._bucket = t.bucket, n.id = t.objectId;var a = t.upload_url + "?sign=" + encodeURIComponent(t.token);return new s(function (t, s) {
        var u = r("POST", a).set(n._uploadHeaders).attach("fileContent", e, n.attributes.name).field("op", "upload");o.onprogress && u.on("progress", o.onprogress), u.end(function (e, r) {
          if (r && i(r.status, r.body, r.text), e) return r && (e.statusCode = r.status, e.responseText = r.text, e.response = r.body), s(e);t(n);
        });
      });
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(7),
        i = n(1),
        s = n(6)("qiniu");t.exports = function (t, e, n) {
      var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};n.attributes.url = t.url, n._bucket = t.bucket, n.id = t.objectId;var a = t.token,
          u = t.upload_url || "https://upload.qiniup.com";return new i(function (t, i) {
        var c = r("POST", u).set(n._uploadHeaders).attach("file", e, n.attributes.name).field("name", n.attributes.name).field("key", n._qiniu_key).field("token", a);o.onprogress && c.on("progress", o.onprogress), c.end(function (e, r) {
          if (r && s(r.status, r.body, r.text), e) return r && (e.statusCode = r.status, e.responseText = r.text, e.response = r.body), i(e);t(n);
        });
      });
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(7),
        i = n(1),
        s = function (t, e) {
      return e && (t.statusCode = e.status, t.responseText = e.text, t.response = e.body), t;
    };t.exports = function (t, e, n) {
      var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};return n.attributes.url = t.url, n._bucket = t.bucket, n.id = t.objectId, new i(function (i, a) {
        var u = r("PUT", t.upload_url).set(Object.assign({ "Content-Type": n.get("mime_type"), "Cache-Control": "public, max-age=31536000" }, n._uploadHeaders));o.onprogress && u.on("progress", o.onprogress), u.on("response", function (t) {
          if (t.ok) return i(n);a(s(t.error, t));
        }), u.on("error", function (t, e) {
          return a(s(t, e));
        }), u.send(e).end();
      });
    };
  }, function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(0),
          i = (n(1), {}),
          s = ["getItem", "setItem", "removeItem", "clear"],
          o = e.localStorage;try {
        var a = "__storejs__";if (o.setItem(a, a), o.getItem(a) != a) throw new Error();o.removeItem(a);
      } catch (t) {
        o = n(49);
      }r(s).each(function (t) {
        i[t] = function () {
          return o[t].apply(o, arguments);
        };
      }), i.async = !1, t.exports = i;
    }).call(e, n(8));
  }, function (t, e, n) {
    "use strict";
    var r = function (t, e) {
      var n;t.indexOf("base64") < 0 ? n = atob(t) : t.split(",")[0].indexOf("base64") >= 0 ? (e = e || t.split(",")[0].split(":")[1].split(";")[0], n = atob(t.split(",")[1])) : n = unescape(t.split(",")[1]);for (var r = new Uint8Array(n.length), i = 0; i < n.length; i++) r[i] = n.charCodeAt(i);return new Blob([r], { type: e });
    };t.exports = r;
  }, function (t, e, n) {
    function r(t) {
      if (t) return i(t);
    }function i(t) {
      for (var e in r.prototype) t[e] = r.prototype[e];return t;
    }t.exports = r, r.prototype.on = r.prototype.addEventListener = function (t, e) {
      return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
    }, r.prototype.once = function (t, e) {
      function n() {
        this.off(t, n), e.apply(this, arguments);
      }return n.fn = e, this.on(t, n), this;
    }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (t, e) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;var n = this._callbacks["$" + t];if (!n) return this;if (1 == arguments.length) return delete this._callbacks["$" + t], this;for (var r, i = 0; i < n.length; i++) if ((r = n[i]) === e || r.fn === e) {
        n.splice(i, 1);break;
      }return this;
    }, r.prototype.emit = function (t) {
      this._callbacks = this._callbacks || {};var e = [].slice.call(arguments, 1),
          n = this._callbacks["$" + t];if (n) {
        n = n.slice(0);for (var r = 0, i = n.length; r < i; ++r) n[r].apply(this, e);
      }return this;
    }, r.prototype.listeners = function (t) {
      return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
    }, r.prototype.hasListeners = function (t) {
      return !!this.listeners(t).length;
    };
  }, function (t, e) {
    !function () {
      var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          n = { rotl: function (t, e) {
          return t << e | t >>> 32 - e;
        }, rotr: function (t, e) {
          return t << 32 - e | t >>> e;
        }, endian: function (t) {
          if (t.constructor == Number) return 16711935 & n.rotl(t, 8) | 4278255360 & n.rotl(t, 24);for (var e = 0; e < t.length; e++) t[e] = n.endian(t[e]);return t;
        }, randomBytes: function (t) {
          for (var e = []; t > 0; t--) e.push(Math.floor(256 * Math.random()));return e;
        }, bytesToWords: function (t) {
          for (var e = [], n = 0, r = 0; n < t.length; n++, r += 8) e[r >>> 5] |= t[n] << 24 - r % 32;return e;
        }, wordsToBytes: function (t) {
          for (var e = [], n = 0; n < 32 * t.length; n += 8) e.push(t[n >>> 5] >>> 24 - n % 32 & 255);return e;
        }, bytesToHex: function (t) {
          for (var e = [], n = 0; n < t.length; n++) e.push((t[n] >>> 4).toString(16)), e.push((15 & t[n]).toString(16));return e.join("");
        }, hexToBytes: function (t) {
          for (var e = [], n = 0; n < t.length; n += 2) e.push(parseInt(t.substr(n, 2), 16));return e;
        }, bytesToBase64: function (t) {
          for (var n = [], r = 0; r < t.length; r += 3) for (var i = t[r] << 16 | t[r + 1] << 8 | t[r + 2], s = 0; s < 4; s++) 8 * r + 6 * s <= 8 * t.length ? n.push(e.charAt(i >>> 6 * (3 - s) & 63)) : n.push("=");return n.join("");
        }, base64ToBytes: function (t) {
          t = t.replace(/[^A-Z0-9+\/]/gi, "");for (var n = [], r = 0, i = 0; r < t.length; i = ++r % 4) 0 != i && n.push((e.indexOf(t.charAt(r - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | e.indexOf(t.charAt(r)) >>> 6 - 2 * i);return n;
        } };t.exports = n;
    }();
  }, function (t, e, n) {
    function r(t) {
      var n,
          r = 0;for (n in t) r = (r << 5) - r + t.charCodeAt(n), r |= 0;return e.colors[Math.abs(r) % e.colors.length];
    }function i(t) {
      function n() {
        if (n.enabled) {
          var t = n,
              r = +new Date(),
              s = r - (i || r);t.diff = s, t.prev = i, t.curr = r, i = r;for (var o = new Array(arguments.length), a = 0; a < o.length; a++) o[a] = arguments[a];o[0] = e.coerce(o[0]), "string" != typeof o[0] && o.unshift("%O");var u = 0;o[0] = o[0].replace(/%([a-zA-Z%])/g, function (n, r) {
            if ("%%" === n) return n;u++;var i = e.formatters[r];if ("function" == typeof i) {
              var s = o[u];n = i.call(t, s), o.splice(u, 1), u--;
            }return n;
          }), e.formatArgs.call(t, o);(n.log || e.log || console.log.bind(console)).apply(t, o);
        }
      }var i;return n.namespace = t, n.enabled = e.enabled(t), n.useColors = e.useColors(), n.color = r(t), n.destroy = s, "function" == typeof e.init && e.init(n), e.instances.push(n), n;
    }function s() {
      var t = e.instances.indexOf(this);return -1 !== t && (e.instances.splice(t, 1), !0);
    }function o(t) {
      e.save(t), e.names = [], e.skips = [];var n,
          r = ("string" == typeof t ? t : "").split(/[\s,]+/),
          i = r.length;for (n = 0; n < i; n++) r[n] && (t = r[n].replace(/\*/g, ".*?"), "-" === t[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));for (n = 0; n < e.instances.length; n++) {
        var s = e.instances[n];s.enabled = e.enabled(s.namespace);
      }
    }function a() {
      e.enable("");
    }function u(t) {
      if ("*" === t[t.length - 1]) return !0;var n, r;for (n = 0, r = e.skips.length; n < r; n++) if (e.skips[n].test(t)) return !1;for (n = 0, r = e.names.length; n < r; n++) if (e.names[n].test(t)) return !0;return !1;
    }function c(t) {
      return t instanceof Error ? t.stack || t.message : t;
    }e = t.exports = i.debug = i.default = i, e.coerce = c, e.disable = a, e.enable = o, e.enabled = u, e.humanize = n(51), e.instances = [], e.names = [], e.skips = [], e.formatters = {};
  }, function (t, e, n) {
    (function (e) {
      /*!
      * @overview es6-promise - a tiny implementation of Promises/A+.
      * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
      * @license   Licensed under MIT license
      *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
      * @version   v4.2.4+314e4831
      */
      !function (e, n) {
        t.exports = n();
      }(0, function () {
        "use strict";
        function t(t) {
          var e = typeof t;return null !== t && ("object" === e || "function" === e);
        }function n(t) {
          return "function" == typeof t;
        }function r(t) {
          M = t;
        }function i(t) {
          B = t;
        }function s() {
          return void 0 !== q ? function () {
            q(a);
          } : o();
        }function o() {
          var t = setTimeout;return function () {
            return t(a, 1);
          };
        }function a() {
          for (var t = 0; t < L; t += 2) {
            (0, z[t])(z[t + 1]), z[t] = void 0, z[t + 1] = void 0;
          }L = 0;
        }function u(t, e) {
          var n = this,
              r = new this.constructor(l);void 0 === r[G] && N(r);var i = n._state;if (i) {
            var s = arguments[i - 1];B(function () {
              return C(i, r, s, n._result);
            });
          } else O(n, r, t, e);return r;
        }function c(t) {
          var e = this;if (t && "object" == typeof t && t.constructor === e) return t;var n = new e(l);return m(n, t), n;
        }function l() {}function h() {
          return new TypeError("You cannot resolve a promise with itself");
        }function f() {
          return new TypeError("A promises callback cannot return that same promise.");
        }function d(t) {
          try {
            return t.then;
          } catch (t) {
            return Z.error = t, Z;
          }
        }function p(t, e, n, r) {
          try {
            t.call(e, n, r);
          } catch (t) {
            return t;
          }
        }function _(t, e, n) {
          B(function (t) {
            var r = !1,
                i = p(n, e, function (n) {
              r || (r = !0, e !== n ? m(t, n) : b(t, n));
            }, function (e) {
              r || (r = !0, w(t, e));
            }, "Settle: " + (t._label || " unknown promise"));!r && i && (r = !0, w(t, i));
          }, t);
        }function v(t, e) {
          e._state === X ? b(t, e._result) : e._state === Y ? w(t, e._result) : O(e, void 0, function (e) {
            return m(t, e);
          }, function (e) {
            return w(t, e);
          });
        }function y(t, e, r) {
          e.constructor === t.constructor && r === u && e.constructor.resolve === c ? v(t, e) : r === Z ? (w(t, Z.error), Z.error = null) : void 0 === r ? b(t, e) : n(r) ? _(t, e, r) : b(t, e);
        }function m(e, n) {
          e === n ? w(e, h()) : t(n) ? y(e, n, d(n)) : b(e, n);
        }function g(t) {
          t._onerror && t._onerror(t._result), S(t);
        }function b(t, e) {
          t._state === $ && (t._result = e, t._state = X, 0 !== t._subscribers.length && B(S, t));
        }function w(t, e) {
          t._state === $ && (t._state = Y, t._result = e, B(g, t));
        }function O(t, e, n, r) {
          var i = t._subscribers,
              s = i.length;t._onerror = null, i[s] = e, i[s + X] = n, i[s + Y] = r, 0 === s && t._state && B(S, t);
        }function S(t) {
          var e = t._subscribers,
              n = t._state;if (0 !== e.length) {
            for (var r = void 0, i = void 0, s = t._result, o = 0; o < e.length; o += 3) r = e[o], i = e[o + n], r ? C(n, r, i, s) : i(s);t._subscribers.length = 0;
          }
        }function A(t, e) {
          try {
            return t(e);
          } catch (t) {
            return Z.error = t, Z;
          }
        }function C(t, e, r, i) {
          var s = n(r),
              o = void 0,
              a = void 0,
              u = void 0,
              c = void 0;if (s) {
            if (o = A(r, i), o === Z ? (c = !0, a = o.error, o.error = null) : u = !0, e === o) return void w(e, f());
          } else o = i, u = !0;e._state !== $ || (s && u ? m(e, o) : c ? w(e, a) : t === X ? b(e, o) : t === Y && w(e, o));
        }function E(t, e) {
          try {
            e(function (e) {
              m(t, e);
            }, function (e) {
              w(t, e);
            });
          } catch (e) {
            w(t, e);
          }
        }function T() {
          return tt++;
        }function N(t) {
          t[G] = tt++, t._state = void 0, t._result = void 0, t._subscribers = [];
        }function j() {
          return new Error("Array Methods must be provided an Array");
        }function x(t) {
          return new et(this, t).promise;
        }function U(t) {
          var e = this;return new e(F(t) ? function (n, r) {
            for (var i = t.length, s = 0; s < i; s++) e.resolve(t[s]).then(n, r);
          } : function (t, e) {
            return e(new TypeError("You must pass an array to race."));
          });
        }function k(t) {
          var e = this,
              n = new e(l);return w(n, t), n;
        }function I() {
          throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
        }function R() {
          throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }function P() {
          var t = void 0;if (void 0 !== e) t = e;else if ("undefined" != typeof self) t = self;else try {
            t = Function("return this")();
          } catch (t) {
            throw new Error("polyfill failed because global object is unavailable in this environment");
          }var n = t.Promise;if (n) {
            var r = null;try {
              r = Object.prototype.toString.call(n.resolve());
            } catch (t) {}if ("[object Promise]" === r && !n.cast) return;
          }t.Promise = nt;
        }var D = void 0;D = Array.isArray ? Array.isArray : function (t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        };var F = D,
            L = 0,
            q = void 0,
            M = void 0,
            B = function (t, e) {
          z[L] = t, z[L + 1] = e, 2 === (L += 2) && (M ? M(a) : H());
        },
            J = "undefined" != typeof window ? window : void 0,
            Q = J || {},
            V = Q.MutationObserver || Q.WebKitMutationObserver,
            W = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
            K = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
            z = new Array(1e3),
            H = void 0;H = W ? function () {
          return function () {
            return process.nextTick(a);
          };
        }() : V ? function () {
          var t = 0,
              e = new V(a),
              n = document.createTextNode("");return e.observe(n, { characterData: !0 }), function () {
            n.data = t = ++t % 2;
          };
        }() : K ? function () {
          var t = new MessageChannel();return t.port1.onmessage = a, function () {
            return t.port2.postMessage(0);
          };
        }() : void 0 === J ? function () {
          try {
            var t = Function("return this")().require("vertx");return q = t.runOnLoop || t.runOnContext, s();
          } catch (t) {
            return o();
          }
        }() : o();var G = Math.random().toString(36).substring(2),
            $ = void 0,
            X = 1,
            Y = 2,
            Z = { error: null },
            tt = 0,
            et = function () {
          function t(t, e) {
            this._instanceConstructor = t, this.promise = new t(l), this.promise[G] || N(this.promise), F(e) ? (this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? b(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(e), 0 === this._remaining && b(this.promise, this._result))) : w(this.promise, j());
          }return t.prototype._enumerate = function (t) {
            for (var e = 0; this._state === $ && e < t.length; e++) this._eachEntry(t[e], e);
          }, t.prototype._eachEntry = function (t, e) {
            var n = this._instanceConstructor,
                r = n.resolve;if (r === c) {
              var i = d(t);if (i === u && t._state !== $) this._settledAt(t._state, e, t._result);else if ("function" != typeof i) this._remaining--, this._result[e] = t;else if (n === nt) {
                var s = new n(l);y(s, t, i), this._willSettleAt(s, e);
              } else this._willSettleAt(new n(function (e) {
                return e(t);
              }), e);
            } else this._willSettleAt(r(t), e);
          }, t.prototype._settledAt = function (t, e, n) {
            var r = this.promise;r._state === $ && (this._remaining--, t === Y ? w(r, n) : this._result[e] = n), 0 === this._remaining && b(r, this._result);
          }, t.prototype._willSettleAt = function (t, e) {
            var n = this;O(t, void 0, function (t) {
              return n._settledAt(X, e, t);
            }, function (t) {
              return n._settledAt(Y, e, t);
            });
          }, t;
        }(),
            nt = function () {
          function t(e) {
            this[G] = T(), this._result = this._state = void 0, this._subscribers = [], l !== e && ("function" != typeof e && I(), this instanceof t ? E(this, e) : R());
          }return t.prototype.catch = function (t) {
            return this.then(null, t);
          }, t.prototype.finally = function (t) {
            var e = this,
                n = e.constructor;return e.then(function (e) {
              return n.resolve(t()).then(function () {
                return e;
              });
            }, function (e) {
              return n.resolve(t()).then(function () {
                throw e;
              });
            });
          }, t;
        }();return nt.prototype.then = u, nt.all = x, nt.race = U, nt.resolve = c, nt.reject = k, nt._setScheduler = r, nt._setAsap = i, nt._asap = B, nt.polyfill = P, nt.Promise = nt, nt;
      });
    }).call(e, n(8));
  }, function (t, e, n) {
    "use strict";
    function r() {}function i(t, e, n) {
      this.fn = t, this.context = e, this.once = n || !1;
    }function s() {
      this._events = new r(), this._eventsCount = 0;
    }var o = Object.prototype.hasOwnProperty,
        a = "~";Object.create && (r.prototype = Object.create(null), new r().__proto__ || (a = !1)), s.prototype.eventNames = function () {
      var t,
          e,
          n = [];if (0 === this._eventsCount) return n;for (e in t = this._events) o.call(t, e) && n.push(a ? e.slice(1) : e);return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n;
    }, s.prototype.listeners = function (t, e) {
      var n = a ? a + t : t,
          r = this._events[n];if (e) return !!r;if (!r) return [];if (r.fn) return [r.fn];for (var i = 0, s = r.length, o = new Array(s); i < s; i++) o[i] = r[i].fn;return o;
    }, s.prototype.emit = function (t, e, n, r, i, s) {
      var o = a ? a + t : t;if (!this._events[o]) return !1;var u,
          c,
          l = this._events[o],
          h = arguments.length;if (l.fn) {
        switch (l.once && this.removeListener(t, l.fn, void 0, !0), h) {case 1:
            return l.fn.call(l.context), !0;case 2:
            return l.fn.call(l.context, e), !0;case 3:
            return l.fn.call(l.context, e, n), !0;case 4:
            return l.fn.call(l.context, e, n, r), !0;case 5:
            return l.fn.call(l.context, e, n, r, i), !0;case 6:
            return l.fn.call(l.context, e, n, r, i, s), !0;}for (c = 1, u = new Array(h - 1); c < h; c++) u[c - 1] = arguments[c];l.fn.apply(l.context, u);
      } else {
        var f,
            d = l.length;for (c = 0; c < d; c++) switch (l[c].once && this.removeListener(t, l[c].fn, void 0, !0), h) {case 1:
            l[c].fn.call(l[c].context);break;case 2:
            l[c].fn.call(l[c].context, e);break;case 3:
            l[c].fn.call(l[c].context, e, n);break;case 4:
            l[c].fn.call(l[c].context, e, n, r);break;default:
            if (!u) for (f = 1, u = new Array(h - 1); f < h; f++) u[f - 1] = arguments[f];l[c].fn.apply(l[c].context, u);}
      }return !0;
    }, s.prototype.on = function (t, e, n) {
      var r = new i(e, n || this),
          s = a ? a + t : t;return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], r] : this._events[s].push(r) : (this._events[s] = r, this._eventsCount++), this;
    }, s.prototype.once = function (t, e, n) {
      var r = new i(e, n || this, !0),
          s = a ? a + t : t;return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], r] : this._events[s].push(r) : (this._events[s] = r, this._eventsCount++), this;
    }, s.prototype.removeListener = function (t, e, n, i) {
      var s = a ? a + t : t;if (!this._events[s]) return this;if (!e) return 0 == --this._eventsCount ? this._events = new r() : delete this._events[s], this;var o = this._events[s];if (o.fn) o.fn !== e || i && !o.once || n && o.context !== n || (0 == --this._eventsCount ? this._events = new r() : delete this._events[s]);else {
        for (var u = 0, c = [], l = o.length; u < l; u++) (o[u].fn !== e || i && !o[u].once || n && o[u].context !== n) && c.push(o[u]);c.length ? this._events[s] = 1 === c.length ? c[0] : c : 0 == --this._eventsCount ? this._events = new r() : delete this._events[s];
      }return this;
    }, s.prototype.removeAllListeners = function (t) {
      var e;return t ? (e = a ? a + t : t, this._events[e] && (0 == --this._eventsCount ? this._events = new r() : delete this._events[e])) : (this._events = new r(), this._eventsCount = 0), this;
    }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prototype.setMaxListeners = function () {
      return this;
    }, s.prefixed = a, s.EventEmitter = s, t.exports = s;
  }, function (t, e) {
    function n(t) {
      return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t);
    }function r(t) {
      return "function" == typeof t.readFloatLE && "function" == typeof t.slice && n(t.slice(0, 0));
    } /*!
      * Determine if an object is a Buffer
      *
      * @author   Feross Aboukhadijeh <https://feross.org>
      * @license  MIT
      */
    t.exports = function (t) {
      return null != t && (n(t) || r(t) || !!t._isBuffer);
    };
  }, function (t, e, n) {
    !function (e) {
      var n = {},
          r = {};n.length = 0, n.getItem = function (t) {
        return r[t] || null;
      }, n.setItem = function (t, e) {
        void 0 === e ? n.removeItem(t) : (r.hasOwnProperty(t) || n.length++, r[t] = "" + e);
      }, n.removeItem = function (t) {
        r.hasOwnProperty(t) && (delete r[t], n.length--);
      }, n.key = function (t) {
        return Object.keys(r)[t] || null;
      }, n.clear = function () {
        r = {}, n.length = 0;
      }, t.exports = n;
    }();
  }, function (t, e, n) {
    !function () {
      var e = n(44),
          r = n(12).utf8,
          i = n(48),
          s = n(12).bin,
          o = function (t, n) {
        t.constructor == String ? t = n && "binary" === n.encoding ? s.stringToBytes(t) : r.stringToBytes(t) : i(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || (t = t.toString());for (var a = e.bytesToWords(t), u = 8 * t.length, c = 1732584193, l = -271733879, h = -1732584194, f = 271733878, d = 0; d < a.length; d++) a[d] = 16711935 & (a[d] << 8 | a[d] >>> 24) | 4278255360 & (a[d] << 24 | a[d] >>> 8);a[u >>> 5] |= 128 << u % 32, a[14 + (u + 64 >>> 9 << 4)] = u;for (var p = o._ff, _ = o._gg, v = o._hh, y = o._ii, d = 0; d < a.length; d += 16) {
          var m = c,
              g = l,
              b = h,
              w = f;c = p(c, l, h, f, a[d + 0], 7, -680876936), f = p(f, c, l, h, a[d + 1], 12, -389564586), h = p(h, f, c, l, a[d + 2], 17, 606105819), l = p(l, h, f, c, a[d + 3], 22, -1044525330), c = p(c, l, h, f, a[d + 4], 7, -176418897), f = p(f, c, l, h, a[d + 5], 12, 1200080426), h = p(h, f, c, l, a[d + 6], 17, -1473231341), l = p(l, h, f, c, a[d + 7], 22, -45705983), c = p(c, l, h, f, a[d + 8], 7, 1770035416), f = p(f, c, l, h, a[d + 9], 12, -1958414417), h = p(h, f, c, l, a[d + 10], 17, -42063), l = p(l, h, f, c, a[d + 11], 22, -1990404162), c = p(c, l, h, f, a[d + 12], 7, 1804603682), f = p(f, c, l, h, a[d + 13], 12, -40341101), h = p(h, f, c, l, a[d + 14], 17, -1502002290), l = p(l, h, f, c, a[d + 15], 22, 1236535329), c = _(c, l, h, f, a[d + 1], 5, -165796510), f = _(f, c, l, h, a[d + 6], 9, -1069501632), h = _(h, f, c, l, a[d + 11], 14, 643717713), l = _(l, h, f, c, a[d + 0], 20, -373897302), c = _(c, l, h, f, a[d + 5], 5, -701558691), f = _(f, c, l, h, a[d + 10], 9, 38016083), h = _(h, f, c, l, a[d + 15], 14, -660478335), l = _(l, h, f, c, a[d + 4], 20, -405537848), c = _(c, l, h, f, a[d + 9], 5, 568446438), f = _(f, c, l, h, a[d + 14], 9, -1019803690), h = _(h, f, c, l, a[d + 3], 14, -187363961), l = _(l, h, f, c, a[d + 8], 20, 1163531501), c = _(c, l, h, f, a[d + 13], 5, -1444681467), f = _(f, c, l, h, a[d + 2], 9, -51403784), h = _(h, f, c, l, a[d + 7], 14, 1735328473), l = _(l, h, f, c, a[d + 12], 20, -1926607734), c = v(c, l, h, f, a[d + 5], 4, -378558), f = v(f, c, l, h, a[d + 8], 11, -2022574463), h = v(h, f, c, l, a[d + 11], 16, 1839030562), l = v(l, h, f, c, a[d + 14], 23, -35309556), c = v(c, l, h, f, a[d + 1], 4, -1530992060), f = v(f, c, l, h, a[d + 4], 11, 1272893353), h = v(h, f, c, l, a[d + 7], 16, -155497632), l = v(l, h, f, c, a[d + 10], 23, -1094730640), c = v(c, l, h, f, a[d + 13], 4, 681279174), f = v(f, c, l, h, a[d + 0], 11, -358537222), h = v(h, f, c, l, a[d + 3], 16, -722521979), l = v(l, h, f, c, a[d + 6], 23, 76029189), c = v(c, l, h, f, a[d + 9], 4, -640364487), f = v(f, c, l, h, a[d + 12], 11, -421815835), h = v(h, f, c, l, a[d + 15], 16, 530742520), l = v(l, h, f, c, a[d + 2], 23, -995338651), c = y(c, l, h, f, a[d + 0], 6, -198630844), f = y(f, c, l, h, a[d + 7], 10, 1126891415), h = y(h, f, c, l, a[d + 14], 15, -1416354905), l = y(l, h, f, c, a[d + 5], 21, -57434055), c = y(c, l, h, f, a[d + 12], 6, 1700485571), f = y(f, c, l, h, a[d + 3], 10, -1894986606), h = y(h, f, c, l, a[d + 10], 15, -1051523), l = y(l, h, f, c, a[d + 1], 21, -2054922799), c = y(c, l, h, f, a[d + 8], 6, 1873313359), f = y(f, c, l, h, a[d + 15], 10, -30611744), h = y(h, f, c, l, a[d + 6], 15, -1560198380), l = y(l, h, f, c, a[d + 13], 21, 1309151649), c = y(c, l, h, f, a[d + 4], 6, -145523070), f = y(f, c, l, h, a[d + 11], 10, -1120210379), h = y(h, f, c, l, a[d + 2], 15, 718787259), l = y(l, h, f, c, a[d + 9], 21, -343485551), c = c + m >>> 0, l = l + g >>> 0, h = h + b >>> 0, f = f + w >>> 0;
        }return e.endian([c, l, h, f]);
      };o._ff = function (t, e, n, r, i, s, o) {
        var a = t + (e & n | ~e & r) + (i >>> 0) + o;return (a << s | a >>> 32 - s) + e;
      }, o._gg = function (t, e, n, r, i, s, o) {
        var a = t + (e & r | n & ~r) + (i >>> 0) + o;return (a << s | a >>> 32 - s) + e;
      }, o._hh = function (t, e, n, r, i, s, o) {
        var a = t + (e ^ n ^ r) + (i >>> 0) + o;return (a << s | a >>> 32 - s) + e;
      }, o._ii = function (t, e, n, r, i, s, o) {
        var a = t + (n ^ (e | ~r)) + (i >>> 0) + o;return (a << s | a >>> 32 - s) + e;
      }, o._blocksize = 16, o._digestsize = 16, t.exports = function (t, n) {
        if (void 0 === t || null === t) throw new Error("Illegal argument " + t);var r = e.wordsToBytes(o(t, n));return n && n.asBytes ? r : n && n.asString ? s.bytesToString(r) : e.bytesToHex(r);
      };
    }();
  }, function (t, e) {
    function n(t) {
      if (t = String(t), !(t.length > 100)) {
        var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if (e) {
          var n = parseFloat(e[1]);switch ((e[2] || "ms").toLowerCase()) {case "years":case "year":case "yrs":case "yr":case "y":
              return n * l;case "days":case "day":case "d":
              return n * c;case "hours":case "hour":case "hrs":case "hr":case "h":
              return n * u;case "minutes":case "minute":case "mins":case "min":case "m":
              return n * a;case "seconds":case "second":case "secs":case "sec":case "s":
              return n * o;case "milliseconds":case "millisecond":case "msecs":case "msec":case "ms":
              return n;default:
              return;}
        }
      }
    }function r(t) {
      return t >= c ? Math.round(t / c) + "d" : t >= u ? Math.round(t / u) + "h" : t >= a ? Math.round(t / a) + "m" : t >= o ? Math.round(t / o) + "s" : t + "ms";
    }function i(t) {
      return s(t, c, "day") || s(t, u, "hour") || s(t, a, "minute") || s(t, o, "second") || t + " ms";
    }function s(t, e, n) {
      if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s";
    }var o = 1e3,
        a = 60 * o,
        u = 60 * a,
        c = 24 * u,
        l = 365.25 * c;t.exports = function (t, e) {
      e = e || {};var s = typeof t;if ("string" === s && t.length > 0) return n(t);if ("number" === s && !1 === isNaN(t)) return e.long ? i(t) : r(t);throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t));
    };
  }, function (t, e) {
    function n() {
      this._defaults = [];
    }["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function (t) {
      n.prototype[t] = function () {
        return this._defaults.push({ fn: t, arguments: arguments }), this;
      };
    }), n.prototype._setDefaults = function (t) {
      this._defaults.forEach(function (e) {
        t[e.fn].apply(t, e.arguments);
      });
    }, t.exports = n;
  }, function (t, e, n) {
    "use strict";
    function r(t) {
      if (t) return i(t);
    }function i(t) {
      for (var e in r.prototype) t[e] = r.prototype[e];return t;
    }var s = n(13);t.exports = r, r.prototype.clearTimeout = function () {
      return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, this;
    }, r.prototype.parse = function (t) {
      return this._parser = t, this;
    }, r.prototype.responseType = function (t) {
      return this._responseType = t, this;
    }, r.prototype.serialize = function (t) {
      return this._serializer = t, this;
    }, r.prototype.timeout = function (t) {
      if (!t || "object" != typeof t) return this._timeout = t, this._responseTimeout = 0, this;for (var e in t) switch (e) {case "deadline":
          this._timeout = t.deadline;break;case "response":
          this._responseTimeout = t.response;break;default:
          console.warn("Unknown timeout option", e);}return this;
    }, r.prototype.retry = function (t, e) {
      return 0 !== arguments.length && !0 !== t || (t = 1), t <= 0 && (t = 0), this._maxRetries = t, this._retries = 0, this._retryCallback = e, this;
    };var o = ["ECONNRESET", "ETIMEDOUT", "EADDRINFO", "ESOCKETTIMEDOUT"];r.prototype._shouldRetry = function (t, e) {
      if (!this._maxRetries || this._retries++ >= this._maxRetries) return !1;if (this._retryCallback) try {
        var n = this._retryCallback(t, e);if (!0 === n) return !0;if (!1 === n) return !1;
      } catch (t) {
        console.error(t);
      }if (e && e.status && e.status >= 500 && 501 != e.status) return !0;if (t) {
        if (t.code && ~o.indexOf(t.code)) return !0;if (t.timeout && "ECONNABORTED" == t.code) return !0;if (t.crossDomain) return !0;
      }return !1;
    }, r.prototype._retry = function () {
      return this.clearTimeout(), this.req && (this.req = null, this.req = this.request()), this._aborted = !1, this.timedout = !1, this._end();
    }, r.prototype.then = function (t, e) {
      if (!this._fullfilledPromise) {
        var n = this;this._endCalled && console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"), this._fullfilledPromise = new Promise(function (t, e) {
          n.end(function (n, r) {
            n ? e(n) : t(r);
          });
        });
      }return this._fullfilledPromise.then(t, e);
    }, r.prototype.catch = function (t) {
      return this.then(void 0, t);
    }, r.prototype.use = function (t) {
      return t(this), this;
    }, r.prototype.ok = function (t) {
      if ("function" != typeof t) throw Error("Callback required");return this._okCallback = t, this;
    }, r.prototype._isResponseOK = function (t) {
      return !!t && (this._okCallback ? this._okCallback(t) : t.status >= 200 && t.status < 300);
    }, r.prototype.get = function (t) {
      return this._header[t.toLowerCase()];
    }, r.prototype.getHeader = r.prototype.get, r.prototype.set = function (t, e) {
      if (s(t)) {
        for (var n in t) this.set(n, t[n]);return this;
      }return this._header[t.toLowerCase()] = e, this.header[t] = e, this;
    }, r.prototype.unset = function (t) {
      return delete this._header[t.toLowerCase()], delete this.header[t], this;
    }, r.prototype.field = function (t, e) {
      if (null === t || void 0 === t) throw new Error(".field(name, val) name can not be empty");if (this._data && console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"), s(t)) {
        for (var n in t) this.field(n, t[n]);return this;
      }if (Array.isArray(e)) {
        for (var r in e) this.field(t, e[r]);return this;
      }if (null === e || void 0 === e) throw new Error(".field(name, val) val can not be empty");return "boolean" == typeof e && (e = "" + e), this._getFormData().append(t, e), this;
    }, r.prototype.abort = function () {
      return this._aborted ? this : (this._aborted = !0, this.xhr && this.xhr.abort(), this.req && this.req.abort(), this.clearTimeout(), this.emit("abort"), this);
    }, r.prototype._auth = function (t, e, n, r) {
      switch (n.type) {case "basic":
          this.set("Authorization", "Basic " + r(t + ":" + e));break;case "auto":
          this.username = t, this.password = e;break;case "bearer":
          this.set("Authorization", "Bearer " + t);}return this;
    }, r.prototype.withCredentials = function (t) {
      return void 0 == t && (t = !0), this._withCredentials = t, this;
    }, r.prototype.redirects = function (t) {
      return this._maxRedirects = t, this;
    }, r.prototype.maxResponseSize = function (t) {
      if ("number" != typeof t) throw TypeError("Invalid argument");return this._maxResponseSize = t, this;
    }, r.prototype.toJSON = function () {
      return { method: this.method, url: this.url, data: this._data, headers: this._header };
    }, r.prototype.send = function (t) {
      var e = s(t),
          n = this._header["content-type"];if (this._formData && console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"), e && !this._data) Array.isArray(t) ? this._data = [] : this._isHost(t) || (this._data = {});else if (t && this._data && this._isHost(this._data)) throw Error("Can't merge these send calls");if (e && s(this._data)) for (var r in t) this._data[r] = t[r];else "string" == typeof t ? (n || this.type("form"), n = this._header["content-type"], this._data = "application/x-www-form-urlencoded" == n ? this._data ? this._data + "&" + t : t : (this._data || "") + t) : this._data = t;return !e || this._isHost(t) ? this : (n || this.type("json"), this);
    }, r.prototype.sortQuery = function (t) {
      return this._sort = void 0 === t || t, this;
    }, r.prototype._finalizeQueryString = function () {
      var t = this._query.join("&");if (t && (this.url += (this.url.indexOf("?") >= 0 ? "&" : "?") + t), this._query.length = 0, this._sort) {
        var e = this.url.indexOf("?");if (e >= 0) {
          var n = this.url.substring(e + 1).split("&");"function" == typeof this._sort ? n.sort(this._sort) : n.sort(), this.url = this.url.substring(0, e) + "?" + n.join("&");
        }
      }
    }, r.prototype._appendQueryString = function () {
      console.trace("Unsupported");
    }, r.prototype._timeoutError = function (t, e, n) {
      if (!this._aborted) {
        var r = new Error(t + e + "ms exceeded");r.timeout = e, r.code = "ECONNABORTED", r.errno = n, this.timedout = !0, this.abort(), this.callback(r);
      }
    }, r.prototype._setTimeouts = function () {
      var t = this;this._timeout && !this._timer && (this._timer = setTimeout(function () {
        t._timeoutError("Timeout of ", t._timeout, "ETIME");
      }, this._timeout)), this._responseTimeout && !this._responseTimeoutTimer && (this._responseTimeoutTimer = setTimeout(function () {
        t._timeoutError("Response timeout of ", t._responseTimeout, "ETIMEDOUT");
      }, this._responseTimeout));
    };
  }, function (t, e, n) {
    "use strict";
    function r(t) {
      if (t) return i(t);
    }function i(t) {
      for (var e in r.prototype) t[e] = r.prototype[e];return t;
    }var s = n(55);t.exports = r, r.prototype.get = function (t) {
      return this.header[t.toLowerCase()];
    }, r.prototype._setHeaderProperties = function (t) {
      var e = t["content-type"] || "";this.type = s.type(e);var n = s.params(e);for (var r in n) this[r] = n[r];this.links = {};try {
        t.link && (this.links = s.parseLinks(t.link));
      } catch (t) {}
    }, r.prototype._setStatusProperties = function (t) {
      var e = t / 100 | 0;this.status = this.statusCode = t, this.statusType = e, this.info = 1 == e, this.ok = 2 == e, this.redirect = 3 == e, this.clientError = 4 == e, this.serverError = 5 == e, this.error = (4 == e || 5 == e) && this.toError(), this.accepted = 202 == t, this.noContent = 204 == t, this.badRequest = 400 == t, this.unauthorized = 401 == t, this.notAcceptable = 406 == t, this.forbidden = 403 == t, this.notFound = 404 == t;
    };
  }, function (t, e, n) {
    "use strict";
    e.type = function (t) {
      return t.split(/ *; */).shift();
    }, e.params = function (t) {
      return t.split(/ *; */).reduce(function (t, e) {
        var n = e.split(/ *= */),
            r = n.shift(),
            i = n.shift();return r && i && (t[r] = i), t;
      }, {});
    }, e.parseLinks = function (t) {
      return t.split(/ *, */).reduce(function (t, e) {
        var n = e.split(/ *; */),
            r = n[0].slice(1, -1);return t[n[1].split(/ *= */)[1].slice(1, -1)] = r, t;
      }, {});
    }, e.cleanHeader = function (t, e) {
      return delete t["content-type"], delete t["content-length"], delete t["transfer-encoding"], delete t.host, e && (delete t.authorization, delete t.cookie), t;
    };
  }]);
});
//# sourceMappingURL=av-min.js.map
},{"process":20}],23:[function(require,module,exports) {
const AV = require('leancloud-storage');
const appId = 'UJqXLqhpKuxusuM7IUUfSToE-gzGzoHsz';
const appKey = '1u5ACnMw1f9fDEKDGF1vhTJB';
AV.init({ appId, appKey });

},{"leancloud-storage":24}],17:[function(require,module,exports) {
var global = (1,eval)("this");
var process = require("process");
/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{"process":20}],19:[function(require,module,exports) {
var global = (1,eval)("this");
/*!
 * fullPage 2.9.6
 * https://github.com/alvarotrigo/fullPage.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
(function(global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
          return factory($, global, global.document, global.Math);
        });
    } else if (typeof exports === "object" && exports) {
        module.exports = factory(require('jquery'), global, global.document, global.Math);
    } else {
        factory(jQuery, global, global.document, global.Math);
    }
})(typeof window !== 'undefined' ? window : this, function($, window, document, Math, undefined) {
    'use strict';

    // keeping central set of classnames and selectors
    var WRAPPER =               'fullpage-wrapper';
    var WRAPPER_SEL =           '.' + WRAPPER;

    // slimscroll
    var SCROLLABLE =            'fp-scrollable';
    var SCROLLABLE_SEL =        '.' + SCROLLABLE;

    // util
    var RESPONSIVE =            'fp-responsive';
    var NO_TRANSITION =         'fp-notransition';
    var DESTROYED =             'fp-destroyed';
    var ENABLED =               'fp-enabled';
    var VIEWING_PREFIX =        'fp-viewing';
    var ACTIVE =                'active';
    var ACTIVE_SEL =            '.' + ACTIVE;
    var COMPLETELY =            'fp-completely';
    var COMPLETELY_SEL =        '.' + COMPLETELY;

    // section
    var SECTION_DEFAULT_SEL =   '.section';
    var SECTION =               'fp-section';
    var SECTION_SEL =           '.' + SECTION;
    var SECTION_ACTIVE_SEL =    SECTION_SEL + ACTIVE_SEL;
    var SECTION_FIRST_SEL =     SECTION_SEL + ':first';
    var SECTION_LAST_SEL =      SECTION_SEL + ':last';
    var TABLE_CELL =            'fp-tableCell';
    var TABLE_CELL_SEL =        '.' + TABLE_CELL;
    var AUTO_HEIGHT =           'fp-auto-height';
    var AUTO_HEIGHT_SEL =       '.fp-auto-height';
    var NORMAL_SCROLL =         'fp-normal-scroll';
    var NORMAL_SCROLL_SEL =     '.fp-normal-scroll';

    // section nav
    var SECTION_NAV =           'fp-nav';
    var SECTION_NAV_SEL =       '#' + SECTION_NAV;
    var SECTION_NAV_TOOLTIP =   'fp-tooltip';
    var SECTION_NAV_TOOLTIP_SEL='.'+SECTION_NAV_TOOLTIP;
    var SHOW_ACTIVE_TOOLTIP =   'fp-show-active';

    // slide
    var SLIDE_DEFAULT_SEL =     '.slide';
    var SLIDE =                 'fp-slide';
    var SLIDE_SEL =             '.' + SLIDE;
    var SLIDE_ACTIVE_SEL =      SLIDE_SEL + ACTIVE_SEL;
    var SLIDES_WRAPPER =        'fp-slides';
    var SLIDES_WRAPPER_SEL =    '.' + SLIDES_WRAPPER;
    var SLIDES_CONTAINER =      'fp-slidesContainer';
    var SLIDES_CONTAINER_SEL =  '.' + SLIDES_CONTAINER;
    var TABLE =                 'fp-table';

    // slide nav
    var SLIDES_NAV =            'fp-slidesNav';
    var SLIDES_NAV_SEL =        '.' + SLIDES_NAV;
    var SLIDES_NAV_LINK_SEL =   SLIDES_NAV_SEL + ' a';
    var SLIDES_ARROW =          'fp-controlArrow';
    var SLIDES_ARROW_SEL =      '.' + SLIDES_ARROW;
    var SLIDES_PREV =           'fp-prev';
    var SLIDES_PREV_SEL =       '.' + SLIDES_PREV;
    var SLIDES_ARROW_PREV =     SLIDES_ARROW + ' ' + SLIDES_PREV;
    var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
    var SLIDES_NEXT =           'fp-next';
    var SLIDES_NEXT_SEL =       '.' + SLIDES_NEXT;
    var SLIDES_ARROW_NEXT =     SLIDES_ARROW + ' ' + SLIDES_NEXT;
    var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;

    var $window = $(window);
    var $document = $(document);

    $.fn.fullpage = function(options) {
        //only once my friend!
        if($('html').hasClass(ENABLED)){ displayWarnings(); return; }

        // common jQuery objects
        var $htmlBody = $('html, body');
        var $body = $('body');

        var FP = $.fn.fullpage;

        // Creating some defaults, extending them with any options that were provided
        options = $.extend({
            //navigation
            menu: false,
            anchors:[],
            lockAnchors: false,
            navigation: false,
            navigationPosition: 'right',
            navigationTooltips: [],
            showActiveTooltip: false,
            slidesNavigation: false,
            slidesNavPosition: 'bottom',
            scrollBar: false,
            hybrid: false,

            //scrolling
            css3: true,
            scrollingSpeed: 700,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 1000,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            continuousVertical: false,
            continuousHorizontal: false,
            scrollHorizontally: false,
            interlockedSlides: false,
            dragAndMove: false,
            offsetSections: false,
            resetSliders: false,
            fadingEffect: false,
            normalScrollElements: null,
            scrollOverflow: false,
            scrollOverflowReset: false,
            scrollOverflowHandler: $.fn.fp_scrolloverflow ? $.fn.fp_scrolloverflow.iscrollHandler : null,
            scrollOverflowOptions: null,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            bigSectionsDestination: null,

            //Accessibility
            keyboardScrolling: true,
            animateAnchor: true,
            recordHistory: true,

            //design
            controlArrows: true,
            controlArrowColor: '#fff',
            verticalCentered: true,
            sectionsColor : [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0, //backwards compabitility with responsiveWiddth
            responsiveWidth: 0,
            responsiveHeight: 0,
            responsiveSlides: false,
            parallax: false,
            parallaxOptions: {
                type: 'reveal',
                percentage: 62,
                property: 'translate'
            },

            //Custom selectors
            sectionSelector: SECTION_DEFAULT_SEL,
            slideSelector: SLIDE_DEFAULT_SEL,

            //events
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null,
            afterResponsive: null,

            lazyLoading: true
        }, options);

        //flag to avoid very fast sliding for landscape sliders
        var slideMoving = false;

        var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
        var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
        var container = $(this);
        var windowsHeight = $window.height();
        var isResizing = false;
        var isWindowFocused = true;
        var lastScrolledDestiny;
        var lastScrolledSlide;
        var canScroll = true;
        var scrollings = [];
        var controlPressed;
        var startingSection;
        var isScrollAllowed = {};
        isScrollAllowed.m = {  'up':true, 'down':true, 'left':true, 'right':true };
        isScrollAllowed.k = $.extend(true,{}, isScrollAllowed.m);
        var MSPointer = getMSPointer();
        var events = {
            touchmove: 'ontouchmove' in window ? 'touchmove' :  MSPointer.move,
            touchstart: 'ontouchstart' in window ? 'touchstart' :  MSPointer.down
        };
        var scrollBarHandler;

        // taken from https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution/modal.js
        var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

        //timeouts
        var resizeId;
        var afterSectionLoadsId;
        var afterSlideLoadsId;
        var scrollId;
        var scrollId2;
        var keydownId;
        var originals = $.extend(true, {}, options); //deep copy

        displayWarnings();

        //easeInOutCubic animation included in the plugin
        $.extend($.easing,{ easeInOutCubic: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t + b;return c/2*((t-=2)*t*t + 2) + b;}});

        /**
        * Sets the autoScroll option.
        * It changes the scroll bar visibility and the history of the site as a result.
        */
        function setAutoScrolling(value, type){
            //removing the transformation
            if(!value){
                silentScroll(0);
            }

            setVariableState('autoScrolling', value, type);

            var element = $(SECTION_ACTIVE_SEL);

            if(options.autoScrolling && !options.scrollBar){
                $htmlBody.css({
                    'overflow' : 'hidden',
                    'height' : '100%'
                });

                setRecordHistory(originals.recordHistory, 'internal');

                //for IE touch devices
                container.css({
                    '-ms-touch-action': 'none',
                    'touch-action': 'none'
                });

                if(element.length){
                    //moving the container up
                    silentScroll(element.position().top);
                }

            }else{
                $htmlBody.css({
                    'overflow' : 'visible',
                    'height' : 'initial'
                });

                setRecordHistory(false, 'internal');

                //for IE touch devices
                container.css({
                    '-ms-touch-action': '',
                    'touch-action': ''
                });

                //scrolling the page to the section with no animation
                if (element.length) {
                    $htmlBody.scrollTop(element.position().top);
                }
            }
        }

        /**
        * Defines wheter to record the history for each hash change in the URL.
        */
        function setRecordHistory(value, type){
            setVariableState('recordHistory', value, type);
        }

        /**
        * Defines the scrolling speed
        */
        function setScrollingSpeed(value, type){
            setVariableState('scrollingSpeed', value, type);
        }

        /**
        * Sets fitToSection
        */
        function setFitToSection(value, type){
            setVariableState('fitToSection', value, type);
        }

        /**
        * Sets lockAnchors
        */
        function setLockAnchors(value){
            options.lockAnchors = value;
        }

        /**
        * Adds or remove the possibility of scrolling through sections by using the mouse wheel or the trackpad.
        */
        function setMouseWheelScrolling(value){
            if(value){
                addMouseWheelHandler();
                addMiddleWheelHandler();
            }else{
                removeMouseWheelHandler();
                removeMiddleWheelHandler();
            }
        }

        /**
        * Adds or remove the possibility of scrolling through sections by using the mouse wheel/trackpad or touch gestures.
        * Optionally a second parameter can be used to specify the direction for which the action will be applied.
        *
        * @param directions string containing the direction or directions separated by comma.
        */
        function setAllowScrolling(value, directions){
            if(typeof directions !== 'undefined'){
                directions = directions.replace(/ /g,'').split(',');

                $.each(directions, function (index, direction){
                    setIsScrollAllowed(value, direction, 'm');
                });
            }
            else{
                setIsScrollAllowed(value, 'all', 'm');

                if(value){
                    setMouseWheelScrolling(true);
                    addTouchHandler();
                }else{
                    setMouseWheelScrolling(false);
                    removeTouchHandler();
                }
            }
        }

        /**
        * Adds or remove the possibility of scrolling through sections by using the keyboard arrow keys
        */
        function setKeyboardScrolling(value, directions){
            if(typeof directions !== 'undefined'){
                directions = directions.replace(/ /g,'').split(',');

                $.each(directions, function (index, direction){
                    setIsScrollAllowed(value, direction, 'k');
                });
            }else{
                setIsScrollAllowed(value, 'all', 'k');
                options.keyboardScrolling = value;
            }
        }

        /**
        * Moves the page up one section.
        */
        function moveSectionUp(){
            var prev = $(SECTION_ACTIVE_SEL).prev(SECTION_SEL);

            //looping to the bottom if there's no more sections above
            if (!prev.length && (options.loopTop || options.continuousVertical)) {
                prev = $(SECTION_SEL).last();
            }

            if (prev.length) {
                scrollPage(prev, null, true);
            }
        }

        /**
        * Moves the page down one section.
        */
        function moveSectionDown(){
            var next = $(SECTION_ACTIVE_SEL).next(SECTION_SEL);

            //looping to the top if there's no more sections below
            if(!next.length &&
                (options.loopBottom || options.continuousVertical)){
                next = $(SECTION_SEL).first();
            }

            if(next.length){
                scrollPage(next, null, false);
            }
        }

        /**
        * Moves the page to the given section and slide with no animation.
        * Anchors or index positions can be used as params.
        */
        function silentMoveTo(sectionAnchor, slideAnchor){
            setScrollingSpeed (0, 'internal');
            moveTo(sectionAnchor, slideAnchor);
            setScrollingSpeed (originals.scrollingSpeed, 'internal');
        }

        /**
        * Moves the page to the given section and slide.
        * Anchors or index positions can be used as params.
        */
        function moveTo(sectionAnchor, slideAnchor){
            var destiny = getSectionByAnchor(sectionAnchor);

            if (typeof slideAnchor !== 'undefined'){
                scrollPageAndSlide(sectionAnchor, slideAnchor);
            }else if(destiny.length > 0){
                scrollPage(destiny);
            }
        }

        /**
        * Slides right the slider of the active section.
        * Optional `section` param.
        */
        function moveSlideRight(section){
            moveSlide('right', section);
        }

        /**
        * Slides left the slider of the active section.
        * Optional `section` param.
        */
        function moveSlideLeft(section){
            moveSlide('left', section);
        }

        /**
         * When resizing is finished, we adjust the slides sizes and positions
         */
        function reBuild(resizing){
            if(container.hasClass(DESTROYED)){ return; }  //nothing to do if the plugin was destroyed

            isResizing = true;

            windowsHeight = $window.height();  //updating global var

            $(SECTION_SEL).each(function(){
                var slidesWrap = $(this).find(SLIDES_WRAPPER_SEL);
                var slides = $(this).find(SLIDE_SEL);

                //adjusting the height of the table-cell for IE and Firefox
                if(options.verticalCentered){
                    $(this).find(TABLE_CELL_SEL).css('height', getTableHeight($(this)) + 'px');
                }

                $(this).css('height', windowsHeight + 'px');

                //adjusting the position fo the FULL WIDTH slides...
                if (slides.length > 1) {
                    landscapeScroll(slidesWrap, slidesWrap.find(SLIDE_ACTIVE_SEL));
                }
            });

            if(options.scrollOverflow){
                scrollBarHandler.createScrollBarForAll();
            }

            var activeSection = $(SECTION_ACTIVE_SEL);
            var sectionIndex = activeSection.index(SECTION_SEL);

            //isn't it the first section?
            if(sectionIndex){
                //adjusting the position for the current section
                silentMoveTo(sectionIndex + 1);
            }

            isResizing = false;
            $.isFunction( options.afterResize ) && resizing && options.afterResize.call(container);
            $.isFunction( options.afterReBuild ) && !resizing && options.afterReBuild.call(container);
        }

        /**
        * Turns fullPage.js to normal scrolling mode when the viewport `width` or `height`
        * are smaller than the set limit values.
        */
        function setResponsive(active){
            var isResponsive = $body.hasClass(RESPONSIVE);

            if(active){
                if(!isResponsive){
                    setAutoScrolling(false, 'internal');
                    setFitToSection(false, 'internal');
                    $(SECTION_NAV_SEL).hide();
                    $body.addClass(RESPONSIVE);
                    $.isFunction( options.afterResponsive ) && options.afterResponsive.call( container, active);
                }
            }
            else if(isResponsive){
                setAutoScrolling(originals.autoScrolling, 'internal');
                setFitToSection(originals.autoScrolling, 'internal');
                $(SECTION_NAV_SEL).show();
                $body.removeClass(RESPONSIVE);
                $.isFunction( options.afterResponsive ) && options.afterResponsive.call( container, active);
            }
        }

        if($(this).length){
            //public functions
            FP.version = '2.9.5';
            FP.setAutoScrolling = setAutoScrolling;
            FP.setRecordHistory = setRecordHistory;
            FP.setScrollingSpeed = setScrollingSpeed;
            FP.setFitToSection = setFitToSection;
            FP.setLockAnchors = setLockAnchors;
            FP.setMouseWheelScrolling = setMouseWheelScrolling;
            FP.setAllowScrolling = setAllowScrolling;
            FP.setKeyboardScrolling = setKeyboardScrolling;
            FP.moveSectionUp = moveSectionUp;
            FP.moveSectionDown = moveSectionDown;
            FP.silentMoveTo = silentMoveTo;
            FP.moveTo = moveTo;
            FP.moveSlideRight = moveSlideRight;
            FP.moveSlideLeft = moveSlideLeft;
            FP.fitToSection = fitToSection;
            FP.reBuild = reBuild;
            FP.setResponsive = setResponsive;
            FP.destroy = destroy;

            //functions we want to share across files but which are not
            //mean to be used on their own by developers
            FP.shared ={
                afterRenderActions: afterRenderActions
            };

            init();

            bindEvents();
        }

        function init(){
            //if css3 is not supported, it will use jQuery animations
            if(options.css3){
                options.css3 = support3d();
            }

            options.scrollBar = options.scrollBar || options.hybrid;

            setOptionsFromDOM();
            prepareDom();
            setAllowScrolling(true);
            setAutoScrolling(options.autoScrolling, 'internal');
            responsive();

            //setting the class for the body element
            setBodyClass();

            if(document.readyState === 'complete'){
                scrollToAnchor();
            }
            $window.on('load', scrollToAnchor);
        }

        function bindEvents(){
            $window
                //when scrolling...
                .on('scroll', scrollHandler)

                //detecting any change on the URL to scroll to the given anchor link
                //(a way to detect back history button as we play with the hashes on the URL)
                .on('hashchange', hashChangeHandler)

                //when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
                .blur(blurHandler)

                //when resizing the site, we adjust the heights of the sections, slimScroll...
                .resize(resizeHandler);

            $document
                //Sliding with arrow keys, both, vertical and horizontal
                .keydown(keydownHandler)

                //to prevent scrolling while zooming
                .keyup(keyUpHandler)

                //Scrolls to the section when clicking the navigation bullet
                .on('click touchstart', SECTION_NAV_SEL + ' a', sectionBulletHandler)

                //Scrolls the slider to the given slide destination for the given section
                .on('click touchstart', SLIDES_NAV_LINK_SEL, slideBulletHandler)

                .on('click', SECTION_NAV_TOOLTIP_SEL, tooltipTextHandler);

            //Scrolling horizontally when clicking on the slider controls.
            $(SECTION_SEL).on('click touchstart', SLIDES_ARROW_SEL, slideArrowHandler);

            /**
            * Applying normalScroll elements.
            * Ignoring the scrolls over the specified selectors.
            */
            if(options.normalScrollElements){
                $document.on('mouseenter touchstart', options.normalScrollElements, function () {
                    setAllowScrolling(false);
                });

                $document.on('mouseleave touchend', options.normalScrollElements, function(){
                    setAllowScrolling(true);
                });
            }
        }

        /**
        * Setting options from DOM elements if they are not provided.
        */
        function setOptionsFromDOM(){
            var sections = container.find(options.sectionSelector);

            //no anchors option? Checking for them in the DOM attributes
            if(!options.anchors.length){
                options.anchors = sections.filter('[data-anchor]').map(function(){
                    return $(this).data('anchor').toString();
                }).get();
            }

            //no tooltips option? Checking for them in the DOM attributes
            if(!options.navigationTooltips.length){
                options.navigationTooltips = sections.filter('[data-tooltip]').map(function(){
                    return $(this).data('tooltip').toString();
                }).get();
            }
        }

        /**
        * Works over the DOM structure to set it up for the current fullpage options.
        */
        function prepareDom(){
            container.css({
                'height': '100%',
                'position': 'relative'
            });

            //adding a class to recognize the container internally in the code
            container.addClass(WRAPPER);
            $('html').addClass(ENABLED);

            //due to https://github.com/alvarotrigo/fullPage.js/issues/1502
            windowsHeight = $window.height();

            container.removeClass(DESTROYED); //in case it was destroyed before initializing it again

            addInternalSelectors();

            //styling the sections / slides / menu
            $(SECTION_SEL).each(function(index){
                var section = $(this);
                var slides = section.find(SLIDE_SEL);
                var numSlides = slides.length;

                //caching the original styles to add them back on destroy('all')
                section.data('fp-styles', section.attr('style'));

                styleSection(section, index);
                styleMenu(section, index);

                // if there's any slide
                if (numSlides > 0) {
                    styleSlides(section, slides, numSlides);
                }else{
                    if(options.verticalCentered){
                        addTableClass(section);
                    }
                }
            });

            //fixed elements need to be moved out of the plugin container due to problems with CSS3.
            if(options.fixedElements && options.css3){
                $(options.fixedElements).appendTo($body);
            }

            //vertical centered of the navigation + active bullet
            if(options.navigation){
                addVerticalNavigation();
            }

            enableYoutubeAPI();

            if(options.scrollOverflow){
                scrollBarHandler = options.scrollOverflowHandler.init(options);
            }else{
                afterRenderActions();
            }
        }

        /**
        * Styles the horizontal slides for a section.
        */
        function styleSlides(section, slides, numSlides){
            var sliderWidth = numSlides * 100;
            var slideWidth = 100 / numSlides;

            slides.wrapAll('<div class="' + SLIDES_CONTAINER + '" />');
            slides.parent().wrap('<div class="' + SLIDES_WRAPPER + '" />');

            section.find(SLIDES_CONTAINER_SEL).css('width', sliderWidth + '%');

            if(numSlides > 1){
                if(options.controlArrows){
                    createSlideArrows(section);
                }

                if(options.slidesNavigation){
                    addSlidesNavigation(section, numSlides);
                }
            }

            slides.each(function(index) {
                $(this).css('width', slideWidth + '%');

                if(options.verticalCentered){
                    addTableClass($(this));
                }
            });

            var startingSlide = section.find(SLIDE_ACTIVE_SEL);

            //if the slide won't be an starting point, the default will be the first one
            //the active section isn't the first one? Is not the first slide of the first section? Then we load that section/slide by default.
            if( startingSlide.length &&  ($(SECTION_ACTIVE_SEL).index(SECTION_SEL) !== 0 || ($(SECTION_ACTIVE_SEL).index(SECTION_SEL) === 0 && startingSlide.index() !== 0))){
                silentLandscapeScroll(startingSlide, 'internal');
            }else{
                slides.eq(0).addClass(ACTIVE);
            }
        }

        /**
        * Styling vertical sections
        */
        function styleSection(section, index){
            //if no active section is defined, the 1st one will be the default one
            if(!index && $(SECTION_ACTIVE_SEL).length === 0) {
                section.addClass(ACTIVE);
            }
            startingSection = $(SECTION_ACTIVE_SEL);

            section.css('height', windowsHeight + 'px');

            if(options.paddingTop){
                section.css('padding-top', options.paddingTop);
            }

            if(options.paddingBottom){
                section.css('padding-bottom', options.paddingBottom);
            }

            if (typeof options.sectionsColor[index] !==  'undefined') {
                section.css('background-color', options.sectionsColor[index]);
            }

            if (typeof options.anchors[index] !== 'undefined') {
                section.attr('data-anchor', options.anchors[index]);
            }
        }

        /**
        * Sets the data-anchor attributes to the menu elements and activates the current one.
        */
        function styleMenu(section, index){
            if (typeof options.anchors[index] !== 'undefined') {
                //activating the menu / nav element on load
                if(section.hasClass(ACTIVE)){
                    activateMenuAndNav(options.anchors[index], index);
                }
            }

            //moving the menu outside the main container if it is inside (avoid problems with fixed positions when using CSS3 tranforms)
            if(options.menu && options.css3 && $(options.menu).closest(WRAPPER_SEL).length){
                $(options.menu).appendTo($body);
            }
        }

        /**
        * Adds internal classes to be able to provide customizable selectors
        * keeping the link with the style sheet.
        */
        function addInternalSelectors(){
            container.find(options.sectionSelector).addClass(SECTION);
            container.find(options.slideSelector).addClass(SLIDE);
        }

        /**
        * Creates the control arrows for the given section
        */
        function createSlideArrows(section){
            section.find(SLIDES_WRAPPER_SEL).after('<div class="' + SLIDES_ARROW_PREV + '"></div><div class="' + SLIDES_ARROW_NEXT + '"></div>');

            if(options.controlArrowColor!='#fff'){
                section.find(SLIDES_ARROW_NEXT_SEL).css('border-color', 'transparent transparent transparent '+options.controlArrowColor);
                section.find(SLIDES_ARROW_PREV_SEL).css('border-color', 'transparent '+ options.controlArrowColor + ' transparent transparent');
            }

            if(!options.loopHorizontal){
                section.find(SLIDES_ARROW_PREV_SEL).hide();
            }
        }

        /**
        * Creates a vertical navigation bar.
        */
        function addVerticalNavigation(){
            $body.append('<div id="' + SECTION_NAV + '"><ul></ul></div>');
            var nav = $(SECTION_NAV_SEL);

            nav.addClass(function() {
                return options.showActiveTooltip ? SHOW_ACTIVE_TOOLTIP + ' ' + options.navigationPosition : options.navigationPosition;
            });

            for (var i = 0; i < $(SECTION_SEL).length; i++) {
                var link = '';
                if (options.anchors.length) {
                    link = options.anchors[i];
                }

                var li = '<li><a href="#' + link + '"><span></span></a>';

                // Only add tooltip if needed (defined by user)
                var tooltip = options.navigationTooltips[i];

                if (typeof tooltip !== 'undefined' && tooltip !== '') {
                    li += '<div class="' + SECTION_NAV_TOOLTIP + ' ' + options.navigationPosition + '">' + tooltip + '</div>';
                }

                li += '</li>';

                nav.find('ul').append(li);
            }

            //centering it vertically
            $(SECTION_NAV_SEL).css('margin-top', '-' + ($(SECTION_NAV_SEL).height()/2) + 'px');

            //activating the current active section
            $(SECTION_NAV_SEL).find('li').eq($(SECTION_ACTIVE_SEL).index(SECTION_SEL)).find('a').addClass(ACTIVE);
        }

        /*
        * Enables the Youtube videos API so we can control their flow if necessary.
        */
        function enableYoutubeAPI(){
            container.find('iframe[src*="youtube.com/embed/"]').each(function(){
                addURLParam($(this), 'enablejsapi=1');
            });
        }

        /**
        * Adds a new parameter and its value to the `src` of a given element
        */
        function addURLParam(element, newParam){
            var originalSrc = element.attr('src');
            element.attr('src', originalSrc + getUrlParamSign(originalSrc) + newParam);
        }

        /*
        * Returns the prefix sign to use for a new parameter in an existen URL.
        *
        * @return {String}  ? | &
        */
        function getUrlParamSign(url){
            return ( !/\?/.test( url ) ) ? '?' : '&';
        }

        /**
        * Actions and callbacks to fire afterRender
        */
        function afterRenderActions(){
            var section = $(SECTION_ACTIVE_SEL);

            section.addClass(COMPLETELY);

            lazyLoad(section);
            playMedia(section);

            if(options.scrollOverflow){
                options.scrollOverflowHandler.afterLoad();
            }

            if(isDestinyTheStartingSection()){
                $.isFunction( options.afterLoad ) && options.afterLoad.call(section, section.data('anchor'), (section.index(SECTION_SEL) + 1));
            }

            $.isFunction( options.afterRender ) && options.afterRender.call(container);
        }

        /**
        * Determines if the URL anchor destiny is the starting section (the one using 'active' class before initialization)
        */
        function isDestinyTheStartingSection(){
            var destinationSection = getSectionByAnchor(getAnchorsURL().section);
            return !destinationSection || destinationSection.length && destinationSection.index() === startingSection.index();
        }


        var isScrolling = false;
        var lastScroll = 0;

        //when scrolling...
        function scrollHandler(){
            var currentSection;

            if(!options.autoScrolling || options.scrollBar){
                var currentScroll = $window.scrollTop();
                var scrollDirection = getScrollDirection(currentScroll);
                var visibleSectionIndex = 0;
                var screen_mid = currentScroll + ($window.height() / 2.0);
                var isAtBottom = $body.height() - $window.height() === currentScroll;
                var sections =  document.querySelectorAll(SECTION_SEL);

                //when using `auto-height` for a small last section it won't be centered in the viewport
                if(isAtBottom){
                    visibleSectionIndex = sections.length - 1;
                }
                //is at top? when using `auto-height` for a small first section it won't be centered in the viewport
                else if(!currentScroll){
                    visibleSectionIndex = 0;
                }

                //taking the section which is showing more content in the viewport
                else{
                    for (var i = 0; i < sections.length; ++i) {
                        var section = sections[i];

                        // Pick the the last section which passes the middle line of the screen.
                        if (section.offsetTop <= screen_mid)
                        {
                            visibleSectionIndex = i;
                        }
                    }
                }

                if(isCompletelyInViewPort(scrollDirection)){
                    if(!$(SECTION_ACTIVE_SEL).hasClass(COMPLETELY)){
                        $(SECTION_ACTIVE_SEL).addClass(COMPLETELY).siblings().removeClass(COMPLETELY);
                    }
                }

                //geting the last one, the current one on the screen
                currentSection = $(sections).eq(visibleSectionIndex);

                //setting the visible section as active when manually scrolling
                //executing only once the first time we reach the section
                if(!currentSection.hasClass(ACTIVE)){
                    isScrolling = true;
                    var leavingSection = $(SECTION_ACTIVE_SEL);
                    var leavingSectionIndex = leavingSection.index(SECTION_SEL) + 1;
                    var yMovement = getYmovement(currentSection);
                    var anchorLink  = currentSection.data('anchor');
                    var sectionIndex = currentSection.index(SECTION_SEL) + 1;
                    var activeSlide = currentSection.find(SLIDE_ACTIVE_SEL);
                    var slideIndex;
                    var slideAnchorLink;

                    if(activeSlide.length){
                        slideAnchorLink = activeSlide.data('anchor');
                        slideIndex = activeSlide.index();
                    }

                    if(canScroll){
                        currentSection.addClass(ACTIVE).siblings().removeClass(ACTIVE);

                        $.isFunction( options.onLeave ) && options.onLeave.call( leavingSection, leavingSectionIndex, sectionIndex, yMovement);
                        $.isFunction( options.afterLoad ) && options.afterLoad.call( currentSection, anchorLink, sectionIndex);

                        stopMedia(leavingSection);
                        lazyLoad(currentSection);
                        playMedia(currentSection);

                        activateMenuAndNav(anchorLink, sectionIndex - 1);

                        if(options.anchors.length){
                            //needed to enter in hashChange event when using the menu with anchor links
                            lastScrolledDestiny = anchorLink;
                        }
                        setState(slideIndex, slideAnchorLink, anchorLink, sectionIndex);
                    }

                    //small timeout in order to avoid entering in hashChange event when scrolling is not finished yet
                    clearTimeout(scrollId);
                    scrollId = setTimeout(function(){
                        isScrolling = false;
                    }, 100);
                }

                if(options.fitToSection){
                    //for the auto adjust of the viewport to fit a whole section
                    clearTimeout(scrollId2);

                    scrollId2 = setTimeout(function(){
                        //checking it again in case it changed during the delay
                        if(options.fitToSection &&

                            //is the destination element bigger than the viewport?
                            $(SECTION_ACTIVE_SEL).outerHeight() <= windowsHeight
                        ){
                            fitToSection();
                        }
                    }, options.fitToSectionDelay);
                }
            }
        }

        /**
        * Fits the site to the nearest active section
        */
        function fitToSection(){
            //checking fitToSection again in case it was set to false before the timeout delay
            if(canScroll){
                //allows to scroll to an active section and
                //if the section is already active, we prevent firing callbacks
                isResizing = true;

                scrollPage($(SECTION_ACTIVE_SEL));
                isResizing = false;
            }
        }

        /**
        * Determines whether the active section has seen in its whole or not.
        */
        function isCompletelyInViewPort(movement){
            var top = $(SECTION_ACTIVE_SEL).position().top;
            var bottom = top + $window.height();

            if(movement == 'up'){
                return bottom >= ($window.scrollTop() + $window.height());
            }
            return top <= $window.scrollTop();
        }

        /**
        * Gets the directon of the the scrolling fired by the scroll event.
        */
        function getScrollDirection(currentScroll){
            var direction = currentScroll > lastScroll ? 'down' : 'up';

            lastScroll = currentScroll;

            //needed for auto-height sections to determine if we want to scroll to the top or bottom of the destination
            previousDestTop = currentScroll;

            return direction;
        }

        /**
        * Determines the way of scrolling up or down:
        * by 'automatically' scrolling a section or by using the default and normal scrolling.
        */
        function scrolling(type){
            if (!isScrollAllowed.m[type]){
                return;
            }

            var scrollSection = (type === 'down') ? moveSectionDown : moveSectionUp;

            if(options.scrollOverflow){
                var scrollable = options.scrollOverflowHandler.scrollable($(SECTION_ACTIVE_SEL));
                var check = (type === 'down') ? 'bottom' : 'top';

                if(scrollable.length > 0 ){
                    //is the scrollbar at the start/end of the scroll?
                    if(options.scrollOverflowHandler.isScrolled(check, scrollable)){
                        scrollSection();
                    }else{
                        return true;
                    }
                }else{
                    // moved up/down
                    scrollSection();
                }
            }else{
                // moved up/down
                scrollSection();
            }
        }

        /*
        * Preventing bouncing in iOS #2285
        */
        function preventBouncing(event){
            var e = event.originalEvent;
            if(options.autoScrolling && isReallyTouch(e)){
                //preventing the easing on iOS devices
                event.preventDefault();
            }
        }

        var touchStartY = 0;
        var touchStartX = 0;
        var touchEndY = 0;
        var touchEndX = 0;

        /* Detecting touch events

        * As we are changing the top property of the page on scrolling, we can not use the traditional way to detect it.
        * This way, the touchstart and the touch moves shows an small difference between them which is the
        * used one to determine the direction.
        */
        function touchMoveHandler(event){
            var e = event.originalEvent;
            var activeSection = $(e.target).closest(SECTION_SEL);

            // additional: if one of the normalScrollElements isn't within options.normalScrollElementTouchThreshold hops up the DOM chain
            if (isReallyTouch(e) ) {

                if(options.autoScrolling){
                    //preventing the easing on iOS devices
                    event.preventDefault();
                }

                var touchEvents = getEventsPage(e);

                touchEndY = touchEvents.y;
                touchEndX = touchEvents.x;

                //if movement in the X axys is greater than in the Y and the currect section has slides...
                if (activeSection.find(SLIDES_WRAPPER_SEL).length && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {

                    //is the movement greater than the minimum resistance to scroll?
                    if (!slideMoving && Math.abs(touchStartX - touchEndX) > ($window.outerWidth() / 100 * options.touchSensitivity)) {
                        if (touchStartX > touchEndX) {
                            if(isScrollAllowed.m.right){
                                moveSlideRight(activeSection); //next
                            }
                        } else {
                            if(isScrollAllowed.m.left){
                                moveSlideLeft(activeSection); //prev
                            }
                        }
                    }
                }

                //vertical scrolling (only when autoScrolling is enabled)
                else if(options.autoScrolling && canScroll){

                    //is the movement greater than the minimum resistance to scroll?
                    if (Math.abs(touchStartY - touchEndY) > ($window.height() / 100 * options.touchSensitivity)) {
                        if (touchStartY > touchEndY) {
                            scrolling('down');
                        } else if (touchEndY > touchStartY) {
                            scrolling('up');
                        }
                    }
                }
            }
        }

        /**
        * As IE >= 10 fires both touch and mouse events when using a mouse in a touchscreen
        * this way we make sure that is really a touch event what IE is detecting.
        */
        function isReallyTouch(e){
            //if is not IE   ||  IE is detecting `touch` or `pen`
            return typeof e.pointerType === 'undefined' || e.pointerType != 'mouse';
        }

        /**
        * Handler for the touch start event.
        */
        function touchStartHandler(event){
            var e = event.originalEvent;

            //stopping the auto scroll to adjust to a section
            if(options.fitToSection){
                $htmlBody.stop();
            }

            if(isReallyTouch(e)){
                var touchEvents = getEventsPage(e);
                touchStartY = touchEvents.y;
                touchStartX = touchEvents.x;
            }
        }

        /**
        * Gets the average of the last `number` elements of the given array.
        */
        function getAverage(elements, number){
            var sum = 0;

            //taking `number` elements from the end to make the average, if there are not enought, 1
            var lastElements = elements.slice(Math.max(elements.length - number, 1));

            for(var i = 0; i < lastElements.length; i++){
                sum = sum + lastElements[i];
            }

            return Math.ceil(sum/number);
        }

        /**
         * Detecting mousewheel scrolling
         *
         * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
         * http://www.sitepoint.com/html5-javascript-mouse-wheel/
         */
        var prevTime = new Date().getTime();

        function MouseWheelHandler(e) {
            var curTime = new Date().getTime();
            var isNormalScroll = $(COMPLETELY_SEL).hasClass(NORMAL_SCROLL);

            //autoscrolling and not zooming?
            if(options.autoScrolling && !controlPressed && !isNormalScroll){
                // cross-browser wheel delta
                e = e || window.event;
                var value = e.wheelDelta || -e.deltaY || -e.detail;
                var delta = Math.max(-1, Math.min(1, value));

                var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
                var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX ) < Math.abs(e.deltaY) || !horizontalDetection);

                //Limiting the array to 150 (lets not waste memory!)
                if(scrollings.length > 149){
                    scrollings.shift();
                }

                //keeping record of the previous scrollings
                scrollings.push(Math.abs(value));

                //preventing to scroll the site on mouse wheel when scrollbar is present
                if(options.scrollBar){
                    e.preventDefault ? e.preventDefault() : e.returnValue = false;
                }

                //time difference between the last scroll and the current one
                var timeDiff = curTime-prevTime;
                prevTime = curTime;

                //haven't they scrolled in a while?
                //(enough to be consider a different scrolling action to scroll another section)
                if(timeDiff > 200){
                    //emptying the array, we dont care about old scrollings for our averages
                    scrollings = [];
                }

                if(canScroll){
                    var averageEnd = getAverage(scrollings, 10);
                    var averageMiddle = getAverage(scrollings, 70);
                    var isAccelerating = averageEnd >= averageMiddle;

                    //to avoid double swipes...
                    if(isAccelerating && isScrollingVertically){
                        //scrolling down?
                        if (delta < 0) {
                            scrolling('down');

                        //scrolling up?
                        }else {
                            scrolling('up');
                        }
                    }
                }

                return false;
            }

            if(options.fitToSection){
                //stopping the auto scroll to adjust to a section
                $htmlBody.stop();
            }
        }

        /**
        * Slides a slider to the given direction.
        * Optional `section` param.
        */
        function moveSlide(direction, section){
            var activeSection = typeof section === 'undefined' ? $(SECTION_ACTIVE_SEL) : section;
            var slides = activeSection.find(SLIDES_WRAPPER_SEL);
            var numSlides = slides.find(SLIDE_SEL).length;

            // more than one slide needed and nothing should be sliding
            if (!slides.length || slideMoving || numSlides < 2) {
                return;
            }

            var currentSlide = slides.find(SLIDE_ACTIVE_SEL);
            var destiny = null;

            if(direction === 'left'){
                destiny = currentSlide.prev(SLIDE_SEL);
            }else{
                destiny = currentSlide.next(SLIDE_SEL);
            }

            //isn't there a next slide in the secuence?
            if(!destiny.length){
                //respect loopHorizontal settin
                if (!options.loopHorizontal) return;

                if(direction === 'left'){
                    destiny = currentSlide.siblings(':last');
                }else{
                    destiny = currentSlide.siblings(':first');
                }
            }

            slideMoving = true;

            landscapeScroll(slides, destiny, direction);
        }

        /**
        * Maintains the active slides in the viewport
        * (Because the `scroll` animation might get lost with some actions, such as when using continuousVertical)
        */
        function keepSlidesPosition(){
            $(SLIDE_ACTIVE_SEL).each(function(){
                silentLandscapeScroll($(this), 'internal');
            });
        }

        var previousDestTop = 0;
        /**
        * Returns the destination Y position based on the scrolling direction and
        * the height of the section.
        */
        function getDestinationPosition(element){
            var elemPosition = element.position();

            //top of the desination will be at the top of the viewport
            var position = elemPosition.top;
            var isScrollingDown =  elemPosition.top > previousDestTop;
            var sectionBottom = position - windowsHeight + element.outerHeight();
            var bigSectionsDestination = options.bigSectionsDestination;

            //is the destination element bigger than the viewport?
            if(element.outerHeight() > windowsHeight){
                //scrolling up?
                if(!isScrollingDown && !bigSectionsDestination || bigSectionsDestination === 'bottom' ){
                    position = sectionBottom;
                }
            }

            //sections equal or smaller than the viewport height && scrolling down? ||  is resizing and its in the last section
            else if(isScrollingDown || (isResizing && element.is(':last-child')) ){
                //The bottom of the destination will be at the bottom of the viewport
                position = sectionBottom;
            }

            /*
            Keeping record of the last scrolled position to determine the scrolling direction.
            No conventional methods can be used as the scroll bar might not be present
            AND the section might not be active if it is auto-height and didnt reach the middle
            of the viewport.
            */
            previousDestTop = position;
            return position;
        }

        /**
        * Scrolls the site to the given element and scrolls to the slide if a callback is given.
        */
        function scrollPage(element, callback, isMovementUp){
            if(typeof element === 'undefined'){ return; } //there's no element to scroll, leaving the function

            var dtop = getDestinationPosition(element);
            var slideAnchorLink;
            var slideIndex;

            //local variables
            var v = {
                element: element,
                callback: callback,
                isMovementUp: isMovementUp,
                dtop: dtop,
                yMovement: getYmovement(element),
                anchorLink: element.data('anchor'),
                sectionIndex: element.index(SECTION_SEL),
                activeSlide: element.find(SLIDE_ACTIVE_SEL),
                activeSection: $(SECTION_ACTIVE_SEL),
                leavingSection: $(SECTION_ACTIVE_SEL).index(SECTION_SEL) + 1,

                //caching the value of isResizing at the momment the function is called
                //because it will be checked later inside a setTimeout and the value might change
                localIsResizing: isResizing
            };

            //quiting when destination scroll is the same as the current one
            if((v.activeSection.is(element) && !isResizing) || (options.scrollBar && $window.scrollTop() === v.dtop && !element.hasClass(AUTO_HEIGHT) )){ return; }

            if(v.activeSlide.length){
                slideAnchorLink = v.activeSlide.data('anchor');
                slideIndex = v.activeSlide.index();
            }

            //callback (onLeave) if the site is not just resizing and readjusting the slides
            if($.isFunction(options.onLeave) && !v.localIsResizing){
                if(options.onLeave.call(v.activeSection, v.leavingSection, (v.sectionIndex + 1), v.yMovement) === false){
                    return;
                }
            }

            // If continuousVertical && we need to wrap around
            if (options.autoScrolling && options.continuousVertical && typeof (v.isMovementUp) !== "undefined" &&
                ((!v.isMovementUp && v.yMovement == 'up') || // Intending to scroll down but about to go up or
                (v.isMovementUp && v.yMovement == 'down'))) { // intending to scroll up but about to go down

                v = createInfiniteSections(v);
            }

            //pausing media of the leaving section (if we are not just resizing, as destinatino will be the same one)
            if(!v.localIsResizing){
                stopMedia(v.activeSection);
            }

            if(options.scrollOverflow){
                options.scrollOverflowHandler.beforeLeave();
            }

            element.addClass(ACTIVE).siblings().removeClass(ACTIVE);
            lazyLoad(element);

            if(options.scrollOverflow){
                options.scrollOverflowHandler.onLeave();
            }

            //preventing from activating the MouseWheelHandler event
            //more than once if the page is scrolling
            canScroll = false;

            setState(slideIndex, slideAnchorLink, v.anchorLink, v.sectionIndex);

            performMovement(v);

            //flag to avoid callingn `scrollPage()` twice in case of using anchor links
            lastScrolledDestiny = v.anchorLink;

            //avoid firing it twice (as it does also on scroll)
            activateMenuAndNav(v.anchorLink, v.sectionIndex);
        }

        /**
        * Performs the vertical movement (by CSS3 or by jQuery)
        */
        function performMovement(v){
            // using CSS3 translate functionality
            if (options.css3 && options.autoScrolling && !options.scrollBar) {

                // The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
                // that's why we round it to 0.
                var translate3d = 'translate3d(0px, -' + Math.round(v.dtop) + 'px, 0px)';
                transformContainer(translate3d, true);

                //even when the scrollingSpeed is 0 there's a little delay, which might cause the
                //scrollingSpeed to change in case of using silentMoveTo();
                if(options.scrollingSpeed){
                    clearTimeout(afterSectionLoadsId);
                    afterSectionLoadsId = setTimeout(function () {
                        afterSectionLoads(v);
                    }, options.scrollingSpeed);
                }else{
                    afterSectionLoads(v);
                }
            }

            // using jQuery animate
            else{
                var scrollSettings = getScrollSettings(v);

                $(scrollSettings.element).animate(
                    scrollSettings.options,
                options.scrollingSpeed, options.easing).promise().done(function () { //only one single callback in case of animating  `html, body`
                    if(options.scrollBar){

                        /* Hack!
                        The timeout prevents setting the most dominant section in the viewport as "active" when the user
                        scrolled to a smaller section by using the mousewheel (auto scrolling) rather than draging the scroll bar.

                        When using scrollBar:true It seems like the scroll events still getting propagated even after the scrolling animation has finished.
                        */
                        setTimeout(function(){
                            afterSectionLoads(v);
                        },30);
                    }else{
                        afterSectionLoads(v);
                    }
                });
            }
        }

        /**
        * Gets the scrolling settings depending on the plugin autoScrolling option
        */
        function getScrollSettings(v){
            var scroll = {};

            if(options.autoScrolling && !options.scrollBar){
                scroll.options = { 'top': -v.dtop};
                scroll.element = WRAPPER_SEL;
            }else{
                scroll.options = { 'scrollTop': v.dtop};
                scroll.element = 'html, body';
            }

            return scroll;
        }

        /**
        * Adds sections before or after the current one to create the infinite effect.
        */
        function createInfiniteSections(v){
            // Scrolling down
            if (!v.isMovementUp) {
                // Move all previous sections to after the active section
                $(SECTION_ACTIVE_SEL).after(v.activeSection.prevAll(SECTION_SEL).get().reverse());
            }
            else { // Scrolling up
                // Move all next sections to before the active section
                $(SECTION_ACTIVE_SEL).before(v.activeSection.nextAll(SECTION_SEL));
            }

            // Maintain the displayed position (now that we changed the element order)
            silentScroll($(SECTION_ACTIVE_SEL).position().top);

            // Maintain the active slides visible in the viewport
            keepSlidesPosition();

            // save for later the elements that still need to be reordered
            v.wrapAroundElements = v.activeSection;

            // Recalculate animation variables
            v.dtop = v.element.position().top;
            v.yMovement = getYmovement(v.element);

            //sections will temporally have another position in the DOM
            //updating this values in case we need them
            v.leavingSection = v.activeSection.index(SECTION_SEL) + 1;
            v.sectionIndex = v.element.index(SECTION_SEL);

            return v;
        }

        /**
        * Fix section order after continuousVertical changes have been animated
        */
        function continuousVerticalFixSectionOrder (v) {
            // If continuousVertical is in effect (and autoScrolling would also be in effect then),
            // finish moving the elements around so the direct navigation will function more simply
            if (!v.wrapAroundElements || !v.wrapAroundElements.length) {
                return;
            }

            if (v.isMovementUp) {
                $(SECTION_FIRST_SEL).before(v.wrapAroundElements);
            }
            else {
                $(SECTION_LAST_SEL).after(v.wrapAroundElements);
            }

            silentScroll($(SECTION_ACTIVE_SEL).position().top);

            // Maintain the active slides visible in the viewport
            keepSlidesPosition();
        }


        /**
        * Actions to do once the section is loaded.
        */
        function afterSectionLoads (v){
            continuousVerticalFixSectionOrder(v);

            //callback (afterLoad) if the site is not just resizing and readjusting the slides
            $.isFunction(options.afterLoad) && !v.localIsResizing && options.afterLoad.call(v.element, v.anchorLink, (v.sectionIndex + 1));

            if(options.scrollOverflow){
                options.scrollOverflowHandler.afterLoad();
            }

            if(!v.localIsResizing){
                playMedia(v.element);
            }

            v.element.addClass(COMPLETELY).siblings().removeClass(COMPLETELY);

            canScroll = true;

            $.isFunction(v.callback) && v.callback.call(this);
        }

        /**
        * Sets the value for the given attribute from the `data-` attribute with the same suffix
        * ie: data-srcset ==> srcset  |  data-src ==> src
        */
        function setSrc(element, attribute){
            element
                .attr(attribute, element.data(attribute))
                .removeAttr('data-' + attribute);
        }

        /**
        * Lazy loads image, video and audio elements.
        */
        function lazyLoad(destiny){
            if (!options.lazyLoading){
                return;
            }

            var panel = getSlideOrSection(destiny);
            var element;

            panel.find('img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]').each(function(){
                element = $(this);

                $.each(['src', 'srcset'], function(index, type){
                    var attribute = element.attr('data-' + type);
                    if(typeof attribute !== 'undefined' && attribute){
                        setSrc(element, type);
                    }
                });

                if(element.is('source')){
                    var typeToPlay = element.closest('video').length ? 'video' : 'audio';
                    element.closest(typeToPlay).get(0).load();
                }
            });
        }

        /**
        * Plays video and audio elements.
        */
        function playMedia(destiny){
            var panel = getSlideOrSection(destiny);

            //playing HTML5 media elements
            panel.find('video, audio').each(function(){
                var element = $(this).get(0);

                if( element.hasAttribute('data-autoplay') && typeof element.play === 'function' ) {
                    element.play();
                }
            });

            //youtube videos
            panel.find('iframe[src*="youtube.com/embed/"]').each(function(){
                var element = $(this).get(0);

                if ( element.hasAttribute('data-autoplay') ){
                    playYoutube(element);
                }

                //in case the URL was not loaded yet. On page load we need time for the new URL (with the API string) to load.
                element.onload = function() {
                    if ( element.hasAttribute('data-autoplay') ){
                        playYoutube(element);
                    }
                };
            });
        }

        /**
        * Plays a youtube video
        */
        function playYoutube(element){
            element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }

        /**
        * Stops video and audio elements.
        */
        function stopMedia(destiny){
            var panel = getSlideOrSection(destiny);

            //stopping HTML5 media elements
            panel.find('video, audio').each(function(){
                var element = $(this).get(0);

                if( !element.hasAttribute('data-keepplaying') && typeof element.pause === 'function' ) {
                    element.pause();
                }
            });

            //youtube videos
            panel.find('iframe[src*="youtube.com/embed/"]').each(function(){
                var element = $(this).get(0);

                if( /youtube\.com\/embed\//.test($(this).attr('src')) && !element.hasAttribute('data-keepplaying')){
                    $(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
                }
            });
        }

        /**
        * Gets the active slide (or section) for the given section
        */
        function getSlideOrSection(destiny){
            var slide = destiny.find(SLIDE_ACTIVE_SEL);
            if( slide.length ) {
                destiny = $(slide);
            }

            return destiny;
        }

        /**
        * Scrolls to the anchor in the URL when loading the site
        */
        function scrollToAnchor(){
            var anchors =  getAnchorsURL();
            var sectionAnchor = anchors.section;
            var slideAnchor = anchors.slide;

            if(sectionAnchor){  //if theres any #
                if(options.animateAnchor){
                    scrollPageAndSlide(sectionAnchor, slideAnchor);
                }else{
                    silentMoveTo(sectionAnchor, slideAnchor);
                }
            }
        }

        /**
        * Detecting any change on the URL to scroll to the given anchor link
        * (a way to detect back history button as we play with the hashes on the URL)
        */
        function hashChangeHandler(){
            if(!isScrolling && !options.lockAnchors){
                var anchors = getAnchorsURL();
                var sectionAnchor = anchors.section;
                var slideAnchor = anchors.slide;

                //when moving to a slide in the first section for the first time (first time to add an anchor to the URL)
                var isFirstSlideMove =  (typeof lastScrolledDestiny === 'undefined');
                var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' && typeof slideAnchor === 'undefined' && !slideMoving);

                if(sectionAnchor.length){
                    /*in order to call scrollpage() only once for each destination at a time
                    It is called twice for each scroll otherwise, as in case of using anchorlinks `hashChange`
                    event is fired on every scroll too.*/
                    if ((sectionAnchor && sectionAnchor !== lastScrolledDestiny) && !isFirstSlideMove
                        || isFirstScrollMove
                        || (!slideMoving && lastScrolledSlide != slideAnchor )){

                        scrollPageAndSlide(sectionAnchor, slideAnchor);
                    }
                }
            }
        }

        //gets the URL anchors (section and slide)
        function getAnchorsURL(){
            var section;
            var slide;
            var hash = window.location.hash;

            if(hash.length){
                //getting the anchor link in the URL and deleting the `#`
                var anchorsParts =  hash.replace('#', '').split('/');

                //using / for visual reasons and not as a section/slide separator #2803
                var isFunkyAnchor = hash.indexOf('#/') > -1;

                section = isFunkyAnchor ? '/' + anchorsParts[1] : decodeURIComponent(anchorsParts[0]);

                var slideAnchor = isFunkyAnchor ? anchorsParts[2] : anchorsParts[1];
                if(slideAnchor && slideAnchor.length){
                    slide = decodeURIComponent(slideAnchor);
                }
            }

            return {
                section: section,
                slide: slide
            }
        }

        //Sliding with arrow keys, both, vertical and horizontal
        function keydownHandler(e) {
            clearTimeout(keydownId);

            var activeElement = $(':focus');
            var keyCode = e.which;

            //tab?
            if(keyCode === 9){
                onTab(e);
            }

            else if(!activeElement.is('textarea') && !activeElement.is('input') && !activeElement.is('select') &&
                activeElement.attr('contentEditable') !== "true" && activeElement.attr('contentEditable') !== '' &&
                options.keyboardScrolling && options.autoScrolling){

                //preventing the scroll with arrow keys & spacebar & Page Up & Down keys
                var keyControls = [40, 38, 32, 33, 34];
                if($.inArray(keyCode, keyControls) > -1){
                    e.preventDefault();
                }

                controlPressed = e.ctrlKey;

                keydownId = setTimeout(function(){
                    onkeydown(e);
                },150);
            }
        }

        function tooltipTextHandler(){
            $(this).prev().trigger('click');
        }

        //to prevent scrolling while zooming
        function keyUpHandler(e){
            if(isWindowFocused){ //the keyup gets fired on new tab ctrl + t in Firefox
                controlPressed = e.ctrlKey;
            }
        }

        //binding the mousemove when the mouse's middle button is released
        function mouseDownHandler(e){
            //middle button
            if (e.which == 2){
                oldPageY = e.pageY;
                container.on('mousemove', mouseMoveHandler);
            }
        }

        //unbinding the mousemove when the mouse's middle button is released
        function mouseUpHandler(e){
            //middle button
            if (e.which == 2){
                container.off('mousemove');
            }
        }

        //Scrolling horizontally when clicking on the slider controls.
        function slideArrowHandler(){
            var section = $(this).closest(SECTION_SEL);

            if ($(this).hasClass(SLIDES_PREV)) {
                if(isScrollAllowed.m.left){
                    moveSlideLeft(section);
                }
            } else {
                if(isScrollAllowed.m.right){
                    moveSlideRight(section);
                }
            }
        }

        //when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
        function blurHandler(){
            isWindowFocused = false;
            controlPressed = false;
        }

        //Scrolls to the section when clicking the navigation bullet
        function sectionBulletHandler(e){
            e.preventDefault();
            var index = $(this).parent().index();
            scrollPage($(SECTION_SEL).eq(index));
        }

        //Scrolls the slider to the given slide destination for the given section
        function slideBulletHandler(e){
            e.preventDefault();
            var slides = $(this).closest(SECTION_SEL).find(SLIDES_WRAPPER_SEL);
            var destiny = slides.find(SLIDE_SEL).eq($(this).closest('li').index());

            landscapeScroll(slides, destiny);
        }

        /**
        * Keydown event
        */
        function onkeydown(e){
            var shiftPressed = e.shiftKey;

            //do nothing if we can not scroll or we are not using horizotnal key arrows.
            if(!canScroll && [37,39].indexOf(e.which) < 0){
                return;
            }

            switch (e.which) {
                //up
                case 38:
                case 33:
                    if(isScrollAllowed.k.up){
                        moveSectionUp();
                    }
                    break;

                //down
                case 32: //spacebar
                    if(shiftPressed && isScrollAllowed.k.up){
                        moveSectionUp();
                        break;
                    }
                /* falls through */
                case 40:
                case 34:
                    if(isScrollAllowed.k.down){
                        moveSectionDown();
                    }
                    break;

                //Home
                case 36:
                    if(isScrollAllowed.k.up){
                        moveTo(1);
                    }
                    break;

                //End
                case 35:
                     if(isScrollAllowed.k.down){
                        moveTo( $(SECTION_SEL).length );
                    }
                    break;

                //left
                case 37:
                    if(isScrollAllowed.k.left){
                        moveSlideLeft();
                    }
                    break;

                //right
                case 39:
                    if(isScrollAllowed.k.right){
                        moveSlideRight();
                    }
                    break;

                default:
                    return; // exit this handler for other keys
            }
        }

        /**
        * Makes sure the tab key will only focus elements within the current section/slide
        * preventing this way from breaking the page.
        * Based on "Modals and keyboard traps"
        * from https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex
        */
        function onTab(e){
            var isShiftPressed = e.shiftKey;
            var activeElement = $(':focus');
            var activeSection = $(SECTION_ACTIVE_SEL);
            var activeSlide = activeSection.find(SLIDE_ACTIVE_SEL);
            var focusableWrapper = activeSlide.length ? activeSlide : activeSection;
            var focusableElements = focusableWrapper.find(focusableElementsString);

            function preventAndFocusFirst(e){
                e.preventDefault();
                return focusableElements.first().focus();
            }

            //is there an element with focus?
            if(activeElement.length){
                if(!activeElement.closest(SECTION_ACTIVE_SEL, SLIDE_ACTIVE_SEL).length){
                    activeElement = preventAndFocusFirst(e);
                }
            }

            //no element if focused? Let's focus the first one of the section/slide
            else{
                preventAndFocusFirst(e);
            }

            //when reached the first or last focusable element of the section/slide
            //we prevent the tab action to keep it in the last focusable element
            if(!isShiftPressed && activeElement.is(focusableElements.last()) ||
                isShiftPressed && activeElement.is(focusableElements.first())
            ){
                e.preventDefault();
            }
        }

        /**
        * Detecting the direction of the mouse movement.
        * Used only for the middle button of the mouse.
        */
        var oldPageY = 0;
        function mouseMoveHandler(e){
            if(canScroll){
                // moving up
                if (e.pageY < oldPageY && isScrollAllowed.m.up){
                    moveSectionUp();
                }

                // moving down
                else if(e.pageY > oldPageY && isScrollAllowed.m.down){
                    moveSectionDown();
                }
            }
            oldPageY = e.pageY;
        }

        /**
        * Scrolls horizontal sliders.
        */
        function landscapeScroll(slides, destiny, direction){
            var section = slides.closest(SECTION_SEL);
            var v = {
                slides: slides,
                destiny: destiny,
                direction: direction,
                destinyPos: destiny.position(),
                slideIndex: destiny.index(),
                section: section,
                sectionIndex: section.index(SECTION_SEL),
                anchorLink: section.data('anchor'),
                slidesNav: section.find(SLIDES_NAV_SEL),
                slideAnchor:  getAnchor(destiny),
                prevSlide: section.find(SLIDE_ACTIVE_SEL),
                prevSlideIndex: section.find(SLIDE_ACTIVE_SEL).index(),

                //caching the value of isResizing at the momment the function is called
                //because it will be checked later inside a setTimeout and the value might change
                localIsResizing: isResizing
            };
            v.xMovement = getXmovement(v.prevSlideIndex, v.slideIndex);

            //important!! Only do it when not resizing
            if(!v.localIsResizing){
                //preventing from scrolling to the next/prev section when using scrollHorizontally
                canScroll = false;
            }

            if(options.onSlideLeave){

                //if the site is not just resizing and readjusting the slides
                if(!v.localIsResizing && v.xMovement!=='none'){
                    if($.isFunction( options.onSlideLeave )){
                        if(options.onSlideLeave.call( v.prevSlide, v.anchorLink, (v.sectionIndex + 1), v.prevSlideIndex, v.direction, v.slideIndex ) === false){
                            slideMoving = false;
                            return;
                        }
                    }
                }
            }

            destiny.addClass(ACTIVE).siblings().removeClass(ACTIVE);

            if(!v.localIsResizing){
                stopMedia(v.prevSlide);
                lazyLoad(destiny);
            }

            if(!options.loopHorizontal && options.controlArrows){
                //hidding it for the fist slide, showing for the rest
                section.find(SLIDES_ARROW_PREV_SEL).toggle(v.slideIndex!==0);

                //hidding it for the last slide, showing for the rest
                section.find(SLIDES_ARROW_NEXT_SEL).toggle(!destiny.is(':last-child'));
            }

            //only changing the URL if the slides are in the current section (not for resize re-adjusting)
            if(section.hasClass(ACTIVE) && !v.localIsResizing){
                setState(v.slideIndex, v.slideAnchor, v.anchorLink, v.sectionIndex);
            }

            performHorizontalMove(slides, v, true);
        }


        function afterSlideLoads(v){
            activeSlidesNavigation(v.slidesNav, v.slideIndex);

            //if the site is not just resizing and readjusting the slides
            if(!v.localIsResizing){
                $.isFunction( options.afterSlideLoad ) && options.afterSlideLoad.call( v.destiny, v.anchorLink, (v.sectionIndex + 1), v.slideAnchor, v.slideIndex);

                //needs to be inside the condition to prevent problems with continuousVertical and scrollHorizontally
                //and to prevent double scroll right after a windows resize
                canScroll = true;

                playMedia(v.destiny);
            }

            //letting them slide again
            slideMoving = false;
        }

        /**
        * Performs the horizontal movement. (CSS3 or jQuery)
        *
        * @param fireCallback {Bool} - determines whether or not to fire the callback
        */
        function performHorizontalMove(slides, v, fireCallback){
            var destinyPos = v.destinyPos;

            if(options.css3){
                var translate3d = 'translate3d(-' + Math.round(destinyPos.left) + 'px, 0px, 0px)';

                addAnimation(slides.find(SLIDES_CONTAINER_SEL)).css(getTransforms(translate3d));

                afterSlideLoadsId = setTimeout(function(){
                    fireCallback && afterSlideLoads(v);
                }, options.scrollingSpeed, options.easing);
            }else{
                slides.animate({
                    scrollLeft : Math.round(destinyPos.left)
                }, options.scrollingSpeed, options.easing, function() {

                    fireCallback && afterSlideLoads(v);
                });
            }
        }

        /**
        * Sets the state for the horizontal bullet navigations.
        */
        function activeSlidesNavigation(slidesNav, slideIndex){
            slidesNav.find(ACTIVE_SEL).removeClass(ACTIVE);
            slidesNav.find('li').eq(slideIndex).find('a').addClass(ACTIVE);
        }

        var previousHeight = windowsHeight;

        //when resizing the site, we adjust the heights of the sections, slimScroll...
        function resizeHandler(){
            //checking if it needs to get responsive
            responsive();

            // rebuild immediately on touch devices
            if (isTouchDevice) {
                var activeElement = $(document.activeElement);

                //if the keyboard is NOT visible
                if (!activeElement.is('textarea') && !activeElement.is('input') && !activeElement.is('select')) {
                    var currentHeight = $window.height();

                    //making sure the change in the viewport size is enough to force a rebuild. (20 % of the window to avoid problems when hidding scroll bars)
                    if( Math.abs(currentHeight - previousHeight) > (20 * Math.max(previousHeight, currentHeight) / 100) ){
                        reBuild(true);
                        previousHeight = currentHeight;
                    }
                }
            }else{
                //in order to call the functions only when the resize is finished
                //http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing
                clearTimeout(resizeId);

                resizeId = setTimeout(function(){
                    reBuild(true);
                }, 350);
            }
        }

        /**
        * Checks if the site needs to get responsive and disables autoScrolling if so.
        * A class `fp-responsive` is added to the plugin's container in case the user wants to use it for his own responsive CSS.
        */
        function responsive(){
            var widthLimit = options.responsive || options.responsiveWidth; //backwards compatiblity
            var heightLimit = options.responsiveHeight;

            //only calculating what we need. Remember its called on the resize event.
            var isBreakingPointWidth = widthLimit && $window.outerWidth() < widthLimit;
            var isBreakingPointHeight = heightLimit && $window.height() < heightLimit;

            if(widthLimit && heightLimit){
                setResponsive(isBreakingPointWidth || isBreakingPointHeight);
            }
            else if(widthLimit){
                setResponsive(isBreakingPointWidth);
            }
            else if(heightLimit){
                setResponsive(isBreakingPointHeight);
            }
        }

        /**
        * Adds transition animations for the given element
        */
        function addAnimation(element){
            var transition = 'all ' + options.scrollingSpeed + 'ms ' + options.easingcss3;

            element.removeClass(NO_TRANSITION);
            return element.css({
                '-webkit-transition': transition,
                'transition': transition
            });
        }

        /**
        * Remove transition animations for the given element
        */
        function removeAnimation(element){
            return element.addClass(NO_TRANSITION);
        }

        /**
        * Activating the vertical navigation bullets according to the given slide name.
        */
        function activateNavDots(name, sectionIndex){
            if(options.navigation){
                $(SECTION_NAV_SEL).find(ACTIVE_SEL).removeClass(ACTIVE);
                if(name){
                    $(SECTION_NAV_SEL).find('a[href="#' + name + '"]').addClass(ACTIVE);
                }else{
                    $(SECTION_NAV_SEL).find('li').eq(sectionIndex).find('a').addClass(ACTIVE);
                }
            }
        }

        /**
        * Activating the website main menu elements according to the given slide name.
        */
        function activateMenuElement(name){
            if(options.menu){
                $(options.menu).find(ACTIVE_SEL).removeClass(ACTIVE);
                $(options.menu).find('[data-menuanchor="'+name+'"]').addClass(ACTIVE);
            }
        }

        /**
        * Sets to active the current menu and vertical nav items.
        */
        function activateMenuAndNav(anchor, index){
            activateMenuElement(anchor);
            activateNavDots(anchor, index);
        }

        /**
        * Retuns `up` or `down` depending on the scrolling movement to reach its destination
        * from the current section.
        */
        function getYmovement(destiny){
            var fromIndex = $(SECTION_ACTIVE_SEL).index(SECTION_SEL);
            var toIndex = destiny.index(SECTION_SEL);
            if( fromIndex == toIndex){
                return 'none';
            }
            if(fromIndex > toIndex){
                return 'up';
            }
            return 'down';
        }

        /**
        * Retuns `right` or `left` depending on the scrolling movement to reach its destination
        * from the current slide.
        */
        function getXmovement(fromIndex, toIndex){
            if( fromIndex == toIndex){
                return 'none';
            }
            if(fromIndex > toIndex){
                return 'left';
            }
            return 'right';
        }

        function addTableClass(element){
            //In case we are styling for the 2nd time as in with reponsiveSlides
            if(!element.hasClass(TABLE)){
                element.addClass(TABLE).wrapInner('<div class="' + TABLE_CELL + '" style="height:' + getTableHeight(element) + 'px;" />');
            }
        }

        function getTableHeight(element){
            var sectionHeight = windowsHeight;

            if(options.paddingTop || options.paddingBottom){
                var section = element;
                if(!section.hasClass(SECTION)){
                    section = element.closest(SECTION_SEL);
                }

                var paddings = parseInt(section.css('padding-top')) + parseInt(section.css('padding-bottom'));
                sectionHeight = (windowsHeight - paddings);
            }

            return sectionHeight;
        }

        /**
        * Adds a css3 transform property to the container class with or without animation depending on the animated param.
        */
        function transformContainer(translate3d, animated){
            if(animated){
                addAnimation(container);
            }else{
                removeAnimation(container);
            }

            container.css(getTransforms(translate3d));

            //syncronously removing the class after the animation has been applied.
            setTimeout(function(){
                container.removeClass(NO_TRANSITION);
            },10);
        }

        /**
        * Gets a section by its anchor / index
        */
        function getSectionByAnchor(sectionAnchor){
            var section = container.find(SECTION_SEL + '[data-anchor="'+sectionAnchor+'"]');
            if(!section.length){
                var sectionIndex = typeof sectionAnchor !== 'undefined' ? sectionAnchor -1 : 0;
                section = $(SECTION_SEL).eq(sectionIndex);
            }

            return section;
        }

        /**
        * Gets a slide inside a given section by its anchor / index
        */
        function getSlideByAnchor(slideAnchor, section){
            var slide = section.find(SLIDE_SEL + '[data-anchor="'+slideAnchor+'"]');
            if(!slide.length){
                slideAnchor = typeof slideAnchor !== 'undefined' ? slideAnchor : 0;
                slide = section.find(SLIDE_SEL).eq(slideAnchor);
            }

            return slide;
        }

        /**
        * Scrolls to the given section and slide anchors
        */
        function scrollPageAndSlide(sectionAnchor, slideAnchor){
            var section = getSectionByAnchor(sectionAnchor);

            //do nothing if there's no section with the given anchor name
            if(!section.length) return;

            var slide = getSlideByAnchor(slideAnchor, section);

            //we need to scroll to the section and then to the slide
            if (sectionAnchor !== lastScrolledDestiny && !section.hasClass(ACTIVE)){
                scrollPage(section, function(){
                    scrollSlider(slide);
                });
            }
            //if we were already in the section
            else{
                scrollSlider(slide);
            }
        }

        /**
        * Scrolls the slider to the given slide destination for the given section
        */
        function scrollSlider(slide){
            if(slide.length){
                landscapeScroll(slide.closest(SLIDES_WRAPPER_SEL), slide);
            }
        }

        /**
        * Creates a landscape navigation bar with dots for horizontal sliders.
        */
        function addSlidesNavigation(section, numSlides){
            section.append('<div class="' + SLIDES_NAV + '"><ul></ul></div>');
            var nav = section.find(SLIDES_NAV_SEL);

            //top or bottom
            nav.addClass(options.slidesNavPosition);

            for(var i=0; i< numSlides; i++){
                nav.find('ul').append('<li><a href="#"><span></span></a></li>');
            }

            //centering it
            nav.css('margin-left', '-' + (nav.width()/2) + 'px');

            nav.find('li').first().find('a').addClass(ACTIVE);
        }


        /**
        * Sets the state of the website depending on the active section/slide.
        * It changes the URL hash when needed and updates the body class.
        */
        function setState(slideIndex, slideAnchor, anchorLink, sectionIndex){
            var sectionHash = '';

            if(options.anchors.length && !options.lockAnchors){

                //isn't it the first slide?
                if(slideIndex){
                    if(typeof anchorLink !== 'undefined'){
                        sectionHash = anchorLink;
                    }

                    //slide without anchor link? We take the index instead.
                    if(typeof slideAnchor === 'undefined'){
                        slideAnchor = slideIndex;
                    }

                    lastScrolledSlide = slideAnchor;
                    setUrlHash(sectionHash + '/' + slideAnchor);

                //first slide won't have slide anchor, just the section one
                }else if(typeof slideIndex !== 'undefined'){
                    lastScrolledSlide = slideAnchor;
                    setUrlHash(anchorLink);
                }

                //section without slides
                else{
                    setUrlHash(anchorLink);
                }
            }

            setBodyClass();
        }

        /**
        * Sets the URL hash.
        */
        function setUrlHash(url){
            if(options.recordHistory){
                location.hash = url;
            }else{
                //Mobile Chrome doesn't work the normal way, so... lets use HTML5 for phones :)
                if(isTouchDevice || isTouch){
                    window.history.replaceState(undefined, undefined, '#' + url);
                }else{
                    var baseUrl = window.location.href.split('#')[0];
                    window.location.replace( baseUrl + '#' + url );
                }
            }
        }

        /**
        * Gets the anchor for the given slide / section. Its index will be used if there's none.
        */
        function getAnchor(element){
            var anchor = element.data('anchor');
            var index = element.index();

            //Slide without anchor link? We take the index instead.
            if(typeof anchor === 'undefined'){
                anchor = index;
            }

            return anchor;
        }

        /**
        * Sets a class for the body of the page depending on the active section / slide
        */
        function setBodyClass(){
            var section = $(SECTION_ACTIVE_SEL);
            var slide = section.find(SLIDE_ACTIVE_SEL);

            var sectionAnchor = getAnchor(section);
            var slideAnchor = getAnchor(slide);

            var text = String(sectionAnchor);

            if(slide.length){
                text = text + '-' + slideAnchor;
            }

            //changing slash for dash to make it a valid CSS style
            text = text.replace('/', '-').replace('#','');

            //removing previous anchor classes
            var classRe = new RegExp('\\b\\s?' + VIEWING_PREFIX + '-[^\\s]+\\b', "g");
            $body[0].className = $body[0].className.replace(classRe, '');

            //adding the current anchor
            $body.addClass(VIEWING_PREFIX + '-' + text);
        }

        /**
        * Checks for translate3d support
        * @return boolean
        * http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
        */
        function support3d() {
            var el = document.createElement('p'),
                has3d,
                transforms = {
                    'webkitTransform':'-webkit-transform',
                    'OTransform':'-o-transform',
                    'msTransform':'-ms-transform',
                    'MozTransform':'-moz-transform',
                    'transform':'transform'
                };

            // Add it to the body to get the computed style.
            document.body.insertBefore(el, null);

            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = 'translate3d(1px,1px,1px)';
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
        }

        /**
        * Removes the auto scrolling action fired by the mouse wheel and trackpad.
        * After this function is called, the mousewheel and trackpad movements won't scroll through sections.
        */
        function removeMouseWheelHandler(){
            if (document.addEventListener) {
                document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
                document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
                document.removeEventListener('MozMousePixelScroll', MouseWheelHandler, false); //old Firefox
            } else {
                document.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
            }
        }

        /**
        * Adds the auto scrolling action for the mouse wheel and trackpad.
        * After this function is called, the mousewheel and trackpad movements will scroll through sections
        * https://developer.mozilla.org/en-US/docs/Web/Events/wheel
        */
        function addMouseWheelHandler(){
            var prefix = '';
            var _addEventListener;

            if (window.addEventListener){
                _addEventListener = "addEventListener";
            }else{
                _addEventListener = "attachEvent";
                prefix = 'on';
            }

             // detect available wheel event
            var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
                      document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
                      'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox


            if(support == 'DOMMouseScroll'){
                document[ _addEventListener ](prefix + 'MozMousePixelScroll', MouseWheelHandler, false);
            }

            //handle MozMousePixelScroll in older Firefox
            else{
                document[ _addEventListener ](prefix + support, MouseWheelHandler, false);
            }
        }

        /**
        * Binding the mousemove when the mouse's middle button is pressed
        */
        function addMiddleWheelHandler(){
            container
                .on('mousedown', mouseDownHandler)
                .on('mouseup', mouseUpHandler);
        }

        /**
        * Unbinding the mousemove when the mouse's middle button is released
        */
        function removeMiddleWheelHandler(){
            container
                .off('mousedown', mouseDownHandler)
                .off('mouseup', mouseUpHandler);
        }

        /**
        * Adds the possibility to auto scroll through sections on touch devices.
        */
        function addTouchHandler(){
            if(isTouchDevice || isTouch){
                if(options.autoScrolling){
                    $body.off(events.touchmove).on(events.touchmove, preventBouncing);
                }

                $(WRAPPER_SEL)
                    .off(events.touchstart).on(events.touchstart, touchStartHandler)
                    .off(events.touchmove).on(events.touchmove, touchMoveHandler);
            }
        }

        /**
        * Removes the auto scrolling for touch devices.
        */
        function removeTouchHandler(){
            if(isTouchDevice || isTouch){
                if(options.autoScrolling){
                    $body.off(events.touchmove);
                }

                $(WRAPPER_SEL)
                    .off(events.touchstart)
                    .off(events.touchmove);
            }
        }

        /*
        * Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
        * http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
        */
        function getMSPointer(){
            var pointer;

            //IE >= 11 & rest of browsers
            if(window.PointerEvent){
                pointer = { down: 'pointerdown', move: 'pointermove'};
            }

            //IE < 11
            else{
                pointer = { down: 'MSPointerDown', move: 'MSPointerMove'};
            }

            return pointer;
        }

        /**
        * Gets the pageX and pageY properties depending on the browser.
        * https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
        */
        function getEventsPage(e){
            var events = [];

            events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
            events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

            //in touch devices with scroll bar, e.pageY is detected, but we have to deal with touch events. #1008
            if(isTouch && isReallyTouch(e) && (options.scrollBar || !options.autoScrolling)){
                events.y = e.touches[0].pageY;
                events.x = e.touches[0].pageX;
            }

            return events;
        }

        /**
        * Slides silently (with no animation) the active slider to the given slide.
        * @param noCallback {bool} true or defined -> no callbacks
        */
        function silentLandscapeScroll(activeSlide, noCallbacks){
            setScrollingSpeed (0, 'internal');

            if(typeof noCallbacks !== 'undefined'){
                //preventing firing callbacks afterSlideLoad etc.
                isResizing = true;
            }

            landscapeScroll(activeSlide.closest(SLIDES_WRAPPER_SEL), activeSlide);

            if(typeof noCallbacks !== 'undefined'){
                isResizing = false;
            }

            setScrollingSpeed(originals.scrollingSpeed, 'internal');
        }

        /**
        * Scrolls silently (with no animation) the page to the given Y position.
        */
        function silentScroll(top){
            // The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
            // that's why we round it to 0.
            var roundedTop = Math.round(top);

            if (options.css3 && options.autoScrolling && !options.scrollBar){
                var translate3d = 'translate3d(0px, -' + roundedTop + 'px, 0px)';
                transformContainer(translate3d, false);
            }
            else if(options.autoScrolling && !options.scrollBar){
                container.css('top', -roundedTop);
            }
            else{
                $htmlBody.scrollTop(roundedTop);
            }
        }

        /**
        * Returns the cross-browser transform string.
        */
        function getTransforms(translate3d){
            return {
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform':translate3d,
                'transform': translate3d
            };
        }

        /**
        * Allowing or disallowing the mouse/swipe scroll in a given direction. (not for keyboard)
        * @type  m (mouse) or k (keyboard)
        */
        function setIsScrollAllowed(value, direction, type){
            //up, down, left, right
            if(direction !== 'all'){
                isScrollAllowed[type][direction] = value;
            }

            //all directions?
            else{
                $.each(Object.keys(isScrollAllowed[type]), function(index, key){
                    isScrollAllowed[type][key] = value;
                });
            }
        }

        /*
        * Destroys fullpage.js plugin events and optinally its html markup and styles
        */
        function destroy(all){
            setAutoScrolling(false, 'internal');
            setAllowScrolling(false);
            setKeyboardScrolling(false);
            container.addClass(DESTROYED);

            clearTimeout(afterSlideLoadsId);
            clearTimeout(afterSectionLoadsId);
            clearTimeout(resizeId);
            clearTimeout(scrollId);
            clearTimeout(scrollId2);

            $window
                .off('scroll', scrollHandler)
                .off('hashchange', hashChangeHandler)
                .off('resize', resizeHandler);

            $document
                .off('click touchstart', SECTION_NAV_SEL + ' a')
                .off('mouseenter', SECTION_NAV_SEL + ' li')
                .off('mouseleave', SECTION_NAV_SEL + ' li')
                .off('click touchstart', SLIDES_NAV_LINK_SEL)
                .off('mouseover', options.normalScrollElements)
                .off('mouseout', options.normalScrollElements);

            $(SECTION_SEL)
                .off('click touchstart', SLIDES_ARROW_SEL);

            clearTimeout(afterSlideLoadsId);
            clearTimeout(afterSectionLoadsId);

            //lets make a mess!
            if(all){
                destroyStructure();
            }
        }

        /*
        * Removes inline styles added by fullpage.js
        */
        function destroyStructure(){
            //reseting the `top` or `translate` properties to 0
            silentScroll(0);

            //loading all the lazy load content
            container.find('img[data-src], source[data-src], audio[data-src], iframe[data-src]').each(function(){
                setSrc($(this), 'src');
            });

            container.find('img[data-srcset]').each(function(){
                setSrc($(this), 'srcset');
            });

            $(SECTION_NAV_SEL + ', ' + SLIDES_NAV_SEL +  ', ' + SLIDES_ARROW_SEL).remove();

            //removing inline styles
            $(SECTION_SEL).css( {
                'height': '',
                'background-color' : '',
                'padding': ''
            });

            $(SLIDE_SEL).css( {
                'width': ''
            });

            container.css({
                'height': '',
                'position': '',
                '-ms-touch-action': '',
                'touch-action': ''
            });

            $htmlBody.css({
                'overflow': '',
                'height': ''
            });

            // remove .fp-enabled class
            $('html').removeClass(ENABLED);

            // remove .fp-responsive class
            $body.removeClass(RESPONSIVE);

            // remove all of the .fp-viewing- classes
            $.each($body.get(0).className.split(/\s+/), function (index, className) {
                if (className.indexOf(VIEWING_PREFIX) === 0) {
                    $body.removeClass(className);
                }
            });

            //removing added classes
            $(SECTION_SEL + ', ' + SLIDE_SEL).each(function(){
                if(options.scrollOverflowHandler){
                    options.scrollOverflowHandler.remove($(this));
                }
                $(this).removeClass(TABLE + ' ' + ACTIVE);
                $(this).attr('style', $(this).data('fp-styles'));
            });

            removeAnimation(container);

            //Unwrapping content
            container.find(TABLE_CELL_SEL + ', ' + SLIDES_CONTAINER_SEL + ', ' + SLIDES_WRAPPER_SEL).each(function(){
                //unwrap not being use in case there's no child element inside and its just text
                $(this).replaceWith(this.childNodes);
            });

            //removing the applied transition from the fullpage wrapper
            container.css({
                '-webkit-transition': 'none',
                'transition': 'none'
            });

            //scrolling the page to the top with no animation
            $htmlBody.scrollTop(0);

            //removing selectors
            var usedSelectors = [SECTION, SLIDE, SLIDES_CONTAINER];
            $.each(usedSelectors, function(index, value){
                $('.' + value).removeClass(value);
            });
        }

        /*
        * Sets the state for a variable with multiple states (original, and temporal)
        * Some variables such as `autoScrolling` or `recordHistory` might change automatically its state when using `responsive` or `autoScrolling:false`.
        * This function is used to keep track of both states, the original and the temporal one.
        * If type is not 'internal', then we assume the user is globally changing the variable.
        */
        function setVariableState(variable, value, type){
            options[variable] = value;
            if(type !== 'internal'){
                originals[variable] = value;
            }
        }

        /**
        * Displays warnings
        */
        function displayWarnings(){
            var extensions = ['fadingEffect', 'continuousHorizontal', 'scrollHorizontally', 'interlockedSlides', 'resetSliders', 'responsiveSlides', 'offsetSections', 'dragAndMove', 'scrollOverflowReset', 'parallax'];
            if($('html').hasClass(ENABLED)){
                showError('error', 'Fullpage.js can only be initialized once and you are doing it multiple times!');
                return;
            }

            // Disable mutually exclusive settings
            if (options.continuousVertical &&
                (options.loopTop || options.loopBottom)) {
                options.continuousVertical = false;
                showError('warn', 'Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
            }

            if(options.scrollBar && options.scrollOverflow){
                showError('warn', 'Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox');
            }

            if(options.continuousVertical && (options.scrollBar || !options.autoScrolling)){
                options.continuousVertical = false;
                showError('warn', 'Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
            }

            if(options.scrollOverflow && !options.scrollOverflowHandler){
                options.scrollOverflow = false;
                showError('error', 'The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.');
            }

            //using extensions? Wrong file!
            $.each(extensions, function(index, extension){
                //is the option set to true?
                if(options[extension]){
                    showError('warn', 'fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: '+ extension);
                }
            });

            //anchors can not have the same value as any element ID or NAME
            $.each(options.anchors, function(index, name){

                //case insensitive selectors (http://stackoverflow.com/a/19465187/1081396)
                var nameAttr = $document.find('[name]').filter(function() {
                    return $(this).attr('name') && $(this).attr('name').toLowerCase() == name.toLowerCase();
                });

                var idAttr = $document.find('[id]').filter(function() {
                    return $(this).attr('id') && $(this).attr('id').toLowerCase() == name.toLowerCase();
                });

                if(idAttr.length || nameAttr.length ){
                    showError('error', 'data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).');
                    idAttr.length && showError('error', '"' + name + '" is is being used by another element `id` property');
                    nameAttr.length && showError('error', '"' + name + '" is is being used by another element `name` property');
                }
            });
        }

        /**
        * Shows a message in the console of the given type.
        */
        function showError(type, text){
            console && console[type] && console[type]('fullPage: ' + text);
        }

    }; //end of $.fn.fullpage
});

},{"jquery":17}],2:[function(require,module,exports) {
"use strict";

require("./lib/css/main.scss");

require("./lib/css/jquery.fullpage.css");

require("./lib/js/leanCloudInit.js");

const AV = require('leancloud-storage');

require("fullpage.js");
const $ = require("jquery");
$('#fullpage').fullpage({
  continuousVertical: false,
  menu: '#menu',
  'navigation': true,
  anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
  paddingTop: 85,
  css3: true
});

$(".down img").click(function () {
  $.fn.fullpage.moveSectionDown();
});

$(`.project .tab li`).click(function (event) {
  let $index = $(this).index();
  $(this).addClass('active').siblings().removeClass('active');

  $(`.project .content li`).removeClass('active').eq($index).addClass('active');
});

$(".input-field .contact-message").focus(function () {
  $(this).parent(".input-field").addClass("used");
}).blur(function () {
  if ($(this).val()) return;
  $(this).parent(".input-field").removeClass("used");
});

$(".messageBoard").submit(function (e) {
  e.preventDefault();
  let $message = Array.from($(this).find(".contact-message"));
  let messageObj = {};
  $message.map(function (a, b) {
    let name = $(a).attr("name");
    let value = $(a).val();
    messageObj[name] = value;
  });

  var TestObject = AV.Object.extend('TestObject');
  var testObject = new TestObject();
  testObject.save(messageObj).then(function (object) {
    alert('留言成功');
  }, a => {
    alert("服务器出了一点小问题。");
  });
});
},{"./lib/css/main.scss":13,"./lib/css/jquery.fullpage.css":14,"./lib/js/leanCloudInit.js":23,"leancloud-storage":24,"fullpage.js":19,"jquery":17}],21:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('wss://' + hostname + ':' + '64518' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[21,2])
//# sourceMappingURL=/dist/resume-jq.map