export interface BackendResponse<T> {
  status: number
  message: string
  data: T
}

export interface BackendFailureResponse {
  status: number
  message: string
}
