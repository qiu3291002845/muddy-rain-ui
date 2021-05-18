<template>
  <div id="app">
    <muddy-radio-group v-model="list">
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
import muddyRadioButtonVue from "./package/radio/src/muddyRadioButton.vue";
import muddyRadioGroupVue from "./package/radio/src/muddyRadioGroup.vue";

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
      size: "mini",
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
