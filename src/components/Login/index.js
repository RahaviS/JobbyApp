import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErr: false, errMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showErr: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errMsg, showErr, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="app-container">
          <form onSubmit={this.onSubmitForm} className="myForm">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="web-logo"
            />
            <label className="label-text" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              className="input-box"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="username"
              id="username"
            />
            <br />
            <br />
            <label className="label-text" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              className="input-box"
              value={password}
              onChange={this.onChangePassword}
              placeholder="password"
              id="password"
            />
            <br />
            <br />

            <button type="submit" className="login-btn">
              Login
            </button>
            {showErr && <p className="err-msg">{`*${errMsg}`}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
