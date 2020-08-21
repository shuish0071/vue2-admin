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
      type: Array,
      default: () => []
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
        { value: "id", label: "ID" }
      ]
    });

    // 初始下来选择
    let initOption = () => {
      let optionArr = [];
      props.config.forEach(item => {
        let arr = data.option.filter(elem => elem.value === item)[0]; // filter匹配成功的是数组，需要取下标第一个
        optionArr.push(arr);
      });
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
