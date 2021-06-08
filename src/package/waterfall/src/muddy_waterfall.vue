<template>
  <div>
    <div class="muddy-waterfall" ref="waterfallRef">
      <div
        class="muddy-waterfall_box"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="muddy-waterfall_pic">
          <img v-if="imgType == 0" :src="item.url" alt="" :width="imgWidth" />
          <muddy-image
            v-if="imgType == 1"
            :src="item.url"
            :preview="true"
            alt=""
            :width="imgWidth"
            height="auto"
          />
        </div>
      </div>
    </div>
    <div
      v-if="isBackTop"
      class="muddyIcon icon-arrow_up muddy-waterfall_scroll__top"
      @click="backTop"
    ></div>
  </div>
</template>

<script>
import muddyImage from "../../image/src/muddyImage.vue";
export default {
  components: {
    muddyImage,
  },
  data() {
    return {
      children: null,
      parent: null,
      line: null,
      minHeight: 0,
      minIndex: 0,
      heightList: [],
      lastElement: null,
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    imgWidth: {
      type: [String, Number],
      default: 200,
    },
    imgType: {
      type: [String, Number],
      default: 0,
    },
    isBackTop: Boolean,
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loadWater();
        window.onscroll = () => {
          this.$emit("scroll", this.checkScroll());
          this.$nextTick(() => {
            this.loadWater();
          });
        };
      }, 500);
    });
  },
  methods: {
    backTop() {
      this.animateScroll(window.scrollY, this.parent.offsetTop);
    },
    animateScroll(Y, toY = toY, speed = 50) {
      let top = Y;
      let timer = setInterval(() => {
        if (top <= toY) {
          clearInterval(timer);
          timer = null;
        }
        window.scrollTo(0, top);
        top = top - speed;
      }, 8);
    },
    loadWater() {
      this.getParent();
      this.getChildren();
      setTimeout(() => {
        this.getMinHeight();
      }, 500);
    },
    checkScroll() {
      if (!this.children || !this.parent) return;
      const lastHeight =
        this.children &&
        this.children[this.children.length - 1].offsetTop +
          Math.floor(
            this.children[this.children.length - 1].offsetHeight / 200
          );
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.body.clientHeight || document.documentElement.clientHeight;
      return lastHeight < height + (scrollTop - this.parent.offsetTop)
        ? true
        : false;
    },
    propUp() {
      this.parent.style.height =
        this.lastElement.offsetTop + this.lastElement.offsetHeight + "px";
    },
    getMinHeight() {
      if (!this.children || !this.parent) return;
      const picBoxWidth = this.children[0].offsetWidth;
      this.line = Math.floor(this.parent.offsetWidth / picBoxWidth);
      this.heightList = [];
      for (const [i, item] of [...this.children].entries()) {
        if (i < this.line) {
          this.heightList.push(item.offsetHeight);
        } else {
          this.minHeight = Math.min.apply(null, this.heightList);
          this.minIndex = this.heightList.indexOf(this.minHeight);
          item.style.position = "absolute";
          item.style.top = this.minHeight + "px";
          item.style.left = this.children[this.minIndex].offsetLeft + "px";
          this.heightList[this.minIndex] += item.offsetHeight;
        }
        this.lastElement = item;
      }
    },
    getChildren() {
      this.children = this.$refs["waterfallRef"] && [
        ...this.$refs["waterfallRef"].children,
      ];
    },
    getParent() {
      this.parent = this.$refs["waterfallRef"];
    },
  },
};
</script>

<style lang="scss" scoped>
.muddy-waterfall_scroll__top {
  position: fixed;
  bottom: 50px;
  right: 50px;
  font-size: 36px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  height: 50px;
  border-radius: 50%;
  background: #cccccc;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.muddy-waterfall {
  position: relative;
  margin: 0 auto;
  width: 100%;
  &_box {
    padding: 10px 0 0 10px;
    float: left;
    left: 50%;
    transition: all 150ms ease-in-out;
  }
  &_pic {
    padding: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
  }
}
</style>
