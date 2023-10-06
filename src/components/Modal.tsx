import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

interface ModalProps {
	type: string
	active: boolean
	setActive: () => void
	children: any
}

const Modal = ({ active, setActive, children, type }: ModalProps) => {
	return (
		<div
			className={`${
				active ? 'pointer-events-auto opacity-100' : 'opacity-0'
			} pointer-events-none fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 px-10 transition-all duration-500 sm:px-20`}
			onClick={setActive}
		>
			<div
				onClick={e => e.stopPropagation()}
				className={`${
					type == 'slider'
						? 'w-full max-w-[1200px]'
						: 'w-full  sm:max-w-[600px]'
				}`}
			>
				{children}
			</div>
		</div>
	)
}

export default Modal
