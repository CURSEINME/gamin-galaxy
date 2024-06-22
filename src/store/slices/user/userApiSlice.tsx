import { serverApi } from '../../apis/serverApi/serverApi'
import { IScores } from '../games/types'
import {
	IGetUserGamesResponse,
	IGetUserResponse,
	IGetUsersResponse,
	IUser
} from './types'
import { logOut, setUser } from './userSlice'

const userApiSlice = serverApi.injectEndpoints({
	endpoints: builder => ({
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
		}),
		getUsers: builder.query<IUser[], string>({
			query: name => `/getUsers?name=${name}`,
			transformResponse: (response: IGetUsersResponse) => response.users
		})
	})
})

export const {
	useGetUserGamesQuery,
	useGetUserQuery,
	useGetMeQuery,
	useGetUsersQuery
} = userApiSlice
