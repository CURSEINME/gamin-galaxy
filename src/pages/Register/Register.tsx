import { Link } from 'react-router-dom'

import RegisterForm from './RegisterForm'

const Register = () => {
	return (
		<div className="flex h-screen flex-col items-center justify-center bg-galaxy bg-center">
			<div className="rounded-2xl border-[2px] border-[#f2f2f254] bg-transparent p-10 backdrop-blur-[20px] sm:min-w-[400px]">
				<h1 className="mb-8 text-center text-2xl text-white">
					Register your account
				</h1>
				<RegisterForm />
				<span className="mr-2 text-white">Already have account?</span>
				<Link className="text-white" to="/login">
					Login
				</Link>
			</div>
		</div>
	)
}

export default Register
