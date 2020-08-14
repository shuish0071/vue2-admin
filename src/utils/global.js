// import { ref } from "@vue/composition-api";
import { MessageBox } from "element-ui";

export function global() {
  // const str = ref("");
  const confirm = params => {
    MessageBox.confirm(params.content, params.tip || "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: params.type || "warning",
      center: true
    })
      .then(() => {
        // 外面可以监听到str值得变化，这是vue3.0的新特性
        // str.value = "删除+删除+删除+删除";
        // 判断函数是否存在无括号就行,执行时有括号，意思是如果有该函数就执行
        params.fn && params.fn(params.id);
      })
      .catch(() => {});
  };
  return {
    // str,
    confirm
  };
}
// vue3.0 对比2.0，能让外部监听到内部值变化，如上面的str，
// 这会在多组件应用中起到很好效果，比如根据页码的变化，进行数据的拉取更新
