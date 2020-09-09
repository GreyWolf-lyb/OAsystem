/*
 * @Author: your name
 * @Date: 2020-08-25 17:16:04
 * @LastEditTime: 2020-08-27 19:41:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webadmin\src\api\framework.js
 */

import request from '@/utils/request'

export function findAll(params) {
  return request({
    url: '/webadmin/system/dept/findAll',
    method: 'get',
    params
  })
}
export function findAllList(params) {
  return request({
    url: '/webadmin/system/dept/findAllList',
    method: 'get',
    params
  })
}
export function updateStatus(data) {
  return request({
    url: '/webadmin/system/dept/updateStatus',
    method: 'put',
    data
  })
}
export function insert(body) {
  return request({
    url: '/webadmin/system/dept/insert',
    method: 'post',
    data: body
  })
}
export function update(data) {
  return request({
    url: '/webadmin/system/dept/update',
    method: 'put',
    data
  })
}
export function findById(params) {
  return request({
    url: '/webadmin/system/dept/findById',
    method: 'get',
    params
  })
}

export function findAllListUser(params) {
  return request({
    url: '/webadmin/system/dept/findAllListForUser',
    method: 'get',
    params
  })
}