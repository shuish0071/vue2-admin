<template>
  <el-dialog
    title="新增"
    :visible.sync="dialog_info_flag"
    @close="closeDialog"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
// import { watch } from "@vue/composition-api";
export default {
  name: "info",
  // 单向数据流，父组件 -> 子组件，不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  // 使用watch监听flag标志位
  watch: {
    flag: {
      handler(newValue) {
        // newValue 是父组件向子组件传过来的值
        this.dialog_info_flag = newValue;
      }
    }
  },
  methods: {
    closeDialog() {
      this.dialog_info_flag = false;
      // this.$emit("closeF", false);
      // 修饰器适用于只关闭弹窗，修改标志位，不做任何逻辑处理
      this.$emit("update:flag", false);
    }
  },
  data() {
    return {
      dialog_info_flag: true,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "70px"
    };
  }
};
</script>

<style scoped></style>
