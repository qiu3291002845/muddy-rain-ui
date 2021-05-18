<template>
  <div class="d-inline-block">
    <input type="radio" :value="label" v-model="innerVal" />
    <span>
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </div>
</template>
<script>
export default {
  props: { value: null, name: null, label: null },
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
