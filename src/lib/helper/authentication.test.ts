import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
  setRefreshToken,
  getRefreshToken,
  clearRefreshToken,
  clearAllTokens
} from './authentication'

describe('Authentication Helper Functions', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should set and get access token', () => {
    setAccessToken('testAccessToken')
    expect(getAccessToken()).toBe('testAccessToken')
  })

  it('should clear access token', () => {
    setAccessToken('testAccessToken')
    clearAccessToken()
    expect(getAccessToken()).toBeNull()
  })

  it('should set and get refresh token', () => {
    setRefreshToken('testRefreshToken')
    expect(getRefreshToken()).toBe('testRefreshToken')
  })

  it('should clear refresh token', () => {
    setRefreshToken('testRefreshToken')
    clearRefreshToken()
    expect(getRefreshToken()).toBeNull()
  })

  it('should clear all tokens', () => {
    setAccessToken('testAccessToken')
    setRefreshToken('testRefreshToken')
    clearAllTokens()
    expect(getAccessToken()).toBeNull()
    expect(getRefreshToken()).toBeNull()
  })
})
