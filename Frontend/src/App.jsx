import React from 'react'
import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import ContactUs from './pages/ContactUs/ContactUs'
import Records from './pages/Records/Records'
import Footer from './components/Footer/Footer'
import Banner from './components/Banner/Banner'
import BloodForm from './components/BloodForm/BloodForm'
import LoginPopup from './components/LoginPopup/LoginPopup'

const App = () => {
  
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} setIsLogin={setIsLogin} />:<></>}
    <div className='app'>
        <Navbar setShowLogin={setShowLogin} setIsLogin={setIsLogin} isLogin={isLogin} />
        <Banner />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contactUs' elemet={<ContactUs />} />
            <Route path='/records' element={<Records />} />
            <Route path='/bloodform' element={<BloodForm isLogin={isLogin} />} />
        </Routes>
        <Footer />
    </div>
    </>
  )
}

export default App
