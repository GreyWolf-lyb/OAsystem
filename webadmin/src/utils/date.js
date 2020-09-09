/*
 * @Author: lyy
 * @Date: 2020-06-09 23:06:26
 * @LastEditTime: 2020-06-09 23:33:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */

/* eslint-disable eol-last */
/* eslint-disable prefer-const */
/**
 * 返回指定时间戳之间的时间间隔
 *  @param {*} startTime 开始时间的时间戳
 *  @param {*} endTime 结束时间的时间戳
 *  @return {string} str 返回时间字符串
 */
export function getTimeInterval(startTime, endTime) {
  let runTime = parseInt((endTime - startTime) / 1000)
  // eslint-disable-next-line prefer-const
  let year = Math.floor(runTime / 86400 / 365)
  runTime = runTime % (86400 * 365)
  let month = Math.floor(runTime / 86400 / 30)
  runTime = runTime % (86400 * 30)
  let day = Math.floor(runTime / 86400)
  runTime = runTime % 86400
  let hour = Math.floor(runTime / 3600)
  runTime = runTime % 3600
  let minute = Math.floor(runTime / 60)
  runTime = runTime % 60
  let second = runTime
  let str = ''
  if (year > 0) {
    str = year + '年'
  }
  if (year <= 0 && month > 0) {
    str = month + '月'
  }
  if (year <= 0 && month <= 0 && day > 0) {
    str = day + '天'
  }
  if (year <= 0 && month <= 0 && day <= 0 && hour > 0) {
    str = hour + '小时'
  }
  if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute > 0) {
    str = minute + '分钟'
  }
  if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second > 0) {
    str += second + '秒'
  }
  str += '前'
  return str
  // eslint-disable-next-line eol-last
}

/**
 * 判断是否为闰年
 * @param  {number} year 要判断的年份
 * @return {boolean} 返回布尔值
 */
export function leapYear(year) {
  return !(year % (year % 100 ? 4 : 400))
}

/**
 * 返回两个日期之间的差异 (以天为值)。
 * @param  {number} year 要判断的年份
 * @return {boolean} 返回布尔值
 */
export const DiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24)
// DiffBetweenDates(new Date("2020-12-13"), new Date("2022-12-22")) -> 9