import request from '@/utils/request'
export const reqDictList = () =>
  request({ url: '/admin/core/dict/GetDictList', method: 'get' })

export const reqdelDict = (ids) =>
  request({ url: '/admin/core/dict/delDict', method: 'post', data: ids })

export const addOrUpdateDict = (dict) => {
  if (dict.id) {
    return request({
      url: '/admin/core/dict/upDictList',
      method: 'put',
      data: dict,
    })
  } else {
    //新增
    return request({
      url: '/admin/core/dict/saveDictList',
      method: 'post',
      data: dict,
    })
  }
}

export const upload = () =>
  request({ url: '/admin/core/dict/import', method: 'post' })

export const exports = () =>
  request({ url: '/admin/core/dict/export', method: 'post' })
