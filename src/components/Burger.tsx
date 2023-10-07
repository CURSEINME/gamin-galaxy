import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { logOut } from '../store/slices/userSlice/userSlice'
import { RootState } from '../store/store'

interface BurgerProps {
	active: boolean
	setActive: () => void
	type: string
}

const Burger = ({ active, setActive, type }: BurgerProps) => {
	const user = useSelector((state: RootState) => state.user.user)

	const navigate = useNavigate()

	const dispatch = useDispatch()

	const logout = () => {
		dispatch(logOut(null))
		setActive()
		navigate('/', { replace: true })
	}

	return (
		<div
			onClick={setActive}
			className={`${
				active ? 'translate-x-0' : 'translate-x-full'
			} fixed right-0 top-0 z-10 h-screen w-screen duration-200`}
		>
			<div
				onClick={e => e.stopPropagation()}
				className="fixed right-0 top-0 rounded-xl bg-black p-8"
			>
				{type === 'auth' && (
					<div className="flex flex-col gap-5">
						<Link className="button" to="/login">
							Login
						</Link>
						<Link className="button button--purple" to="/register">
							Register
						</Link>
					</div>
				)}
				{type === 'profile' && (
					<div className="flex flex-col gap-5">
						<Link className="button" to={`/profile/${user?._id}`}>
							Profile
						</Link>
						<button className="button button--purple" onClick={() => logout()}>
							Logout
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Burger
