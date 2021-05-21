import "muddy-rain-sass";
import radio from "./packages/radio/radio.js";
import radioButton from "./packages/radio/radioButton.js";
import radioGroup from "./packages/radio/radioGroup.js";
import checkbox from "./packages/checkbox/checkbox.js";
import checkboxButton from "./packages/checkbox/checkboxButton.js";
import checkboxGroup from "./package/checkbox/checkboxGroup.js";
const components = [
  radio,
  radioButton,
  radioGroup,
  checkbox,
  checkboxButton,
  checkboxGroup,
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  version: "1.0.0",
  install,
  ...components,
};
