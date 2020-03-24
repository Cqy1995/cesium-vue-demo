<template>
  <el-container style="width: 100%; height: 100%;">
    <el-header>
      <pagelayout></pagelayout>
    </el-header>
    <el-main style="width: 100%; height: 100%;">
      <cesiumViewer></cesiumViewer>
    </el-main>
  </el-container>
</template>
<script>
import CesiumViewer from "./cesiumViewer";
import pagelayout from "./pagelayout";
export default {
  components: {
    CesiumViewer: CesiumViewer,
    pagelayout:pagelayout,
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

