import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Link } from 'react-router-dom'

interface IGameProps {
	name: string
	slug: string
	background_image: string
}

const Game = ({ name, slug, background_image }: IGameProps) => {
	return (
		<div className='max-w-[310px]'>
			<Link to={`/games/${slug}`} className='flex flex-col items-center'>
				<img
					className="mb-5 h-56 w-full  rounded-md object-cover !transition-all duration-200 hover:scale-105"
					src={background_image}
				/>
				<h1 className="text-2xl font-bold text-white text-center">{name}</h1>
			</Link>
		</div>
	)
}

export default Game
