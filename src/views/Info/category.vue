<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({ type: 'category_first_add' })"
      >添加一级分类</el-button
    >
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
                {{ firstItem.category_name }}
                <div class="button-group">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="
                      editCategory({
                        data: firstItem,
                        type: 'category_first_edit'
                      })
                    "
                    round
                    >编辑</el-button
                  >
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
                    <el-button
                      size="mini"
                      type="danger"
                      @click="
                        editCategory({
                          data: firstItem,
                          type: 'category_first_edit'
                        })
                      "
                      round
                      >编辑</el-button
                    >
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
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { AddFirstCategory, DeleteCategory, EditCategory } from "@/api/news";
import { global } from "@/utils/global";
import { common } from "@/api/common";

export default {
  name: "category",
  setup(props, { root }) {
    const form = reactive({
      categoryName: "",
      secCategoryName: ""
    });

    const { confirm } = global();
    const { getInfoCategory, categoryItem } = common();

    const category = reactive({ item: [], current: [] });

    const submit_buttons_type = ref("");
    const submit_button_loading = ref(false);
    const category_first_input = ref(true);
    const category_children_input = ref(true);
    const category_first_disabled = ref(true);
    const category_children_disabled = ref(true);
    const submit_button_disabled = ref(true);
    const submit = () => {
      if (submit_buttons_type.value === "category_first_add") {
        addFirstCategory();
      }
      if (submit_buttons_type.value === "category_first_edit") {
        editFirstCategory();
      }
    };
    const addFirstCategory = () => {
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
        .catch();
      submit_button_loading.value = false;
      form.categoryName = "";
      form.secCategoryName = "";
    };
    const addFirst = params => {
      submit_buttons_type.value = params.type;
      category_first_input.value = true;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
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
          category.item = category.item.filter(item => item.id !== categoryID);
        })
        .catch();
    };
    const editCategory = params => {
      submit_buttons_type.value = params.type;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      // 一级名称输入，还原名称
      form.categoryName = params.data.category_name;
      // 储存当前数据对象
      category.current = params.data;
    };
    const editFirstCategory = () => {
      if (category.current.length === 0) {
        root.$message.error("未选择分类");
        return false;
      }
      let requestData = {
        // 原标题的id，更新后的标题名称
        id: category.current.id,
        categoryName: form.categoryName
      };
      EditCategory(requestData)
        .then(response => {
          root.$message.success(response.data.message);
          category.current.category_name = response.data.data.data.categoryName;
          // 清空输入框名称、选中的一级标题
          form.categoryName = "";
          category.current = [];
        })
        .catch();
    };
    // 挂载完成时执行，页面dom元素完成时，实例完成时
    onMounted(() => {
      getInfoCategory();
    });
    watch(
      () => categoryItem.item,
      value => {
        category.item = value;
      }
    );
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
      addFirstCategory,
      addFirst,
      deleteCategoryConfirm,
      deleteCategory,
      editCategory
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
