<template>
  <div class="container">
    <el-container>
      <el-header><navbar></navbar></el-header>
      <div class="main-container">
        <el-aside width="250px"><silder></silder></el-aside>
        <el-main>
          <drawingBoard @init="init"></drawingBoard>
          <rightPanel v-show="isPanel"></rightPanel
        ></el-main>
      </div>
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
export default {
  name: "index",
  components: {
    navbar,
    silder,
    drawingBoard,
    rightPanel,
    redone: true,
  },
  data() {
    return {
      undoMng: null, // 状态管理器
      sign: false, // 用来告诉状态栏有被选中的单个的cell发生了变化，如果是正在展示的cell，则状态栏需要进行同步的修正.
      isCoverage: false, // 是否显示图层组件
    };
  },
  computed: {
    ...mapState(["editor", "graph", "isPanel", "parent"]),
    // ...mapGetters(["parent"]),
  },
  created() {},
  mounted() {
    reset();
    // shape();
    window.addEventListener("mousewheel", this.getScroll, {
      passive: false,
    });
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
      //引用标间
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
</style>
