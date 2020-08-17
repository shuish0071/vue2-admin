<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="label-wrap">
            <label>分类：</label>
            <div class="warp-content">
              <el-select
                v-model="category_value"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options.category"
                  :key="item.id"
                  :label="item.category_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="date_value"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="关键字：">
            <el-select v-model="search_key" style="width: 80px">
              <el-option
                v-for="item in search_option"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="search_keyWork"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="danger">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="dialog_info = true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div style="padding-top: 10px">
      <el-table :data="table_data" border style="width: 100%">
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column prop="title" label="标题" width="830">
        </el-table-column>
        <el-table-column prop="category" label="类别" width="130">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="237">
        </el-table-column>
        <el-table-column prop="user" label="管理人" width="115">
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini" type="danger" @click="deleteItem"
              >删除</el-button
            >
            <el-button size="mini" type="success">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="black-space-30"></div>
      <el-row>
        <el-col :span="12">
          <el-button size="medium" @click="deleteAll">批量删除</el-button>
        </el-col>
        <el-col :span="12">
          <el-pagination
            class="pull-right"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, 100]"
            :total="1000"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <DialogInfo :flag.sync="dialog_info"></DialogInfo>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import DialogInfo from "./dialog/info";
import { global } from "@/utils/global";

export default {
  name: "infoIndex",
  components: { DialogInfo },
  setup(props, { root }) {
    const { confirm } = global();
    const dialog_info = ref(false);
    const search_key = ref("title");
    const category_value = ref("");
    const date_value = ref("");
    const search_keyWork = ref("");
    const options = reactive({ category: [] });
    // 搜索关键字
    const search_option = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" }
    ]);
    // 表格数据
    const table_data = reactive([
      {
        title: "纽约市长白思豪宣布退出总统竞选，特朗普发推回应",
        category: "国内信息",
        date: "2020-07-22 15:26:00",
        user: "管理员"
      },
      {
        title: "“港独”议员对港警大吼大叫 港警直接拷走",
        category: "国内信息",
        date: "2020-07-22 15:26:00",
        user: "管理员"
      },
      {
        title: "日媒：创最长纪录！中国海警船连续百日巡航钓鱼岛",
        category: "国内信息",
        date: "2020-07-22 15:26:00",
        user: "管理员"
      },
      {
        title:
          "美国国务卿蓬佩奥20日发表声明称，美国以侵犯人权为由对车臣领导人卡德罗夫实施签证制裁。",
        category: "国内信息",
        date: "2020-07-22 15:26:00",
        user: "管理员"
      }
    ]);
    const handleSizeChange = val => {
      console.log(val);
    };
    const handleCurrentChange = val => {
      console.log(val);
    };
    const deleteItem = () => {
      confirm({
        content: "确认删除当前信息，是否继续？",
        tip: "警告",
        id: 11111,
        fn: confirmDelete
      });
    };
    const deleteAll = () => {
      confirm({
        content: "确认删除选中的数据，是否继续？",
        tip: "警告",
        type: "success",
        id: 22222,
        fn: confirmDelete
      });
    };
    const confirmDelete = value => {
      console.log(value);
    };
    const getInfoCategory = () => {
      root.$store.dispatch("common/getInfoCategory").then(response => {
        options.category = response.data;
      });
    };
    onMounted(() => {
      // 方法一： vue 3.0 的全局方法
      // getInfoCategory();
      // 方法二： vuex 调用方法
      getInfoCategory();
    });
    return {
      // ref
      dialog_info,
      category_value,
      date_value,
      search_key,
      search_keyWork,
      // reactive
      options,
      search_option,
      table_data,
      // method
      handleSizeChange,
      handleCurrentChange,
      deleteItem,
      deleteAll,
      confirmDelete
    };
  }
};
</script>

<style lang="scss" scoped>
// label-wrap 下面含有warp-content，效果时自动适应宽度，左对齐
.label-wrap {
  label {
    float: left;
    line-height: 40px;
    width: 60px;
  }
  .warp-content {
    margin-left: 80px;
  }
}
</style>
