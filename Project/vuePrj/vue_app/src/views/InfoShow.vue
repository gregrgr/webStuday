<template>
  <div class="infoShow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img :src="user.avatar" class="avatar" alt>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-itrm">
            <i class="fas fa-user"></i>
            <span>{{user.name.name}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{user.name.identity=="manager"?"管理员":"VIP"}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script >
export default {
  name: "infoShow",
  computed:{
      user(){
          return this.$store.getters.user;
      }
  }
};
</script>

<style scoped>
.infoShow {
  width: 100%;
  height: 100%;
  background-color: #E0E0E0;
  /* border-left: 2px solid #000; */
}
.userinfo i{
    margin-right: 10px;
}
.userinfo {
  text-align: left;
  margin-top: 200px;
  line-height: 40px;
  font-size: 25px;
  color: #666;
}
.user{
  width: 50px;
  padding: 100px 0 0 200px;
}
</style>
