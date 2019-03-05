<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png">
        <span class="title">gregrgr后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar">
          <div class="welcome">
            <p class="name comename">欢迎使用</p>
            <p class="name avatarname">{{user.name.name}}</p>
          </div>
          <span class="username">
            <!-- 下拉菜单 -->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script >
export default {
  name: "head-nav",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {},
  methods: {
    setDialogInfo(cmdItem) {
      // console.log(cmdItem);
      switch (cmdItem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
      }
    },
    showInfoList() {
        this.$router.push('/infoshow');
    },
    logout(){
        // console.log("登出");
        //清楚token
        localStorage.removeItem('eleToken');
        //设置清楚vuex store
        this.$store.dispatch('clearCurretState');
        //跳转
        this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}

.logo-container {
  display: inline-block;
  line-height: 60px;
  text-align: left;
}

.logo-container img {
  float: left;
  width: 50px;
  padding-left: 20px;
}

.logo-container .title {
  padding-left: 20px;
}
.user,
.userinfo {
  float: right;
  margin-right: 10px;
  /* background-color: green; */
}
.userinfo img{
  width: 30px;
}
.avatar {
  float: left;
  padding: 25px 25px;
}
.welcome {
    /* background-color: coral; */
    display: block;
  float: left;
  /* line-height: 25px; */
  margin-top: 25px;
}
.username {
    /* background-color: cornsilk; */
  float: right;
  margin: 25px 100px 0 15px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 10px;
}
.el-dropdown {
  color: #fff;
}
</style>
