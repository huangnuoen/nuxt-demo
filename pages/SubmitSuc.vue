<template>
  <div class="result-wrapper">
    <BsResultStatus status="submit-suc"></BsResultStatus>
    <div class="btns">
      <div class="btn btn-white" @click="toDaishu('package')">继续预约</div>
      <div class="btn btn-blue" @click="toDaishu('usercenter')">个人中心</div>
    </div>
  </div>
</template>

<script>
import BsResultStatus from '@/components/BsResultStatus'
export default {
  name: 'submit-suc',
  components: {
    BsResultStatus
  },
  methods: {
    toDaishu(page) {
      switch (page) {
        case 'package':
          window.location.href = `${daishuPath}h5#/package-list`
          break
        case 'usercenter':
          window.location.href = `${daishuPath}h5#/user-center`
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../assets/css/variable.less');
@image: "../assets/images";
.result-wrapper {
  padding-top: 196px;
  .btns {
    display: flex;
    .btn{
      margin: 0 auto;
      width: 280px;
      height: 90px;
      line-height: 90px;
      font-size: 32px;
    }
    .btn-blue {
      background: @color-theme;
      color: #fff;
    }
    .btn-white{
      color: @color-theme;
      border:2px solid;
    }
  }
}
</style>
