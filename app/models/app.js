import { NavigationActions } from 'react-navigation'

import { createAction } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'app',
  state: {
    fetching: false,
    login: false,
  },
  reducers: {
    loginStart(state, { payload }) {
      return { ...state, ...payload, fetching: true }
    },
    loginEnd(state, { payload }) {
      return { ...state, ...payload, fetching: false }
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put(createAction('loginStart')())
      const login = yield call(authService.login, payload)
      if (login) {
        yield put(
          // NavigationActions.reset({
          //   index: 0,
          //   actions: [NavigationActions.navigate({ routeName: 'Customize' })],
          // })
          NavigationActions.navigate({ routeName: 'Customize' })
        )
      }
      yield put(createAction('loginEnd')({ login }))
    },
  },
}
