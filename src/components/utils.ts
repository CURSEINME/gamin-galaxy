const useResizeImage = (imageUrl: string): string => {
	let indexGame = 0

	if (imageUrl.includes('/games/')) {
		indexGame = imageUrl.indexOf('/games/')
	} else if (imageUrl.includes('/screenshots/')) {
		indexGame = imageUrl.indexOf('/screenshots/')
	}

	const resizeRoute = '/resize/600/-'
	const leftSideOfUrl = imageUrl.slice(0, indexGame)
	const rightSideOfUrl = imageUrl.slice(indexGame)

	return leftSideOfUrl + resizeRoute + rightSideOfUrl
}

export default useResizeImage
