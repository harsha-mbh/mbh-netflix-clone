import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      return this.onLoginSuccess(data.jwt_token)
    }
    return this.onLoginFailure(data.error_msg)
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showSubmitError, errorMsg} = this.state
    return (
      <div className="login-page-container">
        <img
          src="https://res.cloudinary.com/dkgkhdfnt/image/upload/v1675404435/Group_7399logo_large_pbhqqr.png"
          alt="login website logo"
          className="website-logo"
        />
        <div className="responsive-container">
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <h1 className="form-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="username" className="label-text">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-text">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            <div className="btn-container">
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
