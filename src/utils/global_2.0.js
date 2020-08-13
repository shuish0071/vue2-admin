import { MessageBox } from "element-ui";

export default {
  install(Vue) {
    Vue.prototype.confirm = params => {
      MessageBox.confirm(params.content, params.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: params.type || "warning",
        center: true
      })
        .then(() => {
          // 判断函数是否存在无括号就行,执行时有括号，意思是如果有该函数就执行
          params.fn && params.fn(params.id);
        })
        .catch(() => {});
    };
  }
};

// vue插件
