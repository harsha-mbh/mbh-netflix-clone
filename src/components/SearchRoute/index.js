import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SearchResultItem from '../SearchResultItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchRoute extends Component {
  state = {
    searchInput: '',
    searchResults: [],
    apiStatus: apiStatusConstants.initial,
  }

  onResponseOk = results => {
    const formattedData = results.map(eachResult => ({
      id: eachResult.id,
      backdropPath: eachResult.backdrop_path,
      posterPath: eachResult.poster_path,
      title: eachResult.title,
    }))
    this.setState({
      apiStatus: apiStatusConstants.success,
      searchResults: formattedData,
    })
  }

  onResponseFailure = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  onEnterSearch = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    try {
      const jwtToken = Cookies.get('jwt_token')
      const {searchInput} = this.state
      const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        this.onResponseOk(data.results)
      } else {
        this.onResponseFailure()
      }
    } catch (error) {
      this.onResponseFailure()
    }
  }

  onClickTryAgain = () => this.onEnterSearch()

  onChangeSearchValue = searchValue => {
    this.setState({
      searchInput: searchValue,
      apiStatus: apiStatusConstants.initial,
    })
  }

  renderEmptyResultsView = () => {
    const {searchInput} = this.state

    return (
      <div className="failure-view-container">
        <img
          src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1676026294/NetflixClone/Group_7394emptyview_rqr9uu.png"
          alt="no movies"
          className="no-movies-img"
        />
        <p className="failure-description">
          {`Your search for ${searchInput} did not find any matches.`}
        </p>
      </div>
    )
  }

  renderNonEmptyResultsView = () => {
    const {searchResults} = this.state
    return (
      <ul className="search-results-container">
        {searchResults.map(eachResult => (
          <SearchResultItem key={eachResult.id} movieDetails={eachResult} />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {searchResults} = this.state
    const noOfMovies = searchResults.length
    switch (noOfMovies) {
      case 0:
        return this.renderEmptyResultsView()
      default:
        return this.renderNonEmptyResultsView()
    }
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

  renderSearchResults = () => {
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
      <div className="search-page-container">
        <Header
          onChangeSearchValue={this.onChangeSearchValue}
          onEnterSearch={this.onEnterSearch}
        />
        {this.renderSearchResults()}
      </div>
    )
  }
}

export default SearchRoute
