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

  static async createAssessment(data: Omit<Assessment,'id'>) {
    const response = await this.callApi(AssessmentApi, 'createAssessment', data)
    return response.data
  }

  static async deleteAssessment(id: number) {
    const response = await this.callApi(AssessmentApi, 'deleteAssessment', id)
    return response.data
  }

  static async getAssessmentByUserId(id: number) {
    const response = await this.callApi(AssessmentApi, 'getMyAssesmentByUserId', id)
    return response.data
  }

  static async getMyAssessment() {
    const response = await this.callApi(AssessmentApi, 'getMyAssesment')
    return response.data
  }
  static async updateAssessment(id: number, data: Assessment) {
    const response = await this.callApi(AssessmentApi, 'updateAssessment', id, data)
    return response.data
  }
}
