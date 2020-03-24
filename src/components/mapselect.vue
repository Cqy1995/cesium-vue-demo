<template>
  <div style="width: 100%; height: 100%">
    <div
      style="position: absolute; top: 12%; right: 0px; padding: 0px; background-color: rgba(0, 0, 0, 0.2); border-radius: 10px;"
    >
      <el-dropdown>
        <el-button type="primary">
          <i class="el-icon-menu"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changeBaseMap('tdtsl')" class="el-icon-football">天地图矢量</el-dropdown-item>
          <el-dropdown-item @click.native="changeBaseMap('tdt')" class="el-icon-crop">天地图影像</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Cesium from "cesium/Cesium";
import widgets from "cesium/Widgets/widgets.css";
import cesiumViewer from "../components/cesiumViewer";

export default {
    props: {
    viewer: {}
    },
  data() {

    return {

      name: "mapselect"
    };
  },

  methods: {
    changeBaseMap(type) {
      this.viewer.imageryLayers.removeAll();

      switch (type) {
        //天地图
        case "tdt":
          this.viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapTileServiceImageryProvider({
              url:
                "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=4fe2e36ffb3102d55e58ac2146ac3d9e",
              layer: "tdtBasicLayer",
              style: "default",
              format: "image/png",
              tileMatrixSetID: "GoogleMapsCompatible",
              show: false
            })
          );
           //全球影像中文注记服务
          this.viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapTileServiceImageryProvider({
              url:
                "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=4fe2e36ffb3102d55e58ac2146ac3d9e",
              layer: "tdtAnnoLayer",
              style: "default",
              format: "image/jpeg",
              tileMatrixSetID: "GoogleMapsCompatible",
              show: false
            })
          );
          break;
        //天地图矢量
        case "tdtsl":
          this.viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapTileServiceImageryProvider({
              url:
                "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=4fe2e36ffb3102d55e58ac2146ac3d9e",
              layer: "tdtImgAnnoLayer",
              style: "default",
              format: "image/png",
              tileMatrixSetID: "GoogleMapsCompatible",
              show: false
            })
          );
             //全球矢量中文标注服务
          this.viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapTileServiceImageryProvider({
              url:
                "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=4fe2e36ffb3102d55e58ac2146ac3d9e",
              layer: "tdtAnnoLayer",
              style: "default",
              format: "image/jpeg",
              tileMatrixSetID: "GoogleMapsCompatible"
            })
          );
          break;


      }
    }
  }
};
</script>
