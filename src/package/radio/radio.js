import Radio from "./src/muddyRadio.vue";
Radio.install = function(Vue) {
  Vue.component(Radio.name, Radio);
};

export default Radio;
