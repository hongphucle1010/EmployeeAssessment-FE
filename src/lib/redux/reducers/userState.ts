import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Role, User } from './types'
import { clearAllTokens } from '../../helper/authentication.ts'

interface AuthorizationState {
  value: User
}

const authorization = createSlice({
  name: 'authorization',
  initialState: {
    value: {
      id: '',
      name: '',
      role: 'GUEST' as Role,
      supervisor: 0
    }
  },
  reducers: {
    logOutReducer: (state: AuthorizationState) => {
      state.value.id = ''
      state.value.name = ''
      state.value.role = 'GUEST'
      state.value.supervisor = 0
      clearAllTokens()
      window.location.href = '/'
    },
    logInReducer: (state: AuthorizationState, action: PayloadAction<User>) => {
      state.value = action.payload
    }
  }
})

export const { logOutReducer, logInReducer } = authorization.actions

const userReducer = authorization.reducer
export default userReducer
