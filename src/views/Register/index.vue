<template>
  <div class="wrapper-register">

    <div class="content-login">
      <div class="avatar">
        <span v-if="!imgURL" @click="uploadImg">+</span>
        <img v-else :src=imgURL alt="" @click="uploadImg">
        <p style="font-size:12px">{{imgURL==''?'添加头像':'修改头像'}}</p>
        <input type="file" id="file" ref="file" style="display:none" @change="fileBtn(this)">
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="form-ruleForm">
        <el-form-item style="color:red;font-size:20px" class="form-label" label="账号" prop="username">
          <el-input type="text" placeholder="请输入账号" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item style="color:red;font-size:20px" class="form-label" label="新密码" prop="pass">
          <el-input type="password" placeholder="请输入新密码" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item class="form-label" label="确认密码" prop="checkPass">
          <el-input type="password" placeholder="请确认输入密码" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click='updatePasswordAndAvatar'>确认更改</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
  export default {
    name: "",
    components: {},
    props: {},
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        isRequestRegister: false,
        myUsername: '',
        imgURL: ''
      };
    },
    computed: {},
    watch: {},
    created() {
      this.ruleForm.username = this.$route.query.username;
      this.imgURL = window.sessionStorage.getItem('avatar') || ''
    },
    mounted() {},
    methods: {
      updatePasswordAndAvatar() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid && !this.isRequestRegister) {
            this.isRequestLogin = true;
            let inputFile = this.$refs.file;
            let fileObj = inputFile.files[0];
            const formData = new FormData(); //使用formdata上传文件
            if (fileObj) {
              formData.append("imgfile", fileObj, fileObj.name);
              formData.append("imgfile", this.ruleForm.username);
              console.log(fileObj)
            } else {
              formData.append("imgfile", '');

            }
            formData.append("username", this.ruleForm.username);
            formData.append("password", this.ruleForm.pass);
            this.$ajax({
              method: 'post',
              url: `register?username=${this.ruleForm.username}`,
              data: formData
            }).then((res) => {
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

      goToRegister() {
        this.$router.push({ path: '/login' })
      },

      handleInfo(res) {
        if (res.updated) {
          this.$message({
            message: res.message,
            type: 'success',
            duration: 3000
          });
          this.$router.push({ path: '/login', query: { username: this.ruleForm.username } })
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
      },

      uploadImg() {
        this.$refs.file.click();
      },

      fileBtn(e) {
        let inputFile = this.$refs.file;
        let fileObj = inputFile.files[0];
        const windowURL = window.URL || window.webkitURL; //使用该方法生成二进制格式的图片

        if (fileObj) {
          const imgURL = windowURL.createObjectURL(fileObj);
          this.imgURL = imgURL
        } else {
          this.imgURL = '';


        }
      }
    }
  }
</script>

<style style="text/less"  lang="less">
  .wrapper-register {
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
        height: 108px;
        text-align: center;

        span,
        img {
          display: inline-block;
          margin-bottom: 8px;
          font-size: 50px;
          width: 60px;
          height: 60px;
          cursor: pointer;
          line-height: 60px;
          border: 3px solid #fff;
          box-shadow: 0 0 3px 1px #3498ff;
          border-radius: 50%;
          color: #3498ff;
          margin-left: 80px;
        }

        p {
          width: 100%;
          font-size: 12px;
          text-align: center;
          color: #fff;
          margin-left: 40px;
        }
      }

      .form-ruleForm {
        width: 400px;

        .form-label {
          .el-form-item__label {
            color: #d3c1c1;
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