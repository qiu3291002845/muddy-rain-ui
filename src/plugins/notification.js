import Message from "../package/message/src/muddyMessage";
import Vue from "vue";
Message.newInstance = properties => {
  const props = properties || {};
  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Message, {
        props: props,
      });
    },
  });
  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const message = Instance.$children[0];
  return {
    add(noticeProps) {
      message.add(noticeProps);
    },
    remove(name) {
      message.remove(name);
    },
    setAnimation(type) {
      message.animation = type;
    },
  };
};

export default Message;
