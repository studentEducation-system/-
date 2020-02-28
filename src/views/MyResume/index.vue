<template>
    <div class="wrapper">
    
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "",
    components: {},
    props: {},
    data() {
      return {
        haveResume: true
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {

    },
  }
</script>

<style style="text/less"  lang="less"  scoped>
    .wrapper{
      width:100%;
      height:100%;
      overflow: auto;
      box-sizing: border-box; 
      // background:#fff
    }
</style>