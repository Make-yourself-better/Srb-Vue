import request from '@/utils/request'
export const reqAuditList = (page, limit, keyword) =>
  request({
    url: `/admin/core/borrower/list/${page}/${limit}`,
    method: 'get',
    params: { keyword }, //对象不加{} 字符串要加
  })

export const reqAuditInfo = (id) =>
  request({ url: `/admin/core/borrower/auditInfo/${id}`, method: 'get' })

export const reqApproval = (Borrower) =>
  request({
    url: `/admin/core/borrower/approval`,
    method: 'post',
    data: Borrower,
  })
