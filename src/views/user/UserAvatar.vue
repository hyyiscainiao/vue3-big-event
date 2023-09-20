<script setup>
import PageContainer from '../../components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { Plus, Upload } from '@element-plus/icons-vue'
import { userUploadAvatarService } from '@/api/user'
const userStore = useUserStore()
const uploadRef = ref()
const imgUrl = ref(userStore.user.user_pic)
const onUploadFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
const onUpdateAvatar = async () => {
  await userUploadAvatarService(imgUrl.value)
  await userStore.getUser()
  ElMessage({ type: 'success', message: '更换头像成功' })
}
</script>

<template>
  <PageContainer title="更换头像">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onUploadFile"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <img v-else src="@/assets/avatar.jpg" width="278" />
    </el-upload>
    <el-button
      type="primary"
      :icon="Plus"
      size="large"
      @click="uploadRef.$el.querySelector('input').click()"
    >
      选择图片
    </el-button>
    <el-button
      type="success"
      :icon="Upload"
      size="large"
      @click="onUpdateAvatar"
    >
      上传头像
    </el-button>
  </PageContainer>
</template>
<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
</style>
