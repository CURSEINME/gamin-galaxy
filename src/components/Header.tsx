import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { logOut } from '../store/slices/userSlice/userSlice'
import { RootState } from '../store/store'
import Burger from './Burger'

const Header = () => {
	const [game, setGame] = useState({ name: '' })
	const user = useSelector((state: RootState) => state.user.user)
	const [burgerActive, setBurgerActive] = useState(false)

	const dispatch = useDispatch()

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

	const logout = () => {
		dispatch(logOut(null))
		navigate('/', { replace: true })
	}

	return (
		<div className="z-10 grid grid-cols-[0.1fr_10fr_30px] items-center gap-x-5 md:grid-cols-[0.1fr_10fr_0.1fr] mb-10">
			<Burger
				type={user ? 'profile' : 'auth'}
				active={burgerActive}
				setActive={() => setBurgerActive(false)}
			/>
			<Link to="/" className="text-2xl font-bold text-white">
				<img className="h-[50px] w-[50px] max-w-none" src="/logo.svg" />
			</Link>
			<form onSubmit={handlySubmit}>
				<input
					name="name"
					onChange={handlyChange}
					className="w-full rounded-lg bg-zinc-700 p-3 text-xl text-white"
					placeholder="Search game"
				/>
			</form>
			<img
				onClick={() => setBurgerActive(true)}
				className="block md:hidden"
				src="/burger.svg"
			/>
			{user ? (
				<div className="flex gap-5">
					<Link className="button hidden md:block" to={`/profile/${user._id}`}>
						Profile
					</Link>
					<button
						className="button button--purple hidden md:block"
						onClick={() => logout()}
					>
						Logout
					</button>
				</div>
			) : (
				<div className="flex gap-5">
					<Link className="button hidden md:block" to="/login">
						Login
					</Link>
					<Link
						className="button button--purple hidden md:block"
						to="/register"
					>
						Register
					</Link>
				</div>
			)}
		</div>
	)
}

export default Header
