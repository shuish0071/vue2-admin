<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" alt="" /></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#e6e6e6"
      active-text-color="#ffffff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu :index="index + ''" v-if="!item.hidden" :key="item.id">
          <template slot="title">
            <svg-icon
              :iconClass="item.meta.icon"
              :className="item.meta.name"
            ></svg-icon>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, reactive } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    const routers = reactive(root.$router.options.routes);
    // isCollapse = true 菜单收起，只留图标
    // computed 监听值变化 root.$store.state.isCollapse
    // root.$store.state.isCollapse 相当于 {return root.$store.state.isCollapse},只有单行可以这样
    const isCollapse = computed(() => root.$store.state.app.isCollapse);
    // // store 使用方法
    // console.log(root.$store.state.isCollapse);
    // console.log(root.$store.getters.count);
    return {
      isCollapse,
      routers
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config";
.logo {
  text-align: center;
  img {
    /*margin: 28px auto 25px;*/
    margin: 0 auto 0;
    width: 92px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background: #344a5f;
  @include webkit(transition, all 0.1s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
    fill: currentColor;
    color: #ffffff;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo img {
    width: 60%;
  }
}
</style>
