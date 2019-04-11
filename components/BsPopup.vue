<template>
  <transition name="fade">
    <div
      class="bs-popup-wrapper"
      v-show="showFlag"
    >
      <div class="bs-popup-container">
        <div class="bs-popup-header">{{title}}</div>
        <div class="bs-popup-content">{{contentText}}</div>
        <div
          class="btn bs-popup-btn"
          @click="hidePopup"
        >{{btnText}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { fixedRollThrough } from '@/assets/js/util'
export default {
  name: 'bs-popup',
  props: {
    title: {
      default: '为什么要上传资料',
      type: String
    },
    contentText: {
      default: '体检用户需保证身份证的合法性及人证一致性方可进行体检',
      type: String
    },
    btnText: {
      default: '知道了',
      type: String
    }
  },
  data() {
    return {
      showFlag: false, fixedRollThrough: null
    }
  },
  methods: {
    showPopup() {
      this.showFlag = true
    },
    hidePopup() {
      this.showFlag = false
    }
  },
  watch: {
    showFlag(n, o) {
      // 解决滚动穿透
      if (!this.fixedRollThrough) {
        this.fixedRollThrough = fixedRollThrough()
      }
      this.fixedRollThrough(n)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/variable.less');
@image: "../assets/images";

@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.bs-popup-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(51, 51, 51, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  &.fade-enter-active {
    // 父元素要设置动画 否则子元素动画不会生效
    animation: fadein .3s;
    .bs-popup-container {
      animation: confirm-zoom .3s;
    }
  }
  &.fade-leave-active{
    animation: fadein .3s reverse;
    .bs-popup-container {
      animation: fadein .3s reverse;
    }
  }
  .bs-popup-container {
    width: 520px;
    background: #fff;
    padding-bottom: 40px;
    .bs-popup-header {
      color: #fff;
      height: 126px;
      text-align: center;
      background: url("@{image}/banner-2.png") 100% / cover;
      font-size: 36px;
      padding: 26px 0 0 0;
    }
    .bs-popup-content {
      font-size: 28px;
      color: @color-text-m;
      line-height: 48px;
      padding: 57px 63px;
    }
    .bs-popup-btn {
      width: 300px;
      height: 78px;
      line-height: 78px;
      background: @color-theme;
      font-size: 36px;
      margin: 0 auto;
      color: #fff;
    }
  }
}
</style>
