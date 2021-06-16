<!--  -->
<template>
  <div class="HomeRecomments">
     <div v-for="item in recommends" :key="item.index" class="recommend-item">
       <a :href="item.link">
         <img :src="item.image" alt="">
         <div>{{item.title}}</div>
       </a>
     </div>
  </div>
</template>

<script>
export default {
  name:"HomeRecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return[]
      }
    }
  }
 
}
</script>

<style  scoped>
 .HomeRecomments{
   display: flex;
   widows: 100%;
   text-align: center;
   font-size: 12px;

   padding: 10px 0 20px;
   border-bottom:solid 6px #eee;
 }
 .recommend-item{
   flex:1;
 }
 .recommend-item img{
   width: 65px;
   height: 65px;
   margin-bottom: 10px;
 }
</style>
