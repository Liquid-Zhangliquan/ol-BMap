import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "online",
    component: () => import("../views/online/index.vue")
  },
  {
    path: "/online-maptalks",
    name: "online-maptalks",
    component: () => import("../views/online/maptalks.vue")
  },
  {
    path: "/offline-maptalks",
    name: "offline-maptalks",
    component: () => import("../views/offline/maptalks-offline.vue")
  },
  {
    path: "/offline",
    name: "offline",
    component: () => import("../views/offline/index.vue")
  },
  {
    path: "/offline-baidu-guge",
    name: "offline-baidu-guge",
    component: () => import("../views/offline-baidu-guge/index.vue")
  },
  {
    path: "/offline-tdt",
    name: "offline-tdt",
    component: () => import("../views/offline-tdt/index.vue")
  },
  {
    path: "/offline-guge",
    name: "offline-guge",
    component: () => import("../views/offline-guge/index.vue")
  },
  {
    path: "/offline-by",
    name: "offline-by",
    component: () => import("../views/offline-by/index.vue")
  },
  {
    path: "/offline-gaode",
    name: "offline-gaode",
    component: () => import("../views/offline-gaode/index.vue")
  }
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;