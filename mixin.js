let activeInstance = null;

export default function mixin(Vue) {
  Vue.mixin({
    beforeCreate: mixinHook,
    breforeUpdate: mixinResetInstance 
  })
}

function mixinHook() {
  const options = this.$options
  if (options.store) {
    this.$store = options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }  

  activeInstance = this;
}

function mixinResetInstance() {
  activeInstance = this;
}