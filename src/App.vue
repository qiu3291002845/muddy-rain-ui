<template>
  <div id="app">
    <div class="py-2 text-weight">选择器</div>
    <muddy-select v-model="selectValue" clearable :options="selectOptions" />
    <div class="py-2 text-weight">图片</div>
    <muddy-image src="./assets/1.png" :width="300" :height="200"></muddy-image>
    <muddy-image
      preview
      src="https://pic2.zhimg.com/v2-0eae52fe477d00aac28b87e38b1e2545_720w.jpg"
    ></muddy-image>
    <img src="./assets/1.png" />
    <div class="py-2 text-weight">输入框</div>
    <muddy-input
      v-model="inputValue"
      type="password"
      clearable
      style="width:100px"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <div class="py-2 text-weight">文本域</div>
    <muddy-input-textarea v-model="textareaValue" rows="2" />
    <div class="py-2 text-weight">数字输入框</div>
    <muddy-input-number :controls="true" v-model="numberValue" />
    <div class="py-2 text-weight">单选按钮组</div>
    <muddy-radio-group v-model="list">
      <muddy-radio-button :label="1"></muddy-radio-button>
      <muddy-radio-button :label="2"></muddy-radio-button>
    </muddy-radio-group>
    <div class="py-2 text-weight">单选组</div>
    <muddy-radio-group v-model="list">
      <muddy-radio :label="1"></muddy-radio>
      <muddy-radio :label="2"></muddy-radio>
    </muddy-radio-group>
    <div class="py-2 text-weight">单选框</div>
    <muddy-radio :label="1"></muddy-radio>
    <muddy-radio :label="2"></muddy-radio>
    <div class="py-2 text-weight">复选框</div>
    <muddy-checkbox :label="1" v-model="checkbox">踢足球</muddy-checkbox>
    <muddy-checkbox :label="2" v-model="checkbox1">打羽毛球</muddy-checkbox>
    <div class="py-2 text-weight">复选框组</div>
    <muddy-checkbox-group v-model="checkboxList">
      <muddy-checkbox label="踢足球">踢足球</muddy-checkbox>
      <muddy-checkbox label="打羽毛球">打羽毛球</muddy-checkbox>
      <muddy-checkbox label="打乒乓球">打乒乓球</muddy-checkbox>
      <muddy-checkbox label="打篮球">打篮球</muddy-checkbox>
    </muddy-checkbox-group>
    <div class="py-2 text-weight">复选框按钮组</div>
    <muddy-checkbox-group v-model="checkboxButtonList" size="mini">
      <muddy-checkbox-button label="踢足球">踢足球</muddy-checkbox-button>
      <muddy-checkbox-button label="打羽毛球">
        打羽毛球
      </muddy-checkbox-button>
      <muddy-checkbox-button label="打乒乓球">打乒乓球</muddy-checkbox-button>
    </muddy-checkbox-group>
    <button @click="handleClick('success')">成功</button>
    <button @click="handleClick('warning')">警告</button>
    <button @click="handleClick('info')">消息</button>
    <button @click="handleClick('danger')">错误</button>
  </div>
</template>

<script>
import muddyCheckbox from "./package/checkbox/src/muddyCheckbox.vue";
import muddyCheckboxGroup from "./package/checkbox/src/muddyCheckboxGroup.vue";
import muddyCheckboxButton from "./package/checkbox/src/muddyCheckboxButton.vue";
import muddyRadioButton from "./package/radio/src/muddyRadioButton.vue";
import muddyRadio from "./package/radio/src/muddyRadio.vue";
import muddyRadioGroup from "./package/radio/src/muddyRadioGroup.vue";
import muddyInput from "./package/input/src/muddyInput.vue";
import muddyInputTextarea from "./package/input/src/muddyInputTextarea.vue";
import muddyInputNumber from "./package/input/src/muddyInputNumber.vue";
import muddyImage from "./package/image/src/muddyImage.vue";
import muddySelect from "./package/select/src/muddy_select.vue";

export default {
  name: "App",
  components: {
    muddySelect,
    muddyCheckbox,
    muddyRadioButton,
    muddyRadioGroup,
    muddyRadio,
    muddyCheckboxGroup,
    muddyCheckboxButton,
    muddyInput,
    muddyInputTextarea,
    muddyInputNumber,
    muddyImage,
  },
  data() {
    return {
      sex: "2",
      list: "",
      size: "mini",
      selectValue: "",
      checkbox: false,
      checkbox1: true,
      checkboxList: ["打乒乓球"],
      checkboxButtonList: [],
      selectOptions: [
        {
          value: 1,
          label: "小鱼",
          disabled: true,
        },
        {
          value: 2,
          label: "小猫",
        },
        {
          value: 3,
          label: "小狗",
        },
      ],
      inputValue: "",
      textareaValue: "",
      numberValue: "",
    };
  },
  methods: {
    handleBlur(e) {
      console.log(e);
    },
    handleFocus(e) {
      console.log(e);
    },
    handleClick(type) {
      this.$message[type]({
        message: "奥利给____" + type,
        showClose: true,
      });
    },
    handleChange(e) {
      console.log("handleChange", e);
    },
    handleInput(e) {
      console.log("handleInput", e);
    },
  },
};
</script>

<style>
#app {
  width: 50%;
  margin: 5vh auto;
}
.hand {
  cursor: pointer;
}
</style>
