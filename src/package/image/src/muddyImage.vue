<template>
  <div class="muddy-image" :style="style" @click="openBig">
    <img
      :src="src"
      :alt="alt"
      ref="imgRef"
      :class="{ 'muddy-image_hand': preview }"
      :style="{ 'object-fit': mode }"
    />
    <div
      v-if="preview"
      class="muddy-image_zoom_in_bg"
      ref="zoomBgRef"
      v-show="isBig"
      @click="cancelBig"
      @mousewheel.prevent="mouseWheel"
    >
      <img
        :src="src"
        draggable="false"
        :style="{ ...style, 'object-fit': mode }"
        ref="bigImgRef"
        @mousedown="startDrag"
        @click.stop=""
        alt=""
      />
      <div class="muddy-image_action__box" ref="actionRef" @click.stop="">
        <div class="muddyIcon icon-zoom-in" @click.stop="zoomIn(0.2)"></div>
        <div class="muddyIcon icon-zoom-out" @click.stop="zoomOut(0.2)"></div>
        <div class="muddyIcon icon-refresh" @click.stop="reverseRotation"></div>
        <div class="muddyIcon icon-refresh" @click.stop="forwardRotation"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { isNumber } from "../../../utils/validate";
export default {
  name: "muddyImage",
  componentName: "muddyImage",
  props: {
    src: {
      type: String,
      default: "",
    },
    alt: String,
    preview: Boolean,
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
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
      canDrag: false,
    };
  },
  computed: {
    style() {
      return {
        width: this.width + "px",
        height: isNumber(this.height) ? this.height + "px" : this.height,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.eleW = this.$refs.imgRef && this.$refs.imgRef.offsetWidth;
        this.eleH = this.$refs.imgRef && this.$refs.imgRef.offsetHeight;
      }, 500);
    });
  },
  methods: {
    mouseWheel(e) {
      let direction = e.deltaY > 0 ? "down" : "up";
      if (direction === "up") {
        this.zoomOut(0.1);
      }
      if (direction === "down") {
        this.zoomIn(0.1);
      }
    },
    startDrag(e) {
      e.preventDefault();
      // 获取元素
      let imgWrap = this.$refs["bigImgRef"];
      imgWrap.style.transition = "transform 150ms ease-in-out";
      let x = e.pageX - imgWrap.offsetLeft;
      let y = e.pageY - imgWrap.offsetTop;
      // 添加鼠标移动事件
      imgWrap.addEventListener("mousemove", move);
      function move(e) {
        imgWrap.style.left = e.pageX - x + "px";
        imgWrap.style.top = e.pageY - y + "px";
      }
      // 添加鼠标抬起事件，鼠标抬起，将事件移除
      imgWrap.addEventListener("mouseup", () => {
        imgWrap.removeEventListener("mousemove", move);
      });
      // 鼠标离开父级元素，把事件移除
      imgWrap.addEventListener("mouseout", () => {
        imgWrap.removeEventListener("mousemove", move);
        imgWrap.style.transition = "all 300ms ease-in-out";
      });
    },
    zoomIn(zoom) {
      const transform = String(this.$refs.bigImgRef.style.transform).split(" ");
      this.scale = parseFloat(transform[0].slice(6, 9));
      this.rotate = parseInt(transform[1].slice(7));
      this.scale -= zoom;
      if (this.scale <= 0.2) {
        return;
      }
      this.$refs.bigImgRef.style.transform = `scale(${this.scale}) rotate(${this.rotate}deg)`;
    },
    zoomOut(zoom) {
      const transform = String(this.$refs.bigImgRef.style.transform).split(" ");
      this.scale = parseFloat(transform[0].slice(6, 9));
      this.rotate = parseInt(transform[1].slice(7));
      this.scale += zoom;
      if (this.scale > 6) {
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
        this.$refs.bigImgRef.style.transform = "scale(1) rotate(0deg)";
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
      if (!this.preview) return;
      if (this.isBig) return;
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
      this.$refs.bigImgRef.style.transition = "all 300ms ease-in-out";
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
    &.muddy-image_hand {
      cursor: pointer;
    }
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
      transition: transform 150ms ease-in-out;
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
