import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userId: null,
    isLoading: false
  },
  reducers: {
    login(state, action) {
      const {token, id} = action.payload
      state.token = token
      state.userId = id
    },
    logOut(state) {
      localStorage.removeItem('userData')
      state.token = null
      state.userId = null
    },
    startLoading(state){
      state.isLoading = true
    },
    stopLoading(state){
      state.isLoading = false
    }
  },
})




export const { login, logOut, startLoading, stopLoading } = authSlice.actions

export const auth = authSlice.reducer