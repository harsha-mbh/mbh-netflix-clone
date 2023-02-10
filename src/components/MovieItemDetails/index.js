import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Header from '../Header'
import SimilarMovieItem from '../SimilarMovieItem'
import FooterItem from '../FooterItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {movieItemDetails: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.setState(
      {apiStatus: apiStatusConstants.loading},
      this.getMovieItemDetails,
    )
  }

  getMovieItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies.map(eachMovie => ({
          id: eachMovie.id,
          backdropPath: eachMovie.backdrop_path,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        })),
        spokenLanguages: data.movie_details.spoken_languages.map(
          eachLanguage => ({
            id: eachLanguage.id,
            englishName: eachLanguage.english_name,
          }),
        ),
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({
        movieItemDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getDetailedRuntime = time => {
    const hours = Math.floor(time / 60)
    const mins = time % 60
    return `${hours}h ${mins}m`
  }

  getReleaseYear = datestring => {
    const extractedYear = format(new Date(datestring), 'yyyy')
    return extractedYear
  }

  renderBackdropDetailsView = () => {
    const {movieItemDetails} = this.state
    const {title, overview, runtime, adult, releaseDate} = movieItemDetails
    const detailedRuntime = this.getDetailedRuntime(runtime)
    const releaseYear = this.getReleaseYear(releaseDate)
    return (
      <div className="backdrop-details-container">
        <h1 className="backdrop-title">{title}</h1>
        <ul className="duration-date-container">
          <li className="duration">{detailedRuntime}</li>
          <li className="adult">{adult === true ? 'A' : 'U/A'}</li>
          <li className="release-year">{releaseYear}</li>
        </ul>
        <p className="backdrop-overview">{overview}</p>
        <button className="play-btn" type="button">
          Play
        </button>
      </div>
    )
  }

  getFormattedDate = releaseDate => {
    const formattedDate = format(new Date(releaseDate), 'do MMMM yyyy')
    return formattedDate
  }

  renderMovieDetails = () => {
    const {movieItemDetails} = this.state
    const {
      releaseDate,
      genres,
      budget,
      spokenLanguages,
      voteAverage,
      voteCount,
    } = movieItemDetails
    const formattedDate = this.getFormattedDate(releaseDate)
    return (
      <div className="movie-details-container">
        <div className="each-detail-container">
          <p className="details-title">Genres</p>
          <ul className="details-list-container">
            {genres.map(eachGenre => (
              <li key={eachGenre.id} className="details-description">
                {eachGenre.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="each-detail-container">
          <p className="details-title">Audio Available</p>
          <ul className="details-list-container">
            {spokenLanguages.map(language => (
              <li key={language.id} className="details-description">
                {language.englishName}
              </li>
            ))}
          </ul>
        </div>
        <div className="each-detail-container">
          <p className="details-title">Rating Count</p>
          <p className="details-description">{voteCount}</p>
          <p className="details-title">Rating Average</p>
          <p className="details-description">{voteAverage}</p>
        </div>
        <div className="each-detail-container">
          <p className="details-title">Budget</p>
          <p className="details-description">{budget}</p>
          <p className="details-title">Release Date</p>
          <p className="details-description">{formattedDate}</p>
        </div>
      </div>
    )
  }

  renderSimilarItemsDetails = () => {
    const {movieItemDetails} = this.state
    const {similarMovies} = movieItemDetails
    return (
      <div className="similar-movies-container">
        <h1 className="similar-movies-heading">More like this</h1>
        <ul className="similar-movies-list-container">
          {similarMovies.map(eachMovie => (
            <SimilarMovieItem key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const {movieItemDetails} = this.state
    const {backdropPath} = movieItemDetails
    return (
      <>
        <div
          className="backdrop-container"
          style={{backgroundImage: `url(${backdropPath})`}}
        >
          <Header />
          {this.renderBackdropDetailsView()}
        </div>
        {this.renderMovieDetails()}
        {this.renderSimilarItemsDetails()}
        <FooterItem />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675923621/NetflixClone/Background-Completeerror-image_roinnx.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button className="try-btn" type="button" onClick={this.onClickTryAgain}>
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderMovieItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'LOADING':
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-details-page">{this.renderMovieItemDetails()}</div>
    )
  }
}

export default MovieItemDetails
