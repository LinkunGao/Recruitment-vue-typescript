<template>
  <div class="box">
    <NavBar>
      <div class="btn">招聘广场</div>
    </NavBar>
    <div class="selectBox">
      <div class="searchBox">
        <input type="text" placeholder="实习生招聘" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: { NavBar },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.btn {
  font-size: 18px;
  font-weight: 500;
  color: cadetblue;
  border: 1px solid cadetblue;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
}
.box {
  width: 1000px;
  margin: 0 auto;
  box-shadow: 0 6px 18px #999;
}
</style>
