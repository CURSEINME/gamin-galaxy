import { ILoginForm } from '../../../pages/Login/LoginForm'
import { IRegisterForm } from '../../../pages/Register/RegisterForm'
import { serverApi } from '../../apis/serverApi/serverApi'
import { IUser } from '../user/types'

export const authApiSlice = serverApi.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<IUser, ILoginForm>({
			query: ({ email, password }: ILoginForm) => ({
				url: 'login',
				body: { email, password },
				method: 'POST'
			})
		}),
		register: builder.mutation<IUser, IRegisterForm>({
			query: ({ name, password, email }: IRegisterForm) => ({
				url: 'register',
				body: { name, password, email },
				method: 'POST'
			})
		})
	})
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice
