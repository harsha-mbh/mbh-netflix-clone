import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import PopularMovieItem from '../PopularMovieItem'
import FooterItem from '../FooterItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {
    popularMovies: [],
    apiStatus: apiStatusConstants.initial,
    currentPage: 1,
    itemsPerPage: 12,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  onClickTryAgain = () => this.getPopularMovies()

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    try {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const data = await response.json()
        const formattedData = data.results.map(eachResult => ({
          id: eachResult.id,
          backdropPath: eachResult.backdrop_path,
          posterPath: eachResult.poster_path,
          title: eachResult.title,
        }))
        this.setState({
          apiStatus: apiStatusConstants.success,
          popularMovies: formattedData,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPagination = () => {
    const {popularMovies, currentPage, itemsPerPage} = this.state
    const totalPages = Math.ceil(popularMovies.length / itemsPerPage)

    if (totalPages === 1) {
      return null
    }
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i += 1) {
      pageNumbers.push(i)
    }
    return (
      <div className="pagination-container">
        {pageNumbers.map(pageNumber => (
          <button
            type="button"
            key={pageNumber}
            className={`page-number ${
              pageNumber === currentPage ? 'active-page' : ''
            }`}
            onClick={() => this.handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    )
  }

  handlePageClick = pageNumber => {
    this.setState({currentPage: pageNumber})
  }

  renderSuccessView = () => {
    const {popularMovies, itemsPerPage, currentPage} = this.state
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageMovies = popularMovies.slice(startIndex, endIndex)
    return (
      <div className="popular-movies-container">
        <ul className="popular-movies-list-container">
          {currentPageMovies.map(eachMovie => (
            <PopularMovieItem key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </ul>
        {this.renderPagination()}
        <FooterItem />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

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

  renderPopularMovies = () => {
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
      <div className="popular-page-container">
        <Header />
        {this.renderPopularMovies()}
      </div>
    )
  }
}

export default Popular
