<template>
  <div class="container">
    <el-container>
      <el-header
        ><navbar @Showdrag="Showdrag" @handleLayout="handleLayout"></navbar
      ></el-header>
      <div class="main-container">
        <el-aside width="250px"><silder></silder></el-aside>
        <el-main>
          <drawingBoard @init="init"></drawingBoard>
          <rightPanel v-show="isPanel"></rightPanel>
          <div>
            <!-- <outline></outline> -->
          </div>
          <vue-drag-resize
            :w="300"
            :h="300"
            :isActive="true"
            :isResizable="true"
            v-show="isdrags"
          >
            <div class="drag-title">
              <div class="drag-title-left">Outline</div>
              <div class="drag-title-right">
                <span class="el-icon-minus"></span
                ><span class="el-icon-close" @click="handleClose"></span>
              </div>
            </div>
            <div class="drag">
              <div id="container-drage"></div>
            </div>
          </vue-drag-resize>

          <vue-drag-resize
            :w="300"
            :h="300"
            :isActive="true"
            :isResizable="true"
            v-show="Showlayout"
          >
            <div class="drag-title">
              <div class="drag-title-left">layout</div>
              <div class="drag-title-right">
                <span class="el-icon-minus"></span
                ><span class="el-icon-close" @click="LayoutColse"></span>
              </div>
            </div>
            <div class="drag">
              <div id="container-layout"></div>
            </div>
          </vue-drag-resize>
        </el-main>
      </div>
      <div id="html"></div>
    </el-container>
  </div>
</template>

<script>
import navbar from "../components/Navbar.vue";
import silder from "../components/Silder.vue";
import drawingBoard from "../components/drawingBoard.vue";
import rightPanel from "../components/right-canvas/index";
//引入基本的原型函数的使用
import mxgraph from "../utils/init.js";
import reset from "../utils/reset.js";
// import shape from "@/utils/mx/mxShape";
import keyDown from "../utils/mx/mxKeyHandler";
import popupMenuHandler from "../utils/mx/popupMenuHandler";
import { mapState, mapGetters } from "vuex";
import pkq from "../assets/images/pkq.jpg";

import VueDragResize from "vue-drag-resize";
import outline from "@/components/model/Outline.vue";
export default {
  name: "index",
  components: {
    navbar,
    silder,
    drawingBoard,
    rightPanel,
    redone: true,
    VueDragResize,
    outline,
  },
  data() {
    return {
      undoMng: null, // 状态管理器
      sign: false, // 用来告诉状态栏有被选中的单个的cell发生了变化，如果是正在展示的cell，则状态栏需要进行同步的修正.
      isCoverage: false, // 是否显示图层组件
      pkq,
      isdrags: false,
      Showlayout: false,
    };
  },
  computed: {
    ...mapState(["editor", "graph", "isPanel", "parent"]),
    // ...mapGetters(["parent"]),
    //当前选中的cell
    getSelectCell() {
      return this.graph && this.graph.getSelectionCells();
    },
  },
  watch: {
    getSelectCell(n, o) {
      // 展示cell信息
      let tmpCell = this.graph && this.graph.getSelectionCells()[0];
      //   this.$emit("selectcell", tmpCell);
      if (tmpCell == undefined) {
        return;
      }
    },
  },
  created() {
    // this.createEdit();
  },
  mounted() {
    reset();
    // shape();
    window.addEventListener("mousewheel", this.getScroll, {
      passive: false,
    });

    // 动态改变样式
    this.graph.getView().updateStyle = true;
    mxGraph.prototype.allowAutoPanning = true;
    //声名一个全局的
    const mystyles = {
      [mxConstants.STYLE_STROKECOLOR]: "#ebb862", // 边框颜色
      //   [mxConstants.STYLE_FONTCOLOR]: "#333333",
      [mxConstants.STYLE_FILLCOLOR]: "#FFDA00", // 背景色
      [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]: "#e6e6e6",
      [mxConstants.STYLE_GRADIENTCOLOR]: "#1EFF00",
      [mxConstants.STYLE_GRADIENT_DIRECTION]: mxConstants.DIRECTION_WEST,
      [mxConstants.STYLE_LABEL_WIDTH]: "labelWidth",
    };

    this.graph.getStylesheet().putCellStyle("mystyles", mystyles);
    // this.initGraph(this.graph);
    // this.addCell();
    var overlay = new mxCellOverlay(
      pkq,
      `<div>你好，再见！</div>`,
      null,
      null,
      10,
      null
    );
    // this.graph.addCellOverlay(vertex, overlay);
    console.log(overlay);

    overlay.addListener(mxEvent.CLICK, function (sender, evt) {
      var cell = evt.getProperty("cell");
      console.log(999);
      this.graph.setSelectionCell(cell);
    });
    setTimeout(() => {}, 1000);
  },
  methods: {
    //初始化mxgraph容器
    init(refGrpah) {
      // 创建全局容器
      this.$store.state.editor = new mxEditor();
      this.$store.state.graph = this.editor.graph;
      //设置图容器
      this.editor.setGraphContainer(refGrpah);
      this.$store.state.parent = this.editor.graph.getDefaultParent();
      //键盘监听的事件
      keyDown(this.graph);
      //鼠标右侧菜单栏
      popupMenuHandler(this.graph);

      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      try {
        // graph.insertVertex，增加一个新的顶点到给定的父mxcell中
        // const v1 = this.graph.insertVertex(
        //   parent,
        //   null,
        //   "hello",
        //   20,
        //   20,
        //   80,
        //   30,
        //   `shape=actors;perimeter=ellipsePerimeter;`
        // );
        //20指距离左this.边的高度，20指距离顶部的高度，80指创建图形的宽度，30指创建图形的高度
        // const v2 = this.graph.insertVertex(
        //   parent,
        //   null,
        //   "World!",
        //   200,
        //   150,
        //   80,
        //   30,
        //   `shape=CreateCloud;perimeter=ellipsePerimeter;`
        // );
        // const v3 = this.graph.insertVertex(
        //   parent,
        //   null,
        //   "World!",
        //   300,
        //   150,
        //   120,
        //   130,
        //   `shape=CreateCylin;perimeter=ellipsePerimeter;`
        // );
        // var v5 = this.graph.insertVertex(
        //   this.parent,
        //   null,
        //   "柱形",
        //   500,
        //   50,
        //   150,
        //   150,
        //   "mystyles;shape=cylinder;"
        // );
        // var v6 = this.graph.insertVertex(
        //   this.parent,
        //   null,
        //   "双椭圆",
        //   500,
        //   50,
        //   150,
        //   150,
        //   "shape=doubleEllipse;"
        // );
        // var v7 = this.graph.insertVertex(
        //   this.parent,
        //   null,
        //   "新的双椭圆",
        //   100,
        //   240,
        //   250,
        //   250,
        //   "shape=newDoubleEllipse;"
        // );
      } finally {
        this.graph.getModel().endUpdate();
      }
    },
    Showdrag(val) {
      this.isdrags = val;
    },
    handleLayout(val) {
      this.Showlayout = val;
    },
    handleClose() {
      this.isdrags = false;
    },
    LayoutColse() {
      this.Showlayout = false;
    },
    // handleScroll(e) {
    //   e = e || window.event;
    //   if (e.wheelDelta == "120" || e.wheelDelta == "-120") {
    //     //IE/Opera/Chrome
    //     e.returnValue = false;
    //     var upcheck;
    //     if (e.wheelDelta) {
    //       upcheck = e.wheelDelta > 0 ? 1 : 0;
    //     } else {
    //       upcheck = e.detail < 0 ? 1 : 0;
    //     }
    //     if (upcheck) {
    //       this.graph.zoomIn();
    //     } else {
    //       this.graph.zoomOut();
    //     }
    //   } else if (e.detail) {
    //     //Firefox
    //     e.returnValue = false;
    //   }
    // },

    //创建显示流程图的画布
    createEdit: function () {
      undefined;
      var self = this;
      //   //创建流程图编辑器，先检查加载图形库
      //   JxUtil.loadJxGraph();
      //   self.editor = new mxCanvas("public/lib/graph/config/showeditor_nav.xml");
      //   var graph = self.editor.graph;
      //   //设置编辑器为只读
      //   //由于设置setEnabled为false，分组块不能收缩了，所以采用下面的组合
      //   graph.setCellsEditable(false);
      //   graph.setCellsSelectable(false);
      //   graph.setConnectable(false);
      //   graph.setCellsMovable(false);

      //设置导航图的任务节点的鼠标与移入移出效果
      var track = new mxCellTracker(this.graph);
      track.mouseMove = function (sender, me) {
        undefined;
        var cell = this.getCell(me);
        if (cell && self.isTask(cell)) {
          undefined;
          //设置鼠标为样式为手状
          me.getState().setCursor("pointer");
          if (this.cur_cell == null) {
            undefined;
            this.cur_cell = cell;
            //设置鼠标移入节点效果
            self.moveNode(cell, true);
          }
        } else {
          undefined;
          //设置鼠标移出节点效果
          self.moveNode(this.cur_cell, false);
          this.cur_cell = null;
        }
      };

      //捕获任务节点的鼠标点击事件
      this.graph.addListener(mxEvent.CLICK, function (sender, evt) {
        undefined;
        var cell = evt.getProperty("cell");
        var nodeId = self.getTaskId(cell);
        if (nodeId.length > 0) {
          undefined;
          self.clickCell(self.graphId, nodeId);
        }
      });
    },

    //private 检查是否为任务节点
    isTask: function (cell) {
      undefined;
      if (cell == null) return false;

      var enc = new mxCodec();
      var node = enc.encode(cell);
      var nodetype = node.getAttribute("nodetype");
      if (nodetype == "task") {
        undefined;
        return true;
      }
      return false;
    },

    /**
     * 给指定的节点设置背景色
     * cell -- 当前节点
     * isin -- true 表示鼠标在节点上，false 表示鼠标没在节点上
     **/
    moveNode: function (cell, isin) {
      undefined;
      //为空与灰色的节点都不处理鼠标事件
      if (cell == null) return;
      if (cell.is_disabled) return;

      var self = this;
      var model = self.editor.graph.getModel();
      model.beginUpdate();
      try {
        undefined;
        self.editor.graph.setCellStyles(
          "strokeColor",
          isin ? "#A1A1FF" : "#C3D9FF",
          [cell]
        );
        self.editor.graph.setCellStyles(
          "fillColor",
          isin ? "#A1A1FF" : "#C3D9FF",
          [cell]
        );
      } finally {
        undefined;
        model.endUpdate();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  widows: 100%;
  //   height: 6%;
}
/deep/ .main-container {
  height: calc(100% - 60px);
  position: absolute;
  //   top: 6.1%;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
}
.el-aside {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.el-main {
  color: #333;
  text-align: center;
  //   line-height: 160px;
  position: absolute;
  top: 0;
  left: 250px;
  bottom: 0;
  right: 0;
  height: 100%;
  padding: 0px;
  display: flex;
  flex-direction: row;
}

/deep/ .el-container {
  margin-bottom: 40px;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

// 滚动条样式
::-webkit-scrollbar {
  width: 5px; //y轴上的滚动条宽度
  height: 5px; //x轴上滚动条高度
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

.content-container {
  box-shadow: 1px 1px 10px #333;
  background-color: aquamarine;
}
.drag-title {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 5px 20px;
}
.drag {
  display: flex;
  justify-content: center;
  align-items: center;

  #container-drage {
    height: 250px;
    width: 250px;
  }

  #container-layout {
    height: 250px;
    width: 250px;
  }
}
.vdr {
  position: absolute;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
}
.vdr.active:before {
  box-shadow: 1px 1px 10px #333;
  outline: none;
  border-radius: 10px;
}

.vdr-stick-tl {
  width: 0;
  height: 0;
}

::v-deep .flow {
  stroke-dasharray: 8;
  animation: dash 0.5s linear;
  animation-iteration-count: infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: -16;
  }
}
</style>
