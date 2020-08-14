<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <!--        <img src="../../../assets/images/dog.jpg" alt="" />-->
        {{ username }}
      </div>
      <div class="header-icon pull-left" @click="Logout">
        <svg-icon iconClass="exit" className="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";

export default {
  name: "LayoutHeader",
  setup(props, { root }) {
    const username = computed(() => root.$store.state.app.username);
    const navMenuState = () => {
      // 由于点击执行mutations中SET_COLLAPSE 函数，改变了state.isCollapse 值
      // 注意是commit
      // app/set_collapse 代表src\store\modules\app.js 中的SET_COLLAPSE
      root.$store.commit("app/SET_COLLAPSE");
    };
    const Logout = () => {
      root.$store.dispatch("app/Logout").then(() => {
        root.$router.push({ name: "Login" });
      });
    };
    return {
      username,
      navMenuState,
      Logout
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config";
#header-wrap {
  position: fixed;
  top: 0;
  left: $navMenu;
  right: 0;
  height: 75px;
  background: #ffffff;
  /*-webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);*/
  line-height: 75px;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.1s ease 0s);
  z-index: 999;
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  /*css3 语法，修改相邻兄弟元素选择器*/
  + .header-icon {
    padding: 0 28px;
  }
}
</style>
