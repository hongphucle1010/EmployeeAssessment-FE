export function setAccessToken(token: string) {
  localStorage.setItem('accessToken', token)
}

export function getAccessToken() {
  return localStorage.getItem('accessToken')
}

export function clearAccessToken() {
  localStorage.removeItem('accessToken')
}

export function setRefreshToken(token: string) {
  localStorage.setItem('refreshToken', token)
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken')
}

export function clearRefreshToken() {
  localStorage.removeItem('refreshToken')
}

export function clearAllTokens() {
  clearAccessToken()
  clearRefreshToken()
}
