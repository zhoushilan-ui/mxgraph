/**
 * 使用mxgraph创建基本形状的原型属性，自定义创建形状
 *
 *
 *
 */

import mxgraph from "../init";
// import init from "./mxKeyHandler";
function init() {
  //创建一个微笑演员的形状
  actors();
  //创建右箭头
  rightArrow();
}
//创建微笑演员
function actors() {
  function ActorsShape() {}
  ActorsShape.prototype = new mxActor();
  mxCellRenderer.registerShape("actors", ActorsShape);
  ActorsShape.prototype.redrawPath = function (path, x, y, w, h) {
    ellipse2path(path, x, y, w, h);
  };
}

function ellipse2path(path, x, y, w, h) {
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
//创建右箭头
function rightArrow() {
  function ArrowShape() {}
  ArrowShape.prototype = new mxActor();
  mxCellRenderer.registerShape("right-arrow", ArrowShape);
  ArrowShape.prototype.paintEdgeShape = function (c, pts) {
    // Geometry of arrow
    var spacing = mxConstants.ARROW_SPACING;
    var width = mxConstants.ARROW_WIDTH;
    var arrow = mxConstants.ARROW_SIZE;

    // Base vector (between end points)
    var p0 = pts[0];
    var pe = pts[pts.length - 1];
    var dx = pe.x - p0.x;
    var dy = pe.y - p0.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var length = dist - 2 * spacing - arrow;

    // Computes the norm and the inverse norm
    var nx = dx / dist;
    var ny = dy / dist;
    var basex = length * nx;
    var basey = length * ny;
    var floorx = (width * ny) / 3;
    var floory = (-width * nx) / 3;

    // Computes points
    var p0x = p0.x - floorx / 2 + spacing * nx;
    var p0y = p0.y - floory / 2 + spacing * ny;
    var p1x = p0x + floorx;
    var p1y = p0y + floory;
    var p2x = p1x + basex;
    var p2y = p1y + basey;
    var p3x = p2x + floorx;
    var p3y = p2y + floory;
    // p4 not necessary
    var p5x = p3x - 3 * floorx;
    var p5y = p3y - 3 * floory;

    c.begin();
    c.moveTo(p0x, p0y);
    c.lineTo(p1x, p1y);
    c.lineTo(p2x, p2y);
    c.lineTo(p3x, p3y);
    c.lineTo(pe.x - spacing * nx, pe.y - spacing * ny);
    c.lineTo(p5x, p5y);
    c.lineTo(p5x + floorx, p5y + floory);
    c.close();

    c.fillAndStroke();
  };
}

export default init();
