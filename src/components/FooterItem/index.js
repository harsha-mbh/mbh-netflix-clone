import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const FooterItem = () => (
  <div className="footer-container">
    <ul className="footer-icons-container">
      <li className="footer-icon">
        <FaGoogle />
      </li>
      <li className="footer-icon">
        <FaTwitter />
      </li>
      <li className="footer-icon">
        <FaInstagram />
      </li>
      <li className="footer-icon">
        <FaYoutube />
      </li>
    </ul>
    <p className="footer-description">Contact Us</p>
  </div>
)

export default FooterItem
