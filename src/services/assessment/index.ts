import { BaseService } from '..'
import { AssessmentApi } from '../../api/assessment'
import { Assessment } from '../../api/assessment/types'

export class AssessmentService extends BaseService {
  static async getAssessments() {
    const response = await this.callApi(AssessmentApi, 'getAllAssessment')
    return response.data
  }

  static async getAssessmentById(id: number) {
    const response = await this.callApi(AssessmentApi, 'getAssessmentById', id)
    return response.data
  }

  static async createAssessment(data: Assessment) {
    const response = await this.callApi(AssessmentApi, 'createAssessment', data)
    return response.data
  }

  static async deleteAssessment(id: number) {
    const response = await this.callApi(AssessmentApi, 'deleteAssessment', id)
    return response.data
  }

  static async getMyAssessment() {
    const response = await this.callApi(AssessmentApi, 'getMyAssesment')
    return response.data
  }
}
