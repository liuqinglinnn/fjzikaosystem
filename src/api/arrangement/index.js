import request2 from '@/utils/request2'
import request from "@/utils/request";
import qs from "qs";

// 获取编排结果
export function getkstable() {
  return request2({
    url: '/FZUZK/zykc/getkstable',
    method: 'get',
  })
}
//重新编排
export function orderlist() {
  return request2({
    url: '/FZUZK/zykc/orderlist',
    method: 'post',
  })
}
export function orderlistlater() {
  return request2({
    url: '/FZUZK/zykc/orderlistlater',
    method: 'post',
  })
}
export function getexcel() {
  return request2({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    url: '/FZUZK/excel',
    method: 'get',
  })
}
export function uploadexcel(gkSj) {
  return request2({
    url: '/FZUZK/zykc/importgksj',
    method: 'post',
    data: gkSj,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
