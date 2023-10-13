import React from 'react'
import { Link } from 'react-router-dom'
import "./user.css";

const Footer = () => {
  return (
    <div className="footer">
          <div>&copy; {new Date().getFullYear()} Code By Fenil Kothiya. <Link to={"https://www.linkedin.com/in/fenil-kothiya-45327a270/"}>Click For More Details !!</Link></div>
        </div>
  )
}

export default Footer;
