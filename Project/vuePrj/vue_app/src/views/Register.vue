<template>
  <div class="register">
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">gregrgr后台管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="passwd">
            <el-input type="password" v-model="registerUser.passwd" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="passwd2">
            <el-input type="password" v-model="registerUser.passwd2" placeholder="请输入确认密码"></el-input>
          </el-form-item>

          <el-form-item label="选择身份" prop="identity">
            <el-select v-model="registerUser.identity" aria-placeholder="请选择身份">
              <el-option label="管理员"></el-option>
              <el-option label="员工"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
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
  data(){
      return{
          registerUser:{
              name:"",
              email:"",
              passwd:"",
              passwd2:"",
              identity:""
          }
      }
  }
};
</script> 

<style scoped>

.register{
    width: 100%;
    height: 100%;
    background: url(../assets/register.jpg);
    overflow: hidden;
    background-size: cover;
}
.register .form_container{

}
.register .form_container .manage_tip{
    margin: 40px auto;
    width: 400px;
    padding: 20px 20px 20px 0;
    border-radius: 20%;
    background-color: rgba(0, 0,0, .5);
    
}
.register .form_container .manage_tip span{
    display: block;
    margin-bottom: 40px;
    font-size: 26px;
    color: #FFF!important;
}

.manage_tip /deep/ .el-form-item__label{
    color: #FFF;
}
</style>
