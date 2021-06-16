<template>
  <div id="home" class="wrapper">
    <!-- 顶部导航组件 -->
     <nav-bar class="home-nav"><div slot="center">蘑菇街</div></nav-bar>
     <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" 
      class="tab_control" v-show="isTabFixed" />
     <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" 
    :pull-up-load="true" @pullingUp="loadMore">
       <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad" />
          <home-recommend-view :recommends="recommends"/>
          <home-feature-view />
          <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" 
           />
          <goods-list :goods="showGoods" />
     </scroll>
     <!-- vue3 native已弃用 组件直接使用click -->
     <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>  
</template>

<script>
  /* 导入主页轮播子组件 */
 import HomeSwiper from './childComps/HomeSwiper' ;
 import HomeRecommendView from './childComps/HomeRecommendView';
 import HomeFeatureView from './childComps/HomeFeatureView';

 
 import NavBar from 'components/common/navbar/NavBar';
 import TabControl from 'components/content/tabControl/TabControl';
 import GoodsList from 'components/content/goods/GoodsList';
 import Scroll from 'components/common/scroll/Scroll';
 import BackTop from 'components/content/backTop/BackTop';


 import {getHomeMultidata,getHomeGoods} from "network/home";



//  import swiper from 'components/common/swiper/swiper.vue';


  
  export default {
    name: "Home",
    components:{
      /* 注册组件 */
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          "pop":{page:0,list:[]},
          "new":{page:0,list:[]},
          "sell":{page:0,list:[]},
        },
        currentType:"pop",
        isShowBackTop:false,
        tabOffSetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log("home destroyed");
    },
    activated() {
      /* 保存Y值 */
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      // console.log("activated");

      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y;
      // console.log("deactivated");
    },
    created(){
      // 1.请求多个数据
      this.getHomeMultidata();
     
      // 2.请求商品数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    },
    mounted() {
       // 防抖事件
      /*  func = this.$refs.scroll.refresh()

       const refresh = function(...args){
         if(timer)clearTimeout(timer)
         timer = setTimeout(()=>{
           func.apply(this,args)
         },dalay)
       } */
       const refresh = this.debounce(this.$refs.scroll.refresh);

       // 监听GoodListItem当中的事件
      this.$bus.$on("itemImageLoad",()=>{
        console.log("图片加载");
        refresh();
      })
    },
    methods:{ 
      /* 事件监听方法 */

      debounce(func,delay){
        let timer = null
        return function(...args){
          if(timer)clearTimeout(timer)

          timer = setTimeout(()=>{
             func.apply(this,args);
          },delay)
        }
      },
      tabClick(index){
          switch(index){
            case 0:
            this.currentType="pop";
            break;
            case 1:
            this.currentType="new";
            break;
            case 2:
            this.currentType="sell";
            break;
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
      },
       backClick() {
        this.$refs.scroll.scroll.scrollTo(0,0,800);
        console.log("已回到顶部");
      },
      contentScroll(position){
        // console.log(position);
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) >1000;

        // 2.决定tabControl是否吸顶(position:fiex)
        this.isTabFixed = (-position.y) > this.tabOffSetTop;
      },
      /* 加载更多 */
      loadMore(){
        this.getHomeGoods(this.currentType);
      },

      swiperImageLoad(){
          // 给tabOffSetTop赋值
       // 所有的属性都有一个属性$el :用于获取组件中的元素
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl.$el.offsetTop);
      },
      /* 网络请求方法 */
      getHomeMultidata(){
         getHomeMultidata().then(res =>{
        // this.result =res;
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
      })

      },
      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1;

            // 完成上拉加载更多
            this.$refs.scroll.finishPullUp();
        })
      },
      
    }

    }
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: white;
}
.tab_control{
  position: relative;
  z-index: 11;
}
.content{
   /* height: calc( 100% - 49px);
   overflow: hidden; */

   overflow: hidden;
   position: absolute;
   top: 44px;
   bottom: 49px;
   left:0;
   right:0;
}
</style>

