import axios from 'axios'
import { BACKEND_URL } from '../lib/helper/constant'
import { getAccessToken } from '../lib/helper/authentication'

const host = BACKEND_URL

export const apiHost = `${host}`

export const apiClient = axios.create({
  baseURL: apiHost,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken() // use helper function to get access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}` // set in header
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export abstract class BaseApi {
  private static apiClient = apiClient
  protected static async request<T>(method: 'get' | 'post' | 'put' | 'delete' | 'patch', url: string, data?: object) {
    try {
      const response = await (method === 'get' ? this.apiClient.get<T>(url) : this.apiClient[method]<T>(url, data))
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
