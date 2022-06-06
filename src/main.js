import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import index from "@/assets/style/index.scss";
import { getScroll } from "@/utils/window.js";
import Shape from "@/utils/mx/mxShape";
import { mapState, mapGetters } from "vuex";
import {
  Flowsegment,
  drage,
  initGraph,
  GetLayoutManager,
} from "./utils/model/Template";

// 阿里图标库
import "@/assets/iconfont/iconfont.css";

//全局函数引入，挂载
import {
  SelectAll,
  SelectNone,
  Show,
  ExportImage,
  Cut,
  Refresh,
  Copy,
  Paste,
  Delete,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Edit,
  SelectPrevious,
  SelectNext,
} from "./utils/global.js";
Vue.prototype.selectAll = SelectAll;
Vue.prototype.selectNone = SelectNone;
Vue.prototype.show = Show;
Vue.prototype.exportImage = ExportImage;
Vue.prototype.cut = Cut;
Vue.prototype.refresh = Refresh;
Vue.prototype.copy = Copy;
Vue.prototype.paste = Paste;
Vue.prototype.delete = Delete;
Vue.prototype.undo = Undo;
Vue.prototype.redo = Redo;
Vue.prototype.zoomIn = ZoomIn;
Vue.prototype.zoomOut = ZoomOut;
Vue.prototype.edit = Edit;
Vue.prototype.selectPrevious = SelectPrevious;
Vue.prototype.selectNext = SelectNext;

Vue.use(ElementUI);
Vue.use(index);
Vue.config.productionTip = false;
Vue.prototype.getScroll = getScroll;
Vue.prototype.getShape = Shape;
Vue.prototype.Flowsegment = Flowsegment;
Vue.prototype.drage = drage;
Vue.prototype.initGraph = initGraph;
Vue.prototype.getLayoutManager = GetLayoutManager;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
