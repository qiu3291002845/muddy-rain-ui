<template>
  <label class="muddy-checkbox">
    多选
    <div class="d-flex align-items-center">
      <input v-model="innerVal" type="checkbox" />
      <span>
        <slot />
        <!-- <template v-if="$slot.default"></template> -->
      </span>
    </div>
  </label>
</template>

<script>
export default {
  name: "muddyCheckbox",
  componentName: "muddyCheckbox",
  props: {
    value: null,
  },
  computed: {
    innerVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.muddy-checkbox {
  cursor: pointer;  
}
</style>
