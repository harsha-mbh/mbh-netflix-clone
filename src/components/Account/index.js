import Cookies from 'js-cookie'
import Header from '../Header'
import FooterItem from '../FooterItem'
import './index.css'

const Account = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    Cookies.remove('username')
    Cookies.remove('password')
    const {history} = props
    history.replace('/login')
  }
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const maskedPassword = '*'.repeat(password.length)
  return (
    <div className="account-page-container">
      <Header />
      <div className="account-details-container">
        <div className="responsive-container">
          <h1 className="page-heading">Account</h1>
          <hr className="separator" />
          <div className="details-container">
            <p className="details-description">Member ship</p>
            <div className="name-password-container">
              <p className="email">{`${username}@gmail.com`}</p>
              <p className="password">{`Password : ${maskedPassword}`}</p>
            </div>
          </div>
          <hr className="separator" />
          <div className="details-container">
            <p className="details-description">Plan details</p>
            <div className="plan-details-container">
              <p className="email">Premium</p>
              <p className="plan-resolution">Ultra HD</p>
            </div>
          </div>
          <hr className="separator" />
          <button type="button" onClick={onClickLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      <FooterItem />
    </div>
  )
}

export default Account
