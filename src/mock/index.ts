import Mock from "mockjs";

Mock.mock("/mock/Job", "get", {
  data: [
    {
      jobName: "c#/.NET全栈工程师",
      payMin: "10",
      payMax: "15",
      payMonth: "15薪",
      welfare: "五险一金，员工旅游，年终奖金，定期体检",
      education: "本科",
      workingYears: "5年",
      publishTime: "2022-01-25T00:00:00",
      workPosition: "苏州-工业园区",
      companyName: "元讯趣编程",
      id: 1,
    },
  ],
});
