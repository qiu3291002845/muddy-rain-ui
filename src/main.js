import Vue from "vue";
import App from "./App.vue";
import "muddy-rain-sass";
import Message from "../src/plugins/message";
import "animate.css";
Vue.config.productionTip = false;
Vue.prototype.$message = Message;

new Vue({
  render: h => h(App),
}).$mount("#app");
