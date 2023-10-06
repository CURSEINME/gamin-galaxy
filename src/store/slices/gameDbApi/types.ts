export interface IScreenshot {
	image: string
	id: string
}
export interface IStore {
	domain: string
	id: number
	name: string
}
export interface IStores {
	url: string
	store: IStore
}
export interface IScores {
	slug: string
	graphics: number
	gameplay: number
	sound: number
	storyLine: number
}
export interface IGameDetail {
	name: string
	id: string
	slug: string
	stores: IStores[]
	background_image: string
	description: string
}
export interface IGameState {
	loading: boolean
	gameDetail: IGameDetail
}
export interface IAddGameScores {
	_id: string
	scores: IScores
}
export interface IGame {
	slug: string
	id: number
	name: string
	released: string
	background_image: string
}
export interface IGamesState {
	games: IGame[]
	loading: boolean
}
export interface IGameScoresResponse {
	gameScores: IScores
}

export interface IRatedGame extends IScores {
	slug: string
}
