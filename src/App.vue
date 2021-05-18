<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <muddy-radio v-model="sex" label="1">男</muddy-radio>
    <muddy-radio v-model="sex" label="2">女</muddy-radio>
  </div>
</template>

<script>
import muddyRadioVue from "./components/muddyRadio.vue";

export default {
  name: "App",
  components: {
    muddyRadio: muddyRadioVue,
  },
  data() {
    return {
      sex: "",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
