import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const {match, searchInput, onEnterSearch, onChangeSearchValue} = props
  const {path} = match
  const onChangeSearchInput = event => {
    onChangeSearchValue(event.target.value)
  }

  const onClickSearch = () => {
    onEnterSearch()
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675404435/Group_7399logo_large_pbhqqr.png"
          alt="website logo"
          className="website-logo-desktop"
        />
        <img
          src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675404330/Group_7399logo_small_ux0csf.png"
          alt="website logo"
          className="website-logo-mobile"
        />
      </Link>
      <ul className="nav-menu">
        <Link to="/" className="menu-link">
          <li className="nav-link">Home</li>
        </Link>
        <Link to="/popular" className="menu-link">
          <li className="nav-link">Popular</li>
        </Link>
      </ul>
      <div className="search-account-container">
        {path !== '/search' ? (
          <Link to="/search">
            <button type="button" className="search-btn" testid="searchButton">
              <HiOutlineSearch />
            </button>
          </Link>
        ) : (
          <div className="search-container">
            <input
              placeholder="Search.."
              className="input-field"
              value={searchInput}
              type="search"
              onChange={onChangeSearchInput}
            />
            <button
              type="button"
              className="search-btn"
              testid="searchButton"
              onClick={onClickSearch}
            >
              <HiOutlineSearch width={30} height={30} />
            </button>
          </div>
        )}
        <Link to="/account">
          <img
            src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675942939/NetflixClone/Avataravatar_qryco0.png"
            alt="profile"
            className="profile-img"
          />
        </Link>
      </div>
    </nav>
  )
}

export default withRouter(Header)
