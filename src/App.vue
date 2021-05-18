<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <muddy-radio-group v-model="list" @change="handleChange">
      <muddy-radio-button label="1">
        1
      </muddy-radio-button>
      <div class="a">
        <muddy-radio-button label="2">
          2
        </muddy-radio-button>
      </div>
      <div class="a">
        <muddy-radio-button label="3">
          3
        </muddy-radio-button>
      </div>
      <div class="a">
        <muddy-radio-button label="4">
          4
        </muddy-radio-button>
      </div>
    </muddy-radio-group>
  </div>
</template>

<script>
import muddyRadioButtonVue from "./components/muddyRadioButton.vue";
import muddyRadioGroupVue from "./components/muddyRadioGroup.vue";

export default {
  name: "App",
  components: {
    muddyRadioButton: muddyRadioButtonVue,
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
#app {
  width: 50%;
  margin: 0 auto;
}
.hand {
  cursor: pointer;
}
</style>
