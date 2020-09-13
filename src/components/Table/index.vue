<template>
  <el-table :data="data.tableData" border style="width: 100%">
    <!--      多选框-->
    <el-table-column
      v-if="data.tableConfig.selection"
      type="selection"
      width="55"
    >
    </el-table-column>

    <!--    为了将v-for 和v-if区分开，使用template标签进行隔离-->
    <template v-for="item in data.tableConfig.tHead">
      <!--      v-slot-->
      <el-table-column
        :key="item.filed"
        :prop="item.filed"
        :label="item.label"
        :width="item.width"
        v-if="item.columnType === 'slot'"
      >
        <template slot-scope="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <!--      文本数据渲染-->
      <el-table-column
        :key="item.field"
        :prop="item.filed"
        :label="item.label"
        :width="item.width"
        v-else
      >
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { onBeforeMount, onMounted, reactive } from "@vue/composition-api";
export default {
  name: "tableVue",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const data = reactive({
      tableConfig: {
        selection: true,
        recordCheckbox: false,
        tHead: []
      },
      tableData: [
        {
          email: "1@1.com",
          name: "王小虎",
          phone: 13012345678,
          address: "上海市普陀区金沙江路 1518 弄",
          role: "超管"
        },
        {
          email: "2@2.com",
          name: "李龙",
          phone: 15876543210,
          address: "上海市普陀区金沙江路 1517 弄",
          role: "超管"
        }
      ]
    });
    // 初始化table 配置项
    const initTableConfig = () => {
      let configData = props.config;
      for (let key in configData) {
        // 检查配置项是否存在，配置项写错则不显示，或者显示默认设置
        if (data.tableConfig[key]) {
          data.tableConfig[key] = configData[key];
        }
      }
    };
    onBeforeMount(() => {
      initTableConfig();
    });
    onMounted(() => {});
    return { data };
  }
};
</script>

<style scoped lang="scss"></style>
