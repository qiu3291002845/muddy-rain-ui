<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <muddy-radio-group v-model="list">
      <muddy-radio label="1">
        男
      </muddy-radio>
      <muddy-radio label="2">
        女
      </muddy-radio>
    </muddy-radio-group>
  </div>
</template>

<script>
import muddyRadioVue from "./components/muddyRadio.vue";
import muddyRadioGroupVue from "./components/muddyRadioGroup.vue";

export default {
  name: "App",
  components: {
    muddyRadio: muddyRadioVue,
    muddyRadioGroup: muddyRadioGroupVue,
  },
  data() {
    return {
      sex: "2",
      list: "",
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
.hand {
  cursor: pointer;
}
</style>
