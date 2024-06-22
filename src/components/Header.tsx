import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { logOut } from '../store/slices/user/userSlice'
import { RootState } from '../store/store'
import Burger from './Burger'
import Search from './Search/Search'

const Header = () => {
	const user = useSelector((state: RootState) => state.user.user)
	const [burgerActive, setBurgerActive] = useState(false)

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const logout = () => {
		dispatch(logOut(null))
		navigate('/', { replace: true })
	}

	return (
		<div className="z-10 mb-10 grid grid-cols-[0.1fr_10fr_30px] items-center gap-x-5 md:grid-cols-[0.1fr_10fr_0.1fr]">
			<Burger
				type={user ? 'profile' : 'auth'}
				active={burgerActive}
				setActive={() => setBurgerActive(false)}
			/>
			<Link to="/" className="text-2xl font-bold text-white">
				<img className="h-[50px] w-[50px] max-w-none" src="/logo.svg" />
			</Link>

			<Search />

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
