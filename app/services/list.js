import { get } from './base'

export async function getList() {
  return get({ path: `/` })
}
