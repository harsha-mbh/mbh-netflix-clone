import './index.css'

const MovieDetailsGenreItem = props => {
  const {genre} = props
  const {id, name} = genre
  return (
    <li key={id}>
      <p className="details-description">{name}</p>
    </li>
  )
}

export default MovieDetailsGenreItem
