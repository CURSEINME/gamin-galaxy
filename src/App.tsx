import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createHashRouter,
	createRoutesFromElements
} from 'react-router-dom'

import Layout from './components/Layout'
import PersistLogin from './components/PersistLogin'
import Games from './pages/Games/Games'
import GameDetailed from './pages/Games/GameDetailed/GameDetailed'
import Login from './pages/Login/Login'
import Profile from './pages/Profile'
import Register from './pages/Register/Register'


const router = createHashRouter(
	createRoutesFromElements(
		<Route>
			<Route>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Route>
			<Route element={<PersistLogin />}>
				<Route element={<Layout />} path="/">
					<Route index element={<Games />} />
					<Route path="/games/:slug" element={<GameDetailed />} />
					<Route path="/profile/:_id" element={<Profile />} />
					<Route path="/search" element={<Games />} />
				</Route>
			</Route>
		</Route>
	)
)

const App = () => {
	return <RouterProvider router={router} />
}

export default App
