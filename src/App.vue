<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
console.log(123)
const router = useRouter()
const route = useRoute()
const golist = () => {
  router.push('/list')
  console.log(router, route)
}
const userStore = useUserStore()
</script>

<template>
  <div>
    <hr />
    <router-view></router-view>
    <hr />
    <el-button @click="$router.push('/home')">首页</el-button>
    <el-button @click="golist">列表</el-button>
    <p>{{ userStore.token }}</p>
    <button @click="userStore.setToken('Bearer hshdabjhddsas')">登录</button>
    <button @click="userStore.removeToken()">退出</button>
  </div>
</template>

<style scoped></style>
