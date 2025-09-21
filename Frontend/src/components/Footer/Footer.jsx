import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { SocialIcon } from 'react-social-icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='contactUs'>
        <div className="footer-contents">
            <div className="footer-left">
                <img src={assets.logo} alt="" />
                <h3>MIT BLOODLINE</h3>
                <div className="footer-social-icons">
                    <SocialIcon url='https://www.instagram.com' />
                    <SocialIcon url='https://www.linkedin.com' />
                </div>
            </div>
            <div className="footer-center">
                <h2>Quick links</h2>
                <div className="footer-center-links">
                    <ul>
                        <Link to='/' className='footer-link'><li>Home</li></Link>
                        <Link to='/records' className='footer-link'><li>Records</li></Link>
                        <Link to='/about' className='footer-link'><li>About Us</li></Link>
                    </ul>
                </div>
            </div>
            <div className="footer-right">
                <h2>Contact Information</h2>
                <p>Bloodline number: +91 97911 62108</p>
                <p>Email: yrc@mitindia.edu</p>
                <hr />
                <h2>Other services</h2>
                <p>MIT Vision Companion - Reading center for Visually challenged students.</p>
                <p>Vision Companion number:   +91 72007 12847</p>
            </div>
        </div>
        <hr className='footer-hr'/>
        <p className="footer-copyright">Copyright 2025 &copy; YRC Bloodline - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
