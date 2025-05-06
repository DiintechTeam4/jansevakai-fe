import { motion } from 'framer-motion'
import { FaUser, FaLock, FaGoogle, FaGithub } from 'react-icons/fa'
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
    <div className="w-100">
      {/* Hero Section */}
      <section className="position-relative bg-dark text-white" style={{ minHeight: '90vh' }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-md-6 mt-5">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="display-4 fw-bold mb-4">Welcome Back</h1>
                <p className="lead mb-4">
                  Sign in to access your account and manage your services.
                </p>
                <div className="d-flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline-light"
                  >
                    <FaGoogle className="me-2" />
                    Sign in with Google
                  </motion.button>
                  {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline-light"
                  >
                    <FaGithub className="me-2" />
                    Sign in with GitHub
                  </motion.button> */}
                </div>
              </motion.div>
            </div>
            <div className="col-md-6 mt-5">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="card bg-dark bg-opacity-50 border-0 shadow-lg"
              >
                <div className="card-body p-4">
                  <h2 className="h4 fw-bold mb-4 text-center">Sign In</h2>
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
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-primary w-100 mb-3"
                      type="submit"
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
