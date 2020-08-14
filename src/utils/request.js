import axios from "axios";
// vue文件可以使用全局引用，js文件需要单独引用element-ui
import { Message } from "element-ui";
import { getToken, getUsername } from "@/utils/app";

// 创建axios，赋给变量service
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
const service = axios.create({
  baseURL: BASEURL, // http://10.2.212.35:8080/api/getSms/ == http://www.web-jshtml.cn/productapi
  timeout: 15000 // 超时时间15秒
});
// 请求拦截器，请求接口前进行数据处理
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // 后台需要在请求头添加参数，如token、userId
    // console.log(getToken());
    // console.log(getUsername());
    // Token作者写错了，哎
    config.headers["Tokey"] = getToken();
    config.headers["UserName"] = getUsername();
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器，返回数据进行拦截处理
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.resCode !== 0) {
      // data为后端返回的json数据，关于错误返回，前端、后端都要做处理，双重保险
      Message.error(data.message);
      // Promise.reject 返回错误，由调用函数的 .catch 方法将错误数据data 捕获
      return Promise.reject(data);
    } else {
      // Promise.resolve 则代表  .then 方法将data数据捕获
      return response;
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 将该函数暴露出去
export default service;

// 密码加密：
// 1.在前端预先加密一次
//     登录密码：123456
//     sha1(123456) => 7c4a8d09ca3762af61e59520943dc26494f8941b
// 2.后台加密
//     接收到字符串：7c4a8d09ca3762af61e59520943dc26494f8941b
//     后台再次加密（以32位的md5加密举例）：
//     md5("7c4a8d09ca3762af61e59520943dc26494f8941b") =>  "D93A5DEF7511DA3D0F2D171D9C344E91"
//     最终将该字符串写入数据库：D93A5DEF7511DA3D0F2D171D9C344E91
// 3.登录
//     用户名与加密后的密码进行匹配，成功则登录，失败则提示
