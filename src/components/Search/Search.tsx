import { useRef, useState } from 'react'

import SearchForm from './SearchForm'
import SearchList from './SearchList'
import { useDebounce } from '../utils'
import { useEffect } from 'react'

export interface GameState {
	name: string
}

const Search = () => {

  const [game, setGame] = useState<GameState>({ name: '' })
  const [focus, setFocus] = useState(false)

	const searchRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
	},)

	const handleClickOutside = (e) => {
		if (focus && !searchRef.current?.contains(e.target)) {
			setFocus(false)
		}
	}
  
  const debounceValue = useDebounce(game.name)

	return (
		<div ref={searchRef} className='relative'>
			<SearchForm game={game} setGame={setGame} setFocus={setFocus}/>
			<SearchList searchName={debounceValue} focus={focus} setFocus={setFocus}/>
		</div>
	)
}

export default Search
