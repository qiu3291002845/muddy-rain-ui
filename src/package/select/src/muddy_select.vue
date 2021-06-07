<template>
  <div class="muddy-select">
    <div
      class="muddy-input"
      :class="{ disabled }"
      @mouseover="handleMouseover"
      @mouseout="handleMouseout"
    >
      <input
        type="text"
        ref="inputRef"
        class="muddy-input__inner"
        :class="{ disabled }"
        placeholder="请选择"
        v-model="labelValue"
        :disabled="disabled"
        @click="handleClickInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        :readonly="!filterable"
      />
      <div
        v-if="hiddenArrowIcon && clearable"
        @click="clearInput"
        class="muddyIcon icon-close_round muddy-input__close_round"
      />
      <div
        v-if="!hiddenArrowIcon && clearable"
        @click="handleClickInput"
        class="muddyIcon icon-arrow_down muddy-input__arrow_down"
      />
    </div>
    <transition name="slide-fade">
      <div class="muddy-select-dropdown" v-show="focus" ref="dropdownRef">
        <div class="arow__top"></div>
        <ul class="muddy-select-dropdown__list" ref="dropdownList">
          <li
            v-for="(item, index) in optionsList"
            :key="index.value"
            class="muddy-select-dropdown__item"
            :class="{
              active: innerValue === item.value,
              disabled: item.disabled,
            }"
            @click="handleClickItem(item)"
          >
            {{ item.label }}
          </li>
          <li
            v-if="optionsList.length === 0"
            class="muddy-select-dropdown__empty text-center"
          >
            无匹配数据
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import lodash from "lodash";
export default {
  name: "muddySelect",
  componentName: "muddySelect",
  props: {
    options: {
      default: () => [],
      type: Array,
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
  },
  data() {
    return {
      focus: false,
      optionsList: this.options,
      hiddenArrowIcon: false,
      innerValue: "",
      labelValue: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      const top = this.$refs["inputRef"].getBoundingClientRect().top;
      const left = this.$refs["inputRef"].getBoundingClientRect().left;
      const offsetWidth = this.$refs["inputRef"].offsetWidth;
      const offsetHeight = this.$refs["inputRef"].offsetHeight;
      this.$refs["dropdownRef"].style.minWidth = offsetWidth + "px";
      this.$refs["dropdownRef"].style.left = left + "px";
      this.$refs["dropdownRef"].style.top = top + offsetHeight + "px";
    });
  },
  methods: {
    handleInput: lodash.debounce(function(e) {
      if (!this.filterable) return;
      const value = e.target.value;
      this.optionsList = this.options.filter(item => item.label == value);
      if (!value) {
        this.optionsList = this.options;
      }
    }, 300),
    clearInput() {
      this.innerValue = "";
      this.labelValue = "";
      this.$emit("input", "");
    },
    handleMouseover() {
      if (this.innerValue) {
        this.hiddenArrowIcon = true;
      }
    },
    handleMouseout() {
      this.hiddenArrowIcon = false;
    },
    handleClickInput() {
      if (this.focus) {
        this.$refs["inputRef"].blur();
        this.focus = false;
      } else {
        this.$refs["inputRef"].focus();
        this.focus = true;
      }
    },
    handleBlur() {
      setTimeout(() => {
        this.focus = false;
      }, 50);
    },
    handleFocus() {
      setTimeout(() => {
        this.focus = true;
      }, 100);
    },
    handleClickItem(e) {
      this.labelValue = e.label;
      this.innerValue = e.value;
      this.$emit("input", e.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 150ms ease;
  transform: translateY(0px);
}
.slide-fade-leave-active {
  transition: all 150ms cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
.muddy-select {
  width: 240px;
  &-dropdown {
    position: absolute;
    z-index: 99999999;
    transition: all 150ms ease-in-out;
    &__list {
      list-style: none;
      padding: 6px 0;
      margin: 0;
      box-sizing: border-box;
      position: relative;
    }
    .arow__top {
      border-width: 6px;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      top: -6px;
      left: 35px;
      border-color: transparent;
      border-style: solid;
      margin-right: 3px;
      border-top-width: 0;
      border-bottom-color: #ebeef5;
      &::after {
        content: " ";
        border-width: 6px;
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #fff;
      }
    }
    &__empty {
      padding: 10px 0;
      margin: 0;
      text-align: center;
      color: #999;
      font-size: 14px;
    }
    &__item {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      &.disabled {
        color: #c0c4cc;
        cursor: not-allowed;
        pointer-events: none;
        &:hover {
          background-color: #ffffff;
        }
      }
      &.active {
        color: #409eff;
        font-weight: 700;
      }
      &:hover {
        background-color: #f5f7fa;
      }
    }
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
  }
  .muddy-input {
    &.disabled {
      cursor: not-allowed !important;
      pointer-events: none;
    }
    .muddyIcon {
      position: absolute;
      right: 5px;
      top: 0;
      z-index: 9;
      top: 50%;
      transform: translateY(-50%) rotate(0deg);
      color: #c0c4cc;
      font-size: 20px;
      transition: 0.3s;
      cursor: pointer;
    }
    &__inner {
      &.disabled {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
      }
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      cursor: pointer;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
      padding-right: 30px;
      &:focus {
        border-color: #409eff;
      }
      &::placeholder {
        color: #c0c4cc;
      }
      &:focus + .muddy-input__arrow_down {
        transform: translateY(-50%) rotate(180deg);
      }
    }
    position: relative;
    font-size: 14px;
    width: 100%;
  }
}
</style>
