<template>
  <div class="d-flex align-items-center">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentName } from "../../../utils";
export default {
  name: "muddyCheckboxGroup",
  componentName: "muddyCheckboxGroup",
  props: {
    value: null,
  },
  mounted() {
    this.updateModel(true);
  },

  data() {
    return {
      currentValue: this.value,
      childrens: [],
    };
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
  methods: {
    updateModel() {
      const list = [];
      this.childrens = findComponentName(this.$children, "muddyCheckbox");
      if (this.childrens) {
        this.childrens.map(item => {
          list.push({
            value: item.label,
            checked: item.checked,
          });
        });
        this.$emit("input", list);
      }
    },
    change() {
      // console.log(1);
    },
  },
};
</script>

<style></style>
