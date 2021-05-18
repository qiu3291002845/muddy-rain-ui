import "muddy-rain-sass";
import Radio from "../packages/radio/radio.js";
import radioButton from "../packages/radio/radioButton.js";
import radioGroup from "../packages/radio/radioGroup.js";
const components = [Radio, radioButton, radioGroup];

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
  Radio,
  radioButton,
  radioGroup,
};
