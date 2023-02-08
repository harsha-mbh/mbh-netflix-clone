import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => (
  //   const onClickLogout = () => {
  //     Cookies.remove('jwt_token')
  //     const {history} = props
  //     history.replace('/')
  //   }

  <nav className="navbar">
    <Link to="/">
      <img
        src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675404435/Group_7399logo_large_pbhqqr.png"
        alt="login website logo"
        className="website-logo-desktop"
      />
      <img
        src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675404330/Group_7399logo_small_ux0csf.png"
        alt="login website logo"
        className="website-logo-mobile"
      />
    </Link>

    {/* <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button> */}
  </nav>
)

export default withRouter(Header)
