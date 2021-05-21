<template>
  <div class="d-flex align-items-center">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MuddyRadioGroup",
  componentName: "MuddyRadioGroup",
  props: {
    value: {
      type: null,
    },
    size: {
      type: String,
      default: "medium",
    },
  },
  computed: {
    innerVal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
        this.$emit("change", value);
      },
    },
  },
  mounted() {
    this.findComponent(this.$children, "MuddyRadioButton");
    if (this.value === undefined) {
      throw "The `MuddyRadioGroup` component must be bound to value properties or `v-model` properties";
    }
  },
  methods: {
    findComponent(list, name) {
      // 递归防止使用组件嵌套
      const children = list.map(item => {
        if (item.$options.componentName !== name) {
          this.findComponent(item.$children, name);
        } else {
          item.sizeName = this.size;
          return item;
        }
      });
      const length = children.length;
      children[0] ? (children[0].className = "first") : null;
      children[length - 1] ? (children[length - 1].className = "last") : null;
    },
  },
};
</script>

<style></style>
