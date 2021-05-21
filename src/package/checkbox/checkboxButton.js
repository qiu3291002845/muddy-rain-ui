import checkboxButton from "./src/muddyCheckboxButton.vue";
checkboxButton.install = function(Vue) {
  Vue.component(checkboxButton.name, checkboxButton);
};

export default checkboxButton;
