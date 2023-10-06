import { LazyLoadImage } from 'react-lazy-load-image-component'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const SlickSlider = ({ screenshots }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	}

	const renderScreenshots = screenshots.map((item, index) => {
		return (
			<LazyLoadImage
				key={index}
				src={item.image}
				className="max-h-[80vh] rounded-xl object-cover"
			/>
		)
	})

	return (
		<div>
			<Slider {...settings}>{renderScreenshots}</Slider>
		</div>
	)
}

export default SlickSlider
