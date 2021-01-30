"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHook = exports.getHook = exports.ReactHooksWrapper = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class HooksExecuter {
  __hooks = {};
  __temp = {};

  constructor() {
    this.setHook = this.setHook.bind(this);
    this.getHook = this.getHook.bind(this);
    this.putHooks = this.putHooks.bind(this);
  }
  /**
   * Add hook
   * @param {string} name hook name
   * @param {function} hook hook function
   */


  setHook(name, hook) {
    [{
      value: name,
      id: "name",
      type: "string"
    }, {
      value: hook,
      id: "hook",
      type: "function"
    }].forEach(({
      value,
      id,
      type
    }) => {
      if (typeof value !== type) throw new TypeError("\"".concat(id, "\" expected to be of type ").concat(type));
    });
    this.__hooks[name] = {
      name,
      hook
    };
    return this;
  }
  /**
   *
   * @param {string} name hook name
   * @param {function} hook hook fynction
   */


  putHooks(name, result) {
    this.__temp[name] = result;
  }
  /**
   * Empty component
   */


  component() {
    const EmptyComponent = () => {
      Object.values(this.__hooks).forEach(({
        name,
        hook
      }) => this.putHooks(name, hook()));
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null);
    };

    return EmptyComponent;
  }
  /**
   * Get hook
   * @param {string} name hook name
   * @returns {any}
   */


  getHook(name) {
    return this.__temp[name];
  }

} // new instance


const instance = new HooksExecuter(); // component

const ReactHooksWrapper = instance.component(); // methods

exports.ReactHooksWrapper = ReactHooksWrapper;
const getHook = instance.getHook,
      setHook = instance.setHook;
exports.setHook = setHook;
exports.getHook = getHook;