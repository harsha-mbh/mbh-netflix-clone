import './index.css'

const MovieDetailsLanguageItem = props => {
  const {language} = props
  const {id, englishName} = language
  return (
    <li key={id}>
      <p className="details-description">{englishName}</p>
    </li>
  )
}

export default MovieDetailsLanguageItem
