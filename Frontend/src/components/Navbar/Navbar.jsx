import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({setShowLogin, setIsLogin, isLogin}) => {

    const location = useLocation();
    const pathname = location.pathname;

    const logout = async () => {
        sessionStorage.removeItem("token");
        setIsLogin(false);
    }

    return (
        <div className='navbar' id='#home'>
            <div className="navbar-components">
                <div className="navbar-logo">
                    <img src={assets.logo} alt="" />
                </div>
                <ul className="navbar-menu">
                    <Link to='/' className={pathname==="/"?"active":""}>Home</Link>
                    <Link to='/bloodform' className={pathname==="/bloodform"?"active":""}>Request Blood</Link>
                    <Link to='/about' className={pathname==="/about"?"active":""}>About us</Link>
                    <a href='#contactUs' className={pathname==="/#contactUs"?"active":""}>Contact us</a>
                </ul>
                <div className="navbar-right">
                    { isLogin ?
                        (<img onClick={logout} src={assets.user} alt="" className='user-image'/>)
                    :
                        (<button onClick={()=>setShowLogin(true)} >Signup/Login</button>)
                    }
                </div>
            </div>
        </div>    
    )
}

export default Navbar
