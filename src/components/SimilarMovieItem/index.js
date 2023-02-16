import {Link} from 'react-router-dom'
import './index.css'

const SimilarMovieItem = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails

  return (
    <Link to={`/movies/${id}`}>
      <li key={id}>
        <img src={posterPath} alt={title} className="similar-movie" />
      </li>
    </Link>
  )
}

export default SimilarMovieItem
