<template>
  <div class="app-container">
    <div class="left-panel"></div>
    <div class="right-panel">
      <el-row>
        <el-button icon="el-icon-search" circle size="mini"></el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          size="mini"
        ></el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          circle
          size="mini"
        ></el-button>
        <el-button
          type="info"
          icon="el-icon-message"
          circle
          size="mini"
        ></el-button>

        <el-button
          :icon="isPanel ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          circle
          size="mini"
          @click="handClick"
        ></el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPanel: false,
    };
  },
  mounted() {},
  methods: {
    //显示面板
    handClick() {
      this.isPanel = !this.isPanel;
      this.$store.commit("setColor", this.isPanel);
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 80%;
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .left-panel {
    width: $width;
    height: 100%;
  }

  .right-panel {
    width: 100% - $width;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
}
</style>
