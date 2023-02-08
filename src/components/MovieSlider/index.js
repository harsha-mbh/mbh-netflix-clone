import Slider from 'react-slick'
import './index.css'

const MovieSlider = props => {
  const {moviesList} = props
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const renderSlider = () => (
    <Slider {...settings}>
      {moviesList.map(eachMovie => {
        const {id, posterPath, title} = eachMovie
        return (
          <div className="slick-item" key={id}>
            <img className="logo-image" src={posterPath} alt={title} />
          </div>
        )
      })}
    </Slider>
  )
  return <div className="slider-container">{renderSlider()}</div>
}

export default MovieSlider
