import { serverApi } from '../../apis/serverApi/serverApi'
import { IAddGameScores, IGameScoresResponse, IScores } from '../games/types'

const gameScoreApiSlice = serverApi.injectEndpoints({
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
		})
	})
})

export const { useGetGameScoresQuery, useAddGameScoresMutation } =
	gameScoreApiSlice
