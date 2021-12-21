let popMenu = {
  graph: null,
};

function init(graph) {
  // 设置自动扩大鼠标悬停
  graph.panningHandler.autoExpand = true;
  popMenu.graph = graph;
  // 覆写右键单击事件
  graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
    menu.addItem("删除", null, () => {
      //   deleteCells({
      //  // getSelectionCells: 返回所选mxCells的数组。
      //     cells: graph.getSelectionCells(),
      //     includeEdges: true,
      //   });
      mxClipboard.removeCells(graph);
    });
    // addSeparator：在给定父项目中添加水平分隔符，如果未指定父项目，则在顶级菜单中添加水平分隔符。
    // 此处表示在‘删除’和下面两个单项中添加一条分割线
    menu.addSeparator();
    menu.addItem("复制", null, () => {
      mxClipboard.copy(graph);
    });
    menu.addItem("粘贴", null, () => {
      mxClipboard.paste(graph);
    });
  };
}
// 删除节点
function deleteCells({ cells = [], includeEdges = false, multilevel = true }) {
  if (!cells || !(cells instanceof Array)) {
    throw new Error("cells 必须是一个数组");
  }
  // new Set()获得的set对象是ES6的对象，set对象中存储的值总是唯一的
  let tmpSet = new Set(cells);

  if (multilevel) {
    cells.forEach((cell) => {
      // findDeleteCell：自定义函数
      findDeleteCell(cell, tmpSet);
    });
  }
  // removeCells：如果includeEdges(参数二)为真，则从图中移除给定的单元格，包括所有连接的边。更改是使用cellsremove执行的。
  // 此方法触发mxEvent。事务正在进行时的REMOVE_CELLS。删除的单元格将作为数组返回。
  // Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组
  popMenu.graph.removeCells(Array.from(tmpSet), includeEdges);
}
function findDeleteCell(cell, deleteSet) {
  deleteSet.add(cell);
  // cell.edges：当前cell节点所连接的边，无论是指向这个节点的还是这个节点发出的
  if (cell.edges) {
    cell.edges.forEach((tmpEdge) => {
      // tmpEdge.target：引用目标终端。也就是这个边指向的目标
      // tmpEdge.target !== cell 也就是说如果这个边指向的目标不是当前节点，那么就把被指向的节点加入deleteSet待删除数组中，然后递归调用本函数，最终将节点所有下级节点全部删除
      // 此时如果出现cell的闭环则会让程序死循环导致异常
      if (tmpEdge.target !== cell) {
        deleteSet.add(tmpEdge.target);
        findDeleteCell(tmpEdge.target, deleteSet);
      }
    });
  }
}
export default init;
