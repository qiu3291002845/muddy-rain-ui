<template>
  <div class="muddy-input_textarea">
    <textarea
      v-model="innerVal"
      class="muddy-input_textarea_input"
      :rows="rows"
      :style="{ resize }"
      @input="handleChange"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    rows: {
      type: [Number, String],
      default: 3,
    },
    autosize: Boolean,
    resize: {
      type: String,
      default: "vertical",
    },
  },
  data() {
    return {
      valLength: 2,
    };
  },
  computed: {
    innerVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        const list = this.innerVal.split("\n");
        this.valLength = list.length;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../theme/variables.scss";
.muddy-input_textarea {
  &_input {
    &:focus {
      outline: none;
      border-color: $primary-color;
    }
    min-height: 50px;
    outline: none;
    width: 100% !important;
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>
