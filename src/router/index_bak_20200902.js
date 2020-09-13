import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
// 引用布局组件,index.vue 为默认读取，可以不写，其他vue文件则需要写文件名称
import Layout from "@/views/Layout";

// 默认路由

export const defaultRouterMap = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: { name: "主页" }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: { name: "登录" },
    component: () => import("../views/Login/index")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "console"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: { name: "首页" },
        component: () => import("../views/Console/index")
      }
    ]
  }
];

export default new Router({
  // mode: "hash",
  // scrollBehavior: () => ({ y: 0 }),
  routes: defaultRouterMap
});

// 动态路由
// 角色： sale,technician,manager

export const asyncRouterMap = [
  // 信息管理
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      system: "infoSystem",
      icon: "info"
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: { name: "信息列表" },
        component: () => import("../views/Info/index")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: { name: "信息分类" },
        component: () => import("../views/Info/category")
      }
    ]
  },
  // 用户管理
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      system: "userSystem",
      icon: "user"
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: { name: "用户列表" },
        component: () => import("../views/User/index")
      }
    ]
  }
];
