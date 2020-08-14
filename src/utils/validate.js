// 过滤特殊字符

export function stripscript(value) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < value.length; i++) {
    rs = rs + value.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

// 验证邮箱，
export function validate_Email(value) {
  let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return !reg.test(value);
}

// 验证码，6到20为的字母或数字
export function validate_Password(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return !reg.test(value);
}

// 验证码
export function validate_code(value) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value);
}

// 没有使用default，可以同时声明多个export
// 文件import 需要花括号{}
