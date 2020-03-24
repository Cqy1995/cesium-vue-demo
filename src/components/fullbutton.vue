<template>
            <div style="position: absolute; top:12%; right: 60px; padding: 0px; background-color: rgba(0, 0, 0, 0.2); border-radius: 10px;">
                <el-button  style="width:30px;height:30px;padding:0" class="el-icon-menu"  @click="enableFullscreen(!isFullscreen)" title="全屏" ></el-button>
            </div>
</template>
<script>
import Cesium from 'cesium/Cesium'
import widgets from 'cesium/Widgets/widgets.css'
import cesiumViewer from '../components/cesiumViewer'
export default {
    name: "fullbutton",
    mounted() {
            var that = this;
            document.addEventListener(Cesium.Fullscreen.changeEventName, () => {
                that.isFullscreen = Cesium.Fullscreen.fullscreen;
            });
            this.freezedViewer = Object.freeze({cesiumview});
    },
    data() {
        return {
            isFullscreen: false,
            freezedViewer: undefined,
        };
    },
    methods: {
        enableFullscreen(enable) {
            if (enable) {
                !Cesium.Fullscreen.fullscreen && Cesium.Fullscreen.requestFullscreen(cesiumview);
            } else {
                Cesium.Fullscreen.fullscreen && Cesium.Fullscreen.exitFullscreen();
            }
        },
        gohome(home) {
            // 指向中国位置
            if(home){
              alert("asf")
              const viewer = this.freezedViewer && this.freezedViewer.cesiumview;
            }
            else{
              alert("asd")
              viewer && cesiumviewer.camera.flyHome(cesiumview);
            }
        },
    },
};
</script>
>>>>>>> .r8
