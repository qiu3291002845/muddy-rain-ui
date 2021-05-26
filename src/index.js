import "muddy-rain-sass";
import radio from "./packages/radio/radio";
import radioButton from "./packages/radio/radioButton";
import radioGroup from "./packages/radio/radioGroup";
import checkbox from "./packages/checkbox/checkbox";
import checkboxButton from "./packages/checkbox/checkboxButton";
import checkboxGroup from "./package/checkbox/checkboxGroup";
import input from "./package/input/input";
import inputTextarea from "./package/input/inputTextarea";
import message from "./package/message/message";
const components = [
  radio,
  radioButton,
  radioGroup,
  checkbox,
  checkboxButton,
  checkboxGroup,
  input,
  inputTextarea,
  message
];

const install = function (Vue) {
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
