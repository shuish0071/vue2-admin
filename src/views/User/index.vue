<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-row :gutter="16">
      <el-col :span="20">
        <div class="label-wrap">
          <div class="wrap-content">
            <el-row :gutter="16">
              <el-col :span="2">
                <label
                  for=""
                  style="font-size: 16px;float: right;padding-top: 8px"
                  >关键字：</label
                >
              </el-col>
              <el-col :span="3">
                <SelectVue :config="data.configOption"></SelectVue>
              </el-col>
              <el-col :span="4">
                <el-input placeholder="请输入搜索的关键字"></el-input>
              </el-col>
              <el-col :span="14">
                <el-button type="danger">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right"> 添加用户 </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
// selcet 组件
import SelectVue from "@/components/Select";
export default {
  name: "userIndex",
  components: { SelectVue },
  setup() {
    const data = reactive({
      configOption: ["name", "phone", "email"]
    });
    return {
      data
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/config";
.label-wrap {
  label {
    @include labelDom(left, 60, 40);
  }
}
</style>
