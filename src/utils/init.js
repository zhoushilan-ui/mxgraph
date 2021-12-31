import mx from "mxgraph";
//TODO:注意：这里的图片路径在项目好像引用不了
const mxgraph = mx({
  mxImageBasePath: "./src/images/",
  //   mxBasePath: "javascript/src/",
  mxBasePath: "./src/",
});

// decode bug https://github.com/jgraph/mxgraph/issues/49
window.mxGraph = mxgraph.mxGraph;
window.mxConstants = mxgraph.mxConstants; // 各种全局常量
window.mxPerimeter = mxgraph.mxPerimeter; // 提供各种周长函数，作为mxConstants.STYLE_PERIMETER的值在样式中使用。矩形、圆形、菱形和三角形的周长可供选择。
window.mxCellTracker = mxgraph.mxCellTracker; // 构造突出显示单元格的事件处理程序。也就是单元格高亮
window.mxEvent = mxgraph.mxEvent; // 跨浏览器DOM事件支持。
window.mxUndoManager = mxgraph.mxUndoManager; // 撤销的状态管理器
window.mxKeyHandler = mxgraph.mxKeyHandler; // 键盘事件监听处理
window.mxRubberband = mxgraph.mxRubberband; // 鼠标左键的拖拽框选
window.mxShape = mxgraph.mxShape; // 自定义形状
window.mxPoint = mxgraph.mxPoint; // 为可选的x和y坐标构造一个新点。如果没有给出坐标，则使用x和y的默认值。
window.mxPolyline = mxgraph.mxPolyline; // 构造新的折线形状。
window.mxConnectionConstraint = mxgraph.mxConnectionConstraint; // 为给定的点和布尔参数构造新的连接约束。
window.mxToolbar = mxgraph.mxToolbar; // 工具栏
window.mxCell = mxgraph.mxCell; // 单元格是图模型的元素。它们表示图中组、顶点和边的状态。
window.mxUtils = mxgraph.mxUtils; // 提供跨浏览器helper方法的单例类。这是一个全球性的功能。要访问这个类中的函数，使用全局类名加上functionname。
window.mxEventObject = mxgraph.mxEventObject; // 构造具有指定名称的新事件对象。可以附加一个键、值对的可选序列来定义属性。
window.mxCellState = mxgraph.mxCellState; // 构造表示指定视图中给定单元格的当前状态的新对象。
window.mxOutline = mxgraph.mxOutline; // 缩略图
window.mxUtils = mxgraph.mxUtils; // 提供跨浏览器辅助方法的单例类。
window.mxStencilRegistry = mxgraph.mxStencilRegistry; // 一个单例类，它提供了模板的注册表以及将这些模板绘制到画布或DOM上的方法。
window.mxStencil = mxgraph.mxStencil; // 通过为给定的XML节点设置desc并调用parseDescription和parseConstraints来构造一个新的通用形状。
window.mxCodec = mxgraph.mxCodec; // 为指定的所有者文档构造XML编码器/解码器。
window.mxClipboard = mxgraph.mxClipboard; // 为图形单元格实现剪贴板的单例。
window.mxVertexHandler = mxgraph.mxVertexHandler; // 开启旋转按钮必须的
window.mxConnectionHandler = mxgraph.mxConnectionHandler; // 创建新连接的图形事件处理程序
window.mxEdgeHandler = mxgraph.mxEdgeHandler;
window.mxGraphModel = mxgraph.mxGraphModel;
window.mxEditor = mxgraph.mxEditor;
window.mxGeometry = mxgraph.mxGeometry;
window.mxDefaultKeyHandler = mxgraph.mxDefaultKeyHandler; //键码对应不同的功能
window.mxDefaultPopupMenu = mxgraph.mxDefaultPopupMenu;
window.mxStylesheet = mxgraph.mxStylesheet;
window.mxDefaultToolbar = mxgraph.mxDefaultToolbar;
window.mxEdgeStyle = mxgraph.mxEdgeStyle;
window.mxStencilShape = mxgraph.mxStencilShape;
window.mxStyleRegistry = mxgraph.mxStyleRegistry; //单例类，作为一个样式中从字符串到对象值的全局转换器。这目前仅用于周长和边缘样式。
window.mxStencilRegistry = mxgraph.mxStencilRegistry;
window.mxCellRenderer = mxgraph.mxCellRenderer; //将单元格呈现为文档对象模型
window.mxEllipse = mxgraph.mxEllipse;
window.mxRectangle = mxgraph.mxRectangle;
window.mxRectangleShape = mxgraph.mxRectangleShape;
window.mxImageShape = mxgraph.mxImageShape;
window.mxLog = mxgraph.mxLog;
window.mxConnector = mxgraph.mxConnector;
window.mxEdgeSegmentHandler = mxgraph.mxEdgeSegmentHandler;
window.mxText = mxgraph.mxText; //扩展mxShape以实现文本形状
window.mxMarker = mxgraph.mxMarker; //注册表实现 VML 和 SVG 的所有标记的静态类
window.mxGraphHandler = mxgraph.mxGraphHandler; //处理选择的图形事件处理程序
window.mxCellEditor = mxgraph.mxCellEditor;
window.mxConstraintHandler = mxgraph.mxConstraintHandler;
window.mxImage = mxgraph.mxImage;
window.mxPanningHandler = mxgraph.mxPanningHandler; //平移和创建弹出菜单的事件处理程序
window.mxPopupMenu = mxgraph.mxPopupMenu;
window.mxGraphView = mxgraph.mxGraphView;
window.mxClipboard = mxgraph.mxClipboard; //实现图形单元剪贴板的单例。
window.mxPopupMenuHandler = mxgraph.mxPopupMenuHandler;
window.mxActor = mxgraph.mxActor; //创建一个新的形状
window.mxArrow = mxgraph.mxArrow; //创建一个新的箭头
window.mxArrowConnector = mxgraph.mxArrowConnector; //创建一个箭头连接器
window.mxLabel = mxgraph.mxLabel;
window.mxCloud = mxgraph.mxCloud;
window.mxCylinder = mxgraph.mxCylinder;
window.mxGraphLayout = mxgraph.mxGraphLayout;
window.mxDoubleEllipse = mxgraph.mxDoubleEllipse; //创建一个新的双椭圆
window.mxDragSource = mxgraph.mxDragSource;
window.mxOutline = mxgraph.mxOutline;
window.mxMorphing = mxgraph.mxMorphing;
window.mxCircleLayout = mxgraph.mxCircleLayout;
export default mxgraph;
