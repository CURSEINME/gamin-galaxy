import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ILoginForm } from '../../../pages/Login/LoginForm'
import { IRegisterForm } from '../../../pages/Register/RegisterForm'
import {
	IAddGameScores,
	IGameScoresResponse,
	IScores
} from '../gameDbApi/types'
import { IUser } from '../userSlice/types'
import { logOut, setUser } from '../userSlice/userSlice'

interface IGetUserResponse {
	user: IUser
}
interface IGetUserGamesResponse {
	data: IScores[]
}

export const serverApi = createApi({
	reducerPath: 'serverApi',
	tagTypes: ['gameScores', 'getMe', 'userGames'],
	baseQuery: fetchBaseQuery({ baseUrl: 'https://gamin-galaxy-api.onrender.com' }),
	endpoints: builder => ({
		getGameScores: builder.query<IScores, string>({
			query: (slug: string) => `getGameScores?slug=${slug}`,
			providesTags: ['gameScores'],
			transformResponse: (response: IGameScoresResponse) => response.gameScores
		}),
		addGameScores: builder.mutation<null, IAddGameScores>({
			query: ({ _id, scores }: IAddGameScores) => ({
				url: `addGameScores?_id=${_id}`,
				body: scores,
				method: 'POST'
			}),
			invalidatesTags: ['gameScores', 'userGames']
		}),
		login: builder.mutation<IUser, ILoginForm>({
			query: ({ email, password }: ILoginForm) => ({
				url: 'login',
				body: { email, password },
				method: 'POST'
			})
		}),
		register: builder.mutation<IUser, IRegisterForm>({
			query: ({ name, password, email }: IRegisterForm) => ({
				url: 'register',
				body: { name, password, email },
				method: 'POST'
			})
		}),
		getUserGames: builder.query<IScores[], string>({
			query: (_id: string) => `/getUserGames?_id=${_id}`,
			transformResponse: (response: IGetUserGamesResponse) => response.data,
			providesTags: ['userGames']
		}),
		getUser: builder.query<IUser, string>({
			query: (_id: string) => `/getUser?_id=${_id}`,
			transformResponse: (response: IGetUserResponse) => response.user
		}),
		getMe: builder.query<IUser, void>({
			query: () => ({
				url: '/getMe',
				method: 'GET',
				headers: {
					Authorization: `${localStorage.getItem('token')}`
				}
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setUser(data))
				} catch (err) {
					dispatch(logOut(null))
				}
			},
			providesTags: ['getMe']
		})
	})
})

export const {
	useGetGameScoresQuery,
	useAddGameScoresMutation,
	useLoginMutation,
	useRegisterMutation,
	useGetMeQuery,
	useGetUserGamesQuery,
	useGetUserQuery
} = serverApi
