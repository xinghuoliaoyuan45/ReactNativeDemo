import { createAction, delay } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'test',
  state: {
    loading: false,
  },
  reducers: {
    showLoading(state, { payload }) {
      return { ...state, ...payload, loading: true }
    },
    hideLoading(state, { payload }) {
      return { ...state, ...payload, loading: false }
    },
  },
  effects: {
    *getData({ payload }, { call, put }) {
      yield put(createAction('showLoading')())
      yield call(delay, 1000)
      yield put(createAction('hideLoading')())
    },
  },
}
