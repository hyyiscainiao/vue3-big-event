<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <el-button class="button" text>
          <slot name="extra"></slot>
        </el-button>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  min-height: 100%;
  box-sizing: border-box;
}
</style>
