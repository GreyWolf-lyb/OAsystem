import request from '@/utils/request'

export function rolePermissionFindAll(params) {
  return request({
    url: '/webadmin/permission/rolePermission/findAll',
    method: 'get',
    params
  })
}

export function rolePermissionInsert(data) {
  return request({
    url: '/webadmin/permission/rolePermission/insert',
    method: 'post',
    data
  })
}

export function roleFindAll(params) {
  return request({
    url: '/webadmin/permission/role/findAll',
    method: 'get',
    params
  })
}

export function roleUpdate(data) {
  return request({
    url: '/webadmin/permission/role/update',
    method: 'put',
    data
  })
}

export function roleInsert(data) {
  return request({
    url: '/webadmin/permission/role/insert',
    method: 'post',
    data
  })
}

export function roleDelete(id) {
  return request({
    url: '/webadmin/permission/role/deleteRole',
    method: 'delete',
    params: { id }
  })
}

export function roleFindById(params) {
  return request({
    url: '/webadmin/permission/role/findById',
    method: 'get',
    params
  })
}
