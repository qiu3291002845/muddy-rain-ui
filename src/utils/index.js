import { isArray } from "./validate";
export function findComponentName(children = [], name = "") {
  const list = [];
  if (isArray(children)) {
    children.map(item => {
      if (item.$options.componentName === name) {
        list.push(item);
      } else {
        findComponentName(item.$children, name);
      }
    });
  } else {
    return list;
  }
  return list;
}
