export interface LogInPayload {
  token: string
}

export interface GetMePayload {
  id: string
  username: string
  role: 'ADMIN' | 'USER' | ''
  supervisor: number
}
