import { useNavigate, useSearchParams } from 'react-router-dom'

import { GameState } from './Search'

interface SearchProps {
	game: GameState
	setGame: ({ name }: { name: string }) => void
  setFocus: (value: boolean) => void
}

const SearchForm = ({ game, setGame, setFocus }: SearchProps) => {
	const navigate = useNavigate()
	const [params, setParams] = useSearchParams()

	const handlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target

		setGame(prev => {
			return {
				...prev,
				[name]: value
			}
		})
	}

	const handlySubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const page = 1

		navigate('/search')
		setParams({ query: game.name, page: String(page) })
	}

	return (
		<form onSubmit={handlySubmit} onClick={() => setFocus(true)}>
			<input
				name="name"
				onChange={handlyChange}
				className="w-full rounded-lg bg-zinc-700 p-3 text-xl text-white"
				placeholder="Search game"
			/>
		</form>
	)
}

export default SearchForm
