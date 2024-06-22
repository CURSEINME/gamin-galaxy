import { createSlice } from '@reduxjs/toolkit'

import { IUserState } from './types'

const initialState: IUserState = {
	user: null,
	token: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,

	reducers: {
		setUser: (state, { payload }) => {
			localStorage.setItem('token', payload.token)
			state.token = payload.token
			state.user = payload.user
		},
		logOut: (state, action) => {
			localStorage.removeItem('token')
			state.user = null
			state.token = null
		}
	}
})

export const { setUser, logOut } = userSlice.actions
export default userSlice.reducer
