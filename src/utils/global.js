//全选
export function SelectAll(editor) {
  editor.actions.selectAll(editor);
}
// 全不选
export function SelectNone(editor) {
  editor.actions.selectNone(editor);
}

// 展示
export function Show(editor) {
  editor.actions.show(editor);
}

//导出图片
export function ExportImage(editor) {
  editor.actions.exportImage(editor);
}

// 剪切
export function Cut(editor) {
  editor.actions.cut(editor);
}

//刷新
export function Refresh(editor) {
  editor.actions.refresh(editor);
}

//复制
export function Copy(editor) {
  editor.actions.copy(editor);
}

//粘贴
export function Paste(editor) {
  editor.actions.paste(editor);
}

//删除当前选中的单元格
export function Delete(editor) {
  editor.actions.delete(editor);
}
//撤销
export function Undo(editor) {
  editor.actions.undo(editor);
}
//重做
export function Redo(editor) {
  editor.actions.redo(editor);
}
//放大
export function ZoomIn(editor) {
  editor.actions.zoomIn(editor);
}
//缩小
export function ZoomOut(editor) {
  editor.actions.zoomOut(editor);
}
//编辑
export function Edit(editor) {
  editor.actions.edit(editor);
}
//选择下一步
export function SelectPrevious(editor) {
  editor.actions.selectPrevious(editor);
}
//编辑
export function SelectNext(editor) {
  editor.actions.selectNext(editor);
}
