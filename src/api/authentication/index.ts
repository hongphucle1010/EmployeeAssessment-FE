import { apiClient } from '..'
import { BackendResponse } from '../types'
import { LogInPayload } from './types'

export async function logInApi(username: string, password: string) {
  try {
    const response = await apiClient.post<BackendResponse<LogInPayload>>('/auth/login', {
      username,
      password
    })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
