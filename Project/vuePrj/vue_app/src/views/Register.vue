<template>
  <div class="register">
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">gregrgr后台管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerUser1"
        >
          <el-form-item label="姓名" prop="name">
            <el-input type="text" v-model="registerUser.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="registerUser.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwd">
            <el-input type="password" v-model="registerUser.passwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerUser.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-select v-model="registerUser.identity" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  name: "register",
  components: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value !== this.registerUser.passwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        passwd: "",
        checkPass: "",
        identity: ""
      },
      options: [
        {
          label: "管理员",
          value: "manager"
        },
        {
          label: "会员",
          value: "enployee"
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符之间" }
        ],
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
        ],
        checkPass: [
          {
            trigger: "blur"
          },
          {
            trigger: "blur",
            validator: validatePass
          }
        ],
        identity: [{ trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(
            "/api/users/register",
            this.registerUser
            ).then(res=>{
              //注册成功
              this.$message({
                message:"账号注册成功",
                type:"success"
              })
            }).catch(err=>{
              throw err;
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      this.$router.push('/login');
    }
  }
};
</script> 

<style scoped>
.register {
  width: 100%;
  height: 100%;
  background: url(../assets/register.jpg);
  overflow: hidden;
  background-size: cover;
}
.register .form_container {
}
.register .form_container .manage_tip {
  margin: 40px auto;
  width: 400px;
  padding: 20px 20px 20px 0;
  border-radius: 20%;
  background-color: rgba(0, 0, 0, 0.5);
}
.register .form_container .manage_tip span {
  display: block;
  margin-bottom: 40px;
  font-size: 26px;
  color: #fff !important;
}

.manage_tip /deep/ .el-form-item__label {
  color: #fff;
}
</style>
