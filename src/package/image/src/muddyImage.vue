<template>
  <div class="muddy-image" :style="style" @click="openBig">
    <img :src="src" :alt="alt" ref="imgRef" :style="{ 'object-fit': mode }" />
    <div
      class="muddy-image_zoom_in_bg"
      ref="zoomBgRef"
      v-show="isBig"
      @click="cancelBig"
    >
      <img
        :src="src"
        :style="{ ...style, 'object-fit': mode }"
        ref="bigImgRef"
        alt=""
      />
      <div class="muddy-image_action__box" ref="actionRef" @click.stop="">
        <div class="muddyIcon icon-zoom-in" @click.stop="zoomIn"></div>
        <div class="muddyIcon icon-zoom-out" @click.stop="zoomOut"></div>
        <div class="muddyIcon icon-refresh" @click.stop="reverseRotation"></div>
        <div class="muddyIcon icon-refresh" @click.stop="forwardRotation"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "muddyImage",
  componentName: "muddyImage",
  props: {
    src: {
      type: String,
      default: "",
    },
    alt: String,
    mode: {
      type: String,
      default: "fill",
      validator(value) {
        return ["contain", "cover", "fill", "none", "scale-down"].includes(
          value
        );
      },
    },
    width: {
      type: [String, Number],
      default: 300,
    },
    height: {
      type: [String, Number],
      default: 200,
    },
  },
  data() {
    return {
      isBig: false,
      eleW: null,
      eleH: null,
      scale: 1,
      rotate: 0,
    };
  },
  computed: {
    style() {
      return {
        width: this.width + "px",
        height: this.height + "px",
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        this.actionCenter();
      };
      this.eleW = this.$refs.imgRef.offsetWidth;
      this.eleH = this.$refs.imgRef.offsetHeight;
    });
  },
  methods: {
    zoomIn() {
      const transform = String(this.$refs.bigImgRef.style.transform).split(" ");
      this.scale = parseFloat(transform[0].slice(6, 9));
      this.rotate = parseInt(transform[1].slice(7));
      this.scale -= 0.2;
      if (this.scale <= 0.4) {
        return;
      }
      this.$refs.bigImgRef.style.transform = `scale(${this.scale}) rotate(${this.rotate}deg)`;
    },
    zoomOut() {
      const transform = String(this.$refs.bigImgRef.style.transform).split(" ");
      this.scale = parseFloat(transform[0].slice(6, 9));
      this.rotate = parseInt(transform[1].slice(7));
      this.scale += 0.2;
      if (this.scale > 4) {
        return;
      }
      this.$refs.bigImgRef.style.transform = `scale(${this.scale}) rotate(${this.rotate}deg)`;
    },
    reverseRotation() {
      const transform = String(this.$refs.bigImgRef.style.transform).split(" ");
      this.scale = parseFloat(transform[0].slice(6, 9));
      this.rotate = parseInt(transform[1].slice(7));
      this.rotate -= 90;
      this.$refs.bigImgRef.style.transform = `scale(${this.scale}) rotate(${this.rotate}deg)`;
    },
    forwardRotation() {
      const transform = String(this.$refs.bigImgRef.style.transform).split(" ");
      this.scale = parseFloat(transform[0].slice(6, 9));
      this.rotate = parseInt(transform[1].slice(7));
      this.rotate += 90;
      this.$refs.bigImgRef.style.transform = `scale(${this.scale}) rotate(${this.rotate}deg)`;
    },
    cancelBig() {
      const imgLeft = this.$refs.imgRef.getBoundingClientRect().left;
      const imgTop = this.$refs.imgRef.getBoundingClientRect().top;
      setTimeout(() => {
        this.$refs.bigImgRef.style.transform = "scale(1)";
        this.$refs.bigImgRef.style.top = imgTop + "px";
        this.$refs.bigImgRef.style.left = imgLeft + "px";
        this.$refs.actionRef.style.opacity = 0;
        this.$refs.zoomBgRef.style.backgroundColor = "transparent";
      }, 0);
      setTimeout(() => {
        this.$refs.bigImgRef.style.transform = "scale(1) rotate(0deg)";
        this.isBig = false;
      }, 300);
    },
    openBig() {
      if (this.isBig) {
        return;
      }
      this.isBig = true;
      this.actionCenter();
      this.actionBig();
    },
    actionBig() {
      setTimeout(() => {
        this.$refs.bigImgRef.style.transform = "scale(2) rotate(0deg)";
      }, 300);
    },
    actionCenter() {
      const imgLeft = this.$refs.imgRef.getBoundingClientRect().left;
      const imgTop = this.$refs.imgRef.getBoundingClientRect().top;
      this.$refs.bigImgRef.style.top = imgTop + "px";
      this.$refs.bigImgRef.style.left = imgLeft + "px";
      const width =
        document.body.clientWidth || document.documentElement.clientWidth;
      const height =
        document.body.clientHeight || document.documentElement.clientHeight;
      const left = (width - this.eleW) / 2;
      const top = (height - this.eleH) / 2;
      setTimeout(() => {
        this.$refs.bigImgRef.style.top = top + "px";
        this.$refs.bigImgRef.style.left = left + "px";
        this.$refs.actionRef.style.opacity = 1;
        this.$refs.zoomBgRef.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.muddy-image {
  position: relative;
  overflow: hidden;
  display: block;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  &_action__box {
    position: absolute;
    left: 50%;
    bottom: 70px;
    opacity: 0;
    transform: translateX(-50%);
    width: 282px;
    height: 44px;
    padding: 0 23px;
    background-color: #606266;
    border-color: #fff;
    color: #fff;
    display: flex;
    align-items: center;
    border-radius: 22px;
    transition: all 300ms ease-in-out;
    div {
      flex: 1;
      display: flex;
      font-size: 24px;
      justify-content: center;
      &:nth-child(3) {
        transform: scale(-1, 1);
      }
    }
  }
  &_zoom_in_bg {
    img {
      width: 300px;
      height: 200px;
      max-width: 100%;
      max-height: 100%;
      left: 0;
      top: 0;
      position: absolute;
      transition: all 300ms ease-in-out;
    }
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    cursor: pointer;
    z-index: 99999;
    transition: all 300ms ease-in-out;
  }
}
</style>
