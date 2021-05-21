import checkboxGroup from "./src/muddyCheckboxGroup.vue";
checkboxGroup.install = function(Vue) {
  Vue.component(checkboxGroup.name, checkboxGroup);
};

export default checkboxGroup;
