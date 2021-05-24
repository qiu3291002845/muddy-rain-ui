// alert.js
import Notification from "./notification.js";
import { isString } from "../utils/validate";

let messageInstance;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice(options) {
  const {
    duration = 3000,
    message = "",
    type,
    showClose,
    animation,
    string,
  } = options;
  if (string) {
    let instance = getMessageInstance();
    instance.add({
      type: type,
      message: message,
      duration: 3000,
      showClose: showClose,
    });
    instance.setAnimation(animation || "fade");
    return;
  }
  let instance = getMessageInstance();
  instance.add({
    message,
    duration,
    type,
    showClose,
  });
  instance.setAnimation(animation || "fade");
}

export default {
  info(options) {
    if (isString(options)) {
      return notice({
        message: options,
        type: "info",
        string: true,
        showClose: options.showClose,
        animation: options.animation,
      });
    }
    return notice({ ...options, type: "info" });
  },
  success(options) {
    if (isString(options)) {
      return notice({
        message: options,
        type: "success",
        string: true,
        showClose: options.showClose,
        animation: options.animation,
      });
    }
    return notice({ ...options, type: "success" });
  },
  warning(options) {
    if (isString(options)) {
      return notice({
        message: options,
        type: "warning",
        string: true,
        showClose: options.showClose,
        animation: options.animation,
      });
    }
    return notice({ ...options, type: "warning" });
  },
  danger(options) {
    if (isString(options)) {
      return notice({
        message: options,
        type: "danger",
        string: true,
        showClose: options.showClose,
        animation: options.animation,
      });
    }
    return notice({ ...options, type: "danger" });
  },
};
