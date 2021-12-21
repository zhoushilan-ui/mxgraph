import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import index from "@/assets/style/index.scss";
import { getScroll } from "@/utils/window.js";
import Shape from "@/utils/mx/mxShape";

Vue.use(ElementUI);
Vue.use(index);
Vue.config.productionTip = false;
Vue.prototype.getScroll = getScroll;
Vue.prototype.getScroll = Shape;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
