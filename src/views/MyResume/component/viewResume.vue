<template>
      <div class="wrapper">
    <div class="remindInfo" v-if="haveResume">
      <div class="remind">暂无简历
        <span @click="$router.push({path:'/myResume/addResume'})">点击添加</span>
      </div>
      <img src="@/assets/image/no-data.jpg" width="100%" height="100%" alt="">
    </div>
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
  .remindInfo {
    position: relative;

    .remind {
      font-size: 20px;
      color: #508cff;
      position: absolute;
      bottom: 0%;
      left: 50%;
      transform: translate(-50%, 0);

      span {
        cursor: pointer;
        color: aqua;
      }
    }

  }
</style>