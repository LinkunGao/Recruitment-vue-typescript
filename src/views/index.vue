<template>
  <div class="box">
    <NavBar>
      <div @click="goRouter" class="btn">发布招聘</div>
    </NavBar>
    <div class="selectBox">
      <div class="searchBox">
        <input v-model="select.jobName" type="text" placeholder="实习生招聘" />
        <img
          @click="getJobList(select)"
          src="../assets/search_icon.png"
          alt=""
        />
      </div>
      <div class="listBox">
        <div v-for="i in selectKey" :key="i.key" class="list">
          <span class="label">{{ i.name }}</span>
          <span :class="{ active: !select[i.inp] }">不限</span>
          <span
            :class="{ active: select[i.inp] === option }"
            @click="getSelectData(option, i.inp)"
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
            <span
              class="font"
              v-for="(welfare, index) in getWelfare(job.welfare)"
              :key="index"
            >
              {{ welfare }}
            </span>
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
import { selectKeyOptionInt, InitData, selectTypeInt } from "../types/index";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { NavBar },
  //   setup 不支持异步
  //  在vue3 中setup函数中已经取缔了this
  setup() {
    const router = useRouter();

    const data = reactive(new InitData());
    onMounted(() => {
      // getJob({}).then((res: any) => {
      //   data.jobs = res.data;
      // });
      getJobList({});
      getRequirement().then((res: any) => {
        data.options = res.data;
      });
      //   data.jobs[0].jobName
    });
    const selectKey: Array<selectKeyOptionInt> = [
      { key: "WorkingYears", name: "工作经验", inp: "education" },
      { key: "Welfares", name: "福利", inp: "welfare" },
      { key: "PayMonths", name: "薪次", inp: "payMonth" },
      { key: "PayFilter", name: "薪资范围", inp: "payarea" },
    ];

    const getKey = (object: selectKeyOptionInt): keyof typeof data.options => {
      const key: string = object.key;
      return key as any;
    };

    const getWelfare = (str: string): string[] => {
      return str.split(",");
    };

    const getSelectData = (str: string, type: string): void => {
      // 第二种解决ts索引办法,只能解决当前的问题
      // const new_type: keyof selectTypeInt = type as keyof selectTypeInt;
      // const new_str: never = str as never;

      // data.select[new_type] = new_str;

      // 第一种，解决长期问题
      data.select[type] = str;
      // console.log(data.select);
      getJobList(data.select);
    };

    const getJobList = (selected: any): void => {
      getJob(selected).then((res: any) => {
        data.jobs = res.data;
        console.log(selected);
      });
    };

    const goRouter = () => {
      router.push("/release");
    };

    return {
      ...toRefs(data),
      selectKey,
      getKey,
      getWelfare,
      getJobList,
      goRouter,
      getSelectData,
    };
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
    width: 80%;
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
        .font {
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
