<!-- 滚动组件封装 -->
<template>
  <div class="wrapper" ref="wrap">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';


export default {
  name:"Scroll",
   props: {
      probeType: {
        type: Number,
        default: 0,
      },
      pullUpLoad:{
        type:Boolean,
        default:false,
      }
    },
  data() {
    return {
      scroll: null,
    }
  },
 
 mounted(){
   /* 创建BScroll对象 */
    this.scroll = new BScroll(this.$refs.wrap,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM:true,
    })
   /* 监听滚动区域位置 */

   if(this.probeType===2||this.probeType===3){
       this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
   }
  

  
  /* 监听scroll滚动底部 */
  if(this.pullUpLoad){
    this.scroll.on("pullingUp",()=>{
      console.log("上拉加载更多");
      this.$emit("pullingUp");
    })
  }

 },
 methods:{
   scrollTo( x , y , time=600 ){
    this.scroll && this.scroll.scrollTo(x,y,time);
   },
   finishPullUp(){
    this.scroll && this.scroll.finishPullUp();
   },
   refresh(){
    this.scroll && this.scroll.refresh();
   },
   finishPullUp(){
     this.scroll && this.scroll.finishPullUp();
   }
 }
}
</script>

<style  scoped>

</style>
