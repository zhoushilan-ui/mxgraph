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
