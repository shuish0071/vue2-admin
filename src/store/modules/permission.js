import { getUserRole } from "@/api/login";
import { defaultRouterMap, asyncRouterMap } from "@/router";

const state = {
  roles: [],
  allRouters: defaultRouterMap,
  addRouters: []
};

const getters = {
  roles: state => state.roles,
  allRouters: state => state.allRouters, // 所有的路由
  addRouters: state => state.addRouters // 匹配的路由
};

const mutations = {
  SET_ROLES(state, value) {
    state.roles = value;
  },
  SET_ROUTER(state, route) {
    state.addRouters = route;
    state.allRouters = defaultRouterMap.concat(route);
  }
};

const actions = {
  // 获取用户角色
  getRoles({ commit }) {
    return new Promise(resolve => {
      getUserRole().then(response => {
        let role = response.data.data;
        // 存值store.commit("app/SET_TOKEN", "")，取值store.getters["permission/roles"]
        commit("SET_ROLES", role);
        // resolve 是then 返回
        resolve(role);
      });
    });
  },
  // 创建动态路由
  createRouter({ commit }, data) {
    return new Promise(resolve => {
      let role = data.role;
      // 超管的状态
      let addRouters = [];
      if (role.includes("admin")) {
        addRouters = asyncRouterMap;
      } else {
        // 普通管理员
        addRouters = asyncRouterMap.filter(item => {
          // es6 数组匹配：includes，[11,22,33].includes(11)结果为true
          if (role.includes(item.meta.system)) {
            return item;
          }
        });
      }
      // 更新路由
      commit("SET_ROUTER", addRouters);
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
