import { motion } from 'framer-motion'
import { FaUser, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login form submitted:', formData)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="w-100 min-vh-100 d-flex align-items-center" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #ff8c00 100%)'
    }}>
      <section className="w-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              

              {/* Login Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-0 shadow-lg"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(60px)',
                  borderRadius: '12px',
                  padding: '2rem'
                }}
              >
                <div>
{/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-5"
              >
                <h1 className="display-4 fw-bold mb-3 text-white">Welcome Back</h1>
                <p className="lead text-white-50">
                  Sign in to access your account and manage your services.
                </p>
              </motion.div>                  
                 


                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control bg-dark bg-opacity-25 text-white border-secondary"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required
                        />
                        <label htmlFor="email" className="text-white-50">
                          <FaUser className="me-2" />
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control bg-dark bg-opacity-25 text-white border-secondary"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="password" className="text-white-50">
                          <FaLock className="me-2" />
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                        />
                        <label className="form-check-label text-white-50" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                      <Link to="/forgot-password" className="text-primary text-decoration-none">
                        Forgot Password?
                      </Link>
                    </div>
                                      <div className="text-center text-white-50 mb-4">OR</div>
 {/* Social Login Buttons */}
                  <div className="d-grid gap-2 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2"
                    >
                      <FaGoogle /> Continue with Google
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2"
                    >
                      <FaFacebook /> Continue with Facebook
                    </motion.button>
                  </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-primary w-100 mb-3"
                      type="submit"
                      style={{ 
                        backgroundColor: '#ff8c00',
                        borderColor: '#ff8c00'
                      }}
                    >
                      Sign In
                    </motion.button>
                    <div className="text-center">
                      <span className="text-white-50">Don't have an account? </span>
                      <Link to="/signup" className="text-primary text-decoration-none">
                        Sign Up
                      </Link>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
