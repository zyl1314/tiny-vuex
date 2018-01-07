export default function mixin(Vue) {
  Vue.mixin({
    beforeCreate: mixinStore
  })
}

function mixinStore() {
  let options = this.$options
  if (options.store) {
    this.$store = options.store
  } else if(options.parent && options.parent.$store){
    this.$store = options.parent.$store
  }
}