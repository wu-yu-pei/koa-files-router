"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/koa-compose/index.js
  var require_koa_compose = __commonJS({
    "node_modules/koa-compose/index.js"(exports, module) {
      "use strict";
      module.exports = compose;
      function compose(middleware) {
        if (!Array.isArray(middleware))
          throw new TypeError("Middleware stack must be an array!");
        for (const fn of middleware) {
          if (typeof fn !== "function")
            throw new TypeError("Middleware must be composed of functions!");
        }
        return function(context, next) {
          let index = -1;
          return dispatch(0);
          function dispatch(i) {
            if (i <= index)
              return Promise.reject(new Error("next() called multiple times"));
            index = i;
            let fn = middleware[i];
            if (i === middleware.length)
              fn = next;
            if (!fn)
              return Promise.resolve();
            try {
              return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            } catch (err) {
              return Promise.reject(err);
            }
          }
        };
      }
    }
  });

  // node_modules/depd/index.js
  var require_depd = __commonJS({
    "node_modules/depd/index.js"(exports, module) {
      var relative = __require("path").relative;
      module.exports = depd;
      var basePath = process.cwd();
      function containsNamespace(str, namespace) {
        var vals = str.split(/[ ,]+/);
        var ns = String(namespace).toLowerCase();
        for (var i = 0; i < vals.length; i++) {
          var val = vals[i];
          if (val && (val === "*" || val.toLowerCase() === ns)) {
            return true;
          }
        }
        return false;
      }
      function convertDataDescriptorToAccessor(obj, prop, message) {
        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        var value = descriptor.value;
        descriptor.get = function getter() {
          return value;
        };
        if (descriptor.writable) {
          descriptor.set = function setter(val) {
            return value = val;
          };
        }
        delete descriptor.value;
        delete descriptor.writable;
        Object.defineProperty(obj, prop, descriptor);
        return descriptor;
      }
      function createArgumentsString(arity) {
        var str = "";
        for (var i = 0; i < arity; i++) {
          str += ", arg" + i;
        }
        return str.substr(2);
      }
      function createStackString(stack) {
        var str = this.name + ": " + this.namespace;
        if (this.message) {
          str += " deprecated " + this.message;
        }
        for (var i = 0; i < stack.length; i++) {
          str += "\n    at " + stack[i].toString();
        }
        return str;
      }
      function depd(namespace) {
        if (!namespace) {
          throw new TypeError("argument namespace is required");
        }
        var stack = getStack();
        var site = callSiteLocation(stack[1]);
        var file = site[0];
        function deprecate(message) {
          log.call(deprecate, message);
        }
        deprecate._file = file;
        deprecate._ignored = isignored(namespace);
        deprecate._namespace = namespace;
        deprecate._traced = istraced(namespace);
        deprecate._warned = /* @__PURE__ */ Object.create(null);
        deprecate.function = wrapfunction;
        deprecate.property = wrapproperty;
        return deprecate;
      }
      function eehaslisteners(emitter, type) {
        var count = typeof emitter.listenerCount !== "function" ? emitter.listeners(type).length : emitter.listenerCount(type);
        return count > 0;
      }
      function isignored(namespace) {
        if (process.noDeprecation) {
          return true;
        }
        var str = process.env.NO_DEPRECATION || "";
        return containsNamespace(str, namespace);
      }
      function istraced(namespace) {
        if (process.traceDeprecation) {
          return true;
        }
        var str = process.env.TRACE_DEPRECATION || "";
        return containsNamespace(str, namespace);
      }
      function log(message, site) {
        var haslisteners = eehaslisteners(process, "deprecation");
        if (!haslisteners && this._ignored) {
          return;
        }
        var caller;
        var callFile;
        var callSite;
        var depSite;
        var i = 0;
        var seen = false;
        var stack = getStack();
        var file = this._file;
        if (site) {
          depSite = site;
          callSite = callSiteLocation(stack[1]);
          callSite.name = depSite.name;
          file = callSite[0];
        } else {
          i = 2;
          depSite = callSiteLocation(stack[i]);
          callSite = depSite;
        }
        for (; i < stack.length; i++) {
          caller = callSiteLocation(stack[i]);
          callFile = caller[0];
          if (callFile === file) {
            seen = true;
          } else if (callFile === this._file) {
            file = this._file;
          } else if (seen) {
            break;
          }
        }
        var key = caller ? depSite.join(":") + "__" + caller.join(":") : void 0;
        if (key !== void 0 && key in this._warned) {
          return;
        }
        this._warned[key] = true;
        var msg = message;
        if (!msg) {
          msg = callSite === depSite || !callSite.name ? defaultMessage(depSite) : defaultMessage(callSite);
        }
        if (haslisteners) {
          var err = DeprecationError(this._namespace, msg, stack.slice(i));
          process.emit("deprecation", err);
          return;
        }
        var format = process.stderr.isTTY ? formatColor : formatPlain;
        var output = format.call(this, msg, caller, stack.slice(i));
        process.stderr.write(output + "\n", "utf8");
      }
      function callSiteLocation(callSite) {
        var file = callSite.getFileName() || "<anonymous>";
        var line = callSite.getLineNumber();
        var colm = callSite.getColumnNumber();
        if (callSite.isEval()) {
          file = callSite.getEvalOrigin() + ", " + file;
        }
        var site = [file, line, colm];
        site.callSite = callSite;
        site.name = callSite.getFunctionName();
        return site;
      }
      function defaultMessage(site) {
        var callSite = site.callSite;
        var funcName = site.name;
        if (!funcName) {
          funcName = "<anonymous@" + formatLocation(site) + ">";
        }
        var context = callSite.getThis();
        var typeName = context && callSite.getTypeName();
        if (typeName === "Object") {
          typeName = void 0;
        }
        if (typeName === "Function") {
          typeName = context.name || typeName;
        }
        return typeName && callSite.getMethodName() ? typeName + "." + funcName : funcName;
      }
      function formatPlain(msg, caller, stack) {
        var timestamp = new Date().toUTCString();
        var formatted = timestamp + " " + this._namespace + " deprecated " + msg;
        if (this._traced) {
          for (var i = 0; i < stack.length; i++) {
            formatted += "\n    at " + stack[i].toString();
          }
          return formatted;
        }
        if (caller) {
          formatted += " at " + formatLocation(caller);
        }
        return formatted;
      }
      function formatColor(msg, caller, stack) {
        var formatted = "\x1B[36;1m" + this._namespace + "\x1B[22;39m \x1B[33;1mdeprecated\x1B[22;39m \x1B[0m" + msg + "\x1B[39m";
        if (this._traced) {
          for (var i = 0; i < stack.length; i++) {
            formatted += "\n    \x1B[36mat " + stack[i].toString() + "\x1B[39m";
          }
          return formatted;
        }
        if (caller) {
          formatted += " \x1B[36m" + formatLocation(caller) + "\x1B[39m";
        }
        return formatted;
      }
      function formatLocation(callSite) {
        return relative(basePath, callSite[0]) + ":" + callSite[1] + ":" + callSite[2];
      }
      function getStack() {
        var limit = Error.stackTraceLimit;
        var obj = {};
        var prep = Error.prepareStackTrace;
        Error.prepareStackTrace = prepareObjectStackTrace;
        Error.stackTraceLimit = Math.max(10, limit);
        Error.captureStackTrace(obj);
        var stack = obj.stack.slice(1);
        Error.prepareStackTrace = prep;
        Error.stackTraceLimit = limit;
        return stack;
      }
      function prepareObjectStackTrace(obj, stack) {
        return stack;
      }
      function wrapfunction(fn, message) {
        if (typeof fn !== "function") {
          throw new TypeError("argument fn must be a function");
        }
        var args = createArgumentsString(fn.length);
        var stack = getStack();
        var site = callSiteLocation(stack[1]);
        site.name = fn.name;
        var deprecatedfn = new Function(
          "fn",
          "log",
          "deprecate",
          "message",
          "site",
          '"use strict"\nreturn function (' + args + ") {log.call(deprecate, message, site)\nreturn fn.apply(this, arguments)\n}"
        )(fn, log, this, message, site);
        return deprecatedfn;
      }
      function wrapproperty(obj, prop, message) {
        if (!obj || typeof obj !== "object" && typeof obj !== "function") {
          throw new TypeError("argument obj must be object");
        }
        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        if (!descriptor) {
          throw new TypeError("must call property on owner object");
        }
        if (!descriptor.configurable) {
          throw new TypeError("property must be configurable");
        }
        var deprecate = this;
        var stack = getStack();
        var site = callSiteLocation(stack[1]);
        site.name = prop;
        if ("value" in descriptor) {
          descriptor = convertDataDescriptorToAccessor(obj, prop, message);
        }
        var get = descriptor.get;
        var set = descriptor.set;
        if (typeof get === "function") {
          descriptor.get = function getter() {
            log.call(deprecate, message, site);
            return get.apply(this, arguments);
          };
        }
        if (typeof set === "function") {
          descriptor.set = function setter() {
            log.call(deprecate, message, site);
            return set.apply(this, arguments);
          };
        }
        Object.defineProperty(obj, prop, descriptor);
      }
      function DeprecationError(namespace, message, stack) {
        var error = new Error();
        var stackString;
        Object.defineProperty(error, "constructor", {
          value: DeprecationError
        });
        Object.defineProperty(error, "message", {
          configurable: true,
          enumerable: false,
          value: message,
          writable: true
        });
        Object.defineProperty(error, "name", {
          enumerable: false,
          configurable: true,
          value: "DeprecationError",
          writable: true
        });
        Object.defineProperty(error, "namespace", {
          configurable: true,
          enumerable: false,
          value: namespace,
          writable: true
        });
        Object.defineProperty(error, "stack", {
          configurable: true,
          enumerable: false,
          get: function() {
            if (stackString !== void 0) {
              return stackString;
            }
            return stackString = createStackString.call(this, stack);
          },
          set: function setter(val) {
            stackString = val;
          }
        });
        return error;
      }
    }
  });

  // node_modules/setprototypeof/index.js
  var require_setprototypeof = __commonJS({
    "node_modules/setprototypeof/index.js"(exports, module) {
      "use strict";
      module.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
      function setProtoOf(obj, proto) {
        obj.__proto__ = proto;
        return obj;
      }
      function mixinProperties(obj, proto) {
        for (var prop in proto) {
          if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
            obj[prop] = proto[prop];
          }
        }
        return obj;
      }
    }
  });

  // node_modules/koa-router/node_modules/statuses/codes.json
  var require_codes = __commonJS({
    "node_modules/koa-router/node_modules/statuses/codes.json"(exports, module) {
      module.exports = {
        "100": "Continue",
        "101": "Switching Protocols",
        "102": "Processing",
        "103": "Early Hints",
        "200": "OK",
        "201": "Created",
        "202": "Accepted",
        "203": "Non-Authoritative Information",
        "204": "No Content",
        "205": "Reset Content",
        "206": "Partial Content",
        "207": "Multi-Status",
        "208": "Already Reported",
        "226": "IM Used",
        "300": "Multiple Choices",
        "301": "Moved Permanently",
        "302": "Found",
        "303": "See Other",
        "304": "Not Modified",
        "305": "Use Proxy",
        "307": "Temporary Redirect",
        "308": "Permanent Redirect",
        "400": "Bad Request",
        "401": "Unauthorized",
        "402": "Payment Required",
        "403": "Forbidden",
        "404": "Not Found",
        "405": "Method Not Allowed",
        "406": "Not Acceptable",
        "407": "Proxy Authentication Required",
        "408": "Request Timeout",
        "409": "Conflict",
        "410": "Gone",
        "411": "Length Required",
        "412": "Precondition Failed",
        "413": "Payload Too Large",
        "414": "URI Too Long",
        "415": "Unsupported Media Type",
        "416": "Range Not Satisfiable",
        "417": "Expectation Failed",
        "418": "I'm a Teapot",
        "421": "Misdirected Request",
        "422": "Unprocessable Entity",
        "423": "Locked",
        "424": "Failed Dependency",
        "425": "Too Early",
        "426": "Upgrade Required",
        "428": "Precondition Required",
        "429": "Too Many Requests",
        "431": "Request Header Fields Too Large",
        "451": "Unavailable For Legal Reasons",
        "500": "Internal Server Error",
        "501": "Not Implemented",
        "502": "Bad Gateway",
        "503": "Service Unavailable",
        "504": "Gateway Timeout",
        "505": "HTTP Version Not Supported",
        "506": "Variant Also Negotiates",
        "507": "Insufficient Storage",
        "508": "Loop Detected",
        "509": "Bandwidth Limit Exceeded",
        "510": "Not Extended",
        "511": "Network Authentication Required"
      };
    }
  });

  // node_modules/koa-router/node_modules/statuses/index.js
  var require_statuses = __commonJS({
    "node_modules/koa-router/node_modules/statuses/index.js"(exports, module) {
      "use strict";
      var codes = require_codes();
      module.exports = status;
      status.message = codes;
      status.code = createMessageToStatusCodeMap(codes);
      status.codes = createStatusCodeList(codes);
      status.redirect = {
        300: true,
        301: true,
        302: true,
        303: true,
        305: true,
        307: true,
        308: true
      };
      status.empty = {
        204: true,
        205: true,
        304: true
      };
      status.retry = {
        502: true,
        503: true,
        504: true
      };
      function createMessageToStatusCodeMap(codes2) {
        var map = {};
        Object.keys(codes2).forEach(function forEachCode(code) {
          var message = codes2[code];
          var status2 = Number(code);
          map[message.toLowerCase()] = status2;
        });
        return map;
      }
      function createStatusCodeList(codes2) {
        return Object.keys(codes2).map(function mapCode(code) {
          return Number(code);
        });
      }
      function getStatusCode(message) {
        var msg = message.toLowerCase();
        if (!Object.prototype.hasOwnProperty.call(status.code, msg)) {
          throw new Error('invalid status message: "' + message + '"');
        }
        return status.code[msg];
      }
      function getStatusMessage(code) {
        if (!Object.prototype.hasOwnProperty.call(status.message, code)) {
          throw new Error("invalid status code: " + code);
        }
        return status.message[code];
      }
      function status(code) {
        if (typeof code === "number") {
          return getStatusMessage(code);
        }
        if (typeof code !== "string") {
          throw new TypeError("code must be a number or string");
        }
        var n = parseInt(code, 10);
        if (!isNaN(n)) {
          return getStatusMessage(n);
        }
        return getStatusCode(code);
      }
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/inherits/inherits.js
  var require_inherits = __commonJS({
    "node_modules/inherits/inherits.js"(exports, module) {
      try {
        util = __require("util");
        if (typeof util.inherits !== "function")
          throw "";
        module.exports = util.inherits;
      } catch (e) {
        module.exports = require_inherits_browser();
      }
      var util;
    }
  });

  // node_modules/toidentifier/index.js
  var require_toidentifier = __commonJS({
    "node_modules/toidentifier/index.js"(exports, module) {
      "use strict";
      module.exports = toIdentifier;
      function toIdentifier(str) {
        return str.split(" ").map(function(token) {
          return token.slice(0, 1).toUpperCase() + token.slice(1);
        }).join("").replace(/[^ _0-9a-z]/gi, "");
      }
    }
  });

  // node_modules/koa-router/node_modules/http-errors/index.js
  var require_http_errors = __commonJS({
    "node_modules/koa-router/node_modules/http-errors/index.js"(exports, module) {
      "use strict";
      var deprecate = require_depd()("http-errors");
      var setPrototypeOf = require_setprototypeof();
      var statuses = require_statuses();
      var inherits = require_inherits();
      var toIdentifier = require_toidentifier();
      module.exports = createError;
      module.exports.HttpError = createHttpErrorConstructor();
      module.exports.isHttpError = createIsHttpErrorFunction(module.exports.HttpError);
      populateConstructorExports(module.exports, statuses.codes, module.exports.HttpError);
      function codeClass(status) {
        return Number(String(status).charAt(0) + "00");
      }
      function createError() {
        var err;
        var msg;
        var status = 500;
        var props = {};
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          var type = typeof arg;
          if (type === "object" && arg instanceof Error) {
            err = arg;
            status = err.status || err.statusCode || status;
          } else if (type === "number" && i === 0) {
            status = arg;
          } else if (type === "string") {
            msg = arg;
          } else if (type === "object") {
            props = arg;
          } else {
            throw new TypeError("argument #" + (i + 1) + " unsupported type " + type);
          }
        }
        if (typeof status === "number" && (status < 400 || status >= 600)) {
          deprecate("non-error status code; use only 4xx or 5xx status codes");
        }
        if (typeof status !== "number" || !statuses.message[status] && (status < 400 || status >= 600)) {
          status = 500;
        }
        var HttpError = createError[status] || createError[codeClass(status)];
        if (!err) {
          err = HttpError ? new HttpError(msg) : new Error(msg || statuses.message[status]);
          Error.captureStackTrace(err, createError);
        }
        if (!HttpError || !(err instanceof HttpError) || err.status !== status) {
          err.expose = status < 500;
          err.status = err.statusCode = status;
        }
        for (var key in props) {
          if (key !== "status" && key !== "statusCode") {
            err[key] = props[key];
          }
        }
        return err;
      }
      function createHttpErrorConstructor() {
        function HttpError() {
          throw new TypeError("cannot construct abstract class");
        }
        inherits(HttpError, Error);
        return HttpError;
      }
      function createClientErrorConstructor(HttpError, name, code) {
        var className = toClassName(name);
        function ClientError(message) {
          var msg = message != null ? message : statuses.message[code];
          var err = new Error(msg);
          Error.captureStackTrace(err, ClientError);
          setPrototypeOf(err, ClientError.prototype);
          Object.defineProperty(err, "message", {
            enumerable: true,
            configurable: true,
            value: msg,
            writable: true
          });
          Object.defineProperty(err, "name", {
            enumerable: false,
            configurable: true,
            value: className,
            writable: true
          });
          return err;
        }
        inherits(ClientError, HttpError);
        nameFunc(ClientError, className);
        ClientError.prototype.status = code;
        ClientError.prototype.statusCode = code;
        ClientError.prototype.expose = true;
        return ClientError;
      }
      function createIsHttpErrorFunction(HttpError) {
        return function isHttpError(val) {
          if (!val || typeof val !== "object") {
            return false;
          }
          if (val instanceof HttpError) {
            return true;
          }
          return val instanceof Error && typeof val.expose === "boolean" && typeof val.statusCode === "number" && val.status === val.statusCode;
        };
      }
      function createServerErrorConstructor(HttpError, name, code) {
        var className = toClassName(name);
        function ServerError(message) {
          var msg = message != null ? message : statuses.message[code];
          var err = new Error(msg);
          Error.captureStackTrace(err, ServerError);
          setPrototypeOf(err, ServerError.prototype);
          Object.defineProperty(err, "message", {
            enumerable: true,
            configurable: true,
            value: msg,
            writable: true
          });
          Object.defineProperty(err, "name", {
            enumerable: false,
            configurable: true,
            value: className,
            writable: true
          });
          return err;
        }
        inherits(ServerError, HttpError);
        nameFunc(ServerError, className);
        ServerError.prototype.status = code;
        ServerError.prototype.statusCode = code;
        ServerError.prototype.expose = false;
        return ServerError;
      }
      function nameFunc(func, name) {
        var desc = Object.getOwnPropertyDescriptor(func, "name");
        if (desc && desc.configurable) {
          desc.value = name;
          Object.defineProperty(func, "name", desc);
        }
      }
      function populateConstructorExports(exports2, codes, HttpError) {
        codes.forEach(function forEachCode(code) {
          var CodeError;
          var name = toIdentifier(statuses.message[code]);
          switch (codeClass(code)) {
            case 400:
              CodeError = createClientErrorConstructor(HttpError, name, code);
              break;
            case 500:
              CodeError = createServerErrorConstructor(HttpError, name, code);
              break;
          }
          if (CodeError) {
            exports2[code] = CodeError;
            exports2[name] = CodeError;
          }
        });
      }
      function toClassName(name) {
        return name.substr(-5) !== "Error" ? name + "Error" : name;
      }
    }
  });

  // node_modules/methods/index.js
  var require_methods = __commonJS({
    "node_modules/methods/index.js"(exports, module) {
      "use strict";
      var http = __require("http");
      module.exports = getCurrentNodeMethods() || getBasicNodeMethods();
      function getCurrentNodeMethods() {
        return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
          return method.toLowerCase();
        });
      }
      function getBasicNodeMethods() {
        return [
          "get",
          "post",
          "put",
          "head",
          "delete",
          "options",
          "trace",
          "copy",
          "lock",
          "mkcol",
          "move",
          "purge",
          "propfind",
          "proppatch",
          "unlock",
          "report",
          "mkactivity",
          "checkout",
          "merge",
          "m-search",
          "notify",
          "subscribe",
          "unsubscribe",
          "patch",
          "search",
          "connect"
        ];
      }
    }
  });

  // node_modules/path-to-regexp/dist.es2015/index.js
  var dist_exports = {};
  __export(dist_exports, {
    compile: () => compile,
    match: () => match,
    parse: () => parse,
    pathToRegexp: () => pathToRegexp,
    regexpToFunction: () => regexpToFunction,
    tokensToFunction: () => tokensToFunction,
    tokensToRegexp: () => tokensToRegexp
  });
  function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
      var char = str[i];
      if (char === "*" || char === "+" || char === "?") {
        tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
        continue;
      }
      if (char === "\\") {
        tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
        continue;
      }
      if (char === "{") {
        tokens.push({ type: "OPEN", index: i, value: str[i++] });
        continue;
      }
      if (char === "}") {
        tokens.push({ type: "CLOSE", index: i, value: str[i++] });
        continue;
      }
      if (char === ":") {
        var name = "";
        var j = i + 1;
        while (j < str.length) {
          var code = str.charCodeAt(j);
          if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
            name += str[j++];
            continue;
          }
          break;
        }
        if (!name)
          throw new TypeError("Missing parameter name at ".concat(i));
        tokens.push({ type: "NAME", index: i, value: name });
        i = j;
        continue;
      }
      if (char === "(") {
        var count = 1;
        var pattern = "";
        var j = i + 1;
        if (str[j] === "?") {
          throw new TypeError('Pattern cannot start with "?" at '.concat(j));
        }
        while (j < str.length) {
          if (str[j] === "\\") {
            pattern += str[j++] + str[j++];
            continue;
          }
          if (str[j] === ")") {
            count--;
            if (count === 0) {
              j++;
              break;
            }
          } else if (str[j] === "(") {
            count++;
            if (str[j + 1] !== "?") {
              throw new TypeError("Capturing groups are not allowed at ".concat(j));
            }
          }
          pattern += str[j++];
        }
        if (count)
          throw new TypeError("Unbalanced pattern at ".concat(i));
        if (!pattern)
          throw new TypeError("Missing pattern at ".concat(i));
        tokens.push({ type: "PATTERN", index: i, value: pattern });
        i = j;
        continue;
      }
      tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
  }
  function parse(str, options) {
    if (options === void 0) {
      options = {};
    }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path2 = "";
    var tryConsume = function(type) {
      if (i < tokens.length && tokens[i].type === type)
        return tokens[i++].value;
    };
    var mustConsume = function(type) {
      var value2 = tryConsume(type);
      if (value2 !== void 0)
        return value2;
      var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
      throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function() {
      var result2 = "";
      var value2;
      while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
        result2 += value2;
      }
      return result2;
    };
    while (i < tokens.length) {
      var char = tryConsume("CHAR");
      var name = tryConsume("NAME");
      var pattern = tryConsume("PATTERN");
      if (name || pattern) {
        var prefix = char || "";
        if (prefixes.indexOf(prefix) === -1) {
          path2 += prefix;
          prefix = "";
        }
        if (path2) {
          result.push(path2);
          path2 = "";
        }
        result.push({
          name: name || key++,
          prefix,
          suffix: "",
          pattern: pattern || defaultPattern,
          modifier: tryConsume("MODIFIER") || ""
        });
        continue;
      }
      var value = char || tryConsume("ESCAPED_CHAR");
      if (value) {
        path2 += value;
        continue;
      }
      if (path2) {
        result.push(path2);
        path2 = "";
      }
      var open = tryConsume("OPEN");
      if (open) {
        var prefix = consumeText();
        var name_1 = tryConsume("NAME") || "";
        var pattern_1 = tryConsume("PATTERN") || "";
        var suffix = consumeText();
        mustConsume("CLOSE");
        result.push({
          name: name_1 || (pattern_1 ? key++ : ""),
          pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
          prefix,
          suffix,
          modifier: tryConsume("MODIFIER") || ""
        });
        continue;
      }
      mustConsume("END");
    }
    return result;
  }
  function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
  }
  function tokensToFunction(tokens, options) {
    if (options === void 0) {
      options = {};
    }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function(x) {
      return x;
    } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    var matches = tokens.map(function(token) {
      if (typeof token === "object") {
        return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
      }
    });
    return function(data) {
      var path2 = "";
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (typeof token === "string") {
          path2 += token;
          continue;
        }
        var value = data ? data[token.name] : void 0;
        var optional = token.modifier === "?" || token.modifier === "*";
        var repeat = token.modifier === "*" || token.modifier === "+";
        if (Array.isArray(value)) {
          if (!repeat) {
            throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
          }
          if (value.length === 0) {
            if (optional)
              continue;
            throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
          }
          for (var j = 0; j < value.length; j++) {
            var segment = encode(value[j], token);
            if (validate && !matches[i].test(segment)) {
              throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
            }
            path2 += token.prefix + segment + token.suffix;
          }
          continue;
        }
        if (typeof value === "string" || typeof value === "number") {
          var segment = encode(String(value), token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path2 += token.prefix + segment + token.suffix;
          continue;
        }
        if (optional)
          continue;
        var typeOfMessage = repeat ? "an array" : "a string";
        throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
      }
      return path2;
    };
  }
  function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
  }
  function regexpToFunction(re, keys, options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.decode, decode = _a === void 0 ? function(x) {
      return x;
    } : _a;
    return function(pathname) {
      var m = re.exec(pathname);
      if (!m)
        return false;
      var path2 = m[0], index = m.index;
      var params = /* @__PURE__ */ Object.create(null);
      var _loop_1 = function(i2) {
        if (m[i2] === void 0)
          return "continue";
        var key = keys[i2 - 1];
        if (key.modifier === "*" || key.modifier === "+") {
          params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
            return decode(value, key);
          });
        } else {
          params[key.name] = decode(m[i2], key);
        }
      };
      for (var i = 1; i < m.length; i++) {
        _loop_1(i);
      }
      return { path: path2, index, params };
    };
  }
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  }
  function flags(options) {
    return options && options.sensitive ? "" : "i";
  }
  function regexpToRegexp(path2, keys) {
    if (!keys)
      return path2;
    var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
    var index = 0;
    var execResult = groupsRegex.exec(path2.source);
    while (execResult) {
      keys.push({
        name: execResult[1] || index++,
        prefix: "",
        suffix: "",
        modifier: "",
        pattern: ""
      });
      execResult = groupsRegex.exec(path2.source);
    }
    return path2;
  }
  function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function(path2) {
      return pathToRegexp(path2, keys, options).source;
    });
    return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
  }
  function stringToRegexp(path2, keys, options) {
    return tokensToRegexp(parse(path2, options), keys, options);
  }
  function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
      return x;
    } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
    var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
    var delimiterRe = "[".concat(escapeString(delimiter), "]");
    var route = start ? "^" : "";
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
      var token = tokens_1[_i];
      if (typeof token === "string") {
        route += escapeString(encode(token));
      } else {
        var prefix = escapeString(encode(token.prefix));
        var suffix = escapeString(encode(token.suffix));
        if (token.pattern) {
          if (keys)
            keys.push(token);
          if (prefix || suffix) {
            if (token.modifier === "+" || token.modifier === "*") {
              var mod = token.modifier === "*" ? "?" : "";
              route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
            } else {
              route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
            }
          } else {
            if (token.modifier === "+" || token.modifier === "*") {
              route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
            } else {
              route += "(".concat(token.pattern, ")").concat(token.modifier);
            }
          }
        } else {
          route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
        }
      }
    }
    if (end) {
      if (!strict)
        route += "".concat(delimiterRe, "?");
      route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
    } else {
      var endToken = tokens[tokens.length - 1];
      var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
      if (!strict) {
        route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
      }
      if (!isEndDelimited) {
        route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
      }
    }
    return new RegExp(route, flags(options));
  }
  function pathToRegexp(path2, keys, options) {
    if (path2 instanceof RegExp)
      return regexpToRegexp(path2, keys);
    if (Array.isArray(path2))
      return arrayToRegexp(path2, keys, options);
    return stringToRegexp(path2, keys, options);
  }
  var init_dist = __esm({
    "node_modules/path-to-regexp/dist.es2015/index.js"() {
    }
  });

  // node_modules/koa-router/lib/layer.js
  var require_layer = __commonJS({
    "node_modules/koa-router/lib/layer.js"(exports, module) {
      var { parse: parseUrl, format: formatUrl } = __require("url");
      var { pathToRegexp: pathToRegexp2, compile: compile2, parse: parse2 } = (init_dist(), __toCommonJS(dist_exports));
      module.exports = Layer;
      function Layer(path2, methods, middleware, opts = {}) {
        this.opts = opts;
        this.name = this.opts.name || null;
        this.methods = [];
        this.paramNames = [];
        this.stack = Array.isArray(middleware) ? middleware : [middleware];
        for (const method of methods) {
          const l = this.methods.push(method.toUpperCase());
          if (this.methods[l - 1] === "GET")
            this.methods.unshift("HEAD");
        }
        for (let i = 0; i < this.stack.length; i++) {
          const fn = this.stack[i];
          const type = typeof fn;
          if (type !== "function")
            throw new Error(
              `${methods.toString()} \`${this.opts.name || path2}\`: \`middleware\` must be a function, not \`${type}\``
            );
        }
        this.path = path2;
        this.regexp = pathToRegexp2(path2, this.paramNames, this.opts);
      }
      Layer.prototype.match = function(path2) {
        return this.regexp.test(path2);
      };
      Layer.prototype.params = function(path2, captures, params = {}) {
        for (let len = captures.length, i = 0; i < len; i++) {
          if (this.paramNames[i]) {
            const c = captures[i];
            if (c && c.length > 0)
              params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
          }
        }
        return params;
      };
      Layer.prototype.captures = function(path2) {
        return this.opts.ignoreCaptures ? [] : path2.match(this.regexp).slice(1);
      };
      Layer.prototype.url = function(params, options) {
        let args = params;
        const url = this.path.replace(/\(\.\*\)/g, "");
        if (typeof params !== "object") {
          args = Array.prototype.slice.call(arguments);
          if (typeof args[args.length - 1] === "object") {
            options = args[args.length - 1];
            args = args.slice(0, -1);
          }
        }
        const toPath = compile2(url, { encode: encodeURIComponent, ...options });
        let replaced;
        const tokens = parse2(url);
        let replace = {};
        if (Array.isArray(args)) {
          for (let len = tokens.length, i = 0, j = 0; i < len; i++) {
            if (tokens[i].name)
              replace[tokens[i].name] = args[j++];
          }
        } else if (tokens.some((token) => token.name)) {
          replace = params;
        } else if (!options) {
          options = params;
        }
        replaced = toPath(replace);
        if (options && options.query) {
          replaced = parseUrl(replaced);
          if (typeof options.query === "string") {
            replaced.search = options.query;
          } else {
            replaced.search = void 0;
            replaced.query = options.query;
          }
          return formatUrl(replaced);
        }
        return replaced;
      };
      Layer.prototype.param = function(param, fn) {
        const { stack } = this;
        const params = this.paramNames;
        const middleware = function(ctx, next) {
          return fn.call(this, ctx.params[param], ctx, next);
        };
        middleware.param = param;
        const names = params.map(function(p) {
          return p.name;
        });
        const x = names.indexOf(param);
        if (x > -1) {
          stack.some(function(fn2, i) {
            if (!fn2.param || names.indexOf(fn2.param) > x) {
              stack.splice(i, 0, middleware);
              return true;
            }
          });
        }
        return this;
      };
      Layer.prototype.setPrefix = function(prefix) {
        if (this.path) {
          this.path = this.path !== "/" || this.opts.strict === true ? `${prefix}${this.path}` : prefix;
          this.paramNames = [];
          this.regexp = pathToRegexp2(this.path, this.paramNames, this.opts);
        }
        return this;
      };
      function safeDecodeURIComponent(text) {
        try {
          return decodeURIComponent(text);
        } catch {
          return text;
        }
      }
    }
  });

  // node_modules/koa-router/lib/router.js
  var require_router = __commonJS({
    "node_modules/koa-router/lib/router.js"(exports, module) {
      var { debuglog } = __require("util");
      var compose = require_koa_compose();
      var HttpError = require_http_errors();
      var methods = require_methods();
      var { pathToRegexp: pathToRegexp2 } = (init_dist(), __toCommonJS(dist_exports));
      var Layer = require_layer();
      var debug = debuglog("koa-router");
      module.exports = Router;
      function Router(opts = {}) {
        if (!(this instanceof Router))
          return new Router(opts);
        this.opts = opts;
        this.methods = this.opts.methods || [
          "HEAD",
          "OPTIONS",
          "GET",
          "PUT",
          "PATCH",
          "POST",
          "DELETE"
        ];
        this.exclusive = Boolean(this.opts.exclusive);
        this.params = {};
        this.stack = [];
        this.host = this.opts.host;
      }
      for (const method_ of methods) {
        let setMethodVerb2 = function(method) {
          Router.prototype[method] = function(name, path2, middleware) {
            if (typeof path2 === "string" || path2 instanceof RegExp) {
              middleware = Array.prototype.slice.call(arguments, 2);
            } else {
              middleware = Array.prototype.slice.call(arguments, 1);
              path2 = name;
              name = null;
            }
            if (typeof path2 !== "string" && !(path2 instanceof RegExp) && (!Array.isArray(path2) || path2.length === 0))
              throw new Error(
                `You have to provide a path when adding a ${method} handler`
              );
            this.register(path2, [method], middleware, { name });
            return this;
          };
        };
        setMethodVerb = setMethodVerb2;
        setMethodVerb2(method_);
      }
      var setMethodVerb;
      Router.prototype.del = Router.prototype["delete"];
      Router.prototype.use = function() {
        const router = this;
        const middleware = Array.prototype.slice.call(arguments);
        let path2;
        if (Array.isArray(middleware[0]) && typeof middleware[0][0] === "string") {
          const arrPaths = middleware[0];
          for (const p of arrPaths) {
            router.use.apply(router, [p].concat(middleware.slice(1)));
          }
          return this;
        }
        const hasPath = typeof middleware[0] === "string";
        if (hasPath)
          path2 = middleware.shift();
        for (const m of middleware) {
          if (m.router) {
            const cloneRouter = Object.assign(
              Object.create(Router.prototype),
              m.router,
              {
                stack: [...m.router.stack]
              }
            );
            for (let j = 0; j < cloneRouter.stack.length; j++) {
              const nestedLayer = cloneRouter.stack[j];
              const cloneLayer = Object.assign(
                Object.create(Layer.prototype),
                nestedLayer
              );
              if (path2)
                cloneLayer.setPrefix(path2);
              if (router.opts.prefix)
                cloneLayer.setPrefix(router.opts.prefix);
              router.stack.push(cloneLayer);
              cloneRouter.stack[j] = cloneLayer;
            }
            if (router.params) {
              let setRouterParams2 = function(paramArr) {
                const routerParams = paramArr;
                for (const key of routerParams) {
                  cloneRouter.param(key, router.params[key]);
                }
              };
              var setRouterParams = setRouterParams2;
              setRouterParams2(Object.keys(router.params));
            }
          } else {
            const keys = [];
            pathToRegexp2(router.opts.prefix || "", keys);
            const routerPrefixHasParam = router.opts.prefix && keys.length;
            router.register(path2 || "([^/]*)", [], m, {
              end: false,
              ignoreCaptures: !hasPath && !routerPrefixHasParam
            });
          }
        }
        return this;
      };
      Router.prototype.prefix = function(prefix) {
        prefix = prefix.replace(/\/$/, "");
        this.opts.prefix = prefix;
        for (let i = 0; i < this.stack.length; i++) {
          const route = this.stack[i];
          route.setPrefix(prefix);
        }
        return this;
      };
      Router.prototype.routes = Router.prototype.middleware = function() {
        const router = this;
        const dispatch = function dispatch2(ctx, next) {
          debug("%s %s", ctx.method, ctx.path);
          const hostMatched = router.matchHost(ctx.host);
          if (!hostMatched) {
            return next();
          }
          const path2 = router.opts.routerPath || ctx.routerPath || ctx.path;
          const matched = router.match(path2, ctx.method);
          let layerChain;
          if (ctx.matched) {
            ctx.matched.push.apply(ctx.matched, matched.path);
          } else {
            ctx.matched = matched.path;
          }
          ctx.router = router;
          if (!matched.route)
            return next();
          const matchedLayers = matched.pathAndMethod;
          const mostSpecificLayer = matchedLayers[matchedLayers.length - 1];
          ctx._matchedRoute = mostSpecificLayer.path;
          if (mostSpecificLayer.name) {
            ctx._matchedRouteName = mostSpecificLayer.name;
          }
          layerChain = (router.exclusive ? [mostSpecificLayer] : matchedLayers).reduce(function(memo, layer) {
            memo.push(function(ctx2, next2) {
              ctx2.captures = layer.captures(path2, ctx2.captures);
              ctx2.params = ctx2.request.params = layer.params(
                path2,
                ctx2.captures,
                ctx2.params
              );
              ctx2.routerPath = layer.path;
              ctx2.routerName = layer.name;
              ctx2._matchedRoute = layer.path;
              if (layer.name) {
                ctx2._matchedRouteName = layer.name;
              }
              return next2();
            });
            return memo.concat(layer.stack);
          }, []);
          return compose(layerChain)(ctx, next);
        };
        dispatch.router = this;
        return dispatch;
      };
      Router.prototype.allowedMethods = function(options = {}) {
        const implemented = this.methods;
        return function allowedMethods(ctx, next) {
          return next().then(function() {
            const allowed = {};
            if (!ctx.status || ctx.status === 404) {
              for (let i = 0; i < ctx.matched.length; i++) {
                const route = ctx.matched[i];
                for (let j = 0; j < route.methods.length; j++) {
                  const method = route.methods[j];
                  allowed[method] = method;
                }
              }
              const allowedArr = Object.keys(allowed);
              if (!~implemented.indexOf(ctx.method)) {
                if (options.throw) {
                  const notImplementedThrowable = typeof options.notImplemented === "function" ? options.notImplemented() : new HttpError.NotImplemented();
                  throw notImplementedThrowable;
                } else {
                  ctx.status = 501;
                  ctx.set("Allow", allowedArr.join(", "));
                }
              } else if (allowedArr.length > 0) {
                if (ctx.method === "OPTIONS") {
                  ctx.status = 200;
                  ctx.body = "";
                  ctx.set("Allow", allowedArr.join(", "));
                } else if (!allowed[ctx.method]) {
                  if (options.throw) {
                    const notAllowedThrowable = typeof options.methodNotAllowed === "function" ? options.methodNotAllowed() : new HttpError.MethodNotAllowed();
                    throw notAllowedThrowable;
                  } else {
                    ctx.status = 405;
                    ctx.set("Allow", allowedArr.join(", "));
                  }
                }
              }
            }
          });
        };
      };
      Router.prototype.all = function(name, path2, middleware) {
        if (typeof path2 === "string") {
          middleware = Array.prototype.slice.call(arguments, 2);
        } else {
          middleware = Array.prototype.slice.call(arguments, 1);
          path2 = name;
          name = null;
        }
        if (typeof path2 !== "string" && !(path2 instanceof RegExp) && (!Array.isArray(path2) || path2.length === 0))
          throw new Error("You have to provide a path when adding an all handler");
        this.register(path2, methods, middleware, { name });
        return this;
      };
      Router.prototype.redirect = function(source, destination, code) {
        if (typeof source === "symbol" || source[0] !== "/") {
          source = this.url(source);
          if (source instanceof Error)
            throw source;
        }
        if (typeof destination === "symbol" || destination[0] !== "/" && !destination.includes("://")) {
          destination = this.url(destination);
          if (destination instanceof Error)
            throw destination;
        }
        return this.all(source, (ctx) => {
          ctx.redirect(destination);
          ctx.status = code || 301;
        });
      };
      Router.prototype.register = function(path2, methods2, middleware, opts = {}) {
        const router = this;
        const { stack } = this;
        if (Array.isArray(path2)) {
          for (const curPath of path2) {
            router.register.call(router, curPath, methods2, middleware, opts);
          }
          return this;
        }
        const route = new Layer(path2, methods2, middleware, {
          end: opts.end === false ? opts.end : true,
          name: opts.name,
          sensitive: opts.sensitive || this.opts.sensitive || false,
          strict: opts.strict || this.opts.strict || false,
          prefix: opts.prefix || this.opts.prefix || "",
          ignoreCaptures: opts.ignoreCaptures
        });
        if (this.opts.prefix) {
          route.setPrefix(this.opts.prefix);
        }
        for (let i = 0; i < Object.keys(this.params).length; i++) {
          const param = Object.keys(this.params)[i];
          route.param(param, this.params[param]);
        }
        stack.push(route);
        debug("defined route %s %s", route.methods, route.path);
        return route;
      };
      Router.prototype.route = function(name) {
        const routes = this.stack;
        for (let len = routes.length, i = 0; i < len; i++) {
          if (routes[i].name && routes[i].name === name)
            return routes[i];
        }
        return false;
      };
      Router.prototype.url = function(name, params) {
        const route = this.route(name);
        if (route) {
          const args = Array.prototype.slice.call(arguments, 1);
          return route.url.apply(route, args);
        }
        return new Error(`No route found for name: ${String(name)}`);
      };
      Router.prototype.match = function(path2, method) {
        const layers = this.stack;
        let layer;
        const matched = {
          path: [],
          pathAndMethod: [],
          route: false
        };
        for (let len = layers.length, i = 0; i < len; i++) {
          layer = layers[i];
          debug("test %s %s", layer.path, layer.regexp);
          if (layer.match(path2)) {
            matched.path.push(layer);
            if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
              matched.pathAndMethod.push(layer);
              if (layer.methods.length > 0)
                matched.route = true;
            }
          }
        }
        return matched;
      };
      Router.prototype.matchHost = function(input) {
        const { host } = this;
        if (!host) {
          return true;
        }
        if (!input) {
          return false;
        }
        if (typeof host === "string") {
          return input === host;
        }
        if (typeof host === "object" && host instanceof RegExp) {
          return host.test(input);
        }
      };
      Router.prototype.param = function(param, middleware) {
        this.params[param] = middleware;
        for (let i = 0; i < this.stack.length; i++) {
          const route = this.stack[i];
          route.param(param, middleware);
        }
        return this;
      };
      Router.url = function(path2) {
        const args = Array.prototype.slice.call(arguments, 1);
        return Layer.prototype.url.apply({ path: path2 }, args);
      };
    }
  });

  // src/index.ts
  var import_koa_router = __toESM(require_router());
  var import_fs = __toESM(__require("fs"));
  var import_path = __toESM(__require("path"));
  function getAllDirs(rootPath, target = []) {
    const files = import_fs.default.readdirSync(rootPath);
    for (let i = 0; i < files.length; i++) {
      const fullPath = import_path.default.join(rootPath, files[i]);
      const stat = import_fs.default.statSync(fullPath);
      if (stat.isDirectory() && !fullPath.includes("node_module")) {
        target.push(fullPath);
        getAllDirs(fullPath, target);
      }
    }
    return target;
  }
  function src_default(app) {
    const rootPath = process.cwd();
    const allDirPath = getAllDirs(rootPath);
    const routerPath = allDirPath.find((item, index) => {
      return /router\b/.test(item);
    });
    const routerDirs = import_fs.default.readdirSync(routerPath, { encoding: "utf-8" });
    routerDirs.forEach((dir) => {
      const _router = new import_koa_router.default({ prefix: `/${dir}` });
      const routers = import_fs.default.readdirSync(`${routerPath}/${dir}`, { encoding: "utf-8" });
      routers.forEach(async (router) => {
        const fn = await import(`${routerPath}/${dir}/${router}`);
        router = router.replace(/.ts/, "");
        if (Array.isArray(fn.default)) {
          _router[router]("/", ...fn.default);
        } else if (typeof fn.default === "function") {
          _router[router]("/", fn.default);
        }
      });
      app.use(_router.routes());
    });
  }
})();
/*!
 * depd
 * Copyright(c) 2014-2018 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * toidentifier
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
