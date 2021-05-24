<!-- alert.vue -->
<template>
  <div class="alert">
    <div ref="alert-content-box" class="alert-content-box">
      <transition-group
        :name="'list-' + animation"
        tag="div"
        class="container_animate"
      >
        <div
          class="alert-main"
          :class="item.className"
          v-for="item in notices"
          :key="item.id"
          :id="item.name"
        >
          <div class="alert-content" :class="item.type">
            <div
              class="d-flex align-items-center pr-2"
              :class="'alert-' + item.type"
            >
              <div class="mr-3" v-if="item.type === 'info'">
                <span class="muddyIcon icon-prompt-filling icon"></span>
              </div>
              <div class="mr-3" v-if="item.type === 'success'">
                <span class="muddyIcon icon-success-filling icon"></span>
              </div>
              <div class="mr-3" v-if="item.type === 'danger'">
                <span class="muddyIcon icon-delete-filling icon"></span>
              </div>
              <div class="mr-3" v-if="item.type === 'warning'">
                <span class="muddyIcon icon-warning-filling icon"></span>
              </div>
              <div>{{ item.message }}</div>
              <div
                v-if="item.showClose"
                class="muddyIcon icon-close-bold close_message"
                @click="remove(item.name)"
              />
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import uuidv4 from "uuid/dist/v4";
let sort = 0;
function getUuid() {
  return "alert_" + sort++;
}
export default {
  name: "MuddyAlert",
  componentName: "MuddyAlert",
  data() {
    return {
      notices: [],
      animation: "fade",
    };
  },
  methods: {
    beforeEnter() {
      console.log("beforeEnter");
    },
    add(notice) {
      const name = getUuid();
      let _notice = Object.assign(
        {
          name: name,
          id: uuidv4(),
        },
        notice
      );
      this.notices.push(_notice);
      const duration = notice.duration;
      setTimeout(() => {
        this.remove(name);
      }, duration);
    },
    remove(name) {
      this.notices = [...this.notices].filter(item => item.name !== name);
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../theme/variables.scss";
.container_animate {
  display: block;
  position: relative;
}
.alert {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  z-index: 999999;
  text-align: center;
  transition: all 250ms ease-in;
}
.alert-content {
  display: inline-block;
  padding: 15px 15px 15px 20px;
  background: #fff;
  min-width: 380px;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
  transition: all 250ms ease-in;
  position: relative;
  &.success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: $success-color;
  }
  &.warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: $warning-color;
  }
  &.info {
    border-color: #ebeef5;
    background-color: #edf2fc;
    color: $info-color;
  }
  &.danger {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: $danger-color;
  }
  .muddyIcon {
    font-size: 18px;
  }
}
.alert-main {
  transition: all 1s;
  margin-bottom: 10px;
}

.alert-info {
  .icon {
    color: $info-color;
  }
}
.alert-success {
  .icon {
    color: $success-color;
  }
}
.alert-danger {
  .icon {
    color: $danger-color;
  }
}
.alert-warning {
  .icon {
    color: $warning-color;
  }
}
.close_message {
  cursor: pointer;
  position: absolute;
  right: 5%;
}
.list-fly-enter,
.list-fly-leave-to {
  opacity: 0;
  transform: translateX(-100%) translateY(-100%);
  /* transform: translate(none, -100%); */
}

.list-fly-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}
.list-fade-enter,
.list-fade-leave-to {
  opacity: 0;
  transform: translateX(0) translateY(-50px);
}

.list-fade-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
