import { IRatedGame, IScores } from '../games/types'

export interface IUser {
	name: string
	_id: string
	email: string
	ratedGames: IRatedGame[]
}
export interface IUserState {
	user: IUser | null
	token: string | null
}

export interface IGetUserResponse {
	user: IUser
}
export interface IGetUserGamesResponse {
	data: IScores[]
}
export interface IGetUsersResponse {
	users: IUser[]
}
