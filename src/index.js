import React, { Fragment } from "react";

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
    [
      { value: name, id: "name", type: "string" },
      { value: hook, id: "hook", type: "function" }
    ].forEach(({ value, id, type }) => {
      if (typeof value !== type)
        throw new TypeError(`"${id}" expected to be of type ${type}`);
    });

    this.__hooks[name] = { name, hook };
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
      Object.values(this.__hooks).forEach(({ name, hook }) =>
        this.putHooks(name, hook())
      );
      return <Fragment />;
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
}

// new instance
const instance = new HooksExecuter();

// component
export const ReactHooksWrapper = instance.component();

// methods
export const { getHook, setHook } = instance;
