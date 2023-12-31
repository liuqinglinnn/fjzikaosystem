import request2 from '@/utils/request2'
import qs from 'qs'

//查看专业
export function getzytable(query) {
  return request2({
    url: '/FZUZK/zykc/getzyyxmessage',
    method: 'post',
    params: query
  })
}

export function getzydetail(zy_dm) {
  return request2({
    url: '/FZUZK/zyyx/checkzyxq/' + zy_dm,
    method: 'get'
  })
}
export function addzy(query) {
  return request2({
    url: '/FZUZK/zyyx/insertzy',
    method: 'post',
    data: query
  })
}
export function updatezy(query) {
  return request2({
    url: '/FZUZK/zyyx/updatezyxq',
    method: 'post',
    data: query
  })
}
//查询专业
export function getzymes(query) {
  console.log(query)
  return request2({
    url: '/FZUZK/zykc/getzyyxmessage',
    method: 'post',
    params: query
  })
}

export function deletezy(query) {
  return request2({
    url: '/FZUZK/zyyx/delete',
    method: 'delete',
    params: { zy_dm: query }
  })
}

export function deletezylist(query) {
  return request2({
    url: '/FZUZK/zyyx/deletelist',
    method: 'delete',
    params: { zy_dm: query },
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: 'repeat', encode: false })
    }
  })
}

export function updatezymes(query) {
  console.log(query)
  return request2({
    url: '/FZUZK/zyyx/update',
    method: 'post',
    params: query
  })
}

export function updategkkc(query) {
  console.log(query)
  return request2({
    url: '/FZUZK/zyyx/updategkkc',
    method: 'post',
    params: query
  })
}

export function getzyyxtype() {
  return request2({
    url: '/FZUZK/yx/zyyxType',
    method: 'post'
  })
}

export function getyxzy(yx) {
  return request2({
    url: '/FZUZK/yx/yxzy',
    method: 'post',
    params: {
      zy_yx: yx
    }
  })
}

export function getboard(dm) {
  return request2({
    url: '/FZUZK/yx/getboard',
    method: 'get',
    params: {
      zy_dm: dm
    }
  })
}
