import { Link } from 'react-router-dom'

import LoginForm from './LoginForm'

const Login = () => {
	return (
		<div className="flex h-screen flex-col items-center justify-center bg-galaxy bg-center">
			<div className=" rounded-2xl border-[2px] border-[#f2f2f254] bg-transparent p-10 backdrop-blur-[20px] sm:min-w-[400px]">
				<h1 className="mb-10 text-center text-2xl text-white">
					Login in your account
				</h1>
				<LoginForm />
				<span className="mr-2 text-white">Dont have accout?</span>
				<Link className="text-white" to="/register">
					Register
				</Link>
			</div>
		</div>
	)
}

export default Login
