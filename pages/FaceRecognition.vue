<template>
  <div class="recognition">
    <div class="recognize-header">
      <h2 class="title">人脸识别能干嘛</h2>
      <div class="desc">通过提前验证个人信息，体检当天可节省前台核验身份流程，更快进入体检流程。</div>
    </div>
    <div class="recognize-content">
      <h3 class="title">我要怎么做</h3>
      <div class="step step1">
        <div class="icon">
          <i class="i-card"></i>
          <span class="text">上传资料</span>
        </div>
        <div class="intro">
          <div class="text">上传身份证正反面及个人正面照片</div>
          <div
            class="tips"
            @click="showPopup(1)"
          >为什么要上传资料 >></div>
        </div>
      </div>
      <div class="step step2">
        <div class="icon">
          <i class="i-reco"></i>
          <span class="text">现场自动识别</span>
        </div>
        <div class="intro">
          <div class="text">体检日期当天到达体检科后将自动为您办理登记流程。</div>
          <div
            class="tips"
            @click="showPopup(2)"
          >怎么知道登记成功了 >></div>
          <div
            class="tips"
            @click="showPopup(3)"
          >登记失败了怎么办 >></div>
        </div>
      </div>
    </div>
    <div class="recognize-footer">
      <div class="promise">*人脸识别数据仅用于深大总院体检登记使用，承诺不会将个人数据用于其他商业用途</div>
      <div class="btn btn-upload-data" @click="goUploadCard">前往上传资料</div>
    </div>
    <BsPopup
      ref="bsPopup"
      :title="popupTitle"
      :contentText="popupContentText"
    ></BsPopup>
  </div>
</template>

<style lang="less" scoped>
@import url('../assets/css/variable.less');
@image: "../assets/images";
.recognition {
  .recognize-header {
    color: #fff;
    height: 313px;
    text-align: center;
    background: url("@{image}/banner-1.png") 100% / cover;
    h2 {
      font-size: 42px;
      padding: 49px 0 23px 0;
    }
    .desc {
      padding: 0 100px;
      font-size: 26px;
      line-height: 42px;
    }
  }
  .recognize-content {
    text-align: center;
    padding: 41px 60px 0;
    h3 {
      color: @color-theme-d;
      font-size: 36px;
      height: 76px;
      line-height: 76px;
      background: url("@{image}/title-bg-1.png") center 100% / contain no-repeat;
    }
    .step {
      display: flex;
      padding: 55px 0;
      &.step1 {
        border-bottom: 1px solid @color-border;
      }
      .icon {
        display: flex;
        flex-direction: column;
        color: @color-theme-d;
        font-size: 26px;
        align-items: center;
        flex: 0 0 160px;
        i {
          width: 76px;
          height: 76px;
          background: url("@{image}/i-card.png") center 100% / contain no-repeat;
          &.i-reco {
            background: url("@{image}/i-reco.png") center 100% / contain
              no-repeat;
          }
        }
      }
      .intro {
        padding-left: 55px;
        text-align: left;
        .text {
          font-size: 28px;
          color: @color-text-m;
          padding-bottom: 28px;
        }
        .tips {
          font-size: 24px;
          color: @color-theme;
          text-decoration: underline;
          padding-bottom: 25px;
        }
      }
    }
  }
  .recognize-footer {
    text-align: center;
    padding-bottom: 60px;
    .promise {
      margin: 0 auto;
      width: 469px;
      font-size: 20px;
      color: @color-text-l;
      line-height: 38px;
      padding-bottom: 30px;
    }
    .btn {
      margin: 0 auto;
      color: #fff;
      background: @color-btn;
      border-radius: 8px;
      width: 686px;
      height: 82px;
      line-height: 82px;
      text-align: center;
      font-size: 36px;
    }
  }
}
</style>

<script>
import BsPopup from '@/components/BsPopup'

export default {
  name: 'face-recognition',
  data() {
    return {
      showPopupFlag: false,
      popupTitle: '',
      popupContentText: ''
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.$nuxt.$loading.start()
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 2000);
    })
  },
  methods: {
    goUploadCard() {
      this.$router.push({
        name: 'upload-card',
        query: this.$route.query
      })
    },
    showPopup(type) {
      this.$refs.bsPopup.showPopup()
      switch (type) {
        case 1:
          this.popupTitle = '为什么要上传资料'
          this.popupContentText =
            '体检用户需保证身份证的合法性及人证一致性方可进行体检'
          break
        case 2:
          this.popupTitle = '怎么知道登记成功了'
          this.popupContentText = '登记成功后系统会通过公众号推送消息进行提醒'
          break
        case 3:
          this.popupTitle = '登记失败了怎么办'
          this.popupContentText =
            '如果由于异常原因登记失败，可联系前台护士进行登记'
          break

        default:
          break
      }
    }
  },
  components: {
    BsPopup
  }
}
</script>
