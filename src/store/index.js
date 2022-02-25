import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import login from "./modules/login";
import common from "@/store/modules/common";
import permission from "@/store/modules/permission";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { app, login, common, permission }
});
