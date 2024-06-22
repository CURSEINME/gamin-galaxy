import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useRegisterMutation } from '../../store/slices/auth/authApiSlice'
import { setUser } from '../../store/slices/user/userSlice'

export interface IRegisterForm {
	email: string
	name: string
	password: string
}

export function isApiResponse(error: unknown): error is FetchBaseQueryError {
	return (
		typeof error === 'object' &&
		error != null &&
		'status' in error &&
		typeof (error as any).status === 'number'
	)
}

const RegisterForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<IRegisterForm>()

	const [signUp, { isLoading }] = useRegisterMutation()

	const [errorMessage, setErrorMessage] = useState('')

	console.log(errorMessage)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onSubmit = async (data: IRegisterForm) => {
		try {
			const res = await signUp(data).unwrap()

			if (res) {
				dispatch(setUser(res))
				navigate('/')
			}
		} catch (error) {
			if (isApiResponse(error)) {
				if (error.status === 501) {
					setErrorMessage('User already exist')
				}
			}
		}
		reset()
	}

	return (
		<form className="mb-5 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-2 flex flex-col gap-5">
				<div>
					<input
						{...register('name', {
							required: 'Required field',
							maxLength: {
								value: 20,
								message: 'Max 20 symbols'
							},
							minLength: {
								value: 4,
								message: 'Min 4 symbols'
							}
						})}
						className="w-full rounded-2xl px-5 py-2"
						placeholder="Name"
						type="text"
					/>
					<div className="h-[20px]">
						{errors?.name && (
							<p className="mt-1 font-bold text-red-600">
								{errors.name.message}
							</p>
						)}
					</div>
				</div>
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
							<p className="mt-1 font-bold text-red-600">
								{errors.email.message}
							</p>
						)}
					</div>
				</div>
				<div>
					<input
						{...register('password', {
							required: 'Required field'
						})}
						className="w-full rounded-2xl px-5 py-2"
						placeholder="Password"
						type="password"
						autoComplete="true"
					/>
					<div className="h-[20px]">
						{errors?.password && (
							<p className="mt-1 font-bold text-red-600">
								{errors.password.message}
							</p>
						)}
					</div>
				</div>
			</div>
			{errorMessage && (
				<h4 className="mb-6 text-center text-xl font-bold text-red-600">
					{errorMessage}
				</h4>
			)}
			<button
				disabled={isLoading ? true : false}
				className="button self-center"
			>
				{isLoading ? 'Loading...' : 'Register'}
			</button>
		</form>
	)
}

export default RegisterForm
