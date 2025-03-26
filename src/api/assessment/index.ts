import { BaseApi } from '..'
import { Assessment } from './types'

export class AssessmentApi extends BaseApi {
  static async getAssessments() {
    return this.request('get', '/assessments')
  }

  static async getAssessmentById(id: number) {
    return this.request('get', `/assessments/${id}`)
  }

  static async createAssessment(data: Assessment) {
    return this.request('post', '/assessments', data)
  }

  static async deleteAssessment(id: number) {
    return this.request('delete', `/assessments/${id}`)
  }
}
