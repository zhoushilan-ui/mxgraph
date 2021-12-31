export function Flowsegment(graph, parent) {
  var style =
    "shape=cylinder;strokeWidth=2;fillColor=red;strokeColor=black;gradientColor=blue;fontColor=black;fontStyle=1;spacingTop=14;";
  //endSize :箭头的大小，endArrow：箭头的样式。
  var endArrow =
    "strokeWidth=3;endArrow=block;endSize=2;endFill=1;strokeColor=black;rounded=1;edgeStyle=orthogonalEdgeStyle;";
  let estyle = [];
  graph.getModel().beginUpdate();
  try {
    var v1 = graph.insertVertex(parent, null, "1", 20, 20, 60, 60, style);
    var v2 = graph.insertVertex(parent, null, "2", 200, 150, 60, 60, style);
    var v3 = graph.insertVertex(parent, null, "3", 400, 70, 60, 60, style);
    var v4 = graph.insertVertex(parent, null, "4", 500, 140, 60, 60, style);

    var e1 = graph.insertEdge(parent, null, "", v1, v2, endArrow);
    var e2 = graph.insertEdge(parent, null, "", v2, v3, endArrow);
    var e3 = graph.insertEdge(parent, null, "", v3, v4, endArrow);
    //mxPoints数组，指定沿边缘的控制点,
    //新建一个控制点, 相当于拐角;
    // e1.geometry.points = [new this.$mxGraph.mxPoint(230, 50)];
    // e2.geometry.points = [new this.$mxGraph.mxPoint(425, 180)];
    // e3.geometry.points = [new this.$mxGraph.mxPoint(530, 100)];
    //orderCells: 将给定的单元格移到前面或后面
    graph.orderCells(true, [e1, e2, e3]);
    estyle = [e1, e2, e3];
    // graph.orderCells(true, [e2]);
    // graph.orderCells(true, [e3]);
  } finally {
    graph.getModel().endUpdate();
  }
  //添加路径
  //getState:返回给定单元格的mxCellState
  //view :持有mxGraphView是缓存mxCellStates的细胞。
  estyle.forEach((item, i) => {
    var state = graph.view.getState(item);
    //removeAttribute:销毁某个属性
    state.shape.node
      .getElementsByTagName("path")[0]
      .removeAttribute("visibility");
    //setAttribute()函数可以设置对象的属性，如果不存在此属性，则会创建此属性
    state.shape.node
      .getElementsByTagName("path")[0]
      .setAttribute("stroke-width", "6");
    state.shape.node
      .getElementsByTagName("path")[0]
      .setAttribute("stroke", "lightGray");
    state.shape.node
      .getElementsByTagName("path")[1]
      .setAttribute("class", "flow");
  });
  graph.addListener(mxEvent.MOVE_CELLS, (sender, evt) => {
    graph.orderCells(true, [e1, e2, e3]);
    setTimeout(() => {
      estyle.forEach((item, i) => {
        var state = graph.view.getState(item);
        //removeAttribute:销毁某个属性
        state.shape.node
          .getElementsByTagName("path")[0]
          .removeAttribute("visibility");
        //setAttribute()函数可以设置对象的属性，如果不存在此属性，则会创建此属性
        state.shape.node
          .getElementsByTagName("path")[0]
          .setAttribute("stroke-width", "6");
        state.shape.node
          .getElementsByTagName("path")[0]
          .setAttribute("stroke", "lightGray");
        state.shape.node
          .getElementsByTagName("path")[1]
          .setAttribute("class", "flow");
      });
      graph.getModel().endUpdate();
    }, 100);
  });
}

export function drage(graph, div, count) {
  if (count > 1) return;
  var outline = new mxOutline(graph, div);
  if (document.documentMode == 8) {
    container.style.filter =
      "progid:DXImageTransform.Microsoft.alpha(opacity=100)";
  }
  var scale = graph.view.scale;
  var bounds = graph.getGraphBounds();
  graph.view.setTranslate(-bounds.x / scale, -bounds.y / scale);
  outline.suspended = !outline.suspended;
  outline.update(true);
  if (!outline.suspended) {
    outline.update(true);
  }
}

export function initGraph(graph) {
  //mxRubberband:构造一个事件处理程序，该事件处理程序使用橡皮筋选择来选择图形中的矩形区域。
  this.rubberBand = new mxRubberband(graph);
  const pointImg = require("@/assets/point.gif");
  //pointImage:mxImage用作固定连接点的图像。
  //mxImage:构造一个新图像
  graph.connectionHandler.constraintHandler.pointImage = new mxImage(
    pointImg,
    10,
    10
  );
  //重画
  //将焦点转移到给定的状态，作为源终端或目标终端。如果未启用处理程序，则将绘制轮廓，但忽略约束。
  graph.connectionHandler.constraintHandler.createHighlightShape = function () {
    //mxEllipse:构造一个新的椭圆形状。
    return new mxEllipse(null, this.highlightColor, this.highlightColor, 2);
  };
  console.log(graph);
  //getAllConnectionConstraints:返回给定终端的所有mxConnectionConstraints的数组。如果给定终端的形状为<mxStencilShape>，则返回相应mxStencil的约束。
  graph.getAllConnectionConstraints = function (terminal) {
    if (terminal !== null && terminal.shape !== null) {
      const cell = terminal["cell"];
      const constraints = cell["constraints"];
      if (constraints instanceof Array && constraints.length > 0) {
        return constraints.map((constraint) => {
          return new mxConnectionConstraint(
            new mxPoint(constraint["x"], constraint["y"]),
            constraint["perimeter"]
          );
        });
      } else {
        if (terminal.shape.stencil) {
          return terminal.shape.stencil.constraints;
        } else if (terminal.shape.constraints) {
          return terminal.shape.constraints;
        }
      }
    }
    return null;
  };
  graph.connectionHandler.isConnectableCell = function () {
    return false;
  };
}
