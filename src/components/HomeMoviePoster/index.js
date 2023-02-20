import Header from '../Header'
import './index.css'

const HomeMoviePoster = props => {
  const {posterDetails} = props
  const {backdropPath, overview, title} = posterDetails
  return (
    <>
      <div
        className="poster-container"
        style={{backgroundImage: `url(${backdropPath})`}}
      >
        <Header />
        <div className="poster-details-container">
          <h1 className="title">{title}</h1>
          <p className="overview">
            {
              /* {overview !== undefined
              ? overview.slice(0, overview.length / 2)
              : null} */ overview
            }
          </p>
          <button className="play-btn" type="button">
            Play
          </button>
        </div>
      </div>
    </>
  )
}
export default HomeMoviePoster
