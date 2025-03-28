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
    return this.request<BackendResponse<Assessment[]>>('get', '/assessment/me')
  }

  static async getMyAssesmentByUserId(id: number) {
    return this.request<BackendResponse<Assessment[]>>('get', `/assessment/supervisee/${id}`)
  }

  static async createAssessment(data: Omit<Assessment, 'id'>) {
    return this.request('post', '/assessment', data)
  }

  static async updateAssessment(id: number, data: Assessment) {
    return this.request<BackendResponse<Assessment>>('put', `/assessment/${id}`, data)
  }

  static async deleteAssessment(id: number) {
    return this.request<BackendResponse<object>>('delete', `/assessment/${id}`)
  }
}
