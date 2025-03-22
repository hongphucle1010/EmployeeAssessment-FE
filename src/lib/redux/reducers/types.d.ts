export type Role = 'GUEST' | 'EMPLOYEE' | 'SUPERVISER'

export interface User {
  id: string
  name: string
  role: Role
  email: string
}
