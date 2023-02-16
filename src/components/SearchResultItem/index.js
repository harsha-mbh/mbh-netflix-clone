import {Link} from 'react-router-dom'
import './index.css'

const SearchResultItem = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails
  return (
    <Link to={`/movies/${id}`}>
      <li className="popular-movie-item" key={id}>
        <img src={posterPath} alt={title} className="popular-movie-image" />
      </li>
    </Link>
  )
}

export default SearchResultItem
