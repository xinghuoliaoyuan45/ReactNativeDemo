import * as authService from '../services/auth'
import { getList } from '../services/list'
import { createAction, NavigationActions } from '../utils'
import { addKey } from '../utils/tools'

export default {
  namespace: 'app',
  state: {
    fetching: false,
    login: false,
    list: [],
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield put(createAction('loginStart')())
      const login = yield call(authService.login, payload)
      if (login) {
        yield put(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Tabbar' })],
          })
        )
      }
      yield put(createAction('loginEnd')({ login }))
    },
    *getList({ payload }, { call, put }) {
      const { data } = yield call(getList)
      console.log(data.data)
      yield put({
        type: 'reducer',
        payload: { list: addKey(data.data) },
      })
    },
    *clear({ payload }, { put }) {
      yield put({
        type: 'reducer',
        payload: { list: [] },
      })
    },
  },
  reducers: {
    reducer(state, { payload }) {
      return { ...state, ...payload }
    },
    loginStart(state, { payload }) {
      return { ...state, ...payload, fetching: true }
    },
    loginEnd(state, { payload }) {
      return { ...state, ...payload, fetching: false }
    },
  },
}
