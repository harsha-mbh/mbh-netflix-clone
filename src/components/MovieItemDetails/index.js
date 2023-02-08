import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Header from '../Header'
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

  renderSuccessBackdropView = () => {
    const {movieItemDetails} = this.state
    const {title, overview, runtime, adult, releaseDate} = movieItemDetails
    const detailedRuntime = this.getDetailedRuntime(runtime)
    const releaseYear = this.getReleaseYear(releaseDate)
    return (
      <div className="movie-details-container">
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

  renderBackdropDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessBackdropView()
      default:
        return null
    }
  }

  render() {
    const {movieItemDetails} = this.state
    const {backdropPath} = movieItemDetails

    return (
      <div className="movie-details-page">
        <div
          className="backdrop-container"
          style={{backgroundImage: `url(${backdropPath})`}}
        >
          <Header />
          {this.renderBackdropDetails()}
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
