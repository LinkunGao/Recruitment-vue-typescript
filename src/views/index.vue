<template>
  <div class="box">
    <NavBar>
      <div class="btn">招聘广场</div>
    </NavBar>
    <div class="selectBox">
      <div class="searchBox">
        <input type="text" placeholder="实习生招聘" />
        <img src="../assets/search_icon.png" alt="" />
      </div>
      <div class="listBox">
        <div v-for="i in selectKey" :key="i.key" class="list">
          <span class="label">{{ i.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import NavBar from "@/components/NavBar.vue";
import { getJob } from "../http/job";

export default defineComponent({
  components: { NavBar },
  //   setup 不支持异步
  setup() {
    const data = reactive({
      selectOptionList: {},
    });
    onMounted(() => {
      getJob({}).then((res: any) => {
        console.log(res);
      });
    });
    const selectKey = [
      { key: "WorkingYears", name: "工作经验" },
      { key: "Welfares", name: "福利" },
      { key: "PayMonths", name: "薪次" },
      { key: "PayFilter", name: "薪资范围" },
    ];
    return { selectKey };
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
.searchBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #999;
  margin: 35px;
  padding: 0 20px;
  border-radius: 20px;
  input {
    border: none;
    outline: none;
  }
  img {
    height: 40px;
  }
}
</style>
