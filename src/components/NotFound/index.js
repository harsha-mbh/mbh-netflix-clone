import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="page-container">
    <h1 className="heading">Lost Your Way?</h1>
    <p className="description">
      We are sorry the page you requested could not be found. Please go back to
      home page.
    </p>

    <Link to="/">
      <button type="button" className="goto-home-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
