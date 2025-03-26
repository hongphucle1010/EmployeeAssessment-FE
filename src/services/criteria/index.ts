import { BaseService } from '..'
import { CriteriaApi } from '../../api/criteria'
import { Criteria } from '../../api/criteria/types'

export class CriteriaService extends BaseService {
  static async getCriterias() {
    return this.callApi(CriteriaApi, 'getCriteria')
  }

  static async getCriteriaById(id: number) {
    return this.callApi(CriteriaApi, 'getCriteriaById', id)
  }

  static async createCriteria(data: Omit<Criteria, 'id'>) {
    return this.callApi(CriteriaApi, 'createCriteria', data)
  }
}
