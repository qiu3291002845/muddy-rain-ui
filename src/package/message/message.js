import Message from "./src/muddyMessage.vue";
Message.install = function(Vue) {
  Vue.component(Message.name, Message);
};

export default Message;
