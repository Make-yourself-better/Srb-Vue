import request from '@/utils/request'
export const reqUserInfoList = (page, limit, searchObj) =>
  request({
    url: `/admin/core/userinfo/getUserInfo/${page}/${limit}`,
    method: 'get',
    params: searchObj,
  })
export const reqLock = (id, status) =>
  request({
    url: `/admin/core/userinfo/lock/${id}/${status}`,
    method: 'put',
  })
export const reqLoginRecods = (userId) =>
  request({
    url: `/admin/core/UserLoginRecord/loginRecordlist/${userId}`,
    method: 'get',
  })
