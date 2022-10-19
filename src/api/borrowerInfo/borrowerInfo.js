import request from '@/utils/request'
export const reqBorrowerInfo = () =>
  request({ url: '/admin/core/borrowinfo/auth/getBorrowerList', method: 'get' })
export const reqApproval = (borrowInfoApproval) =>
  request({
    url: '/admin/core/borrowinfo/approval',
    method: 'post',
    data: borrowInfoApproval,
  })
export const reqGetBorrowerDetail = (id) =>
  request({ url: `/admin/core/borrowinfo/show/${id}`, method: 'get' })

export const reqGetLendList = () =>
  request({ url: `/admin/core/lend/list`, method: 'get' })
//放款
export const reqmakeLoan = (id) =>
  request({ url: `/admin/core/lend/makeLoan/${id}`, method: 'get' })
