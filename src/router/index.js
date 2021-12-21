import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";

Vue.use(VueRouter);
// import Layout from "@/Layout";

// 公共路由
const constantRoutes = [
  //   {
  //     path: "/login",
  //     component: Layout,
  //     hidden: true,
  //     component: (resolve) => require(["@/views/login"], resolve),
  //   },
  //   {
  //     path: "/404",
  //     component: Layout,
  //     hidden: true,
  //     component: (resolve) => require(["@/views/error/404"], resolve),
  //   },
  {
    path: "/",
    component: index,
    name: "index",
    // redirect: "index",
    // children: [
    //   {
    //     path: "index",
    //     component: (resolve) => require(["@/views/index"], resolve),
    //   },
    // ],
  },
];

export default new VueRouter({
  //mode: "hash", // 去掉url中的#
  //scrollBehavior: () => ({ y: 0 }),
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRoutes,
});
