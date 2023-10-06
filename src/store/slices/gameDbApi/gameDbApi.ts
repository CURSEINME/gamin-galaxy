import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { key } from '../../../axios/gameApiKey'
import { IGame, IScores } from './types'
import { IGameDetail, IScreenshot } from './types'

interface IGetGames {
	searchName: string
	page: number
}

interface IGetGamesResponse {
	results: IGame[]
}
interface IGetScreenshots {
	results: IScreenshot[]
}

export const gameApi = createApi({
	reducerPath: 'gameApi',
	tagTypes: ['userGameScores'],
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api' }),
	endpoints: builder => ({
		getAllGames: builder.query<IGame[], IGetGames>({
			query: ({ searchName, page }) =>
				`games?key=${key}&search=${searchName}&page=${page}`,
			transformResponse: (response: IGetGamesResponse) => response.results
		}),
		getGameDetail: builder.query<IGameDetail, string>({
			query: (slug: string) => `games/${slug}?key=${key}`
		}),
		getGameScreenshots: builder.query<IScreenshot[], string>({
			query: (slug: string) => `games/${slug}/screenshots?key=${key}`,
			transformResponse: (response: IGetScreenshots) => response.results
		}),
		getUserGamesDetails: builder.query<any[], IScores[]>({
			async queryFn(data, api, _extraOptions, baseQuery) {
				const slugs = data.map(item => item.slug)

				const res = await Promise.all(
					slugs.map(slug => baseQuery(`games/${slug}?key=${key}`))
				)
				return { data: res.map(item => item.data) }
			}
		})
	})
})

export const {
	useGetAllGamesQuery,
	useGetGameDetailQuery,
	useGetGameScreenshotsQuery,
	useGetUserGamesDetailsQuery
} = gameApi
