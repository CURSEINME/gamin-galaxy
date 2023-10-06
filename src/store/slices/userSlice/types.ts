import { IRatedGame } from '../gameDbApi/types'

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
