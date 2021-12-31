<template>
  <div class="containers">
    <span>基本</span>
    <el-select v-model="value" placeholder="请选择" @change="handleChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      isTemplate: false,
      options: [
        {
          value: "1",
          label: "微笑演员",
        },
        {
          value: "2",
          label: "演员",
        },
        {
          value: "3",
          label: "渐变色圆柱",
        },
      ],
      value: null,
      actors: {},
    };
  },
  computed: {
    ...mapState(["editor", "graph", "isPanel", "parent"]),
    // 当前选中的cell
    getSelectCell() {
      return this.graph && this.graph.getSelectionCells();
    },
  },
  watch: {
    getSelectCell(n, o) {
      // 展示cell信息
      let tmpCell = this.graph && this.graph.getSelectionCells()[0];
      if (tmpCell == undefined) {
        return;
      }
    },
  },
  mounted() {
    //注册一个颜色样式
    // this.actorstyle = {
    //   [mxConstants.STYLE_INDICATOR_STROKECOLOR]: "red",
    //   [mxConstants.STYLE_INDICATOR_DIRECTION]: "yellow",
    // };
    // this.graph.getStylesheet().putCellStyle("actorstyle", this.actorstyle);
  },
  methods: {
    //显示模板
    handleTemplate() {
      this.isTemplate = !this.isTemplate;
      this.$store.commit("setTemplate", this.isTemplate);
    },
    handleChange(val) {
      switch (Number(val)) {
        case 1:
          this.ChangeShape("actors");
          break;
        case 2:
          this.ChangeShape("actor");
          break;
        case 3:
          this.ChangeShape("CreateCylin");
          break;
      }
    },
    ChangeShape(value) {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      let x1 = Math.ceil(Math.random() * 500);
      let y1 = Math.ceil(Math.random() * 500);
      let x2 = Math.ceil(Math.random() * 500);
      let y2 = Math.ceil(Math.random() * 500);
      try {
        // graph.insertVertex，增加一个新的顶点到给定的父mxcell中
        const v1 = this.graph.insertVertex(
          parent,
          null,
          "hello",
          x1,
          y1,
          x2,
          y2,
          `shape=${value};perimeter=ellipsePerimeter;`
        );
      } finally {
        this.graph.getModel().endUpdate();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.containers {
  width: 100%;
  height: 100%;
}
</style>
