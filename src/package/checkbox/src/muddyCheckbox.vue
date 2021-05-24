<template>
  <label class="d-inline-block muddy-checkbox">
    <div class="d-flex align-items-center">
      <input
        v-if="group"
        ref="checkbox"
        v-model="model"
        :value="label"
        type="checkbox"
        :disabled="disabled"
        @change="handleChange"
      />
      <input
        v-else
        ref="checkbox"
        :checked="currentValue"
        type="checkbox"
        :disabled="disabled"
        @change="handleChange"
      />
      <span class="muddy-checkbox-text">
        <slot />
        <template v-if="!$slots.default">{{ label }}</template>
      </span>
    </div>
  </label>
</template>

<script>
export default {
  name: "MuddyCheckbox",
  componentName: "MuddyCheckbox",
  props: {
    value: null,
    label: null,
    disabled: Boolean,
  },
  data() {
    return {
      model: [],
      group: false,
      currentValue: this.value,
    };
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "MuddyCheckboxGroup") {
          parent = parent.$parent;
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
  },
  mounted() {
    this.getParent();
  },
  methods: {
    handleChange(event) {
      this.$nextTick(() => {
        this.$emit("change", event);
        this.$emit("input", event.target.checked);
        if (this.group) {
          this._radioGroup.change(this.model);
          this.getParent();
        }
      });
    },
    getParent() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "MuddyCheckboxGroup") {
          parent = parent.$parent;
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this._radioGroup = parent;
          parent.updateModel(true, this.$options.componentName);
          this.group = true;
          return true;
        }
      }
      this.group = false;
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../theme/variables.scss";
.muddy-checkbox {
  cursor: pointer;
  margin-right: 0.5rem;
  .muddy-checkbox-text {
    display: flex;
    align-items: center;
  }

  .muddy-checkbox-text::before {
    content: "✔";
    width: 1rem;
    height: 1rem;
    color: $white-color;
    background: $white-color;
    display: inline-block;
    border: 1px solid $border-color;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    margin-right: 0.75rem;
    transition: all 250ms ease;
    font-size: 0.85rem;
    text-align: center;
    line-height: 1rem;
  }
  input[type="checkbox"] {
    position: absolute;
    left: 0;
    opacity: 0;
  }
  input[type="checkbox"]:checked + .muddy-checkbox-text::before {
    content: "✔";
    color: $white-color;
    background-color: $primary-color;
    border-color: $primary-color;
  }
  input[type="checkbox"]:checked + .muddy-checkbox-text {
    color: $primary-color;
  }
  input[type="checkbox"]:disabled + .muddy-checkbox-text {
    color: $disabled-color;
  }
  input[type="checkbox"]:disabled + .muddy-checkbox-text::before {
    color: $white-color;
    background: $white-color;
    border: 1px solid $border-color;
  }
  input[type="checkbox"]:disabled:checked + .muddy-checkbox-text::before {
    color: $light-color;
    background-color: $disabled-color;
    border-color: $disabled-color;
  }
}
</style>
