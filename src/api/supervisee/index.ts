import { BaseApi } from '..'
import { GetMePayload } from '../authentication/types'
import { BackendResponse } from '../types'

export class SuperviseeApi extends BaseApi {
  static async getAllSupervisee() {
    return this.request<BackendResponse<GetMePayload[]>>('get', '/supervisee/all')
  }

  static async getSuperviseeById(id: number) {
    return this.request<BackendResponse<GetMePayload>>('get', `/supervisee/${id}`)
  }

  /*static async getSuperviser(superviserID: number) {
    return this.request<BackendResponse<GetMePayload>>('get', `/user/${superviserID}`)
  }*/
}
