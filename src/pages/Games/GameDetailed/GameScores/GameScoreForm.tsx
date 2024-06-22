import Rating from '@mui/material/Rating'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useAddGameScoresMutation } from '../../../../store/slices/gameScore/gameScoreSlice'
import { RootState } from '../../../../store/store'

interface IFormState {
	slug: string
	graphics: number
	gameplay: number
	sound: number
	storyLine: number
}

const GameScoreForm = ({ closeModal }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IFormState>()

	const params = useParams()
	const slug = params.slug || ''

	const _id = useSelector((state: RootState) => state.user.user?._id) || ''

	const [addGameScore] = useAddGameScoresMutation()

	const onSubmit = (data: IFormState) => {
		const scores = {
			...data,
			slug: slug
		}
		addGameScore({ _id, scores })
		reset()
		closeModal()
	}

	return (
		<div className="rounded-2xl bg-white p-5">
			<form
				onSubmit={handleSubmit(data => onSubmit(data))}
				className="flex flex-col"
			>
				<div className="flex items-center justify-between">
					<label className="font-bold sm:text-xl" htmlFor="graphics">
						Graphics
					</label>
					<div className="flex flex-col">
						{errors?.graphics && (
							<div className="ml-[10px] text-sm text-red-600">
								{errors.graphics.message}
							</div>
						)}
						<Controller
							name="graphics"
							control={control}
							rules={{ required: 'Required field' }}
							render={({ field: { value, onChange } }) => (
								<Rating
									value={Number(value)}
									onChange={onChange}
									name="graphics"
									precision={0.5}
									className="!text-[30px] sm:!text-[50px]"
									sx={{ fontSize: '50px', color: '#7a0ffe' }}
								/>
							)}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<label className="font-bold sm:text-xl" htmlFor="gameplay">
						Gameplay
					</label>
					<div className="flex flex-col">
						{errors?.gameplay && (
							<div className="ml-[10px] text-sm text-red-600">
								{errors.gameplay.message}
							</div>
						)}
						<Controller
							name="gameplay"
							control={control}
							rules={{ required: 'Required field' }}
							render={({ field: { value, onChange } }) => (
								<Rating
									value={Number(value)}
									onChange={onChange}
									name="gameplay"
									precision={0.5}
									className="!text-[30px] sm:!text-[50px]"
									sx={{ fontSize: '50px', color: '#7a0ffe' }}
								/>
							)}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<label className="font-bold sm:text-xl" htmlFor="sound">
						Sound
					</label>
					<div className="flex flex-col">
						{errors?.sound && (
							<div className="ml-[10px] text-sm text-red-600">
								{errors.sound.message}
							</div>
						)}
						<Controller
							name="sound"
							control={control}
							rules={{ required: 'Required field' }}
							render={({ field: { value, onChange } }) => (
								<Rating
									value={Number(value)}
									onChange={onChange}
									name="sound"
									precision={0.5}
									className="!text-[30px] sm:!text-[50px]"
									sx={{ fontSize: '50px', color: '#7a0ffe' }}
								/>
							)}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<label className="font-bold sm:text-xl" htmlFor="storyLine">
						Story
					</label>
					<div className="flex flex-col">
						{errors?.storyLine && (
							<div className="ml-[10px] text-sm text-red-600">
								{errors.storyLine.message}
							</div>
						)}
						<Controller
							name="storyLine"
							control={control}
							rules={{ required: 'Required field' }}
							render={({ field: { value, onChange } }) => (
								<Rating
									value={Number(value)}
									onChange={onChange}
									name="Story"
									precision={0.5}
									className="!text-[30px] sm:!text-[50px]"
									sx={{ fontSize: '50px', color: '#7a0ffe' }}
								/>
							)}
						/>
					</div>
				</div>
				<button type="submit" className="button button--black mt-8 self-center">
					Add feedback
				</button>
			</form>
		</div>
	)
}

export default GameScoreForm
