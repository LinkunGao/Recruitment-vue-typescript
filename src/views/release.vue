<template>
  <div class="box">
    <NavBar>
      <div @click="goRouter" class="btn">招聘广场</div>
    </NavBar>
    <div class="release-box">
      <h2 class="text-title">发布招聘</h2>
      <div class="inp-box">
        <div class="list">
          <span class="label">职位名称：</span>
          <input
            class="job-name"
            v-model="jobInpData.jobName"
            type="text"
            placeholder="请输入职位名称"
          />
        </div>
        <div class="list">
          <span class="label">学历要求：</span>
          <select
            v-model="jobInpData.education"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="">请选择</option>
            <option
              v-for="(education, index) in selectOptions.Education"
              :key="index"
              :value="education"
            >
              {{ education }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">经验要求：</span>
          <select
            v-model="jobInpData.workingYears"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="">请选择</option>
            <option
              v-for="(workYear, index) in selectOptions.WorkingYears"
              :key="index"
              :value="workYear"
            >
              {{ workYear }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">工资最低值：</span>
          <select
            v-model="jobInpData.payMin"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="">请选择</option>
            <option
              v-for="(min, index) in selectOptions.PayMin"
              :key="index"
              :value="min"
            >
              {{ min }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">工资最高值：</span>
          <select
            v-model="jobInpData.payMax"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="">请选择</option>
            <option
              v-for="(max, index) in selectOptions.PayMax"
              :key="index"
              :value="max"
            >
              {{ max }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">薪次：</span>
          <select
            v-model="jobInpData.payMonth"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="">请选择</option>
            <option
              v-for="(payMonth, index) in selectOptions.PayMonths"
              :key="index"
              :value="payMonth"
            >
              {{ payMonth }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">福利待遇：</span>
          <label
            v-for="(welfare, index) in selectOptions.Welfares"
            :key="index"
          >
            <input
              v-model="jobInpData.welfare"
              type="checkbox"
              :value="welfare"
            />
            {{ welfare }}
          </label>
        </div>
        <div class="list">
          <span class="label">工作地点：</span>
          <select
            class="select-place"
            v-model="jobInpData.cityId"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="0">请选择</option>
            <option
              v-for="(city, index) in selectOptions.City"
              :key="index"
              :value="city.id"
            >
              {{ city.name }}
            </option>
          </select>
          <select
            class="select-place"
            v-model="jobInpData.areaId"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="0">请选择</option>
            <option
              v-for="(area, index) in selectOptions.Area"
              :key="index"
              :value="area.id"
            >
              {{ area.name }}
            </option>
          </select>
        </div>
        <div class="list">
          <span class="label">招聘企业：</span>
          <select
            v-model="jobInpData.companyId"
            placeholder="请选择"
            name=""
            id=""
          >
            <option value="0">请选择</option>
            <option
              v-for="(company, index) in selectOptions.Company"
              :key="index"
              :value="company.id"
            >
              {{ company.name }}
            </option>
          </select>
        </div>
        <div @click="onSubmit" class="sub-btn">Publish</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import NavBar from "@/components/NavBar.vue";
import { useRouter } from "vue-router";
import { InitData } from "../types/release";
import { getRequirement, postJob } from "../http/job";

export default defineComponent({
  components: { NavBar },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    onMounted(() => {
      getRequirement().then((res: any) => {
        // 数据重组，后者替代前者
        data.selectOptions = { ...data.selectOptions, ...res.data };
      });
    });
    const onSubmit = () => {
      //   const httpData: any = { ...data.jobInpData };
      //   httpData.welfare = "";
      //   data.jobInpData.welfare.forEach((v) => {
      //     httpData.welfare += v + ",";
      //   });
      let key: keyof typeof data.jobInpData;
      for (key in data.jobInpData) {
        if (!data.jobInpData[key]) {
          alert("请先完善信息");
          return;
        }
      }
      postJob({
        ...data.jobInpData,
        welfare: data.jobInpData.welfare.join(","),
      }).then((res: any) => {
        console.log(res);
        alert("publish success");
      });
    };
    const goRouter = () => {
      router.push("/");
    };
    return { ...toRefs(data), goRouter, onSubmit };
  },
});
</script>

<style lang="scss" scoped>
.box {
  width: 1000px;
  margin: 0 auto;
  box-shadow: 0 6px 18px #999;
}
.btn {
  font-size: 18px;
  font-weight: 500;
  color: cadetblue;
  border: 1px solid cadetblue;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
}
.release-box {
  padding: 20px 40px;

  .text-title {
    padding: 5px 10px;
    border-bottom: 2px solid cadetblue;
  }
  .inp-box {
    display: flex;
    flex-direction: column;

    .list {
      margin-bottom: 15px;

      select,
      .job-name {
        width: 200px;
      }
      .select-place {
        width: 100px;
      }
    }
    .label {
      display: inline-block;
      width: 100px;
    }
  }
  .sub-btn {
    width: 150px;
    background: cadetblue;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    border-radius: 10px;
  }
}
</style>
