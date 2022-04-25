import axios from "axios";

enum MSGS {
  "操作成功" = 200,
  "密码错误" = 201,
  "账号错误" = 202,
  "请求异常" = 999,
}

// todo: 请求补偿机制需完善

const $http = axios.create({
  // 可以通过操作基本域名来切换是否使用mock
  baseURL: "/mock",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

$http.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  //   config.headers.token = 123
  return config;
});

$http.interceptors.response.use(
  (res) => {
    // 当不确定res.data是否存在code属性的时候，使用?.的形式来获取
    // const code: number = res.data?.code;
    // if (code !== 200) {
    //   alert(MSGS[code]);
    //   return Promise.reject(res.data);
    // } else {
    return res.data;
    // }
  },
  (err) => {
    console.log(err);
  }
);

export default $http;
