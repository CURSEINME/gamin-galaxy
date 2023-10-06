import { configureStore } from '@reduxjs/toolkit'

import { gameApi } from './slices/gameDbApi/gameDbApi'
import { serverApi } from './slices/serverApi/serverApi'
import userReducer from './slices/userSlice/userSlice'

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
