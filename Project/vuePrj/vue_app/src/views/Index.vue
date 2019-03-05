<template>
    <div class="index">
        <HeaderNav></HeaderNav>
        <LeftMenu></LeftMenu>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
        
    </div>
</template>

<script >
import HeaderNav from "../components/HeadNav"
import LeftMenu  from "../components/LeftMenu"

export default {
    name:"index",
    components:{
        HeaderNav,
        LeftMenu
    }
}
</script>

<style scoped>
.index{
    width: 100%;
    height: 100vh;
    /* background-color: aqua; */
    overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>
