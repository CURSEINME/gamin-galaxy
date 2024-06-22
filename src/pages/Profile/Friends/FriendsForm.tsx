import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { useDebounce } from '../../../components/utils'
import { useGetUsersQuery } from '../../../store/slices/user/userApiSlice'
import FriendsList from './FriendsList'

const FriendsForm = ({ setUserName }) => {
	const { register, handleSubmit } = useForm()

	const onSubmit = (data: any) => {
		console.log(data)
	}

	const onChange = event => {
		setUserName(event.target.value)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register('name')}
				placeholder="Nickname"
				type="text"
				className="w-full rounded-lg bg-zinc-700 px-2 py-2 text-xl text-white focus:outline-none"
				onChange={event => onChange(event)}
			/>
		</form>
	)
}

export default FriendsForm
