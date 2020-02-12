<template>
  <div class="left-menu">
    <ul>
      <li class="item-menu" v-for="(item,index) in allMenu" :key="index" @click="onMenuClick(item)">
        <i :class="['iconfont-ats',item.src,{'active':item.isItemClick}]"></i>
        <span :class="[{'active':item.isItemClick}]">{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "",
    components: {},
    props: {},
    data() {
      return {
        
        allMenu: [
        {
          path: '/myResume',
          name: 'myResume',
          title: '我的简历',
          src: 'icon-toudijianli',
          isItemClick:false,
          children: []
        },
        {
          path: '/jobInfo',
          name: 'jobInfo',
          title: '职位信息',
          src: 'icon-zhiweiguanli',
          isItemClick:false,
          children: []
        },
        {
          path: '/recruitStatistic',
          name: 'recruitStatistic',
          title: '招聘统计',
          src: 'icon-tongji',
          isItemClick:false,
          children: []
        },
        {
          path: '/deliveryFeedback',
          name: 'deliveryFeedback',
          title: '投递反馈',
          src: 'icon-tuijianfankui',
          isItemClick:false,
          children: []
        }]
      }
    },
    computed: {},
    watch: {},
    created() {
        const routeName = this.$router.currentRoute.name;
        this.allMenu.forEach((item)=>{
          if(item.name == routeName){
            item.isItemClick = true
          }
        })
    },
    mounted() {},
    methods: {
      onMenuClick(item){ 
        this.allMenu.forEach((item)=>{
          item.isItemClick = false;
        })
        item.isItemClick = true;
        const routeName = this.$router.currentRoute.name;
        if(routeName == item.name){
          return 
        }
        this.$router.push({path:item.path})
      }
    },
  }
</script>

<style type="text/less"  lang="less"  scoped>
  .left-menu{
      width:200px;
      height:100%;
      box-shadow: 0px 5px 9px 1px #ccc;
      z-index:1;
      ul{
        margin-top:25px;
         .item-menu{
          width:100%;
          height:50px;
          line-height: 50px;
          padding-left:20px;
          box-sizing: border-box;
          color:rgb(0, 22, 83);
          font-size: 14px;
          cursor: pointer;
          i{
            color:rgb(155,165,158)
          }
          span{
            display:inline-block;
            margin-left:10px
          }
          i.active,span.active{
            color:rgb(80, 40, 255);
          }
          &:hover{
            color:rgb(80, 40, 255);
            i{
              color:rgb(80, 40, 255);
            }
          }
        }
      }
     
  }
</style>