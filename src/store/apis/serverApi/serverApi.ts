import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serverApi = createApi({
	reducerPath: 'serverApi',
	tagTypes: ['gameScores', 'getMe', 'userGames'],
	baseQuery: fetchBaseQuery({ baseUrl: 'https://gamin-galaxy-api.onrender.com' }),
	endpoints: builder => ({})
})