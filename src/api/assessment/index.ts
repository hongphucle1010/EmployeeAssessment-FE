import { BaseApi } from '..'
import { BackendResponse } from '../types'
import { Assessment } from './types'

export class AssessmentApi extends BaseApi {
  static async getAllAssessment() {
    return this.request<BackendResponse<Assessment[]>>('get', '/assessment/all')
  }

  static async getAssessmentById(id: number) {
    return this.request<BackendResponse<Assessment[]>>('get', `/assessment/${id}`)
  }

  static async getMyAssesment() {
    return this.request<BackendResponse<Assessment[]>>('get', '/assessment/my')
  }

  static async createAssessment(data: Assessment) {
    return this.request('post', '/assessment', data)
  }

  static async deleteAssessment(id: number) {
    return this.request('delete', `/assessment/${id}`)
  }
}
