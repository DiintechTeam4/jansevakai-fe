import { FaRobot, FaBars, FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [statesDropdown, setStatesDropdown] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleStatesDropdown = () => {
    setStatesDropdown(!statesDropdown)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const stateLinks = [
    { name: 'Maharashtra', path: '/maharashtra' },
    // Add more states here as they become available
  ]

  return (
    <header className="py-3 sticky-top bg-dark text-white">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="d-flex align-items-center"
          >
            <Link to="/" className="text-white text-decoration-none">
              {/* <FaRobot size={24} className="me-2" /> */}
              <span className="h5 mb-0 d-flex align-items-center gap-4">
                <img src="/JANSEVAKAI_LOGO_VERTICAL.png" alt="logo" style={{width: '100%', height: '30px' , marginLeft:"20px"}}/>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="d-none d-md-flex">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="d-flex gap-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-white text-decoration-none position-relative py-2 ${
                    location.pathname === link.path ? 'active' : ''
                  }`}
                >
                  {link.name}
                  <span className="position-absolute bottom-0 start-0 w-0 h-2 transition-all duration-300"></span>
                </Link>
              ))}
              
              {/* States Dropdown */}
              {/* <div className="position-relative">
                <button 
                  className="text-white text-decoration-none bg-transparent border-0 py-2"
                  onClick={toggleStatesDropdown}
                >
                  States
                </button>
                {statesDropdown && (
                  <div className="position-absolute top-100 start-0 bg-dark p-2 rounded mt-1" style={{zIndex: 1000, minWidth: '150px'}}>
                    {stateLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="d-block text-white text-decoration-none p-2 rounded hover-bg-primary"
                        onClick={() => setStatesDropdown(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div> */}
            </motion.div>
          </nav>

          {/* Auth Buttons */}
          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="d-none d-md-flex align-items-center gap-3"
          >
            <Link
              to="/login"
              className="btn btn-outline-light"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-primary"
            >
              Sign Up
            </Link>
          </motion.div> */}

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="d-md-none btn btn-outline-light"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="d-md-none mt-3"
          >
            <div className="d-flex flex-column gap-3 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-white text-decoration-none py-2 px-3 rounded ${
                    location.pathname === link.path ? 'bg-primary' : 'hover-bg-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              
              <div className="d-flex flex-column gap-3 pt-3 border-top">
                <Link
                  to="/login"
                  className="btn btn-outline-light w-100"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary w-100"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header 