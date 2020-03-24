<template>
  <div style="width: 100%; height: 100%">
    <div
      style="position: absolute; top: 61px; left:0px; padding: 0px; background-color: rgba(0, 0, 0, 0.2); border-radius: 10px;"
    >
    <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        id="header"
      >
       <el-radio-group v-model="isCollapse" >
            <el-radio-button :label="false" ><i type="success" icon="el-icon-s-fold" circle></i></el-radio-button>
            <el-radio-button :label="true"  ><i type="success" icon="el-icon-s-fold" circle></i></el-radio-button>
      </el-radio-group>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">图层控制</span>
          </template>

            <el-tree
              class="width: 200px;min-height: 200px;"
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2,3]"
              :default-checked-keys="[8,9]"
              id="header"
              :props="defaultProps"
            ></el-tree>

        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>

    </div>

 </div>
</template>
<script>
import Cesium from "cesium/Cesium";
import widgets from "cesium/Widgets/widgets.css";
import cesiumViewer from "../components/cesiumViewer";
export default {
  data() {
    return {
      name: "vur",
      isCollapse: true,
      activeIndex: "1",
      activeIndex2: "1",

      data: [
        {
          id: 2,
          label: "图层选择",
          children: [
            {
              id: 5,
              label: "影像地图"
            },
            {
              id: 6,
              label: "三维图"
            },
            {
              id: 7,
              label: "航拍图"
            },
            {
              id: 8,
              label: "矢量地图"
            },
            {
              id: 9,
              label: "注记图"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

  },
  created(){
    var param = this.$route.query;
    this.params = param
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 1200px;
}
</style>
