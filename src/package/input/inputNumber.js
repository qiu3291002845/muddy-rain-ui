import InputNumber from "./src/muddyInputNumber.vue";
InputNumber.install = function (Vue) {
  Vue.component(InputNumber.name, InputNumber);
};

export default InputNumber;
