import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className='navbar' id='#home'>
            <div className="navbar-components">
                <div className="navbar-logo">
                    <img src={assets.logo} alt="" />
                </div>
                <ul className="navbar-menu">
                    <Link to='/' className={pathname==="/"?"active":""}>Home</Link>
                    <Link to='/' className={pathname==="/"?"active":""}>Blood Requests</Link>
                    <Link to='/donor' className={pathname==="/donor"?"active":""}>Donors form</Link>
                </ul>
                <div className="navbar-right">
                    <img src={assets.user} alt="" className='user-image'/>
                </div>
            </div>
        </div>    
    )
}

export default Navbar
