import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import Modal from '../../../components/Modal'
import SlickSlider from '../../../components/SlickSlider'
import useResizeImage from '../../../components/utils'
import { IScreenshot } from '../../../store/slices/gameDbApi/types'
import GameScores from './GameScores/GameScores'

interface GameScreenshotsProps {
	screenshots: IScreenshot[]
}

const GameScreenshots = ({ screenshots }: GameScreenshotsProps) => {
	const [sliderModalActive, setSliderModalActive] = useState(false)

	const screenshotsLess = screenshots?.slice(0, 4)

	const renderScreenshots = screenshotsLess?.map(item => {
		const resizeImage = useResizeImage(item.image)

		return (
			<img
				key={item.id}
				src={resizeImage}
				className='rounded-xl'
				onClick={() => setSliderModalActive(true)}
			/>
		)
	})

	return (
		<div>
			<Modal
				type="slider"
				active={sliderModalActive}
				setActive={() => setSliderModalActive(false)}
				children={<SlickSlider screenshots={screenshots} />}
			/>
			<div>
				<div
					className={
						renderScreenshots?.length == 2
							? ''
							: 'screenshots-grid-alt sm:screenshots-grid mb-2 max-w-[500px]'
					}
				>
					{renderScreenshots}
				</div>
			</div>
			<div className="mt-10">
				<GameScores />
			</div>
		</div>
	)
}

export default GameScreenshots
