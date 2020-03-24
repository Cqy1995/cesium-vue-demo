<template>
  <div id="cesiumview">
    <div id="cesiumContainer"></div>
    <!-- <fullbutton></fullbutton> -->
    <!-- <mapselect :viewer="viewer"></mapselect> -->
    <zoom ref="zmbs" :viewer="viewer" @listenToChildEvent="layerchange"></zoom>
    <mapedit :viewer="viewer"> </mapedit>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
import Cesium from "cesium/Cesium";
import widgets from "cesium/Widgets/widgets.css";
import fullbutton from "../components/fullbutton";
import mapselectVue from "./mapselect.vue";
import zoom from "./zoom";
import mapedit from "./MapEdit";
export default {
  data() {
    return {
      viewer: {},
      name: "cesiumViewer",
      tdimage: {},
      tdtannotation: {},
      shapefile: {},
      apfile: {}
    };
  },

  mounted() {
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNWYzMGJmNS0yMTE5LTQ4YjYtYTZjYy0zOTkyOTI4YTUzMGQiLCJpZCI6MTY1NiwiaWF0IjoxNTI5NDgyMTQ3fQ.UppNXlL07JXC0Cm6PVImh3NjEqLrpFt3PUmppYJvKbU";
    // var viewer = new Cesium.CesiumWidget('cesiumContainer')
    this.viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false, //是否显示动画控件
      baseLayerPicker: false, //是否显示图层选择控件
      geocoder: true, //是否显示地名查找控件
      timeline: false, //是否显示时间线控件
      sceneModePicker: true, //是否显示投影方式控件
      navigationHelpButton: false, //是否显示帮助信息控件
      infoBox: false, //是否显示点击要素之后显示的信息
      preserveDrawingBuffer: true
    });
    this.longitude = 102.13521;
    this.latitude = 38.49461;
    this.height = 0;
    this.heading = 0;
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        this.longitude,
        this.latitude,
        15000.0
      )
    });

    var extend = Cesium.Rectangle.fromDegrees(100, 10, 120, 70);
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extend;
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    this.viewer._cesiumWidget._creditContainer.style.display = "none";
    this.tdimage = this.viewer.imageryLayers.addImageryProvider(
      new Cesium.WebMapTileServiceImageryProvider({
        url:
          "http://t1.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=4fe2e36ffb3102d55e58ac2146ac3d9e",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "tdt",
        show: true
      })
    );
    this.tdtannotation = this.viewer.imageryLayers.addImageryProvider(
      new Cesium.WebMapTileServiceImageryProvider({
        url:
          "http://t1.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=4fe2e36ffb3102d55e58ac2146ac3d9e",
        layer: "tdtImgAnnoLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "tdt",
        show: true
      })
    );
    this.shapefile = this.viewer.imageryLayers.addImageryProvider(
      new Cesium.ArcGisMapServerImageryProvider({
        url:
          "https://nationalmap.gov.au/proxy/http://services.ga.gov.au/site_3/rest/services/Electricity_Infrastructure/MapServer",
        show: true
      })
    );
    this.apfile = this.viewer.imageryLayers.addImageryProvider(
      new Cesium.ArcGisMapServerImageryProvider({
        url: "http://192.168.1.111:6080/arcgis/rest/services/czimg/MapServer",
        show: true
      })
    );
    this.tileset_xa = new Cesium.Cesium3DTileset({
      url:"http://localhost:9000/model/18b273f0597711eaa985554a0e7f7809/tileset.json",
      // url:
      //   "http://localhost:9000/model/93ff002062d511eab747c71761fd3e14/tileset.json",
      modelMatrix: Cesium.Matrix4.fromArray([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ])
    });
    this.viewer.scene.primitives.add(this.tileset_xa);
    this.tileset_xa.readyPromise.then(function(argument) {
      var position = Cesium.Cartesian3.fromDegrees(
        this.longitude,
        this.latitude,
        this.height
      );
      var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
      var rotationX = Cesium.Matrix4.fromRotationTranslation(
        this.Matrix3.fromRotationZ(Cesium.Math.toRadians(this.heading))
      );
      Cesium.Matrix4.multiply(mat, rotationX, mat);
      this.tileset_xa._root.transform = mat;
    });
    this.removeshapefile();
    this.removeapfile();
    this.remove3d();
  },

  components: {
    fullbutton: fullbutton,
    mapselect: mapselectVue,
    zoom: zoom,
    mapedit: mapedit
  },
  methods: {
    layerchange: function(data, ischecked, cischecked) {
      // console.log(data);

      // console.log(ischecked);
      // console.log(ischecked == true);
      if (data.label === "2019-01-01" && ischecked == true) {
        this.$refs.zmbs.imgSrc1 = this.$refs.zmbs.imgSrc[0];
        this.$refs.zmbs.dialogVisible = true;
      } else if (data.label === "2019-01-02" && ischecked == true) {
        this.$refs.zmbs.imgSrc1 = this.$refs.zmbs.imgSrc[1];
        this.$refs.zmbs.dialogVisible = true;
      } else if (ischecked == false) {
        this.$refs.zmbs.dialogVisible = false;
        // this.layerchange(data,false,cischecked)
      }

      if (ischecked) {
        // console.log(typeof data.id);
        switch (data.id) {
          case "11":
            this.addshapefile();
            break;
          case "12":
            this.add3d();
            break;
          case "13":
            this.addapfile();
            break;
          case "14":
            this.addtdtannotation();
            break;
          case "15":
            this.addtdtimage();
            break;
        }
      } else {
        switch (data.id) {
          case "11":
            this.removeshapefile();
            break;
          case "12":
            this.remove3d();
            break;
          case "13":
            this.removeapfile();
            break;
          case "14":
            this.removetdtannotation();
            break;
          case "15":
            this.removetdtimage();
            break;
        }
      }
    },
    addtdtimage() {
      this.tdimage.show = true;
    },
    addtdtannotation() {
      this.tdtannotation.show = true;
    },
    addshapefile() {
      this.shapefile.show = true;
    },
    addapfile() {
      this.apfile.show = true;
    },
    removetdtimage() {
      this.tdimage.show = false;
    },
    removetdtannotation() {
      this.tdtannotation.show = false;
    },
    removeshapefile() {
      this.shapefile.show = false;
    },
    removeapfile() {
      this.apfile.show = false;
    },
    add3d() {
      this.tileset_xa.show = true;

      // this.viewer.camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(
      //     this.longitude,
      //     this.latitude,
      //     this.height
      //   ),
      //   duration: 10
      // });
    },
    remove3d() {
      this.tileset_xa.show = false;
      // this.viewer.scene.primitives.remove(this.tileset_xa);
    }
  }
};
</script>
<style></style>
