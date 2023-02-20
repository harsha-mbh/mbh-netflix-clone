import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  onChangeSearchInput = event => {
    const {onChangeSearchValue} = this.props
    onChangeSearchValue(event.target.value)
  }

  onClickSearch = () => {
    const {onEnterSearch} = this.props
    onEnterSearch()
  }

  onClickMenu = () => {
    this.setState({showMenu: true})
  }

  onClickCloseBtn = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showMenu} = this.state
    const {match, searchInput} = this.props
    const {path} = match
    let homeStyle
    let popularStyle
    let accountStyle
    let bgStyle
    switch (path) {
      case '/popular':
        popularStyle = 'active'
        bgStyle = 'transparant'
        break
      case '/':
        homeStyle = 'active'
        break
      case '/account':
        accountStyle = 'active'
        bgStyle = 'transparant'
        break
      case '/search':
        bgStyle = 'transparant'
        break
      default:
        popularStyle = ''
        homeStyle = ''
        accountStyle = ''
        bgStyle = ''
    }
    return (
      <nav className={`navbar ${bgStyle}`}>
        <div className="nav-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675404435/Group_7399logo_large_pbhqqr.png"
              alt="website logo"
              className="website-logo-desktop"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-link">
              <Link to="/" className={`menu-link ${homeStyle}`}>
                Home
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/popular" className={`menu-link ${popularStyle}`}>
                Popular
              </Link>
            </li>
          </ul>
          <div className="search-account-container">
            {path !== '/search' ? (
              <Link to="/search">
                <button
                  type="button"
                  className="search-btn"
                  testid="searchButton"
                >
                  <HiOutlineSearch size={22} />
                </button>
              </Link>
            ) : (
              <div className="search-container">
                <input
                  placeholder="Search.."
                  className="input-field"
                  value={searchInput}
                  type="search"
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className="search-btn"
                  testid="searchButton"
                  onClick={this.onClickSearch}
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
            <button
              type="button"
              className="menu-btn"
              onClick={this.onClickMenu}
            >
              <MdMenuOpen size={22} />
            </button>
          </div>
        </div>
        {showMenu && (
          <ul className="mobile-menu-list-container">
            <li className="nav-link">
              <Link to="/" className={`menu-link ${homeStyle}`}>
                Home
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/popular" className={`menu-link ${popularStyle}`}>
                Popular
              </Link>
            </li>

            <li className={`nav-link ${accountStyle}`}>
              <Link to="/account" className="menu-link">
                Account
              </Link>
            </li>

            <button
              className="cross-btn"
              type="button"
              onClick={this.onClickCloseBtn}
            >
              <ImCross size={12} />
            </button>
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
