<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>新闻
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" type="success" round
                    >添加子级</el-button
                  >
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
            <div class="category">
              <h4><svg-icon icon-class="plus"></svg-icon>新闻</h4>
              <ul>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" class="form-wrap">
            <el-form-item label="一级分类名称：">
              <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：">
              <el-input v-model="form.secCategoryName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submit">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div></template
>

<script>
import { reactive } from "@vue/composition-api";
import { AddFirstCategory } from "@/api/news";

export default {
  name: "category",
  setup(props, { root }) {
    const form = reactive({
      categoryName: "",
      secCategoryName: ""
    });
    const submit = () => {
      AddFirstCategory({ categoryName: form.categoryName })
        .then(response => {
          root.$message(response.message);
        })
        .catch(error => {
          console.log(error);
        });
    };
    return {
      form,
      submit
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
    top: -17px;
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
