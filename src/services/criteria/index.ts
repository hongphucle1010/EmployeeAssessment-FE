import { BaseService } from '..'
import { CriteriaApi } from '../../api/criteria'
import { Criteria } from '../../api/criteria/types'

export class CriteriaService extends BaseService {
  static async getCriterias() {
    const response = await this.callApi(CriteriaApi, 'getCriteria')
    return response.data
  }

  static async getCriteriaById(id: number) {
    const response = await this.callApi(CriteriaApi, 'getCriteriaById', id)
    return response.data
  }

  static async createCriteria(data: Omit<Criteria, 'id'>) {
    const response = await this.callApi(CriteriaApi, 'createCriteria', data)
    return response.data
  }
}
