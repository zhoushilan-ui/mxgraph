// import mxgraph from "../init";
// export function exportGraph() {
//   const graph = this.editor["graph"];
//   const enc = new mx.mxCodec();
//   const node = enc.encode(graph.getModel());
//   const xml = mxUtils.getPrettyXml(node);
//   mxUtils.popup(mxUtils.getPrettyXml(node), true);
//   // confirm(xml);

//   const downLink = document.createElement("a");
//   downLink.download = "graph.xml";
//   // 字符内容转换为blod地址
//   const blob = new Blob([xml]);
//   downLink.href = URL.createObjectURL(blob);
//   // 链接插入到页面
//   document.body.appendChild(downLink);
//   downLink.click();
//   // 移除下载链接
//   document.body.removeChild(downLink);
// }

// export function importGraph(e) {
// const graph = this.editor['graph'];
// const file = e.srcElement.files[0];
// const path = window.URL.createObjectURL(file);

// const cells = mx.mxUtils.load(path).getDocumentElement().getElementsByTagName('mxCell') as Array;
// const parent = graph.getDefaultParent();
// for (let i = 2; i < cells.length; i++) {
// const cellAttrs = cells[i].attributes;
// if (cellAttrs.vertex) { // is Vertex
// const vertexValue = cellAttrs.value ? cellAttrs.value.value : '';
// // const vertexId = cellAttrs.id.value;
// const geom = cells[i].children[0].attributes;
// const xPos = Number(geom.x.value);
// const yPos = Number(geom.y.value);
// const height = Number(geom.height.value);
// const width = Number(geom.width.value);
// const style = cellAttrs.style.value;
// console.log(style.length);
// graph.insertVertex(parent, null, vertexValue, xPos, yPos, width, height, style);
// }
// }

// }
