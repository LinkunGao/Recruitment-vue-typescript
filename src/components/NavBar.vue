<template>
  <div class="title-box">
    <div class="left">
      <img src="../assets/logo.png" alt="" />
      <h4>招聘网站</h4>
    </div>
    <div class="right">
      <!-- 插槽，提供占位符， 外界使用components时必须双标签 -->
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.title-box {
  height: 100px;
  display: flex;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #999;

  .left {
    display: flex;
    align-items: center;
    img {
      height: 70px;
    }
  }
}
</style>
