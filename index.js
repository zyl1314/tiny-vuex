import mixin from './mixin.js';
import observe from './observe.js';

class Store {

  constructor(options) {
    let {
      state = {},
      mutations = {}, 
      actions = {}
    } = options;
  }

  commit(type, payload) {

  }

  dispatch(type, payload) {

  }
}



function install(Vue) {
  mixin(Vue) 
}

export default {
  Store,
  install
}