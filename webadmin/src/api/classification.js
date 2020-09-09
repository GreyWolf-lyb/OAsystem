
import request from '@/utils/request'

export function findAll(params) {
  return request({
    url: '/webadmin/system/userType/findAll',
    method: 'get',
    params
  })
}
export function update(data) {
    return request({
      url: '/webadmin/system/userType/update',
      method: 'put',
      data
    })
}
export function insert(body) {
    return request({
        url: '/webadmin/system/userType/insert',
        method: 'post',
        data: body
    })
}
export function findById(params) {
  return request({
    url: '/webadmin/system/userType/findById',
    method: 'get',
    params
  })
}
export function Delete(id) {
  return request({
    url: '/webadmin/system/userType/delete',
    method: 'delete',
    params: { id }
  })
}
