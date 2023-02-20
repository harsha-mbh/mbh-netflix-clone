import {Link} from 'react-router-dom'
import './index.css'

const PopularMovieItem = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails
  return (
    <li className="popular-movie-item" key={id}>
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="popular-movie-image" />
      </Link>
    </li>
  )
}

export default PopularMovieItem
