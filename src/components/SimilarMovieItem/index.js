import {Link} from 'react-router-dom'
import './index.css'

const SimilarMovieItem = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails

  return (
    <li>
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="similar-movie" />
      </Link>
    </li>
  )
}

export default SimilarMovieItem
