
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/report/pc/find',
    method: 'get',
    params
  })
}
