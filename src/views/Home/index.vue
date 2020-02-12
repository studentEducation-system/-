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

<style type="text/less"  lang="less"  scoped>
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
      background:rgb(240, 244, 251)
    }
  }
  
}
</style>