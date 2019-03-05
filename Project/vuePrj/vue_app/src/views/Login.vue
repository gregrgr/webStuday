<template>
  <div class="login">
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">gregrgr后台管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="80px"
          class="loginUser"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="loginUser.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwd">
            <el-input type="password" v-model="loginUser.passwd" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <div class="tipares">
            <p>Don't sign in
              <router-link to="/register">Sign Up</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script >

import jwt_decode from "jwt-decode";

export default {
  name: "login",
  components: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value !== this.loginUser.passwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginUser: {
        email: "",
        passwd: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符之间" }
        ],
        passwd: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          { min: 6, max: 20, message: "长度在6到20个字符之间" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/login", this.loginUser)
            .then(res => {
              //拿到token
            //   console.log(res);
            const {token} = res.data;
            //储存到LS
            localStorage.setItem('eleToken',token);

            //解析token
            const decode = jwt_decode(token);
            // console.log(decode);

            //将解析完的数据存储到vuex中去
            this.$store.dispatch("setAuthenticated",!this.isEmpty(decode));
            this.$store.dispatch("setUser",decode);

            this.$router.push("/index");
            })
            .catch(err => {
              throw err;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      
    },
    isEmpty(value){
        return(
            value === undefined || 
            value ===null ||
            (typeof value==="object" && Object.keys(value).length===0)||
            (typeof value === "string" && value.trim().length===0)
        )
    }
  }
};
</script> 

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url(../assets/register.jpg);
  background-size: cover;
  overflow: hidden;
}

.login .manage_tip {
  margin: 100px auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.login .title {
  font-size: 30px;
  text-align: center;
  line-height: 80px;
  color: #fff;
}
.login .loginUser {
  margin: 20px auto;
  width: 400px;
}
.login .form_container .tipares {
  text-align: right;
  margin: 10px;
  color: #aaa;
}
.login .form_container .tipares a {
  color: #fff;
  text-decoration: none;
}
.manage_tip /deep/ .el-form-item__label {
  color: #fff;
}
</style>
