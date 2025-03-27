import { BaseApi } from '..'
import { BackendResponse } from '../types'
import { GetMePayload, LogInPayload } from './types'

export class AuthencationApi extends BaseApi {
  static async logIn(username: string, password: string) {
    return this.request<BackendResponse<LogInPayload>>('post', '/auth/login', { username, password })
  }
  static async getMe() {
    return this.request<BackendResponse<GetMePayload>>('get', '/user/me')
  }
  static async register(username: string, password: string, role: string) {
    return this.request<BackendResponse<object>>('post', '/user/register', { username, password, role })
  }
}
