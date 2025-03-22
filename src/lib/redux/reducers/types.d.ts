export type Role = 'GUEST' | 'EMPLOYEE' | 'SUPERVISOR'

export interface User {
  id: string
  name: string
  role: Role
  email: string
}
