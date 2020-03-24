<template>
  <div id="zoom">
    <el-button
      type="button"
      @click="viewerzoomin()"
      title="放大"
      style="position: absolute; top: 20%; right:5%; padding: 0px; background-color: rgba(0, 0, 0, 0.2); border-radius: 10px;width:30px;height:30px"
    ></el-button>
    <el-button
      type="button"
      @click="viewerzoomout()"
      title="缩小"
      style="position: absolute; top: 25%; right:5%; padding: 0px; background-color: rgba(0, 0, 0, 0.2); border-radius: 10px;width:30px;height:30px"
    ></el-button>
    <div
      style="position: absolute; top: 60px; left: 10px; padding: 0px; background-color: rgba(0, 0, 0, 0.2); border-radius: 10px;width:300px"
    >
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        @check-change="checkchange"
        :default-expanded-keys="[1]"
        :default-checked-keys="[ 15]"
        :props="defaultProps"
        ref="tree"
      ></el-tree>
    </div>
    <el-dialog
      title="沉降图片"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <img class="dialogImg" :src="imgSrc1" alt="" />
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import Cesium from "cesium/Cesium";
import widgets from "cesium/Widgets/widgets.css";
import cesiumViewer from "../components/cesiumViewer";
import img1 from "../assets/01.jpg";
import img2 from "../assets/02.jpg";
export default {
  data() {
    return {
      name: "zoom",
      dialogVisible: false,
      imgSrc1: img1,
      imgSrc: [img1, img2],
      data: [
        {
          id: "1",
          label: "数据图层",
          url: "",
          children: [
            {
              id: "11",
              label: "沉降查询",
              url: "",
              children: [
                {
                  id:"21",
                  label: "2019-01-01"
                },
                {
                  id:"22",
                  label: "2019-01-02"
                },
                {
                  id:"23",
                  label: "..."
                }
              ]
            },
            {
              id: "12",
              label: "三维场景",
              url: "/vur"
            },
            {
              id: "13",
              label: "航拍影像",
              url: ""
            },
            {
              id: "14",
              label: "天地图注记",
              url: ""
            },
            {
              id: "15",
              label: "天地图影像",
              url: ""
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
        url: "url"
      }
    };
  },
  props: {
    viewer: {}
  },
  mounted() {},
  methods: {
    checkchange: function(data, ischecked, cischecked) {
      console.log(data.label, ischecked, cischecked);
      sessionStorage.setItem("abc", data.label);
      this.$emit("listenToChildEvent", data, ischecked, cischecked);
    },
    isCheck(key, checked) {},
    handleClose(done) {
      this.dialogVisible = false;
      console.log(this.$refs.tree);
      this.$nextTick(function() {  
        this.$refs.tree.setCheckedNodes([{
              id: "15",
              label: "天地图影像",
              url: ""
            }]);  
        // this.$refs.tree.setCheckedKeys([15])
      });
    },
    viewerzoomout() {
      this.viewer.camera.zoomOut(3000000);
    },
    viewerzoomin() {
      this.viewer.camera.zoomIn(3000000);
    }
  }
};
</script>
<style>
#zoom .el-dialog__body {
  padding: 30px 0;
}
.dialogImg {
  width: 80%;
}
</style>
