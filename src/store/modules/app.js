import { Login } from "@/api/login";
import {
  setToken,
  setUsername,
  getUsername,
  removeToken,
  removeUsername
} from "@/utils/app";

const state = {
  roles: [],
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  token: "",
  username: getUsername() || ""
};
const getters = {
  roles: state => state.roles,
  isCollapse: state => state.isCollapse
  // isCollapse: cookie.get("isCollapse") || false
};
const mutations = {
  SET_ROLES(state, value) {
    state.roles = value;
  },
  // context.root.$store.commit("SET_COLLAPSE") 可以改变 state.isCollapse 值
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    // html5本地存储，只能存字符串，所以需要json 转格式
    // JSON.parse() 字符串转换成对象，JSON.stringify() 对象转换成字符串
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    // cookie.set("isCollapse", state.isCollapse);
  },
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
};
const actions = {
  // 异步：请求接口返回数据后，接着去做别的事情
  // 比如接口B需要接口A的结果作为参数
  // login({ content }, requestData) {
  login({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      // 接口
      Login(requestData)
        .then(response => {
          // console.log(response.data.data);
          let data = response.data.data;
          // 需要存储 token username，vuex存一份，cookie存一份
          // 普通方式
          // content.commit("SET_TOKEN", data.token);
          // content.commit("SET_USERNAME", data.username);
          // 解构方式
          commit("SET_TOKEN", data.token);
          commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUsername(data.username);
          // console.log(data.token);
          // console.log(data.username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  Logout({ commit }) {
    return new Promise(resolve => {
      removeToken();
      removeUsername();
      commit("SET_TOKEN", "");
      commit("SET_USERNAME", "");
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
