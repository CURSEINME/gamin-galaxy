import { Outlet } from 'react-router-dom'

import Header from './Header'

const Layout = () => {
	return (
		<div className="max-w-[calc(1920px-500px)] mx-auto px-8 py-10">
			<Header />
			<Outlet />
		</div>
	)
}

export default Layout
