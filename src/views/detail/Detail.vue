<!-- 商品详情页 -->
<template>
  <div id="detail">
   <detail-nav-bar class="detail-nav" @titleClick="titleClick" />
   <scroll class="content" ref="scroll">
     <detail-swiper :top-images="topImages" />
     <detail-base-info :goods="goods" />
     <detail-shop-info :shop="shop" />
     <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad" />
     <detail-params-info ref="params" :param-info="paramInfo" />
     <detail-commoent-info ref="comment" :comment-info="commentInfo" />
     <goods-list ref="recommend" :goods="recommends" />
   </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailImagesInfo from './childComps/DetailImagesInfo';
import DetailParamsInfo from './childComps/DetailParamsInfo';
import DetailCommoentInfo from './childComps/DetailCommoentInfo';
import GoodsList from 'components/content/goods/GoodsList';
/* 导入itemListenerMixin */
// import itemListenerMixin from 'common/mixin'

import Scroll from 'components/common/scroll/Scroll';


import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail'







export default {
  name:"Detail",
  components:{
   DetailNavBar,
   DetailSwiper,
   DetailBaseInfo,
   DetailShopInfo,
   Scroll,
   DetailImagesInfo,
   DetailParamsInfo,
   DetailCommoentInfo,
   GoodsList,
  },
  // mixins:[itemListenerMixin],
  data () {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends:[],
      themetopYs:[],
    }
  },
  created() {
    /* 保存传入的iid */
    this.iid = this.$route.params.iid;

    /* 根据iid请求数据 */
    getDetail(this.iid).then(res=>{
      /*获取顶部的图片轮播数据  */
      this.topImages = res.result.itemInfo.topImages;
      /* 将res.result进行封装 */
      const data = res.result;
      /* 获取商品信息 */
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      /* 获取店铺信息 */
      this.shop = new Shop(data.shopInfo);
      /* 获取商品详情数据 */
      this.detailInfo = data.detailInfo;
      /* 获取商品参数 */
      this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
      /* 获取评论信息 */    
      if (data.rate.cRate !== 0) {
       this.commentInfo = data.rate.list[0];
      };
/* 
      this.$nextTick(()=>{
       this.themetopYs = [];

       this.themetopYs.push(0);
       this.themetopYs.push(this.$refs.params.$el.offsetTop);
       this.themetopYs.push(this.$refs.comment.$el.offsetTop);
       this.themetopYs.push(this.$refs.recommend.$el.offsetTop);

       console.log(this.themetopYs);

      }) */
      // 获取商品推荐数据
      getRecommend().then(res =>{
       this.recommends = res.data.list;
      })
    })
  },
  mounted(){
   
  },
  updated(){
    
       this.themetopYs = [];

       this.themetopYs.push(0);
       this.themetopYs.push(this.$refs.params.$el.offsetTop);
       this.themetopYs.push(this.$refs.comment.$el.offsetTop);
       this.themetopYs.push(this.$refs.recommend.$el.offsetTop);

       console.log(this.themetopYs);
  },
  methods: {
    imgLoad(){
      this.$refs.scroll.refresh();
    },
    titleClick(index){
      console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themetopYs[index],200)
    }
  },
}
</script>

<style  scoped>
  #detail{
    position: relative;
    z-index: 8;
    background-color: white;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: white;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
