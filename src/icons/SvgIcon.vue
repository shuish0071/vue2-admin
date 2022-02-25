<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { ref, computed } from "@vue/composition-api";
export default {
  name: "SvgIcon",
  // props: ["iconClass", "className"], // 简单使用
  props: {
    iconClass: {
      type: String, // 定义接收值类型
      default: "" // 如果svg-icon标签没写iconClass，则使用默认值
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const msg = ref("手把手前端123");
    // computed 监听属性变化，并计算属性，得出最终结果并返回
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    return {
      msg,
      iconName,
      svgClass
    };
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
}
</style>
