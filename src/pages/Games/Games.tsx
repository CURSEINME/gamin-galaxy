import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import Pagination from '../../components/Pagination'
import { useResizeImage } from '../../components/utils'
import Game from './Game/Game'
import { useGetAllGamesQuery } from '../../store/slices/games/gamesApiSlice'

const Games = () => {
	const [params, setParams] = useSearchParams()

	const searchName = params.get('query') || ''
	const page = Number(params.get('page')) || 1

	const { data: games, isFetching } = useGetAllGamesQuery({ searchName, page })

	const renderGames = games?.map((game, index) => {
		const resizeImage = useResizeImage(game.background_image)
		return (
			<Game
				key={index}
				name={game.name}
				slug={game.slug}
				background_image={resizeImage}
			/>
		)
	})

	const location = useLocation()

	const pathname = location.pathname

	const onChangePage = (page: number) => {
		pathname === '/'
			? setParams({ page: String(page) })
			: setParams({ query: searchName, page: String(page) })
	}

	useEffect(() => {
		try {
			fetch(
				'https://api.rawg.io/api/games?key=c542e67aec3a4340908f9de9e86038af&search=dota'
			)
				.then(data => data.json())
				.then(data => console.log(data, 'games'))
		} catch (err) {
			console.log(err)
		}
	}, [])
	return (
		<div>
			{isFetching ? (
				<div className="flex justify-center">
					<div className="lds-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center">
					<div className="grid gap-x-12 gap-y-10 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{renderGames}
					</div>
					{games?.length != 0 && (
						<Pagination currentPage={page} onChangePage={onChangePage} />
					)}
				</div>
			)}
		</div>
	)
}

export default Games
