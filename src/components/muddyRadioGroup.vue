<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: { value: null },
  componentName: "MuddyRadioGroup",
  computed: {
    innerVal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style></style>
