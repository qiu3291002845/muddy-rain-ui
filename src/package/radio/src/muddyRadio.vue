<template>
  <label class="d-inline-block muddy-radio">
    <div class="d-flex align-items-center">
      <input
        type="radio"
        :value="label"
        v-model="innerVal"
        class="mr-1 muddy-radio-input"
        :disabled="disabled"
        :class="{ 'muddy-radio-input-disabled': disabled }"
        @change="handleChange"
      />
      <div class="muddy-radio-text">
        <slot />
        <template v-if="!$slots.default">{{ label }}</template>
      </div>
    </div>
  </label>
</template>
<script>
export default {
  name: "MuddyRadio",
  componentName: "MuddyRadio",
  props: { value: null, name: null, label: null, disabled: Boolean },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "MuddyRadioGroup") {
          parent = parent.$parent;
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    innerVal: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(value) {
        if (this.isGroup) {
          this._radioGroup.innerVal = value;
        } else {
          this.$emit("input", value);
        }
      },
    },
  },
  methods: {
    handleChange(event) {
      this.$emit("change", event);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../theme/variables.scss";
.muddy-radio {
  cursor: pointer;
}
.muddy-radio .muddy-radio-input {
  vertical-align: text-bottom;
  opacity: 0;
  position: absolute;
  left: 0;
}
.muddy-radio-text {
  box-sizing: border-box;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
}
.muddy-radio-text::before {
  content: "";
  background: $light-color;
  border-radius: 100%;
  border: 1px solid $silver-color;
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  position: relative;
  box-sizing: border-box;
  margin-right: 0.75rem;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
  -webkit-transition: all 250ms ease;
  transition: all 250ms ease;
}
input[type="radio"]:checked + .muddy-radio-text {
  color: $primary-color;
  transition: all 200ms ease;
}
input[type="radio"]:disabled + .muddy-radio-text {
  color: $disabled-color;
  transition: all 200ms ease;
}
input[type="radio"]:checked + .muddy-radio-text::before {
  background-color: $primary-color;
  box-shadow: inset 0 0 0 4px $light-color;
  opacity: 1;
}
input[type="radio"]:checked:disabled + .muddy-radio-text::before {
  background-color: $silver-color;
  box-shadow: inset 0 0 0 4px $light-color;
}
input[type="radio"]:disabled + .muddy-radio-text::before {
  box-shadow: inset 0 0 0 4px $light-color;
}
</style>
