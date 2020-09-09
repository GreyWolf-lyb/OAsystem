import request from '@/utils/request'

// 办事申请列表
export function applyListApi(body) {
    return request({
        url: '/webadmin/apply/findAll',
        method: 'get',
        params: body
    })
}
// 查询办理事项下所有模板
export function applyAllTemplateApi(body) {
    return request({
        url: '/webadmin/apply/findAllTemplateById',
        method: 'get',
        params: body
    })
}
// 预览模板
export function applyTemplateByTemplateApi(body) {
    return request({
        url: '/webadmin/apply/findTemplateByTemplateId',
        method: 'get',
        params: body
    })
}
// 提交申请
export function applyInsertApi(body) {
    return request({
        url: '/webadmin/apply/insert',
        method: 'post',
        data: body
    })
}