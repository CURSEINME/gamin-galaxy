import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serverApi = createApi({
	reducerPath: 'serverApi',
	tagTypes: ['gameScores', 'getMe', 'userGames'],
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
	endpoints: builder => ({})
})