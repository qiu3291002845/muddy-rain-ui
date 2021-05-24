<template>
  <div
    class="muddy-input"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <input
      type="text"
      v-model="innerVal"
      :placeholder="placeholder"
      :disabled="disabled"
      class="muddy-input_inner"
    />
    <div
      v-if="clearable && innerVal.length > 0 && hover"
      class="muddyIcon icon-close muddy-input_icon"
      @click="clearableValue"
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
    lazyTime: {
      type: Number,
      default: 500,
    },
    placeholder: {
      type: String,
      default: "请输入内容",
    },
  },
  data() {
    return {
      timeou: null,
      hover: false,
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
    clearableValue() {
      this.innerVal = "";
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
  width: 180px;
  position: relative;
  &_icon {
    &:hover {
      color: #606266;
      border-color: #606266;
    }
    position: absolute;
    border: 1px solid $icon-color;
    color: $icon-color;
    transition: all 300ms ease;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 10px;
    right: 5%;
    top: 20px;
    cursor: pointer;
    transform: translateY(-8px);
    &::before {
      transform: scale(0.85);
      display: block;
    }
  }
  &_inner {
    &:focus {
      outline: none;
      border-color: #409eff;
    }
    &::placeholder {
      color: $placeholder-color;
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
    cursor: pointer;
    font-size: 14px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}
</style>
