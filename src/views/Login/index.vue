<template>
  <div class="wrapper-login">

    <div class="content-login">
      <div class="avatar">
        <i v-if="!imgURL" class="iconfont-ats icon-lijimianshi"></i>
        <img v-else :src=imgURL alt="" ref="avatarImg" width="100px" height="100px">
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="form-ruleForm" :hide-required-asterisk=true>
        <el-form-item style="color:red;font-size:20px" class="form-label" label="账号" prop="username">
          <el-input type="text" placeholder="请输入账号" v-model="ruleForm.username" @blur="onBlur"></el-input>
        </el-form-item>
        <el-form-item class="form-label" label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="go-register" style="margin-left:50px">
        没有账号？
        <span @click="goToRegister">点击申请</span>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "",
    components: {},
    props: {},
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        isRequestLogin: false,
        imgURL: ''
      }
    },
    computed: {},
    watch: {},
    created() {
      if (this.$route.query.username) {
        this.ruleForm.username = this.$route.query.username
      }
      this.getAvatar()
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
      getAvatar() {
        axios.get(`http://localhost:12306/getAvatar?username=${this.ruleForm.username}`, { responseType: 'arraybuffer' })
          .then((res) => {
            this.imgURL = `data: image/jpeg;base64,${btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;
        
          }, (err) => {
            this.imgURL = ''
          });
      },
      onBlur() {
        this.getAvatar()
      },
      goToRegister() {
        this.$router.push({ path: '/applyCount' })
      },
      onLogin() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid && !this.isRequestLogin) {
            this.isRequestLogin = true;
            this.$ajax({
              method: 'post',
              url: 'http://localhost:12306/login',
              data: {
                username: this.ruleForm.username,
                password: this.ruleForm.password
              }
            }).then((res) => {
              this.$cookie.setCookie('sessionId', res.cookie, 1);
              this.$cookie.setCookie('username', res.username, 1);
              this.$cookie.setCookie('status', res.status, 1);
              window.sessionStorage.setItem('avatar',this.imgURL)
              this.handleInfo(res);
              this.isRequestLogin = false;
            }, (err) => {
              this.$message.error('服务器开小差');
              this.isRequestLogin = false;

            })
          } else {
            return false;
          }
        });
      },
      handleInfo(res) {
        if (res.checkPass) {
          this.$message({
            message: res.message,
            type: 'success',
            duration: 1500
          });
          this.$router.push({ path: '/' })
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error',
            duration: 1500,
            offset: 0,
            customClass: 'my-message'
          });
        }
      }
    },
  }
</script>

<style style="text/less"  lang="less">
  .wrapper-login {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/image/register.jpg");
    background-size: 100% 100%;

    .content-login {
      width: 400px;
      height: fit-content;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;

      .avatar {
        width: 100%;
        height: 90px;
        text-align: center;
        line-height: 90px;

        i,
        img {
          display: inline-block;
          font-size: 50px;
          width: 60px;
          height: 60px;
          line-height: 60px;
          border: 3px solid #fff;
          box-shadow: 0 0 3px 1px #3498ff;
          border-radius: 50%;
          color: #3498ff;
          margin-left: 25px;
        }
      }

      .form-ruleForm {
        width: 400px;

        .form-label {
          .el-form-item__label {
            color: #fff;
            font-size: 16px !important;
            font-weight: bold;
          }

        }
      }

      .go-register {
        span {

          color: #f40;
          cursor: pointer;

          &:hover {
            color: red;
          }
        }

      }
    }

  }
</style>