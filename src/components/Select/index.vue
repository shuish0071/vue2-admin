<template>
  <el-select v-model="data.selectValue">
    <el-option
      v-for="item in data.initOption"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";

export default {
  name: "index",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const data = reactive({
      selectValue: "",
      initOption: [],
      option: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    });

    // 初始下来选择
    let initOption = () => {
      let initData = props.config.init;
      let optionArr = [];
      // 数据校验
      if (initData.length === 0) {
        console.log("config参数为空，无法显示下拉菜单！");
        return false;
      }

      initData.forEach(item => {
        let arr = data.option.filter(elem => elem.value === item); // filter匹配成功的是数组，需要取下标第一个
        if (arr.length > 0) {
          optionArr.push(arr[0]);
        }
      });
      // 数据校验
      if (optionArr.length === 0) {
        console.log("匹配的数据为空！");
        return false;
      }
      // 初始化赋值
      data.initOption = optionArr;
      // 初始化搜索类型
      data.selectValue = optionArr[0].value;
    };

    onMounted(() => {
      initOption();
    });
    return {
      data
    };
  }
};
</script>

<style scoped></style>
