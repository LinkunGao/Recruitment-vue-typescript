import Mock from "mockjs";

const Requirement = {
  WorkingYears: ["1年", "2年", "3年", "4年", "5年以上"],
  Welfares: [
    "五险一金",
    "专业培训",
    "免费班车",
    "绩效奖金",
    "员工旅游",
    "年终奖金",
  ],
  PayMonths: ["12薪", "13薪", "14薪", "15薪"],
  PayFilter: [
    "3k以下",
    "3-5k",
    "5-10k",
    "10-15k",
    "15-20k",
    "20-30k",
    "30-50k",
    "50k以上",
  ],
};

// |5 表示自动生成5条数据
Mock.mock(/\/mock\/Job.*/, "get", {
  "data|5": [
    {
      jobName: "c#/.NET全栈工程师",
      payMin: "10",
      payMax: "15",
      payMonth: "15薪",
      welfare: "五险一金, 员工旅游, 年终奖金, 定期体检",
      education: "本科",
      workingYears: "5年",
      publishTime: "2022-01-25T00:00:00",
      workPosition: "苏州-工业园区",
      companyName: "元讯趣编程",
      id: 1,
    },
  ],
});

Mock.mock("/mock/Job", "post", { code: 200 });

Mock.mock("/mock/Requirement", "get", { data: Requirement });
