import { Outlet } from 'react-router-dom'

import Header from './Header'

const Layout = () => {
	return (
		<div className="mx-auto max-w-[calc(1920px-500px)] px-8">
			<Header />
			<Outlet />
		</div>
	)
}

export default Layout
