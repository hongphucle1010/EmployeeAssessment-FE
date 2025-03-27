import { BaseApi } from '..'
import { Assessment } from './types'

export class AssessmentApi extends BaseApi {
  static async getAssessments() {
    return this.request('get', '/assessment')
  }

  static async getAssessmentById(id: number) {
    return this.request('get', `/assessment/${id}`)
  }

  static async createAssessment(data: Assessment) {
    return this.request('post', '/assessment', data)
  }

  static async deleteAssessment(id: number) {
    return this.request('delete', `/assessment/${id}`)
  }
}
