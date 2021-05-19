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
      <div class="muddy-radio-text" :class="[className, sizeName]">
        <slot />
        <template v-if="!$slots.default">{{ label }}</template>
      </div>
    </div>
  </label>
</template>
<script>
export default {
  name: "MuddyRadioButton",
  componentName: "MuddyRadioButton",
  props: {
    value: null,
    name: null,
    label: {
      type: null,
      required: true,
    },
    disabled: Boolean,
  },
  data() {
    return {
      className: "",
      sizeName: "",
    };
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "MuddyRadioGroup") {
          parent = parent.$parent;
          throw "This `MuddyRadioButton` component must be included in the `MuddyRadioGroup` radio group ";
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
<style scoped>
.muddy-radio {
  cursor: pointer;
}
.muddy-radio .muddy-radio-input {
  vertical-align: text-bottom;
  opacity: 0;
  position: absolute;
}
.muddy-radio-text.first {
  border-radius: 4px 0 0 4px;
  border-left: 1px solid #cccccc;
}
.muddy-radio-text.last {
  border-radius: 0 4px 4px 0;
}

.muddy-radio-text {
  box-sizing: border-box;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  background: #fefefe;
  border: 1px solid #cccccc;
  border-left: none;
  display: inline-block;
  padding: 10px 20px;
  box-sizing: border-box;

  cursor: pointer;
  text-align: center;
  -webkit-transition: all 250ms ease;
  transition: all 250ms ease;
}
.muddy-radio-text.medium {
  padding: 10px 20px;
}
.muddy-radio-text.small {
  padding: 9px 15px;
}
.muddy-radio-text.mini {
  padding: 7px 15px;
}
input[type="radio"]:checked + .muddy-radio-text {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  box-shadow: -1px 0 0 0 #409eff;
}
input[type="radio"]:disabled + .muddy-radio-text {
  color: #c6c6c6;
  transition: all 200ms ease;
}
</style>
