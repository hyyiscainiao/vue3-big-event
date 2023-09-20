<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import PageContainer from '../../components/PageContainer.vue'
import { userUpdateInfoService } from '@/api/user.js'
const formRef = ref(null)
const {
  user: { username, nickname, email, id },
  getUser
} = useUserStore()
const form = ref({
  id,
  username, // 示例值，根据实际需求替换为实际值或从外部传入
  nickname,
  email
})
const rules = ref({
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称长度在2到10个字符的非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
})

const submitForm = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    await userUpdateInfoService(form.value)
    await getUser()
    ElMessage.success('修改成功')
  }
}
</script>
<template>
  <PageContainer title="基本资料">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="100"
      size="large"
    >
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >提交修改</el-button
        >
      </el-form-item>
    </el-form>
  </PageContainer>
</template>
