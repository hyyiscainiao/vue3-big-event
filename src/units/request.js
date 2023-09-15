import axios from 'axios'
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeput: 10000
})

instance.interceptors.request.use(
  (config) => {
    // 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response
    }
    // 处理业务失败，抛出错误
    ElMessage.error({
      message: response.data.message || '服务器异常',
      type: 'error'
    })
  },
  (error) => {
    ElMessage.error({
      message: error.response.data.message || '服务器异常',
      type: 'error'
    })
    console.log(error)
    if (error.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
