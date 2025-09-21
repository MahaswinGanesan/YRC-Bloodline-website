import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Heading from './components/Heading/Heading'
import Navbar from './components/Navbar/Navbar'
import Requests from './pages/Requests/Requests'
import Donor from './pages/Donor/Donor'


const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Heading />
      <Routes>
        <Route path='/' element={<Requests />} />
        <Route path='/donor' element={<Donor />} />
      </Routes>
    </div>
  )
}

export default App
