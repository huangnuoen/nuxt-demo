<template>
  <div class="upload-card">
    <div v-if="orderInfo">{{orderInfo}}</div>
    <div class="card-content">
      <div class="card-img card-img1">
        <img
          v-if="idCardUrl1"
          :src="idCardUrl1"
        >
        <img
          class="default"
          v-else
          src="@/assets/images/card-bg-1.png"
        >
        <input
          type="file"
          name="file"
          accept="image/png, image/jpeg, image/jpg"
          class="upload-input"
          @change="(event)=>uploadPic(event,'idCardUrl1')"
        >
      </div>
      <div class="text">{{idCardUrl1?'点击重新扫描':'点击扫描身份证头像面'}}</div>
      <div
        class="tips red"
        v-show="errorMsg1"
      >*{{errorMsg1}}</div>
    </div>
    <div class="card-content">
      <div class="card-img card-img2">
        <img
          v-if="idCardUrl2"
          :src="idCardUrl2"
        >
        <img
          class="default"
          v-else
          src="@/assets/images/card-bg-2.png"
        >
        <input
          type="file"
          name="file"
          accept="image/png, image/jpeg, image/jpg"
          class="upload-input"
          @change="(event)=>uploadPic(event,'idCardUrl2')"
        >
      </div>
      <div class="text">{{idCardUrl2?'点击重新扫描':'点击扫描身份证国徽面'}}</div>
      <div
        class="tips red"
        v-show="errorMsg1"
      >*{{errorMsg2}}</div>
    </div>
    <div
      class="btn btn-submit"
      :class="{'active':idCardUrl1&&idCardUrl2}"
      @click="submitCard"
    >
      <span>{{loading?'提交中':'下一步'}}</span>
      <!-- <LoadingDot v-show="loading"></LoadingDot> -->
    </div>
  </div>
</template>

<script>
import { getOrderInfo, identityCheck } from '@/assets/js/api'
import { Toast } from 'mint-ui'
import LoadingDot from '@/base/LoadingDot'
export default {
  name: 'upload-card',
  components: {
    LoadingDot
  },
  middleware: 'stats',
  asyncData({ params }) {
    return getOrderInfo({data:11}).then(res => {
      // if (res.code === 200) {
        return {orderInfo:res.code}
      // }
    })
  },
  data() {
    return {
      idCardUrl1: '',
      idCardUrl2: '',
      errorMsg1: '',
      errorMsg2: '',
      loading: false,
      inputs: '',
      orderInfo: null
    }
  },
  mounted() {
    this.inputs = document.querySelectorAll('input[type=file]')
    // getOrderInfo(this.$route.query).then(res => {
    //   if (res.code === 200) {
    //     this.orderInfo = res.data
    //   } else {
    //     Toast('请求失败，请稍后重试')
    //   }
    // })
  },
  methods: {
    uploadPic(event, attr) {
      let file = event.target.files[0]
      if (!file) return
      // let url = window.URL.createObjectURL(file)
      // this[attr] = url
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = res => {
        this[attr] = res.target.result
      }
    },
    submitCard() {
      if (this.loading) return
      if (this.idCardUrl1 && this.idCardUrl2) {
        let data = Object.assign({}, this.orderInfo, {
          frontPic: this.idCardUrl1,
          backPic: this.idCardUrl2
        })
        this.loading = true
        identityCheck(data)
          .then(res => {
            this.loading = false
            if (res.code === 200) {
              this.$router.push('/submit-suc')
            } else if (res.code === 411) {
              this.errorMsg1 = res.msg
            } else {
              Toast(res.msg)
            }
          })
          .catch(() => {
            // 局部loading关闭
            this.loading = false
          })
      } else {
        Toast('请先上传')
      }
    }
  },
  watch: {
    // 提交中不能上传图片
    loading(n) {
      if (n) {
        for (let i = 0; i < this.inputs.length; i++) {
          this.inputs[i].style.display = 'none'
        }
      } else {
        for (let i = 0; i < this.inputs.length; i++) {
          this.inputs[i].style.display = ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/variable.less');
@image: '../assets/images';
.upload-card {
  padding: 70px 0 60px 0;
  text-align: center;
  .card-content {
    padding-top: 48px;
    padding-bottom: 98px;
    .card-img {
      position: relative;
      margin: 0 auto;
      width: 502px;
      height: 334px;
      // background: url("@{image}/card-bg-1.png") center 100% / contain no-repeat;
      &.card-img2 {
        // background: url("@{image}/card-bg-2.png") center 100% / contain no-repeat;
      }
      .upload-input {
        opacity: 0;
        position: absolute;
        bottom: -90px;
        top: 0;
        left: 0;
        right: 0;
        // background: pink;
      }
      img {
        width: 95%;
        height: 97%;
        object-fit: contain;
        &.default {
          width: 100%;
          height: 100%;
        }
      }
    }
    .text {
      padding-top: 8px;
      padding-bottom: 16px;
      font-size: 28px;
      color: #000;
      line-height: 40px;
    }
    .tips {
      font-size: 28px;
      font-weight: 400;
      color: @color-red;
      line-height: 20px;
    }
  }
  .btn {
    margin: 0 auto;
    color: #fff;
    width: 686px;
    font-size: 36px;
    height: 82px;
    line-height: 82px;
    background-color: @color-gray;
    &.active {
      background: @color-btn;
    }
  }
}
</style>
