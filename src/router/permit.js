import router from "@/router/index";
import { getToken, removeToken, removeUsername } from "@/utils/app";
import store from "@/store";

// indexOf() 方法判断数组中是否存在指定的对象,不存在则返回-1
const whiteRouter = ["/login"];

// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 第二次路由跳转到login，视为logout，cookie和vuex都删除token、username
    if (to.path === "/login") {
      console.log(store.state.app.username);
      console.log(store.state.app.token);
      removeToken();
      removeUsername();
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      next();
    } else {
      // 获取角色，动态分配路由权限
      // next();
      if (store.getters["permission/roles"].length === 0) {
        store.dispatch("permission/getRoles").then(response => {
          store.dispatch("permission/createRouter", response).then(() => {
            // 先更新所有路由，否则导航栏监听不到路由的信息，导致没有对应菜单
            router.options.routes = store.getters["permission/allRouters"];
            let addRouters = store.getters["permission/addRouters"];
            // 添加匹配出来的动态路由
            router.addRoutes(addRouters);
            next({ ...to, replace: true }); // replace:true 不会留下历史记录
          });
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
