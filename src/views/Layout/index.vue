<template>
  <div :class="[menuStatus ? 'close' : 'open']">
    <!--      具体使用组件-->
    <LayoutHeader></LayoutHeader>
    <LayoutMain></LayoutMain>
    <LayoutNav></LayoutNav>
  </div>
</template>

<script>
// 导入组件
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNav from "./Components/Nav";
import { computed } from "@vue/composition-api";

export default {
  name: "layout",
  // 引用组件
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);
    return {
      menuStatus
    };
  }
};
</script>

<style lang="scss" scoped></style>
