import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = () => (
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
    <button type="button" className="search-btn" testid="searchButton">
      <HiOutlineSearch />
    </button>
    <img
      src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675942939/NetflixClone/Avataravatar_qryco0.png"
      alt="profile"
      className="profile-img"
    />
  </nav>
)

export default withRouter(Header)
