import Vue from "vue";
import SvgIcon from "./SvgIcon";

// component 全局组件
Vue.component("svg-icon", SvgIcon);

// 解析图标
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);

// require.context 读取指定目录所有文件
// 第一个参数：目录
// 第一个参数：是否遍历子目录
// 第一个参数：定义遍历文件规则，/\.svg$/ 即以.svg结尾的文件

// es5写法
// const requireAll = function (requireContext) {
//   console.log(requireContext.keys().map(requireContext));
//   return requireContext.keys().map(requireContext)
// };
// requireAll(req);
