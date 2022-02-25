<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
          v-for="item in menuTab"
          :key="item.id"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!--      表单 start-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="passowrd">密码</label>
          <el-input
            id="passowrd"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item-form"
          v-show="model === 'register'"
        >
          <label for="passwords">重复密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input id="code" v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButton.status"
                >{{ codeButton.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
            >{{ model === "login" ? "登录" : "注册" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 使用export default时，文件import 不需要花括号{},
// 但不能同时存在多个default
import {
  validate_Email,
  validate_Password,
  validate_code
} from "@/utils/validate";
import { reactive, ref, onMounted } from "@vue/composition-api";
// import { GetSms, Register, Login } from "@/api/login";
import { GetSms, Register } from "@/api/login";
import sha1 from "js-sha1";

export default {
  name: "login",
  setup(props, context) {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validate_Email(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validate_Password(value)) {
        callback(new Error("密码为6至20位的数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login，则直接通过
      // v-if相比v-show，多消耗资源进行页面渲染
      if (model.value === "login") {
        callback();
      } else if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("两次输入的密码不同"));
      } else {
        callback();
      }
    };
    // 校验6位验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validate_code(value)) {
        callback(new Error("密码为6位的数字或字母"));
      } else {
        callback();
      }
    };
    // 声明数据
    // 存放data数据、生命周期、自定义函数
    // reactive 处理对象类型数据
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    // model 处理基础类型数据，注意取值方法 model.value
    const model = ref("login");
    // 登录按钮禁用状态
    const loginButtonStatus = ref(true);
    // 验证码按钮状态
    const codeButton = reactive({
      status: false,
      text: "获取验证码"
    });
    // 倒计时变量
    const timer = ref(null);
    // 表单绑定数据，对象类型使用reactive赋值
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    // 表单的验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    // 声明函数
    // 切换模块
    const toggleMenu = data => {
      // forEach 为js 语法，遍历数组menuTab，将current 设置为false
      // 由于每次点击都先将current设置为false，再将鼠标点击的设为true
      // 实现了点击哪个，哪个高光，另一个非高光
      menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      // 修改模块值，函数内的方法与取值不用加this，赋值为.value 形式
      model.value = data.type;
      resetFormData();
      clearCountDown();
    };
    // 清除表单数据
    const resetFormData = () => {
      // 重置表单
      context.refs.loginForm.resetFields();
    };
    // 更新按钮状态
    const updateButtonStatus = params => {
      // 将获取验证码按钮设置为禁用状态
      codeButton.status = params.status;
      codeButton.text = params.text;
    };
    // 提交表单
    const getSms = () => {
      // 进行提示
      if (!ruleForm.username) {
        context.root.$message.error("邮箱不能为空！");
        return false;
      }
      if (validate_Email(ruleForm.username)) {
        context.root.$message.error("邮箱格式有误，请重新输入！");
        return false;
      }
      // 获取验证码，测试账号 1@1.com asd123
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };
      // 将获取验证码按钮设置为禁用状态
      updateButtonStatus({ status: true, text: "发送中" });
      GetSms(requestData)
        .then(response => {
          let data = response.data;
          context.root.$message({
            message: data.message,
            type: "success"
          });
          // 启用登录或注册按钮
          loginButtonStatus.value = false;
          // 调用定时器，倒计时60秒
          countDown(60);
        })
        .catch();
    };

    // 提交表单
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          // 表单验证通过，三元运算，true 则login()
          model.value === "login" ? login() : register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    // 登录
    const login = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "login"
      };
      context.root.$store.dispatch("app/login", requestData).then(() => {
        context.root.$router.push({ name: "Console" });
      });
    };
    // 注册
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register"
      };
      // 注册接口
      Register(requestData)
        .then(response => {
          let data = response.data;
          context.root.$message({
            message: data.message,
            type: "success"
          });
          // 模拟注册成功
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(error => {
          // 失败执行的代码
          console.log(error);
        });
    };
    // 倒计时
    const countDown = number => {
      // 判断定时器是否存在，存在则清除
      if (timer.value) {
        clearInterval(timer.value);
      }
      // setTimeout 只执行一次
      // setInterval 不断执行，需要条件才会停止
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          updateButtonStatus({ status: false, text: "再次获取" });
        } else {
          codeButton.text = `倒计时${time}秒`; // es5
        }
      }, 1000);
    };
    // 清除倒计时
    const clearCountDown = () => {
      // 还原验证码按钮默认状态
      updateButtonStatus({ status: false, text: "获取验证码" });
      // 清除倒计时
      clearInterval(timer.value);
    };

    // 生命周期
    onMounted(() => {});
    // 只有写在return中，函数、变量才会被用到
    return {
      menuTab,
      model,
      ruleForm,
      rules,
      loginButtonStatus,
      codeButton,
      timer,
      toggleMenu,
      resetFormData,
      updateButtonStatus,
      submitForm,
      getSms,
      clearCountDown
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
#login {
  /*vh 代表浏览器可视区大小，100代表100%*/
  height: 100vh;
  background-color: #344a5f;
}

.login-wrap {
  width: 330px;
  margin: auto;
}

.menu-tab {
  text-align: center;

  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }

  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.login-form {
  margin-top: 29px;

  label {
    display: block;
    margin-bottom: 3px;

    font-size: 14px;
    color: #fff;
  }

  .item-form {
    margin-bottom: 13px;
  }

  .block {
    width: 100%;
    display: block;
  }

  .login-btn {
    margin-top: 19px;
  }
}
</style>
