import React from 'react'
import { Toast } from 'native-base'

// 检查后端返回的状态码
// 并作出相应的处理
/*
 @params: response object
 @params: text when response failed
 @return: bool
 */
export function checkStatus(meta, errorText) {
  const { status } = meta
  const errMessage = (
    <div>
      <div>{errorText}</div>
      <div>{meta.status}</div>
    </div>
  )
  if (status === 200) return true
  // 显示错误提示
  if (errorText) showError(errMessage)
  return false
}

// 将下划线转变成小驼峰
// 浅层转换
/*
 @params: object
 @return: object
 */
export function underlineToCamel(obj) {
  const ret = {}
  Object.keys(obj).forEach(
    key =>
      (ret[key.replace(/_(\w)/g, (all, letter) => letter.toUpperCase())] =
        obj[key])
  )
  return ret
}

// 将小驼峰转换成下划线
// 浅层转换
/*
 @params: object
 @return: object
 */
export function camelToUnderline(obj) {
  const ret = {}
  Object.keys(obj).forEach(
    key => (ret[key.replace(/([A-Z])/g, '_$1').toLowerCase()] = obj[key])
  )
  return ret
}

/*
 @params: object
 @return: bool
 */
export function isEmptyObject(obj) {
  return Object.keys(obj).length > 0
}

export function showError(text, duration, onClose) {
  Toast.fail(text, duration, onClose)
}

export function showToast(text, type = 'info', duration, onClose) {
  Toast[type](text, duration, onClose)
}

export function addKey(arr) {
  return arr.map(({ _id, ...rest }) => ({
    key: _id,
    ...rest,
  }))
}
