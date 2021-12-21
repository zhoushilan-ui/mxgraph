<template>
  <div class="container">
    <el-form label-width="100px">
      <el-form-item label="网格背景">
        <el-checkbox v-model="mxgrid.mxGridCheck" @change="ChangeGrid">
        </el-checkbox>
      </el-form-item>

      <el-form-item label="背景色">
        <el-color-picker
          v-model="mxgrid.mxGridColor"
          size="medium"
          @change="selectChange"
        ></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import grid from "@img/grid.gif";
export default {
  data() {
    return {
      mxgrid: {
        mxGridCheck: "",
        mxGridColor: "#F7F5F5",
      },
    };
  },
  mounted() {
    document.getElementById("couver").style.backgroundColor =
      this.mxgrid.mxGridColor;
  },
  methods: {
    ChangeGrid(val) {
      //获取画布的父元素宽高
      document.getElementById("couver").style.backgroundImage = val
        ? `url(${grid})`
        : "";
    },
    selectChange(val) {
      document.getElementById("couver").style.backgroundColor = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;

  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
