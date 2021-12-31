/**
 * 使用mxgraph创建基本形状的原型属性，自定义创建形状
 *
 *
 */

import mxgraph from "../init";
function init() {
  //创建一个微笑演员的形状
  actors();
  //创建一个新的云
  CreateCloud();
  //创建一个新的气缸(圆柱)
  CreateCylinder();
  //创建一个新的双椭圆
  CreateNewDoubleEllipse();
}
//创建微笑演员
function actors() {
  function ActorsShape() {}
  ActorsShape.prototype = new mxActor();
  ActorsShape.prototype.constructor = ActorsShape;
  mxCellRenderer.registerShape("actors", ActorsShape);
  ActorsShape.prototype.redrawPath = function (path, x, y, w, h) {
    ellipse2path(path, x, y, w, h);
  };
  mxCellRenderer.prototype.getLabelValue = function (state) {
    // console.log(state);
    return state.view.graph.getLabel(state.cell);
  };
}
function ellipse2path(path, x, y, w, h) {
  //设置形状的边框是否是虚线
  //   path.setDashed(true, true);
  var width = w / 3;
  path.moveTo(0, h);
  path.curveTo(0, (3 * h) / 5, 0, (2 * h) / 5, w / 2, (2 * h) / 5);
  path.curveTo(w / 2 - width, (2 * h) / 5, w / 2 - width, 0, w / 2, 0);
  path.curveTo(
    w / 2 + width,
    0,
    w / 2 + width,
    (2 * h) / 5,
    w / 2,
    (2 * h) / 5
  );
  path.curveTo(w, (2 * h) / 5, w, (3 * h) / 5, w, h);
  path.moveTo(w / 3, h / 4);
  path.curveTo(w / 3, h / 4, w / 2, h / 2.5, w / 1.5, h / 4);
  path.close();
  path.moveTo(x, y);
}

function CreateCloud() {
  function CreateCloudShape() {}
  CreateCloudShape.prototype = new mxCloud();
  CreateCloudShape.prototype.constructor = CreateCloudShape;
  mxCellRenderer.registerShape("CreateCloud", CreateCloudShape);
  CreateCloudShape.prototype.redrawPath = function (c, x, y, w, h) {
    createCloud(c, x, y, w, h);
  };
}

function createCloud(c, x, y, w, h) {
  //设置形状的填充色
  c.setFillColor("red");
  //设置行政的线宽的颜色
  c.setStrokeColor("yellow");
  c.moveTo(0.25 * w, 0.25 * h);
  c.curveTo(0.05 * w, 0.25 * h, 0, 0.5 * h, 0.16 * w, 0.55 * h);
  c.curveTo(0, 0.66 * h, 0.18 * w, 0.9 * h, 0.31 * w, 0.8 * h);
  c.curveTo(0.4 * w, h, 0.7 * w, h, 0.8 * w, 0.8 * h);
  c.curveTo(w, 0.8 * h, w, 0.6 * h, 0.875 * w, 0.5 * h);
  c.curveTo(w, 0.3 * h, 0.8 * w, 0.1 * h, 0.625 * w, 0.2 * h);
  c.curveTo(0.5 * w, 0.05 * h, 0.3 * w, 0.05 * h, 0.25 * w, 0.25 * h);
  c.close();
}
//创建一个新的圆柱
function CreateCylinder() {
  function CreateCylinderShape() {}
  CreateCylinderShape.prototype = new mxCylinder();
  CreateCylinderShape.prototype.constructor = CreateCylinderShape;
  mxCellRenderer.registerShape("CreateCylin", CreateCylinderShape);
  CreateCylinderShape.prototype.redrawPath = function (
    c,
    x,
    y,
    w,
    h,
    isForeground
  ) {
    // console.log(c);
    //设置圆柱的渐变色
    c.setGradient("#2D61FF", "#FF2D35", 50, 50, 50, 50);
    var dy = this.getCylinderSize(x, y, w, h);

    if (
      (isForeground && this.fill != null) ||
      (!isForeground && this.fill == null)
    ) {
      c.moveTo(0, dy);
      c.curveTo(0, 2 * dy, w, 2 * dy, w, dy);

      if (!isForeground) {
        c.stroke();
        c.begin();
      }
    }

    if (!isForeground) {
      c.moveTo(0, dy);
      c.curveTo(0, -dy / 3, w, -dy / 3, w, dy);
      c.lineTo(w, h - dy);
      c.curveTo(w, h + dy / 3, 0, h + dy / 3, 0, h - dy);
      c.close();
    }
  };
}

function CreateNewDoubleEllipse() {
  function ActorNewDoubleEllipse() {}
  ActorNewDoubleEllipse.prototype = new mxDoubleEllipse();
  ActorNewDoubleEllipse.prototype.constructor = ActorNewDoubleEllipse;
  mxCellRenderer.registerShape("newDoubleEllipse", ActorNewDoubleEllipse);
  ActorNewDoubleEllipse.prototype.vmlScale = 20;
  ActorNewDoubleEllipse.prototype.paintVertexShape = function (c, x, y, w, h) {
    c.ellipse(x, y, w, h);
    c.stroke();
    console.log(c);
    var inset = mxUtils.getValue(
      this.style,
      mxConstants.STYLE_MARGIN,
      Math.min(3 + this.strokewidth, Math.min(w / 5, h / 5))
    );
    x += 3 * inset;
    y += 3 * inset;
    w -= 6 * inset;
    h -= 6 * inset;

    if (w > 0 && h > 0) {
      c.ellipse(x, y, w, h);
    }
    // c.fill();
    // c.addNode(true, true);
    c.fillAndStroke();
  };
}
export default init();
