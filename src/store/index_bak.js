import Vue from "vue";
import Vuex from "vuex";
import { Login } from "@/api/login";
// import cookie from "cookie_js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
    // isCollapse: cookie.get("isCollapse") || false
  },
  getters: {
    // computed 计算属性方式改变值
    isCollapse: state => state.isCollapse
  },
  mutations: {
    // context.root.$store.commit("set_collapse") 可以改变 state.isCollapse 值
    set_collapse(state) {
      state.isCollapse = !state.isCollapse;
      // html5本地存储，只能存字符串，所以需要json 转格式
      // JSON.parse() 字符串转换成对象，JSON.stringify() 对象转换成字符串
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
      // cookie.set("isCollapse", state.isCollapse);
    }
  },
  actions: {
    // 异步：请求接口返回数据后，接着去做别的事情
    // 比如接口B需要接口A的结果作为参数
    login(content, requestData) {
      return new Promise((resolve, reject) => {
        // 接口
        Login(requestData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  modules: {}
});
