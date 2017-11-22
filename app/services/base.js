import qs from 'qs'
import request from '../utils/request'

// 对get、post、delete、put四种方法做简单封装
// 后面所有的请求都是调用这几个方法

export async function get({ path, params }) {
  return request(`${path}${params ? `?${qs.stringify(params)}` : ''}`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

export async function post({ path, params }) {
  return request(path, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  })
}

export async function remove({ path, params }) {
  return request(path, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  })
}

export async function put({ path, params }) {
  return request(path, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  })
}
