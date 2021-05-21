<template>
  <div class="d-flex align-items-center">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentName } from "../../../utils";
export default {
  name: "MuddyCheckboxGroup",
  componentName: "MuddyCheckboxGroup",
  props: {
    value: null,
  },
  mounted() {
    this.isButtonComponent = this.findComponent(
      this.$children,
      "MuddyCheckboxButton"
    );
    if (this.value === undefined) {
      throw "The `MuddyCheckbox` component must be bound to value properties or `v-model` properties";
    }
    !this.isButtonComponent && this.updateModel(true, "muddyCheckbox");
  },

  data() {
    return {
      currentValue: this.value,
      isButtonComponent: false,
      childrens: [],
    };
  },
  watch: {
    value() {
      this.isButtonComponent
        ? this.updateModel(true, "MuddyCheckboxButton")
        : this.updateModel(true, "MuddyCheckbox");
    },
  },
  methods: {
    change(val) {
      this.$emit("input", val);
      this.$emit("change", val);
    },
    updateModel(update, name) {
      this.childrens = findComponentName(this.$children, name);
      if (this.childrens) {
        const { value } = this;
        this.childrens.map(child => {
          child.model = value;
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
    findComponent(list, name) {
      // 递归防止使用组件嵌套
      const children = [];
      list.map(item => {
        if (item.$options.componentName !== name) {
          this.findComponent(item.$children, name);
        } else {
          item.sizeName = this.size;
          children.push(item);
        }
      });
      const length = children.length;
      children[0] ? (children[0].className = "first") : null;
      children[length - 1] ? (children[length - 1].className = "last") : null;
      this.updateModel(true, name);
      return length > 0 ? true : false;
    },
  },
};
</script>

<style></style>
