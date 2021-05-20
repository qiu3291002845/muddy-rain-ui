<template>
  <label class="d-inline-block muddy-checkbox">
    <div class="d-flex align-items-center">
      <input
        ref="checkbox"
        v-model="innerVal"
        :value="label"
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
  name: "muddyCheckbox",
  componentName: "muddyCheckbox",
  props: {
    value: null,
    label: null,
    disabled: Boolean,
  },
  data() {
    return {
      group: false,
      checked: false,
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
    innerVal: {
      get() {
        return this.value;
      },
      set(value) {
        if (this.group) {
          this.$nextTick(() => {
            this.getParent();
          });
          this._radioGroup.change(value);
        } else {
          this.$emit("input", value);
          this.innerVal = value;
        }
      },
    },
  },
  mounted() {
    this.getParent();
  },
  methods: {
    handleChange(event) {
      this.$emit("change", event);
      this.checked = event.target.checked;
    },
    getParent() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "muddyCheckboxGroup") {
          parent = parent.$parent;
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this._radioGroup = parent;
          parent.updateModel(true);
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
    color: white;
    background: white;
    display: inline-block;
    border: 1px solid #dcdfe6;
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
    color: white;
    background-color: #409eff;
    border-color: #409eff;
  }
  input[type="checkbox"]:checked + .muddy-checkbox-text {
    color: #409eff;
  }
  input[type="checkbox"]:disabled + .muddy-checkbox-text {
    color: #c0c4cc;
  }
  input[type="checkbox"]:disabled + .muddy-checkbox-text::before {
    color: white;
    background: white;
    border: 1px solid #dcdfe6;
  }
  input[type="checkbox"]:disabled:checked + .muddy-checkbox-text::before {
    color: #efefef;
    background-color: #c0c4cc;
    border-color: #c0c4cc;
  }
}
</style>
