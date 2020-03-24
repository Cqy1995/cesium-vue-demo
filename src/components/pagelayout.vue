<template>
<div>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" id="header">
  <el-menu-item index="1"><i class="el-icon-message"></i>图层控制</el-menu-item>
  <el-menu-item index="2"><i class="el-icon-menu"></i>数据加载</el-menu-item>
  <el-menu-item index="3"><i class="el-icon-setting"></i>地图编辑</el-menu-item>
</el-menu>
<router-view></router-view>
</div>
</template>

<script>
import cesiumViewer from '../components/cesiumViewer'
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
     breadcrumbItems: ['图层管理'],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
    //   switch(key){
    //       case '1':
    //         this.$router.push('/vur');
    //         this.breadcrumbItems  = ['图层管理']
    //         break;
    //   console.log(key, keyPath);
    // }
  }
}
}
</script>
<style>
#header{
background-color:rgb(205, 210, 216);
}
</style>
