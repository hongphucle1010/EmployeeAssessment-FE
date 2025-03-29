export interface LogInPayload {
  token: string
}

export interface GetMePayload {
  id: number
  username: string
  role: 'ADMIN' | 'USER' | ''
  supervisor: number
}
