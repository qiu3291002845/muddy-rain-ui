import InputTextarea from "./src/muddyInputTextarea.vue";
InputTextarea.install = function (Vue) {
  Vue.component(InputTextarea.name, InputTextarea);
};

export default InputTextarea;
