<template>
  <div class="box">
    <NavBar>
      <div class="btn">招聘广场</div>
    </NavBar>
    <div class="selectBox">
      <div class="searchBox">
        <input v-model="select.jobName" type="text" placeholder="实习生招聘" />
        <img src="../assets/search_icon.png" alt="" />
      </div>
      <div class="listBox">
        <div v-for="i in selectKey" :key="i.key" class="list">
          <span class="label">{{ i.name }}</span>
          <span class="active">不限</span>
          <span
            @click="getJobList(option, i.inp)"
            v-for="(option, index) in options[getKey(i)]"
            :key="index"
            >{{ option }}</span
          >
        </div>
      </div>
    </div>
    <div class="jobs-list">
      <div v-for="job in jobs" :key="job.id" class="list">
        <div class="left">
          <span class="job-name">{{ job.jobName }}</span>
          <span class="pay-num">{{ job.payMin }}K - {{ job.payMax }}K</span>
          <span class="welfare-box">
            <font
              v-for="(welfare, index) in getWelfare(job.welfare)"
              :key="index"
            >
              {{ welfare }}
            </font>
          </span>
        </div>
        <div>
          <span>{{ job.workPosition }}</span>
          <span>{{ job.publishTime }}</span>
        </div>
        <div class="btn">APPLY</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import NavBar from "@/components/NavBar.vue";
import { getJob, getRequirement } from "../http/job";
import { selectKeyOptionInt, InitData } from "../types/index";

export default defineComponent({
  components: { NavBar },
  //   setup 不支持异步
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getJob({}).then((res: any) => {
        data.jobs = res.data;
        console.log(res);
      });
      getRequirement().then((res: any) => {
        console.log(res.data);
        data.options = res.data;
      });
      //   data.jobs[0].jobName
    });
    const selectKey: Array<selectKeyOptionInt> = [
      { key: "WorkingYears", name: "工作经验", inp: "education" },
      { key: "Welfares", name: "福利", inp: "payarea" },
      { key: "PayMonths", name: "薪次", inp: "payarea" },
      { key: "PayFilter", name: "薪资范围", inp: "payarea" },
    ];

    const getKey = (object: selectKeyOptionInt): keyof typeof data.options => {
      const key: string = object.key;
      return key as any;
    };

    const getWelfare = (str: string): string[] => {
      return str.split(",");
    };

    const getJobList = (str: string, type: string): void => {
      console.log(str);
    };
    return { ...toRefs(data), selectKey, getKey, getWelfare, getJobList };
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
    margin: 3px;
  }
}
.listBox {
  padding: 0 20px;
  .list {
    margin-top: 10px;
    span {
      margin-right: 15px;
      cursor: pointer;
      &.active {
        color: cadetblue;
      }
    }
    .label {
      color: #999;
      margin-right: 3px;
    }
  }
}
.jobs-list {
  padding: 0 20px;
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 10px;
    border-bottom: 1px solid #efefef;
    font-size: 14px;
    > div {
      display: flex;
      flex-direction: column;
      &.btn {
        display: inline-block;
        text-align: center;
        width: 70px;
        background-color: cadetblue;
        color: #fff;
      }
      span {
        line-height: 28px;
      }
      .job-name {
        font-weight: 600px;
        font-size: 16px;
      }
      .pay-num {
        font-weight: 400;
        color: burlywood;
      }
      .welfare-box {
        display: flex;
        font {
          background: #efefef;
          padding: 0 5px;
          font-size: 13px;
          border-radius: 5px;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
