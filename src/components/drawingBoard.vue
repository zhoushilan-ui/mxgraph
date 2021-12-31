<template>
  <div class="app-container">
    <div id="couver" class="couver-item couver" ref="graphContainer"></div>
  </div>
</template>

<script>
export default {
  name: "drawGraph",
  props: ["editor", "graph", "parent"],
  data() {
    return {};
  },
  mounted() {
    this.$emit("init", this.$refs.graphContainer);
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 80%;
  height: 100%;
  box-sizing: 1px 1px 1px #ddd;
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: #e9eef3;
  overflow: auto;
  .couver-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .couver {
    width: 800px;
    height: 800px;
  }
}

// 滚动条样式
::-webkit-scrollbar {
  width: 10px; //y轴上的滚动条宽度
  height: 10px; //x轴上滚动条高度
}
::-webkit-scrollbar-track {
  border-radius: 3px; /*滚动条的背景区域的圆角*/
  background-color: #fdf8f5; /*滚动条的背景颜色*/
}
::-webkit-scrollbar-thumb {
  border-radius: 3px; /*滚动条的圆角*/
  background-color: #ccc; /*滚动条的背景颜色*/
}

::-webkit-scrollbar-thumb:hover {
  background-color: #838282;
}

::-webkit-scrollbar-thumb:active {
  background-color: #838282;
  cursor: pointer;
}
</style>
