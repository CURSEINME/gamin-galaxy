import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useParams } from 'react-router-dom'

import { useResizeImage } from '../../../components/utils'
import { useGetGameDetailQuery } from '../../../store/slices/games/gamesApiSlice'
import { useGetGameScreenshotsQuery } from '../../../store/slices/games/gamesApiSlice'
import GameScreenshots from './GameScreenshots'

const GameDetailed = () => {
	const params = useParams()
	const slug = params.slug || ''

	const { data: game, isFetching: isGameFetching } = useGetGameDetailQuery(slug)
	const { data: screenshots, isFetching: isScreenshotsFetching } =
		useGetGameScreenshotsQuery(slug)

	const descLess = game?.description.slice(0, 250) + '...'
	const [descMore, setDescMore] = useState(false)

	const renderStores = game?.stores.map(item => {
		return (
			<a
				className="rounded-lg bg-black px-4 py-2 text-xl text-white"
				key={item.store.id}
				href={item.url}
			>
				{item.store.name}
			</a>
		)
	})

	return (
		<>
			{isScreenshotsFetching || isGameFetching ? (
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
					<div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between lg:gap-20">
						<div className="flex flex-col items-center lg:mt-[100px]">
							<h1 className="max-w-[700px] pb-10 text-center text-6xl font-bold text-white sm:text-7xl">
								{game?.name}
							</h1>
							<div>
								<div
									className="max-w-[700px] pb-5 text-center font-bold text-white transition-all duration-500"
									dangerouslySetInnerHTML={{
										__html: descMore ? game?.description || '' : descLess
									}}
								></div>
							</div>
							<button
								className="rounded-lg bg-white px-4 text-left text-sm"
								onClick={() => setDescMore(prev => !prev)}
							>
								{descMore ? 'Less' : 'More'}
							</button>
							{renderStores?.length != 0 && (
								<div className="flex flex-col items-center">
									<h4 className="mb-5 mt-10 text-xl text-white">
										{' '}
										Where to buy
									</h4>
									<div
										className={`mb-14 flex flex-col gap-5 text-center md:grid md:grid-cols-3`}
									>
										{renderStores}
									</div>
								</div>
							)}
						</div>
						<div>
							{screenshots && <GameScreenshots screenshots={screenshots} />}
						</div>
					</div>
					<div className="absolute left-0 right-0 top-0 -z-10">
						<div className="h-[500px] w-full bg-gradient-to-t from-[#151515]">
							<LazyLoadImage
								className="absolute -z-10 h-full w-full object-cover brightness-50"
								src={useResizeImage(game?.background_image || '')}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default GameDetailed
