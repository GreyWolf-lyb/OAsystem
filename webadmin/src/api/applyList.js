import request from '@/utils/request'

// 办事申请列表
export function applyListApi(body) {
    return request({
        url: '/webadmin/applyList/findAll',
        method: 'get',
        params: body
    })
}
// 办事申请详情
export function applyDeletelApi(body) {
    return request({
        url: '/webadmin/applyList/findById',
        method: 'get',
        params: body
    })
}
// 终止申请
export function terminateApplicationApi(body) {
    return request({
        url: '/webadmin/applyList/terminateApplication',
        method: 'put',
        data: body
    })
}
// 重新申请信息详情
export function detailsOfReapplicationApi(body) {
    return request({
        url: '/webadmin/applyList/detailsOfReapplication',
        method: 'get',
        params: body
    })
}
// 重新申请
export function reapplyApi(body) {
    return request({
        url: '/webadmin/applyList/reapply',
        method: 'post',
        data: body
    })
}