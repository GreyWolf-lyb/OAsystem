/*
 * @Author: your name
 * @Date: 2020-08-17 14:53:50
 * @LastEditTime: 2020-08-27 09:54:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webadmin\src\api\feedback.js
 */

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/webadmin/feedbackManage/findAll',
    method: 'get',
    params
  })
}

export function feedList(params) {
    return request({
      url: '/webadmin/feedbackManage/feedbackManageDetail',
      method: 'get',
      params
    })
}

export function sendBack(data) {
    return request({
      url: '/webadmin/feedbackManage/sendBack',
      method: 'put',
      data
    })
}

export function findAllSignature(params) {
  return request({
    url: '/webadmin/feedbackManage/findAllSignature',
    method: 'get',
    params
  })
}

export function leadershipApproval(params) {
  return request({
    url: '/webadmin/leadershipApproval/findAll',
    method: 'get',
    params
  })
}

export function allow(data) {
  return request({
    url: '/webadmin/leadershipApproval/allow',
    method: 'put',
    data
  })
}

export function leadershipApprovalDetail(params) {
  return request({
    url: '/webadmin/leadershipApproval/leadershipApprovalDetail',
    method: 'get',
    params
  })
}

export function feedbackRecordList(params) {
  return request({
    url: '/webadmin/feedbackRecordList/findAll',
    method: 'get',
    params
  })
}

export function feedbackRecordListId(params) {
  return request({
    url: '/webadmin/feedbackRecordList/findById',
    method: 'get',
    params
  })
}

export function feedbackInsert(data) {
  return request({
    url: '/webadmin/feedbackManage/feedback',
    method: 'put',
    data
  })
}

export function attachmentDelete(params) {
  return request({
    url: '/webadmin/feedbackManage/attachmentDelete',
    method: 'delete',
    params
  })
}

export function findAttachments(params) {
  return request({
    url: '/webadmin/feedbackManage/findAttachments',
    method: 'get',
    params
  })
}

export function attachmentDeleteByFeedbackId(params) {
  return request({
    url: '/webadmin/feedbackManage/attachmentDeleteByFeedbackId',
    method: 'delete',
    params
  })
}

