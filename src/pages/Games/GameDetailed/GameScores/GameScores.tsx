import Rating from '@mui/material/Rating'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Modal from '../../../../components/Modal'
import { useGetGameScoresQuery } from '../../../../store/slices/serverApi/serverApi'
import { RootState } from '../../../../store/store'
import ScoreForm from './GameScoreForm'

const GameScores = () => {
	const [reviewModalActive, setReviewModalActive] = useState(false)

	const { slug } = useParams()

	const { data: gameScores, isLoading } = useGetGameScoresQuery(slug || '')

	const user = useSelector((state: RootState) => state.user.user)

	return (
		<div>
			{!isLoading && (
				<div>
					<Modal
						type="review"
						active={reviewModalActive}
						setActive={() => setReviewModalActive(false)}
						children={
							<ScoreForm closeModal={() => setReviewModalActive(false)} />
						}
					/>
					<div className="flex flex-col">
						<div className="flex items-center justify-between text-xl text-white">
							<h4>Grapics</h4>
							<Rating
								value={gameScores?.graphics || 0}
								name="read-only"
								precision={0.5}
								className="!text-[35px] sm:!text-[50px]"
								size="large"
								readOnly
								sx={{ color: '#7a0ffe' }}
							/>
						</div>
						<div className="flex items-center justify-between text-xl text-white">
							<h4>Gameplay</h4>
							<Rating
								value={gameScores?.gameplay || 0}
								name="read-only"
								precision={0.5}
								className="!text-[35px] sm:!text-[50px]"
								size="large"
								readOnly
								sx={{ color: '#7a0ffe' }}
							/>
						</div>
						<div className="flex items-center justify-between text-xl text-white">
							<h4>Sound</h4>
							<Rating
								value={gameScores?.sound || 0}
								name="read-only"
								precision={0.5}
								className="!text-[35px] sm:!text-[50px]"
								size="large"
								readOnly
								sx={{ color: '#7a0ffe' }}
							/>
						</div>
						<div className="flex items-center justify-between text-xl text-white">
							<h4>Storyline</h4>
							<Rating
								value={gameScores?.storyLine || 0}
								name="read-only"
								precision={0.5}
								className="!text-[35px] sm:!text-[50px]"
								size="large"
								readOnly
								sx={{ color: '#7a0ffe' }}
							/>
						</div>
						<button
							className="button mt-10 self-center"
							onClick={
								user
									? () => setReviewModalActive(true)
									: () => alert('Need to login')
							}
						>
							Add your feedback
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default GameScores
