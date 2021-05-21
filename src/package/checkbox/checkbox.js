import Checkbox from "./src/muddyCheckbox.vue";
Checkbox.install = function(Vue) {
  Vue.component(Checkbox.name, Checkbox);
};

export default Checkbox;
