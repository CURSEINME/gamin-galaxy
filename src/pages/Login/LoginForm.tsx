import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '../../store/slices/serverApi/serverApi'
import { setUser } from '../../store/slices/userSlice/userSlice'

export interface ILoginForm {
	email: string
	password: string
}

export interface ApiErrorResponse {
	status: number
	data: { message: string }
}

export function isApiResponse(error: unknown): error is ApiErrorResponse {
	return (
		typeof error === 'object' &&
		error != null &&
		'status' in error &&
		typeof (error as any).status === 'number'
	)
}

const LoginForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ILoginForm>()

	const [login] = useLoginMutation()

	const [errorMessage, setErrorMessage] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = async (data: ILoginForm) => {
		try {
			const res = await login({ ...data }).unwrap()

			if (res) {
				dispatch(setUser(res))
				navigate('/')
			}
		} catch (error) {
			if (isApiResponse(error)) {
				setErrorMessage(error.data.message)
			}
		}

		reset()
	}

	return (
		<form className="mb-5 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
			<div className={`mb-2 flex flex-col  gap-8`}>
				<div>
					<input
						{...register('email', {
							required: 'Required field'
						})}
						className="w-full rounded-2xl px-5 py-2"
						placeholder="Email"
						type="email"
					/>
					<div className="h-[20px]">
						{errors?.email && (
							<p className="mt-1 text-left text-sm font-bold text-red-600">
								{errors.email.message}
							</p>
						)}
					</div>
				</div>
				<div>
					<input
						{...register('password', {
							required: 'Required field',
							minLength: {
								value: 6,
								message: 'Min length 6'
							}
						})}
						className="w-full rounded-2xl px-5 py-2"
						placeholder="Password"
						type="password"
						autoComplete="true"
					/>
					<div className="h-[20px]">
						{errors?.password && (
							<p className="mt-1 text-left text-sm font-bold text-red-600">
								{errors.password.message}
							</p>
						)}
					</div>
				</div>
			</div>
			{errorMessage && (
				<h4 className="mb-5 text-center text-xl font-bold text-red-600">
					{errorMessage}
				</h4>
			)}
			<button className="button button-white self-center">Login</button>
		</form>
	)
}

export default LoginForm
