import { BaseApi } from '..'
import { BackendResponse } from '../types'
import { Criteria } from './types'

export class CriteriaApi extends BaseApi {
  static async getCriteria() {
    return this.request<BackendResponse<Criteria[]>>('get', '/criteria')
  }

  static async getCriteriaById(id: number) {
    return this.request<BackendResponse<Criteria>>('get', `/criteria/${id}`)
  }

  static async createCriteria(data: Omit<Criteria, 'id'>) {
    return this.request<BackendResponse<Criteria>>('post', '/criteria', data)
  }
}
