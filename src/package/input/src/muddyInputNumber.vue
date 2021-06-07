<template>
  <div class="muddy-input-number">
    <div
      v-if="controls"
      class="muddy-input-number__decrease"
      :class="{ 'hover-btn': !disabled }"
      @click="decreaseNum"
    >
      <i class="muddyIcon icon-minus-bold"></i>
    </div>
    <div
      v-if="controls"
      class="muddy-input-number__increase"
      :class="{ 'hover-btn': !disabled }"
      @click="increaseNum"
    >
      <i class="muddyIcon icon-add-bold"></i>
    </div>
    <input
      v-model="queryValue"
      :placeholder="placeholder"
      type="text"
      class="muddy-input-number_input"
      :class="{
        'muddy-input-number_input__controls': controls,
        'text-center': controls,
      }"
      :disabled="disabled"
      @keydown="$emit('keydown', $event)"
      @keyup="$emit('keyup', $event)"
      @keypress="$emit('keypress', $event)"
      @blur="handleBlur"
      @focus="$emit('focus', $event)"
      @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  name: "MuddyInputNumber",
  componentName: "MuddyInputNumber",
  props: {
    value: null,
    placeholder: {
      type: String,
      default: "",
    },
    controls: Boolean,
    disabled: Boolean,
    step: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      queryValue: this.value,
      float: 1,
    };
  },
  methods: {
    decreaseNum() {
      if (this.disabled) return;
      if (!this.queryValue) return;
      if (Math.floor(this.queryValue) > this.min) {
        const num = Number(parseFloat(this.queryValue) - Number(this.step));
        this.queryValue = this.float > 0 ? num.toFixed(this.float) : num;
      }
      const float = String(this.queryValue).split(".")[1];
      this.queryValue =
        parseFloat(float) > 0
          ? Number(this.queryValue)
          : parseInt(this.queryValue);
      this.$emit("input", Number(this.queryValue));
    },
    increaseNum() {
      if (this.disabled) return;
      if (!this.queryValue) return;
      if (Math.ceil(this.queryValue) < this.max) {
        const num = Number(parseFloat(this.queryValue) + Number(this.step));
        this.queryValue = this.float > 0 ? num.toFixed(this.float) : num;
      }
      const float = String(this.queryValue).split(".")[1];
      this.queryValue =
        parseFloat(float) > 0
          ? Number(this.queryValue)
          : parseInt(this.queryValue);
      this.$emit("input", Number(this.queryValue));
    },
    handleInput(event) {
      this.queryValue = event.target.value.replace(/[^\d.]/g, "");
      this.queryValue === "." && (this.queryValue = "");
      const float = String(event.target.value).split(".")[1];
      const step = String(this.step).split(".")[1];
      this.float = float
        ? String(float).length
        : step
        ? String(step).length
        : 0;
      this.$emit(
        "input",
        parseFloat(float) > 0
          ? Number(this.queryValue)
          : parseInt(this.queryValue)
      );
    },
    handleBlur(e) {
      if (this.queryValue > this.max && this.controls) {
        this.queryValue = this.max;
        this.$emit("input", Number(this.queryValue));
        return;
      }
      if (this.queryValue < this.min && this.controls) {
        this.queryValue = this.min;
        this.$emit("input", Number(this.queryValue));
        return;
      }
      let num = e.target.value.replace(/[^\d.]/g, "");
      num === "." && (e.target.value = "");
      const float = String(num).split(".")[1];
      const step = String(this.step).split(".")[1];
      this.float = float
        ? parseFloat(float) > 0
          ? String(float).length
          : 0
        : step
        ? String(step).length
        : 0;
      console.log(num);
      this.queryValue = parseFloat(float) > 0 ? Number(num) : parseInt(num);
      this.$emit("blur", Number(e));
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../theme/variables.scss";
.muddy-input-number {
  width: 180px;
  position: relative;
  &__increase {
    position: absolute;
    z-index: 1;
    top: 1px;
    width: 40px;
    line-height: 38px;
    height: 38px;
    text-align: center;
    background: #f5f7fa;
    color: #606266;
    cursor: pointer;
    font-size: 13px;
    right: 1px;
    border-radius: 0 4px 4px 0;
    border-left: 1px solid #dcdfe6;
    transition: all 250ms ease;

    &.hover-btn {
      &:hover {
        color: $primary-color;
      }
      &:hover ~ input {
        outline: none;
        border-color: $primary-color;
      }
    }
  }
  &__decrease {
    &.hover-btn {
      &:hover {
        color: $primary-color;
      }
      &:hover ~ input {
        outline: none;
        border-color: $primary-color;
      }
    }
    position: absolute;
    z-index: 1;
    top: 1px;
    left: 1px;
    width: 40px;
    line-height: 38px;
    height: 38px;
    text-align: center;
    background: #f5f7fa;
    color: #606266;
    cursor: pointer;
    font-size: 13px;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid #dcdfe6;
    transition: all 250ms ease;
  }
  &_input {
    &:focus {
      outline: none;
      border-color: $primary-color;
    }
    &__controls {
      padding: 0 50px;
    }
    &:disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}
</style>
