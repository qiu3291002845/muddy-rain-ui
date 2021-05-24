<template>
  <div id="app">
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

export default {
  name: "App",
  components: {
    muddyCheckbox,
    muddyRadioButton,
    muddyRadioGroup,
    muddyRadio,
    muddyCheckboxGroup,
    muddyCheckboxButton,
  },
  data() {
    return {
      sex: "2",
      list: "",
      size: "mini",
      checkbox: false,
      checkbox1: true,
      checkboxList: ["打乒乓球"],
      checkboxButtonList: [],
    };
  },
  methods: {
    handleClick(type) {
      this.$message[type]({
        message: "奥利给____" + type,
        showClose: true,
      });
    },
    handleChange(e) {
      console.log(e);
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
