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
