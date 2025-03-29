import { BaseService } from '..'
import { SuperviseeApi } from '../../api/supervisee'

export class SuperviseeService extends BaseService {
  static async getAllSupervisee() {
    const response = await this.callApi(SuperviseeApi, 'getAllSupervisee')
    return response.data
  }

  static async getSuperviseeById(id: number) {
    const response = await this.callApi(SuperviseeApi, 'getSuperviseeById', id)
    return response.data
  }
}
