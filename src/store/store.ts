import { configureStore } from '@reduxjs/toolkit'

import { gameApi } from './apis/gameDbApi/gameDbApi'
import { serverApi } from './apis/serverApi/serverApi'
import userReducer from './slices/user/userSlice'

export const store = configureStore({
	reducer: {
		[gameApi.reducerPath]: gameApi.reducer,
		[serverApi.reducerPath]: serverApi.reducer,
		user: userReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([gameApi.middleware, serverApi.middleware]),
	devTools: false
})

export type RootState = ReturnType<typeof store.getState>
