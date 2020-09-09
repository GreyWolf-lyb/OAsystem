import request from '@/utils/request'

// 列表（分页）
export function journalListApi(body) {
    return request({
        url: '/webadmin/system/log/findAll',
        method: 'get',
        params: body
    })
}