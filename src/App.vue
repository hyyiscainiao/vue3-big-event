<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>

<template>
  <div>
    <!-- App.vue只需要留一个路由出口 router-view即可 -->
    <el-config-provider :locale="zh">
      <router-view />
    </el-config-provider>
  </div>
</template>

<style scoped></style>
