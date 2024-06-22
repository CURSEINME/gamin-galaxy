import { Link } from 'react-router-dom'

import { useGetAllGamesQuery } from '../../store/slices/games/gamesApiSlice'
import Loader from '../Loader'

const SearchList = ({
	searchName,
	focus,
	setFocus
}: {
	searchName: string
	focus: boolean
	setFocus: (value: boolean) => void
}) => {
	const page = 1

	const { data: games, isFetching, isLoading } = useGetAllGamesQuery(
		{ searchName, page },
		{
			skip: searchName ? false : true
		}
	)

	const gamesList = games?.slice(10).map(game => {
		return <Link onClick={() => setFocus(false)} to={`/games/${game.slug}`}>{game.name}</Link>
	})

	return (
		searchName && gamesList && (
			<div className={`${focus ? 'flex' : 'hidden'} gap-2 absolute z-10 mt-2 w-full flex-col rounded-xl bg-black p-5 text-xl text-white`}>
				{isFetching || isLoading ? <div className='flex flex-col items-center justify-center'><Loader/></div> : gamesList}
			</div>
		)
	) 
}

export default SearchList
