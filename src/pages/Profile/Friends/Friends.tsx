import { useDebounce } from "../../../components/utils"
import FriendsForm from "./FriendsForm"
import FriendsList from "./FriendsList"
import { useState } from "react"

const Friends = () => {

  const [userName, setUserName] = useState('')
  
  const debounceValue = useDebounce(userName)

  return (
    <div>
      <h2 className="text-bold text-center text-2xl text-white mb-5">
        Friends
      </h2>

      <div className='border-2 rounded-lg'>
        <FriendsForm
          setUserName={setUserName}
        />
      { userName && <FriendsList searchName={debounceValue}/>}
      </div>
    </div>
  )
}

export default Friends