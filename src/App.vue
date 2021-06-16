<template>
  <div id="app" class="wrapper">
    <!-- keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们-->
    <!-- exclude 不包括 将Detail排除在外 用于刷新iid -->
    <keep-alive exclude="Detail">
        <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
