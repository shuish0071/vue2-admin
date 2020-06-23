import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositonApi from "@vue/composition-api";
import "@/router/permit";
// 自定义全局组件，引用 @/icons/index.js
import "@/icons";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCompositonApi);

// runtime运行模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
