export interface BackendResponse<T> {
  status: number
  message: string
  data: T
}
