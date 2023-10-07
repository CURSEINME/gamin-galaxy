import { Link } from 'react-router-dom'

import LoginForm from './LoginForm'

const Login = () => {
	return (
		<>
			<div className='fixed bg-auth-bg top-0 left-0 h-screen w-screen -z-10 bg-cover bg-center blur-[8px]'></div>
			<div className="flex h-screen flex-col items-center justify-center">
				<div className="rounded-2xl border-[2px] border-[#f2f2f2] backdrop-blur-[15px] bg-transparent p-10 sm:min-w-[400px]">
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
		</>
	)
}

export default Login
