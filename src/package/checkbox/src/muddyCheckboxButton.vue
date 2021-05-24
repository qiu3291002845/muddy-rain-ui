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
      <span class="muddy-checkbox-text" :class="[className, sizeName]">
        <slot />
        <template v-if="!$slots.default">{{ label }}</template>
      </span>
    </div>
  </label>
</template>

<script>
export default {
  name: "MuddyCheckboxButton",
  componentName: "MuddyCheckboxButton",
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
      className: "",
      sizeName: "",
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
  .muddy-checkbox-text {
    display: flex;
    align-items: center;
  }
  .muddy-checkbox-text.first {
    border-radius: 4px 0 0 4px;
    border-left: 1px solid $silver-color;
  }
  .muddy-checkbox-text.last {
    border-radius: 0 4px 4px 0;
  }
  .muddy-checkbox-text {
    box-sizing: border-box;
    font-size: 14px;
    display: flex;
    align-items: center;
    background: $light-color;
    border: 1px solid $silver-color;
    border-left: none;
    display: inline-block;
    padding: 10px 20px;
    box-sizing: border-box;
    cursor: pointer;
    text-align: center;
    -webkit-transition: all 250ms ease;
    transition: all 250ms ease;
  }
  .muddy-checkbox-text.medium {
    padding: 10px 20px;
  }
  .muddy-checkbox-text.small {
    padding: 9px 15px;
  }
  .muddy-checkbox-text.mini {
    padding: 7px 15px;
  }
  input[type="checkbox"] {
    position: absolute;
    left: 0;
    opacity: 0;
  }
  input[type="checkbox"]:checked + .muddy-checkbox-text {
    color: $white-color;
    background-color: $primary-color;
    border-color: $primary-color;
    box-shadow: 0 0 1px $primary-color;
    border-right: 0.5px solid $border-color;
  }
  input[type="checkbox"]:checked + .muddy-checkbox-text.last {
    border-right-color: $primary-color;
  }
  input[type="checkbox"]:disabled + .muddy-checkbox-text {
    color: $disabled-color;
    transition: all 200ms ease;
  }
}
</style>
