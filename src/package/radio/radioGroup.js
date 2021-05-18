import RadioGroup from "./src/muddyRadioGroup.vue";
RadioGroup.install = function(Vue) {
  Vue.component(RadioGroup.name, RadioGroup);
};

export default RadioGroup;
