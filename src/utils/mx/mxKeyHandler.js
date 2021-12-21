/**
 * mxKeyHandler:侦听击键事件的事件处理程序
 * keyDown.keyHandler.bindControlKey:持有一个mxDefaultKeyHandler来处理键盘事件。
 * mxClipboard:实现图形单元剪贴板的单例。
 */
let keyDown = {
  graph: null, // mxgraph实例
  keyHandler: null, // 键盘事件监听
  undoMng: null, // 状态管理器
};
// function mxUndoManager() {
//   //创建一个撤销管理器,实现操作的撤销
//   keyDown.undoMng = new mxUndoManager();
//   var listener = function (sender, evt) {
//     keyDown.undoMng.undoableEditHappened(evt.getProperty("edit"));
//   };
//   // 对graph面板添加监听
//   // getModel: 返回包含单元格的mxGraphModel。
//   // addListener: 将指定的函数绑定到给定的事件名。如果没有提供事件名称，则为所有事件注册侦听器。
//   // 侦听器的参数是发送器和mxEventObject
//   keyDown.graph.getModel().addListener(mxEvent.UNDO, listener);
//   keyDown.graph.getView().addListener(mxEvent.UNDO, listener);
// }
function init(graph) {
  keyDown.graph = graph;
  keyDown.keyHandler = new mxKeyHandler(graph);
  //   mxUndoManager();
  _ctrlC();
  _ctrlV();
}

//复制
function _ctrlC() {
  keyDown.keyHandler.bindControlKey(67, () => {
    mxClipboard.copy(keyDown.graph, keyDown.graph.getSelectionCells());
  });
}
//粘贴
function _ctrlV() {
  keyDown.keyHandler.bindControlKey(86, () => {
    mxClipboard.paste(keyDown.graph);
  });
}

export default init;
