import request from '@/utils/request'
export const reqIntegralGrade = () =>
  request({ url: '/admin/core/integral-grade/list', method: 'get' })
export const delIntegralGrade = (id) =>
  request({
    url: `/admin/core/integral-grade/DelIntegralGrade/${id}`,
    method: 'post',
  })
export const addOrUpdateIntegralGrade = (integralGrade) => {
  if (integralGrade.id) {
    return request({
      url: `/admin/core/integral-grade/upIntegralGrade`,
      method: 'put',
      data: integralGrade,
    })
  } else {
    //新增
    return request({
      url: `/admin/core/integral-grade/SaveIntegralGrade`,
      method: 'post',
      data: integralGrade,
    })
  }
}
