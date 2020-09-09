
import request from '@/utils/request'

export function findAll(params) {
  return request({
    url: '/webadmin/system/signature/findAll',
    method: 'get',
    params
  })
}
export function update(data) {
    return request({
      url: '/webadmin/system/signature/update',
      method: 'put',
      data
    })
}
export function insert(data) {
    return request({
        url: '/webadmin/system/signature/insert',
        method: 'post',
        data
    })
}
export function findById(params) {
  return request({
    url: '/webadmin/system/signature/findById',
    method: 'get',
    params
  })
}
export function Delete(id) {
  return request({
    url: '/webadmin/system/signature/delete',
    method: 'delete',
    params: { id }
  })
}
export function findAllRoleList(params) {
  return request({
    url: '/webadmin/system/signature/findAllRoleList',
    method: 'get',
    params
  })
}
export function findAllUserList(params) {
  return request({
    url: '/webadmin/system/signature/findAllUserList',
    method: 'get',
    params
  })
}