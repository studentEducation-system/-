<template>
  <div>
    <div class="common-header">
      <div class="left">
        <i class="iconfont-ats icon-xiaozhaoguanli"></i>
        <span>国际学院信息专业毕业生就业管理系统</span>
      </div>
      <div class="right">
        <i v-if="!imgURL" class="iconfont-ats icon-lijimianshi"></i>
        <img v-else :src=imgURL alt="">
        <div class="userInfo">
          <p>{{status || '用户'}}</p>
          <p>{{username || 'xxx'}}</p>
        </div>
        <div class="operation">
          <i class="iconfont-ats icon-xiala" @click="showSelect"></i>

        </div>
      </div>

    </div>
    <ul class="select" ref="select" @mouseleave="hideSelect">
      <li @click="updatePassword">修改密码</li>
      <li @click="signOutLogin">退出登录</li>
    </ul>
  </div>
   
</template>

<script>
  import axios from 'axios'

  export default {
    name: "",
    components: {},
    data() {
      return {
        status: '',
        username: '',
        isRequestLogin: false,
        imgURL:''
      }
    },
    computed: {},
    watch: {},
    created() {
      this.status = this.$cookie.getCookie('status');
      this.username = this.$cookie.getCookie('username');
      this.imgURL = window.sessionStorage.getItem('avatar')
      if(!this.imgURL){
        this.getAvatar()
      }
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
      getAvatar(){
         axios.get(`http://localhost:12306/getAvatar?username=${this.username}`, { responseType: 'arraybuffer' })
          .then((res) => {
            this.imgURL = `data: image/jpeg;base64,${btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;
            window.sessionStorage.setItem('avatar',this.imgURL);
          }, (err) => {
            this.imgURL = ''
          });
      },
      showSelect() {
        let classList = this.$refs.select.classList;
        let classListArr = Array.from(classList)
        if (classListArr.includes('active')) {
          this.$refs.select.classList.remove('active')

        } else {
          this.$refs.select.classList.add('active')

        }
      },
      hideSelect() {
        console.log('leave');
        this.$refs.select.classList.remove('active')
      },
      signOutLogin() {
        let session = this.$cookie.getCookie('sessionId')
        this.$ajax({
          method: 'post',
          url: 'signOutLogin',
          data: {
            session: session
          }
        }).then((res) => {
          this.isRequestLogin = false;
          if (res.result) {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 1000
            });
            this.$cookie.deleteCookie('sessionId');
             window.sessionStorage.setItem('avatar','')
            setTimeout(()=>{
              this.$router.push('/login')
            },1000)
          }
        }, (err) => {
          this.$message.error('服务器开小差');
          this.isRequestLogin = false;

        })
      },
      updatePassword() {
        const username = this.$cookie.getCookie('username')
        this.$router.push({ path: '/register', query: { username: username } })
      }
    },
  }
</script>

<style style="text/less"  lang="less"  scoped>
  .common-header {
    width: 100%;
    height: 60px;
    background: rgb(80, 140, 255);
    display: flex;
    box-sizing: border-box;
    padding: 0 20px;
    z-index: 999;
    position: relative;

    .left {
      height: 100%;
      width: 50%;
      font-size: 20px;
      color: #fff;
      line-height: 60px;

      i {
        font-size: 25px;
      }

      span {
        margin-left: 10px;
      }
    }

    .right {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #fff;

      i,img{
        background: rgb(184, 211, 255);
        width: 35px;
        height: 35px;
        border-radius: 50%;
        line-height: 35px;
        text-align: center;
        margin-right: 10px;
        font-size: 25px;

      }

      .userInfo {
        margin-right: 20px;

        p {
          font-size: 14px;
        }

        p:last-of-type {
          color: #B9D1FF;

        }
      }

      .operation {
        position: relative;

        i {
          background: none;

          margin-right: 10px;
          color: #B9D1FF;
          font-size: 18px;
        }


      }
    }
  }

  .select {
    position: absolute;
    transition: all 0.3s linear;
    z-index: 100;
    opacity: 0;
    top: 0px;
    right: 10px;
    width: 80px;
    height: fit-content;
    background: #fff;
    cursor: pointer;
    text-align: center;
    color: #000;
    border: 1px solid #ccc;

    li {
      padding: 5px 10px;
      border-bottom: 1px solid #ccc;

      &:hover {
        color: #0cdac7
      }
    }
  }

  .select.active {
    display: block;
    opacity: 1;
    top: 60px;
  }
</style>