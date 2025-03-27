export type Role = 'GUEST' | 'USER' | 'ADMIN'

export interface User {
  id: string
  name: string
  role: Role
  supervisor: number
}
