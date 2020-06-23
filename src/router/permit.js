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
      // console.log(store.state.app.username);
      // console.log(store.state.app.token);
      removeToken();
      removeUsername();
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      next();
    } else {
      // 获取角色，动态分配路由权限
      next();
    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
