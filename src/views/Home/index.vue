<template>
  <div class="page-home">
    <common-header></common-header>
    <div class="page-body">
      <left-menu></left-menu>
      <div class="page-content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import CommonHeader from '@/components/CommonHeader/index.vue'
  import LeftMenu from '@/components/LeftMenu/index.vue'

  export default {
    name: "",
    components: {
      CommonHeader,
      LeftMenu
    },
    props: {},
    data() {
      return {
        prefixCls: '',
        status:'',
        username:'用户'
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
    },
    beforeDestroy() {},
    methods: {

    },
  }
</script>

<style type="text/less"  lang="less">
  .page-home {
  width:100%;
  height:100%;
  overflow: hidden;
  .page-body{
    display: flex;
    height:calc(100% - 60px);
    .page-content{
      width:calc(100% - 200px);
      height:100%;
      background:rgb(240, 244, 251);
      padding:20px;
      box-sizing: border-box;
    }
  }
  
}
::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    /*background-color: #ddd;*/
}


/*滑块*/
::-webkit-scrollbar-thumb {
    background-color: #8eb5e7;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgb(84, 110, 226);
}


/*滑道*/
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #ccc;
    border-radius: 10px;
}
</style>