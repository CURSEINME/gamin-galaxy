import { Outlet } from 'react-router-dom'

import { useGetMeQuery } from '../store/slices/user/userApiSlice'

const PersistLogin = () => {
	const token = localStorage.getItem('token')

	if (token) {
		const { isLoading } = useGetMeQuery()

		if (!isLoading) {
			return <Outlet />
		}
	} else {
		return <Outlet />
	}
}

export default PersistLogin
