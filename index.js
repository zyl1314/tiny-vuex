import mixin from './mixin.js';

let Vue = null

class Store {
  constructor(options) {
    this._mutations = Object.create(null);
    this._actions = Object.create(null);
    this._vm = Object.create(null);

    let {
      state = {},
      getters = {},
      mutations = {},
      actions = {}
    } = options;


    // 数据响应
    this.observeState(state, getters);
    // 注册mutions
    this.registerMutations(mutations);
    // 注册actions
    this.registerActions(actions);
  }

  get state() {
    return this._vm.state
  }

  observeState(state, getters) {
    let store = this;
    store.getters = {};

    // 注入state getters
    let computed = {};
    for (let key in getters) {
      computed[key] = function() {
        return getters[key](state, store.getters);
      }
    }
    // 响应式
    store._vm = new Vue({
      data: { state },
      computed
    })
    //  代理getters
    for (let key in getters) {
      Object.defineProperty(store.getters, key, {
        get() {
          return store._vm[key]
        }
      })      
    }
  }

  registerMutations(mutations) {
    let _mutations = this._mutations;
    let state = this.state;

    for (let type in mutations) {
      _mutations[type] = function(payload) {
        mutations[type](state, payload);
      }
    }
  }

  registerActions(actions) {
    let _actions = this._actions;
    let store = this;

    for (let type in actions) {
      _actions[type] = function(payload) {
        actions[type](store, payload);
      }
    }
  }

  commit(type, payload) {
    let handle = this._mutations[type];
    handle && handle(payload);
  }

  dispatch(type, payload) {
    let handle = this._actions[type];
    handle && handle(payload);
  }
}

// 注册
function install(_Vue) {
  Vue = _Vue
  mixin(Vue)
}

export default {
  Store,
  install
}