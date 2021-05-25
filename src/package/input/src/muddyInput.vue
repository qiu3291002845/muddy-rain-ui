<template>
  <div
    class="muddy-input"
    @mouseenter="handleMouseEnter"
    @mouseleave="hover = false"
  >
    <input
      :type="inputType"
      v-model="innerVal"
      :placeholder="placeholder"
      :disabled="disabled"
      rows="3"
      :style="{
        paddingRight:
          showPassword && endIcon && clearable
            ? '65px'
            : (clearable && endIcon) ||
              (clearable && showPassword) ||
              (showPassword && endIcon)
            ? '45px'
            : '27px',
        paddingLeft: startIcon ? '25px' : '15px',
      }"
      class="muddy-input_inner"
    />
    <div
      v-if="startIcon"
      class="muddyIcon muddy-input_startIcon"
      :class="['icon-' + startIcon]"
    />
    <div
      v-if="endIcon"
      class="muddyIcon muddy-input_endIcon"
      :class="['icon-' + endIcon]"
      :style="{
        right: showPassword ? '27px' : '7px',
      }"
    />
    <div
      v-if="clearable && innerVal.length > 0 && hover"
      class="muddyIcon icon-close_round muddy-input_icon"
      :style="{
        right:
          showPassword && endIcon
            ? '49px'
            : showPassword || endIcon
            ? '27px'
            : '8px',
      }"
      @click="clearableValue"
    />
    <div
      v-if="showPassword"
      class="muddyIcon  muddy-input_icon_password"
      :class="!showPassIcon ? 'icon-view' : 'icon-view_off'"
      @click="togglePassIcon"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    lazy: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    showPassword: Boolean,
    lazyTime: {
      type: Number,
      default: 500,
    },
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    type: {
      type: String,
      default: "text",
    },
    startIcon: {
      type: String,
      default: "",
    },
    endIcon: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      timeou: null,
      hover: false,
      showPassIcon: false,
      inputType: this.type,
    };
  },
  computed: {
    innerVal: {
      get() {
        return this.value;
      },
      set(val) {
        if (this.lazy) {
          this.lazyInput(val);
        } else {
          this.handleInput(val);
        }
      },
    },
  },
  methods: {
    handleMouseEnter() {
      !this.disabled ? (this.hover = true) : null;
    },
    togglePassIcon() {
      if (this.innerVal === "" || this.disabled) {
        return;
      }
      this.showPassIcon = !this.showPassIcon;
      this.inputType = this.inputType === "text" ? "password" : "text";
    },
    clearableValue() {
      this.innerVal = "";
      this.showPassIcon = false;
    },
    debounce(func, wait, val) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        func(val);
      }, wait);
    },
    lazyInput(val) {
      this.debounce(this.handleInput, this.lazyTime, val);
    },
    handleInput(val) {
      this.$emit("input", val);
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../theme/variables.scss";
.muddy-input {
  min-width: 180px !important;
  position: relative;
  &_endIcon {
    position: absolute;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    right: 7px;
    top: 12px;
    color: $icon-color;
  }
  &_startIcon {
    position: absolute;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    left: 7px;
    top: 12px;
    color: $icon-color;
  }
  &_icon_password {
    &:hover {
      color: #606266;
      border-color: #606266;
    }
    position: absolute;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 10px;
    right: 5px;
    top: 20px;
    cursor: pointer;
    transform: translateY(-7px);
    color: $icon-color;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: all 300ms ease;
    &::before {
      transform: scale(1.5);
      display: block;
    }
  }
  &_icon {
    &:hover {
      color: #606266;
      border-color: #606266;
    }
    position: absolute;
    color: $icon-color;
    transition: all 300ms ease;
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    right: 7px;
    top: 20px;
    cursor: pointer;
    transform: translateY(-7px);
    &::before {
      display: block;
    }
  }
  &_inner {
    &:focus {
      outline: none;
      border-color: $primary-color;
    }
    &::placeholder {
      color: $placeholder-color;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    &:disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &[type="textarea"] {
      display: block;
      resize: vertical;
      padding: 5px 15px;
      line-height: 1.5;
      box-sizing: border-box;
      font-size: inherit;
      color: #606266;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
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
    font-size: 14px;
    line-height: 40px;
    outline: none;
    padding: 0 5%;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100% !important;
  }
}
</style>
