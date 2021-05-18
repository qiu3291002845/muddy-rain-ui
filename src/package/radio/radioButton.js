import RadioButton from "./src/muddyRadioButton.vue";
RadioButton.install = function(Vue) {
  Vue.component(RadioButton.name, RadioButton);
};

export default RadioButton;
