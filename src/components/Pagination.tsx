import ReactPaginate from 'react-paginate'

type PaginationProps = {
	currentPage: number
	onChangePage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	onChangePage
}) => (
	<ReactPaginate
		className={'pagination'}
		breakLabel="..."
		nextLabel=">"
		previousLabel="<"
		onPageChange={event => onChangePage(event.selected + 1)}
		pageCount={5}
		marginPagesDisplayed={1}
		pageRangeDisplayed={2}
		forcePage={currentPage - 1}
	/>
)

export default Pagination
