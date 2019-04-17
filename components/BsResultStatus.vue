<template>
  <div
    class="result"
    :class="status"
  >
    <div class="icon"></div>
    <div class="text">资料提交成功</div>
    <div class="tips">请于体检日期当天前往医院体检</div>
  </div>
</template>

<script>
export default {
  name: 'bs-result-status',
  props: {
    status: {
      default: '',
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../assets/css/variable.less');
@image: "../assets/images";
.result {
  text-align: center;
  .icon {
    margin: 0 auto;
    width: 332px;
    height: 211px;
    margin-bottom: 24px;
    background: url("@{image}/i-back.png") 100% / cover;
  }
  &.rescheduled-suc {
    .icon{
      background-image: url("@{image}/i-book.png");
    }
  }
  &.rescheduled-fail {
    .icon{
      background-image: url("@{image}/i-back.png");
    }
  }
  &.book-suc {
    .icon{
      background-image: url("@{image}/i-write.png");
    }
  }
  &.submit-suc {
    .icon{
      background-image: url("@{image}/i-suc.png");
    }
  }

  .text {
    color: #000;
    font-size: 42px;
    padding-bottom: 20px;
  }
  .tips {
    color: @color-text-m;
    font-size: 28px;
    font-weight: 400;
    padding-bottom: 84px;
  }
}
</style>
