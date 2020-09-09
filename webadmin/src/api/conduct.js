
import request from '@/utils/request'

export function findAll(params) {
  return request({
    url: '/webadmin/matters/item/findAll',
    method: 'get',
    params
  })
}
export function update(data) {
    return request({
      url: '/webadmin/matters/item/update',
      method: 'put',
      data
    })
}
export function insert(body) {
    return request({
        url: '/webadmin/matters/item/insert',
        method: 'post',
        data: body
    })
}
export function findById(params) {
  return request({
    url: '/webadmin/matters/item/findById',
    method: 'get',
    params
  })
}
export function Delete(id) {
  return request({
    url: '/webadmin/matters/item/delete',
    method: 'delete',
    params: { id }
  })
}
