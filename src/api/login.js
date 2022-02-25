import service from "@/utils/request";
// 获取验证码
export function GetSms(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data // 相当于 data: data ,由于参数名与变量名一致，可以只写data即可，es6写法
  });
}

// 获取用户角色
export function getUserRole(data = {}) {
  return service.request({
    method: "post",
    url: "/userRole/",
    data // 相当于 data: data ,由于参数名与变量名一致，可以只写data即可，es6写法
  });
}

// 登录
export function Login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data
  });
}

// 注册
export function Register(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data
  });
}
