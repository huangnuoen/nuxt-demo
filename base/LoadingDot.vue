<template>
  <span class="loading-dot dots" v-if="loading">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </span>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../assets/css/variable.less');
.dots {
  position: relative;
  margin-left: 38px;
  padding-top: 6px;
  .dot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
    transform: translate(-50%, -50%);
    animation: changeColor 2s ease infinite;
    &:nth-child(1){
      margin-left: -20px;
      animation-delay: 0s;
    }
    &:nth-child(2){
      margin-left: 0px;
      animation-delay: .4s;
    }
    &:nth-child(3) {
      margin-left: 20px;
      animation-delay: .8s;
    }
  }
}
@keyframes changeColor {
  0%{
    background-color: #fff;
  }
  100%{
    background-color: @color-gray;
  }
}
</style>
