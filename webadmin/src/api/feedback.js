/*
 * @Author: your name
 * @Date: 2020-08-18 00:27:24
 * @LastEditTime: 2020-08-18 09:19:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webadmin\src\api\feedback.js
 */

import request from '@/utils/request'

export function findAll(params) {
  return request({
    url: '/webadmin/matters/proveTemplate/findAll',
    method: 'get',
    params
  })
}
export function update(data) {
  return request({
    url: '/webadmin/matters/proveTemplate/update',
    method: 'put',
    data
  })
}
export function insert(body) {
  return request({
    url: '/webadmin/matters/proveTemplate/insert',
    method: 'post',
    data: body
  })
}
export function findById(params) {
  return request({
    url: '/webadmin/matters/proveTemplate/findById',
    method: 'get',
    params
  })
}
export function Delete(id) {
  return request({
    url: '/webadmin/matters/proveTemplate/delete',
    method: 'delete',
    params: { id }
  })
}
export function itemFindAllList(params) {
  return request({
    url: '/webadmin/matters/item/findAllList',
    method: 'get',
    params
  })
}
export function userFindAllList(params) {
  return request({
    url: '/webadmin/system/userType/findAllList',
    method: 'get',
    params
  })
}
