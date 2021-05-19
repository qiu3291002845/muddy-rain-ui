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
    <muddy-checkbox v-model="checkbox"></muddy-checkbox>
  </div>
</template>

<script>
import muddyCheckbox from "./package/checkbox/src/muddyCheckbox.vue";
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
  },
  data() {
    return {
      sex: "2",
      list: "",
      size: "mini",
      checkbox: "",
    };
  },
  methods: {
    handleChange(e) {
      console.log(e);
    },
  },
};
</script>

<style>
#app {
  width: 50%;
  margin: 20vh auto;
}
.hand {
  cursor: pointer;
}
</style>
