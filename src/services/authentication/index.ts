import { Dispatch } from '@reduxjs/toolkit'
import { BaseService } from '..'
import { AuthencationApi } from '../../api/authentication'
import { setAccessToken } from '../../lib/helper/authentication'
import { logInReducer, logOutReducer } from '../../lib/redux/reducers/userState'

export class AuthenticationService extends BaseService {
  static async logIn(username: string, password: string, dispatch: Dispatch) {
    // Log in
    const response = await this.callApi(AuthencationApi, 'logIn', username, password)
    const token = response.data.data.token
    setAccessToken(token)

    // Get me
    const me = await this.callApi(AuthencationApi, 'getMe')
    dispatch(
      logInReducer({
        id: me.data.data.id.toString(),
        name: me.data.data.username,
        role: me.data.data.role ? me.data.data.role : 'GUEST',
        supervisor: me.data.data.supervisor ? me.data.data.supervisor : 0
      })
    )
  }

  static logOut(dispatch: Dispatch) {
    dispatch(logOutReducer())
  }

  static async register(username: string, password: string) {
    await this.callApi(AuthencationApi, 'register', username, password)
  }
}
