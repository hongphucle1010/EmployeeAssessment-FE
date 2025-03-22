import { AxiosError } from 'axios'

export async function logInApi(code: string) {
  try {
    // const response = await apiClient.get<LogInWithGoogleResponse>('/auth/google?code=' + code)
    const response = {
        data: true,
    };
    // const response: LogInWithGoogleResponse = await fetchUserInfo(access_token)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else console.error(error)
    throw new Error('Login failed')
  }
}
