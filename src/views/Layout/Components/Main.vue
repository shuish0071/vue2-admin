<template>
  <div id="main-warp">
    <!--      router-view 找到router/index.js 中的Console/Console-->
    <div class="main-content">
      <div class="content"><router-view></router-view></div>
    </div>
  </div>
</template>
<script>
// import { ref, reactive } from "@vue/composition-api";
export default {
  name: "LayoutMain",
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config";
#main-warp {
  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-left: $navMenu + 30;
  padding-right: 30px;
  background-color: #f7f7f7;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.1s ease 0s);
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  background-color: #ffffff;
  @include webkit(box-sizing, border-box);
}
</style>
