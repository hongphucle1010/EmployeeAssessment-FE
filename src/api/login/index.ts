import { AxiosError } from 'axios'
interface loginRequest {
  username: string
  password: string
}
interface loginResponse {
  token: string
  status: number
  message: string
}
export async function logInApi(data: loginRequest) {
  try {
    let response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(response)
    if (!response.ok) {
      alert(`Login failed: ${response.status} ${response.statusText}`)
      throw new Error(`Login failed: ${response.status} ${response.statusText}`)
    }
    const res: loginResponse = await response.json()
    console.log('Response:', res)
    if (res.status !== 200) {
      alert(`Login failed: ${res.message}`)
      throw new Error(`Login failed: ${res.message}`)
    }
    return { token: res.token }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else console.error(error)
    throw new Error('Login failed')
  }
}
