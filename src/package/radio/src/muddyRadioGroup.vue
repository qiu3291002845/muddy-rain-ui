<template>
  <div class="d-flex align-items-center">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    size: {
      type: String,
      default: "medium",
    },
  },
  componentName: "MuddyRadioGroup",
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
      children[0].className = "first";
      children[length - 1].className = "last";
    },
  },
};
</script>

<style></style>
