<template>
  <div class="containers">
    <span>基本</span>
    <div>
      <el-button
        type="warning"
        icon="el-icon-star-off"
        circle
        size="mini"
        @click="handleTemplate"
        >创建模板</el-button
      >
    </div>
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
          label: "右箭头",
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
      console.log(tmpCell);
      if (tmpCell == undefined) {
        return;
      }
    },
  },
  mounted() {
    console.log(this.handleSelect);
    //注册一个颜色样式
    this.actorstyle = {
      [mxConstants.STYLE_INDICATOR_STROKECOLOR]: "red",
      [mxConstants.STYLE_INDICATOR_DIRECTION]: "yellow",
    };
    this.graph.getStylesheet().putCellStyle("actorstyle", this.actorstyle);
  },
  methods: {
    //显示模板
    handleTemplate() {
      this.isTemplate = !this.isTemplate;
      this.$store.commit("setTemplate", this.isTemplate);
    },
    handleChange(val) {
      // 删除mxgraph布局里面的所有元素啦
      this.graph.removeCells(
        this.graph.getChildVertices(this.graph.getDefaultParent())
      );
      switch (Number(val)) {
        case 1:
          this.ChangeShape("actors");
          break;
        case 2:
          this.ChangeShape("actor");
          break;
        case 3:
          this.ChangeShape("right-arrow");
          break;
      }
    },
    ChangeShape(value) {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      try {
        // graph.insertVertex，增加一个新的顶点到给定的父mxcell中
        const v1 = this.graph.insertVertex(
          parent,
          null,
          "hello",
          20,
          20,
          80,
          30,
          `shape=${value};perimeter=ellipsePerimeter;actorstyle;`
        );
        //20指距离左this.边的高度，20指距离顶部的高度，80指创建图形的宽度，30指创建图形的高度
        const v2 = this.graph.insertVertex(
          parent,
          null,
          "World!",
          200,
          150,
          80,
          30,
          `shape=${value};perimeter=ellipsePerimeter;`
        );
        // graph.insertEdge，增加一个新的边到给定的父mxcell中
        const e1 = this.graph.insertEdge(parent, null, "30%", v1, v2);
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
