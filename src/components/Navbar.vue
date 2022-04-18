<template>
  <div class="app-container">
    <div class="left-panel">
      <el-row>
        <el-button
          type="success"
          icon="el-icon-folder-opened"
          size="mini"
          @click="open"
          >打开</el-button
        >
        <el-button
          type="info"
          icon="el-icon-folder-add"
          size="mini"
          @click="dialogTableVisible = true"
          >创建</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="handleRemove"
          >删除全部</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="handleSave"
          >保存</el-button
        >

        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="handleSelectAll"
          >全选</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="handleSelectNone"
          >全不选</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="handleShow"
          >展示</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="handleCreate"
          >小窗口</el-button
        >

        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="handleLayout"
          >Layout</el-button
        >
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            查看更多<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              <span @click="handleExportImage">导出图片</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="handleCut">剪切</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="handleRefresh">刷新</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="handleCopy">复制</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="handlePaste">粘贴</span>
            </el-dropdown-item>

            <el-dropdown-item class="clearfix">
              <span @click="handleUndo">撤销</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="handleRedo">重做</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="handleZoomIn">放大</span>
            </el-dropdown-item>

            <el-dropdown-item class="clearfix">
              <span @click="handleZoomOut">缩小</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="handleEdit">编辑</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="handleDelete">删除选中的单元格</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="handleSelectPrevious">选择上一个单元</span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <span @click="handleSelectNext">选择下一个单元</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </div>
    <div class="right-panel">
      <el-row>
        <el-button icon="el-icon-search" circle size="mini"></el-button>

        <el-button
          :icon="isPanel ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          size="mini"
          @click="handClick"
        ></el-button>
      </el-row>
    </div>
    <!-- 提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <el-tag
          v-for="item in getName()"
          :key="item.label"
          :type="item.type"
          @click="handleClick(item)"
        >
          <span>{{ item.label }}</span>
        </el-tag>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 默认模板 -->
    <el-dialog title="默认模板" :visible.sync="dialogTableVisible">
      <el-row>
        <el-col :span="4">
          <el-tag @click="handleFlow">流动线段</el-tag></el-col
        >
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      isSelect: false,
      dialogVisible: false,
      dialogTableVisible: false,
      isShow: false,
      Layout: false,
      count: 0,
    };
  },
  components: {},
  computed: {
    ...mapState(["editor", "graph", "isPanel", "parent"]),
    // 当前选中的cell
    getSelectCell() {
      return this.graph && this.graph.getSelectionCells();
    },
    getName() {
      return (name) => {
        let d = [];
        //取localStorage中的所有的键(Key)
        for (var i = 0; i < localStorage.length; i++) {
          let tep = localStorage
            .key(i)
            .substring(localStorage.key(i).length - 5);
          let tm = localStorage
            .key(i)
            .substring(0, localStorage.key(i).length - 5);
          if (tep == "-name") {
            d.push({ type: "", label: tm });
          }
        }
        return d;
      };
    },
  },
  watch: {
    // getSelectCell(n, o) {
    //   // 展示cell信息
    //   let tmpCell = this.graph && this.graph.getSelectionCells()[0];
    //   console.log(tmpCell);
    //   tmpCell.setStyle("fillColor: red");
    //   this.$emit("selectcell", tmpCell);
    //   if (tmpCell == undefined) {
    //     return;
    //   }
    // },
  },
  mounted() {},
  methods: {
    //显示面板
    handClick() {
      this.$store.commit("setColor", !this.isPanel);
    },
    handleRemove() {
      this.graph.removeCells(
        this.graph.getChildVertices(this.graph.getDefaultParent())
      );
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleClick(data) {
      this.dialogVisible = false;
      let name = data.label + "-name";
      this.$confirm("是否存储当前内容", "询问", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loadXMLbyLocalStorage(name);
          this.dialogVisible = false;
        })
        .catch(() => {
          this.loadXMLbyLocalStorage(name);
          this.dialogVisible = false;
        });
    },
    //打开
    open() {
      if (this.getName().length == 0) {
        this.$confirm("当前文件夹是空文件", "询问", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          return;
        });
        return;
      }
      this.dialogVisible = !this.dialogVisible;
      this.graph.removeCells(
        this.graph.getChildVertices(this.graph.getDefaultParent())
      );
    },
    loadXMLbyLocalStorage(name) {
      let Xml = localStorage.getItem(name);
      //parseXml:将指定的 XML 字符串解析为新的 XML 文档并返回新文档。
      const xmlDocument = mxUtils.parseXml(Xml);
      const decoder = new mxCodec(xmlDocument);
      const node = xmlDocument.documentElement;
      decoder.decode(node, this.graph.getModel());
    },
    //小窗口
    handleCreate() {
      this.isShow = true;
      this.$emit("Showdrag", this.isShow);
      this.count++;
      setTimeout(() => {
        this.drage(
          this.graph,
          document.getElementById("container-drage"),
          this.count
        );
      }, 100);
    },
    handleLayout() {
      this.Layout = true;
      this.$emit("handleLayout", this.Layout);
      setTimeout(() => {
        this.getLayoutManager(
          this.graph,
          document.getElementById("container-layout")
        );
      }, 100);
    },
    //保存
    handleSave() {
      this.$prompt("请输入新的名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        const encoder = new mxCodec();
        // encode :对指定的对象进行编码并返回结果 XML 节点。
        const result = encoder.encode(this.graph.getModel());
        //getPrettyXml:返回一个的打印字符串，表示给定节点的 XML 树。
        let mxstr = mxUtils.getPrettyXml(result);
        console.log(mxstr);
        //包编辑的xml文件放在localStorage中
        localStorage.setItem(value + "-name", mxstr);
      });
    },
    //全选
    handleSelectAll() {
      this.editor.actions.selectAll(this.editor);
    },
    //全部选
    handleSelectNone() {
      this.editor.actions.selectNone(this.editor);
    },
    //展示
    handleShow() {
      this.editor.actions.show(this.editor);
    },
    //导出图片
    handleExportImage() {
      this.editor.actions.exportImage(this.editor);
    },
    //剪切
    handleCut() {
      this.editor.actions.cut(this.editor);
    },
    //刷新
    handleRefresh() {
      this.editor.actions.refresh(this.editor);
    },
    //复制
    handleCopy() {
      this.editor.actions.copy(this.editor);
    },
    //粘贴
    handlePaste() {
      this.editor.actions.paste(this.editor);
    },
    //删除当前选中的单元格
    handleDelete() {
      this.editor.actions.delete(this.editor);
    },
    //撤销
    handleUndo() {
      this.editor.actions.undo(this.editor);
    },
    //重做
    handleRedo() {
      this.editor.actions.redo(this.editor);
    },
    //放大
    handleZoomIn() {
      this.editor.actions.zoomIn(this.editor);
    },
    //缩小
    handleZoomOut() {
      this.editor.actions.zoomOut(this.editor);
    },
    //编辑
    handleEdit() {
      this.editor.actions.edit(this.editor);
    },
    //选择下一步
    handleSelectPrevious() {
      this.editor.actions.selectPrevious(this.editor);
    },
    //编辑
    handleSelectNext() {
      this.editor.actions.selectNext(this.editor);
    },
    //创建流动线段模板
    handleFlow() {
      setTimeout(() => {
        this.Flowsegment(this.graph, this.parent);
        this.dialogTableVisible = false;
      }, 1000);
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
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

  .right-panel {
    width: 100% - $width;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  ::v-deep .el-tag {
    cursor: pointer;
  }
}
</style>
