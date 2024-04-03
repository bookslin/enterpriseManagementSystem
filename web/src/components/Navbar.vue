<template>
    <div class="navbar">
       
        <el-menu :default-active="route.fullpath" class="el-menu-demo" mode="horizontal" :router="true">
            <div class="logo-name" @click="toindex"> <img class="logo-img" src="@/assets/logo1.png" alt=""></div>
            <el-menu-item index="/"> 首页</el-menu-item>
            <el-menu-item index="/news"> 新闻中心</el-menu-item>
            <el-menu-item index="/product"> 产品与服务</el-menu-item>
            <el-menu-item index="/contact"> 联系我们</el-menu-item>
            <el-menu-item index=" " @click="handleClick" style="position: absolute;right: 50px;"> 登录</el-menu-item>
        </el-menu>
       
    </div>
</template>
<script setup>
import { useRoute,useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

const handleClick = ()=>{
    window.location = "http://localhost:8080/#/login"
}

const toindex = () =>{
    window.location.href = '';
}
</script>

<style lang="scss" scoped>
    .navbar{
        position: sticky;
        top: 0px;
        z-index: 1000;
    }
    .logo-name{
        margin: 0 50px;
        cursor: pointer;
    }
    .logo-img{
      
        height: 100%;
    }
    // .logo-name{
    //     position: fixed;
    //     top: 0px;
    //     right: 20px;
    //     width: 150px;
    //     height: 60px;
    //     line-height: 60px;
    //     text-align: center;
    // }
</style>