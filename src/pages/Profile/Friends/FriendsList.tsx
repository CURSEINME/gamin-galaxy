import { Link } from 'react-router-dom'

import { useGetUsersQuery } from '../../../store/slices/user/userApiSlice'

interface FriendsListProps {
	searchName: string
}

const FriendsList = ({ searchName }: FriendsListProps) => {
	const { data: users } = useGetUsersQuery(searchName, {
		skip: searchName ? false : true
	})

	const usersDropList = users?.map(user => {
		return (
			<Link
				to={`/profile/${user._id}`}
				key={user._id}
				className="block rounded-b-lg px-4 py-2 text-xl text-white hover:bg-[#272727]"
			>
				{user.name}
			</Link>
		)
	})

	return usersDropList
}

export default FriendsList
