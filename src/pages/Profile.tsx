import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { useGetUserGamesDetailsQuery } from '../store/slices/gameDbApi/gameDbApi'
import {
	useGetUserGamesQuery,
	useGetUserQuery
} from '../store/slices/serverApi/serverApi'
import { RootState } from '../store/store'

const Profile = () => {
	const currentUserId = useSelector((state: RootState) => state.user.user?._id)

	const { _id } = useParams()

	const { data: user } = useGetUserQuery(_id || '', {
		skip: _id ? false : true
	})

	const { data: userGames } = useGetUserGamesQuery(user?._id || '', {
		skip: user ? false : true
	})

	const { data: ratedGames } = useGetUserGamesDetailsQuery(userGames || [], {
		skip: userGames ? false : true
	})

	const renderRatedGames = ratedGames?.map((game, index) => {
		const userGame = userGames?.find(item => item.slug == game.slug)

		return (
			<Link
				to={`/games/${game.slug}`}
				className="flex max-w-[1050px] flex-col items-center md:grid md:grid-cols-2"
				key={game.slug}
			>
				<div className="mb-4 flex w-full items-center gap-5">
					<img className="h-[50px] rounded-sm" src={game.background_image} />
					<span className="text-xl font-bold text-white">{game.name}</span>
				</div>
				<ul className="flex gap-6">
					<li className="flex items-center gap-1 text-xl font-bold">
						<img src="/settings.svg" />
						<div className="text-white">{userGame?.graphics}</div>
					</li>
					<li className="flex items-center gap-1 text-xl font-bold">
						<img src="/games.svg" />
						<div className="text-white">{userGame?.gameplay}</div>
					</li>
					<li className="flex items-center gap-1 text-xl font-bold">
						<img src="/music-note.svg" />
						<div className="text-white">{userGame?.sound}</div>
					</li>
					<li className="flex items-center gap-1 text-xl font-bold">
						<img src="/scroll.svg" />
						<div className="text-white">{userGame?.storyLine}</div>
					</li>
				</ul>
			</Link>
		)
	})

	return (
		<>
			{!ratedGames || !user ? (
				<div className="flex justify-center">
					<div className="lds-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			) : (
				<div>
					<h1 className="text-center text-4xl text-white">Profile</h1>
					<div className='flex justify-between'>
						<ul className="my-10 flex flex-col gap-3">
							<li className="flex gap-8">
								<div className="text-2xl text-white">Name:</div>
								<div className="text-2xl text-white">{user?.name}</div>
							</li>
							{currentUserId === user?._id && (
								<li className="flex gap-10">
									<div className="text-2xl text-white">Email:</div>
									<div className="text-2xl text-white">{user?.email}</div>
								</li>
							)}
						</ul>
					</div>
					<div>
						<h1 className="text-center text-2xl text-white">Rated games</h1>
						{ratedGames.length == 0 ? (
							<p className="mt-10 text-center text-xl text-white">
								You dont have rated games yet
							</p>
						) : (
							<div className="mt-10 flex flex-col gap-14">
								{renderRatedGames}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default Profile
