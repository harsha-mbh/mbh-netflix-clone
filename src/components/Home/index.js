import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HomeMoviePoster from '../HomeMoviePoster'
import MovieSlider from '../MovieSlider'
import Header from '../Header'
import FooterItem from '../FooterItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    trendingList: [],
    originalsList: [],
    posterItem: '',
    originalsApiStatus: apiStatusConstants.initial,
    trendingApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.setState(
      {trendingApiStatus: apiStatusConstants.loading},
      this.getTrendingItems,
    )
    this.setState(
      {originalsApiStatus: apiStatusConstants.loading},
      this.getOriginalItems,
    )
  }

  getTrendingItems = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiurl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiurl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.results.map(eachResult => ({
        backdropPath: eachResult.backdrop_path,
        id: eachResult.id,
        overview: eachResult.overview,
        posterPath: eachResult.poster_path,
        title: eachResult.title,
      }))
      this.setState({
        trendingList: formattedData,
        trendingApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendingApiStatus: apiStatusConstants.failure})
    }
  }

  getOriginalItems = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiurl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: 'application/json',
      },
    }
    const response = await fetch(apiurl, options)

    if (response.ok) {
      const data = await response.json()
      const formattedData = data.results.map(eachResult => ({
        backdropPath: eachResult.backdrop_path,
        id: eachResult.id,
        overview: eachResult.overview,
        posterPath: eachResult.poster_path,
        title: eachResult.title,
      }))
      this.setState(
        {
          originalsList: formattedData,
          originalsApiStatus: apiStatusConstants.success,
        },
        this.getPosterItem,
      )
    } else {
      this.setState({originalsApiStatus: apiStatusConstants.failure})
    }
  }

  getPosterItem = () => {
    const {originalsList} = this.state
    const randomNumber = Math.floor(Math.random() * originalsList.length)
    this.setState({posterItem: originalsList[randomNumber]})
  }

  renderPosterSuccessView = () => {
    const {posterItem} = this.state
    return <HomeMoviePoster posterDetails={posterItem} />
  }

  onClickTryPoster = () => this.getPosterItem()

  renderPosterFailureView = () => (
    <>
      <Header />
      <div className="poster-view-container">
        <img
          src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675833886/alert-trianglealert_aup4gv.png"
          className="alert-image"
          alt="failure view"
        />
        <p className="failure-description">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="try-btn"
          onClick={this.onClickTryPoster}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderPosterLoadingView = () => (
    <>
      <Header />
      <div className="poster-view-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  renderLoadingView = () => (
    <div className="movies-view-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPosterView = () => {
    const {originalsApiStatus} = this.state
    switch (originalsApiStatus) {
      case 'SUCCESS':
        return this.renderPosterSuccessView()
      case 'FAILURE':
        return this.renderPosterFailureView()
      case 'LOADING':
        return this.renderPosterLoadingView()
      default:
        return null
    }
  }

  renderTrendingSuccessView = () => {
    const {trendingList} = this.state
    return <MovieSlider moviesList={trendingList} />
  }

  onClickTryTrending = () => {
    this.setState(
      {trendingApiStatus: apiStatusConstants.loading},
      this.getTrendingItems,
    )
  }

  renderTrendingFailureView = () => (
    <div className="movies-view-container">
      <img
        src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675833886/alert-trianglealert_aup4gv.png"
        className="alert-image"
        alt="failure view"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-btn"
        onClick={this.onClickTryTrending}
      >
        Try Again
      </button>
    </div>
  )

  onClickTryOriginals = () => {
    this.setState(
      {originalsApiStatus: apiStatusConstants.loading},
      this.getOriginalItems,
    )
  }

  renderOriginalsFailureView = () => (
    <div className="movies-view-container">
      <img
        src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675833886/alert-trianglealert_aup4gv.png"
        className="alert-image"
        alt="failure view"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-btn"
        onClick={this.onClickTryOriginals}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalsSuccessView = () => {
    const {originalsList} = this.state
    return <MovieSlider moviesList={originalsList} />
  }

  renderTrendingMovies = () => {
    const {trendingApiStatus} = this.state
    switch (trendingApiStatus) {
      case 'SUCCESS':
        return this.renderTrendingSuccessView()
      case 'FAILURE':
        return this.renderTrendingFailureView()
      case 'LOADING':
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderOriginalMovies = () => {
    const {originalsApiStatus} = this.state
    switch (originalsApiStatus) {
      case 'SUCCESS':
        return this.renderOriginalsSuccessView()
      case 'FAILURE':
        return this.renderOriginalsFailureView()
      case 'LOADING':
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-page-container">
          {this.renderPosterView()}
          <div className="bottom-container">
            <div className="bottom-responsive-container">
              <div className="sliders-container">
                <h1 className="bottom-section-headings">Trending Now</h1>
                {this.renderTrendingMovies()}
              </div>
              <div className="sliders-container">
                <h1 className="bottom-section-headings">Originals</h1>
                {this.renderOriginalMovies()}
              </div>
              <FooterItem />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
