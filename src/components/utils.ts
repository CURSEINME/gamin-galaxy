import { useState, useEffect } from 'react'

export const useResizeImage = (imageUrl: string): string => {
	let indexGame = 0

	if (!imageUrl) return imageUrl

	if (imageUrl.includes('/games/')) {
		indexGame = imageUrl.indexOf('/games/')
	}
	else if (imageUrl.includes('/screenshots/')) {
		indexGame = imageUrl.indexOf('/screenshots/')
	}
	else return imageUrl

	const resizeRoute = '/resize/600/-'
	const leftSideOfUrl = imageUrl.slice(0, indexGame)
	const rightSideOfUrl = imageUrl.slice(indexGame)

	return leftSideOfUrl + resizeRoute + rightSideOfUrl
}

export const useDebounce = (value: string, delay = 1000) => {
	const [debounceValue, setDebounceValue] = useState(value)

	useEffect(() => {
		const id = setTimeout(() => {
			setDebounceValue(value)
		},delay)
		
		return () => {
			clearTimeout(id)
		}
	},[value, delay])

	return debounceValue
}