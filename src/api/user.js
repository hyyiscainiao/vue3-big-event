import request from '@/units/request.js'

// 注册接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

// 登录接口
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 获取用户基本信息
export const userGetInfoService = () => request.get('/my/userinfo')

export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })

export const userUploadAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
