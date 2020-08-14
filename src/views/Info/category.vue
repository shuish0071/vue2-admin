<template>
  <div id="category">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div
              class="category"
              v-for="firstItem in category.item"
              :key="firstItem.id"
            >
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{ firstItem.category_name }} - {{ firstItem.id }}
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" type="success" round
                    >添加子级</el-button
                  >
                  <el-button
                    size="mini"
                    round
                    @click="deleteCategoryConfirm(firstItem.id)"
                    >删除</el-button
                  >
                </div>
              </h4>
              <ul v-if="firstItem.children">
                <li
                  v-for="childrenItem in firstItem.children"
                  :key="childrenItem.id"
                >
                  {{ childrenItem.category_name }}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" class="form-wrap" ref="categoryForm">
            <el-form-item label="一级分类名称：" v-if="category_first_input">
              <el-input
                v-model="form.categoryName"
                :disabled="category_first_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" v-if="category_children_input">
              <el-input
                v-model="form.secCategoryName"
                :disabled="category_children_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :loading="submit_button_loading"
                :disabled="submit_button_disabled"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div></template
>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import { AddFirstCategory, GetCategory, DeleteCategory } from "@/api/news";
import { global } from "@/utils/global";

export default {
  name: "category",
  setup(props, { root }) {
    const form = reactive({
      categoryName: "",
      secCategoryName: ""
    });

    const { confirm } = global();

    const category = reactive({ item: [] });

    const submit_button_loading = ref(false);
    const category_first_input = ref(true);
    const category_children_input = ref(true);
    const category_first_disabled = ref(true);
    const category_children_disabled = ref(true);
    const submit_button_disabled = ref(true);
    const submit = () => {
      if (!form.categoryName) {
        root.$message.error("分类名称不能为空");
        return false;
      }
      // 按钮加载状态
      submit_button_loading.value = true;
      AddFirstCategory({ categoryName: form.categoryName })
        .then(response => {
          if (response.data.resCode === 0) {
            root.$message.success(response.data.message);
            // 如果返回结果和列表需要的数据类型一致，则可以进行优化
            // 直接使用新增返回的数据加入到列表中即可，不用再次调用获取数据接口进行页面数据渲染
            category.item.unshift(response.data.data);
            // getCategory();
          }
        })
        .catch(error => {
          console.log(error);
        });
      submit_button_loading.value = false;
      form.categoryName = "";
      form.secCategoryName = "";
    };
    const addFirst = () => {
      category_first_input.value = true;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
    };
    const getCategory = () => {
      GetCategory({})
        .then(response => {
          category.item = response.data.data.data;
        })
        .catch();
    };
    const deleteCategoryConfirm = categoryID => {
      confirm({
        content: "确认删除当前一级分类，是否继续？",
        tip: "警告",
        id: categoryID,
        fn: deleteCategory
      });
    };
    const deleteCategory = categoryID => {
      DeleteCategory({ categoryId: categoryID })
        .then(response => {
          // 操作数组 splice
          root.$message.success(response.data.message);
          getCategory();
        })
        .catch();
    };
    // 挂载完成时执行，页面dom元素完成时，实例完成时
    onMounted(() => {
      getCategory();
    });
    return {
      form,
      category,
      submit_button_loading,
      category_first_input,
      category_children_input,
      category_first_disabled,
      category_children_disabled,
      submit_button_disabled,
      submit,
      addFirst,
      deleteCategoryConfirm,
      deleteCategory
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/config";
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 20px;
    top: -2px;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
    margin-bottom: -15px;
  }
  svg {
    position: absolute;
    left: 14px;
    top: 10px;
    font-size: 13px;
    background-color: #fff;
  }
  li {
    position: relative;
    list-style: none;
    padding-left: 40px;
    margin-left: -18px;
    &:before {
      content: "";
      position: absolute;
      width: 32px;
      border-bottom: 1px dotted #000000;
      left: 0;
      top: 22px;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  right: 0;
  z-index: 2;
  top: -2px;
}
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
.hr-e9e9e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  margin-top: 30px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #e9e9e9;
}
</style>
