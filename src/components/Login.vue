<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo区域 -->
      <div class="logo">
        <h2>电商后台管理系统</h2>
        <p>Vue+Element-UI @wangxin</p>
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的数据对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 点击登录按钮，预验证表单
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)  返回bollean
        if (!valid) return
        // 对象解构
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 1. 将登录成功后的 token，保存到客户顿的 sessionStorage 中
        //    1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //    1.2 token 只应在当前网页打开期间生效，所以将 token 保存在 sessionStorage中，而不是localStorage
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式导航跳转到后台主页面，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background: url('../assets/b6a36d3f678b71e5388b332d90cec3cb.jpg') no-repeat;
  // background-position-x: -450px;
  background-size: cover;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 0.8;
  transform: translate(-50%, -50%);
  .logo {
    text-align: center;
    h2 {
      font-size: 30px;
      margin: 20px 0 10px 0;
      text-shadow: -3px 2px 1px rgba(0, 0, 0, 0.5);
    }
    p {
      margin: 0;
      font-size: 12px;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
