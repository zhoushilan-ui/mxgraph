import mxgraph from "./init";
import rotate from "../assets/images/rotate/index";

function init() {
  //代表形状可以旋转
  mxVertexHandler.prototype.rotationEnabled = true;
  mxVertexHandler.prototype.parentHighlightEnabled = true;

  mxGraph.prototype.resizeCells = function (cells, bounds) {
    // this.world(1);
    if (cells[0].style) {
      // tmp[0]是原有的样式集合(例如myStyleSvg),tmp[1]是背景图的路径设置
      let tmp = cells[0].style.split(";");
      if (cells[0].style.includes("dashed")) {
        tmp[0] = "shape=line";
        tmp[1] = "dashed";
      }
      console.log(tmp);
      tmp.push("imageWidth=" + bounds[0].width * 1);
      tmp.push("imageHeight=" + bounds[0].height * 1);
      this.getModel().setStyle(cells[0], tmp.join(";"));
    }
    this.model.beginUpdate();
    try {
      this.cellsResized(cells, bounds);
    } finally {
      this.model.endUpdate();
    }
    return cells;
  };
  //修改单元格选中时虚线的默认颜色
  mxVertexHandler.prototype.getSelectionColor = function () {
    return (mxConstants.VERTEX_SELECTION_COLOR = "#007DFC");
  };
  //createSizer:为指定的游标和索引创建一个sizer句柄，并返回代表该句柄的新mxRectangleShape。
  mxVertexHandler.prototype.createSizer = function (
    cursor,
    index,
    size,
    fillColor
  ) {
    size = size || mxConstants.HANDLE_SIZE;
    if (index >= 0) {
      var bounds = new mxRectangle(0, 0, 9, 9);
    } else {
      var bounds = new mxRectangle(0, 0, 15, 15);
    }
    var sizer = this.createSizerShape(bounds, index, fillColor);
    if (
      sizer.isHtmlAllowed() &&
      this.state.text != null &&
      this.state.text.node.parentNode == this.graph.container
    ) {
      sizer.bounds.height -= 1;
      sizer.bounds.width -= 1;
      sizer.dialect = mxConstants.DIALECT_STRICTHTML;
      sizer.init(this.graph.container);
    } else {
      sizer.dialect =
        this.graph.dialect != mxConstants.DIALECT_SVG
          ? mxConstants.DIALECT_MIXEDHTML
          : mxConstants.DIALECT_SVG;
      sizer.init(this.graph.getView().getOverlayPane());
    }
    mxEvent.redirectMouseEvents(sizer.node, this.graph, this.state);

    if (this.graph.isEnabled()) {
      sizer.setCursor(cursor);
    }

    if (!this.isSizerVisible(index)) {
      sizer.visible = false;
    }
    return sizer;
  };
  //createSizerShape:创建用于指定边界索引的sizer句柄的形状。如果需要支持不带异物的HTML标签，则仅应返回图像和矩形。
  mxVertexHandler.prototype.createSizerShape = function (
    bounds,
    index,
    fillColor
  ) {
    fillColor = "#007DFC";
    if (index == mxEvent.ROTATION_HANDLE) {
      //返回的是旋转的手柄的样式
      bounds = new mxRectangle(bounds.x, bounds.y, bounds.width, bounds.height);
      // var shape = new mxImageShape(bounds, toolgif.icon[0]);
      var shape = new mxImageShape(bounds, rotate[0]);
      // Allows HTML rendering of the images
      shape.preserveImageAspect = false;
      return shape;
    } else {
      //返回的是句柄的样式
      return new mxEllipse(
        bounds,
        fillColor || mxConstants.HANDLE_FILLCOLOR,
        "#ffffff" || mxConstants.HANDLE_STROKECOLOR,
        mxConstants.HANDLE_STROKECOLOR
      );
    }
  };
}

export default init;
