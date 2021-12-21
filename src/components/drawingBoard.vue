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
  .couver-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .couver {
    // width: 60%;
    // height: 60%;
  }
}
</style>
