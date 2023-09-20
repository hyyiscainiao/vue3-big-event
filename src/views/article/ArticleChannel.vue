<script setup>
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelService } from '../../api/article'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
const channelList = ref([])
const dialog = ref()
const isloading = ref(false)
const getChannelList = async () => {
  isloading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  isloading.value = false
}
getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row)
}
const addChannel = () => {
  dialog.value.open({})
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getChannelList()
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addChannel"> 添加分类 </el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="isloading">
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>
