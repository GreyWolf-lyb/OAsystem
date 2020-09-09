/*
 * @Author: your name
 * @Date: 2020-08-18 15:37:56
 * @LastEditTime: 2020-08-19 22:53:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webadmin\src\utils\water.js
 */
const setWatermark = (str1, str2) => {
	const container = document.getElementById('sysmeter')
  const id = '1.23452384164.123412415'
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  const can = document.createElement('canvas')
  // 设置canvas画布大小
  can.width = 290
  can.height = 170
  const cans = can.getContext('2d')
  cans.rotate(-30 * Math.PI / 180) // 水印旋转角度
  cans.font = '14px Vedana'
  cans.fillStyle = '#333333'
  cans.textAlign = 'center'
  cans.textBaseline = 'Middle'
  // cans.fillText(str1, can.width / 2, can.height) // 水印在画布的位置x，y轴
  cans.fillText(str2, can.width / 2, can.height + 22)
  const div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '20px'
  div.style.left = '0px'
  div.style.opacity = '0.15'
  div.style.position = 'absolute'
  div.style.zIndex = '100000'
  // div.style.width = document.documentElement.clientWidth + 'px'
	// div.style.height = document.documentElement.clientHeight + 'px'
	div.style.width = '100%'
	div.style.height = '90%'
	div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
	container.style.position = 'relative'
	container.insertBefore(div, container.firstChild)
  return id
}

// 添加水印方法
export const setWaterMark = (str1, str2) => {
  let id = setWatermark(str1, str2)
  if (document.getElementById(id) === null) {
    id = setWatermark(str1, str2)
  }
}

// 移除水印方法
export const removeWatermark = () => {
  const id = '1.23452384164.123412415'
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }
}

export function putText(str1, str2) {
	let id = setWatermark(str1, str2)
  if (document.getElementById(id) === null) {
    id = setWatermark(str1, str2)
	}
	return true;
}

// 移除水印方法
export function removeText() {
  const id = '1.23452384164.123412415'
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }
}

function getRandom (n, m) {
	let num = Math.floor(Math.random() * (m - n + 1) + n)
	return num
}