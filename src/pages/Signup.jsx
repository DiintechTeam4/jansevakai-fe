import { motion } from 'framer-motion'
import { FaUser, FaLock, FaEnvelope, FaPhone, FaGoogle, FaGithub } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
    console.log('Signup form submitted:', formData)
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
            <div className="col-md-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="display-4 fw-bold mb-4">Create Account</h1>
                <p className="lead mb-4">
                  Join us to access exclusive features and manage your services.
                </p>
                <div className="d-flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline-light"
                  >
                    <FaGoogle className="me-2" />
                    Sign up with Google
                  </motion.button>
                  {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline-light"
                  >
                    <FaGithub className="me-2" />
                    Sign up with GitHub
                  </motion.button> */}
                </div>
              </motion.div>
            </div>
            <div className="col-md-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="card bg-dark bg-opacity-50 border-0 shadow-lg"
              >
                <div className="card-body p-4">
                  <h2 className="h4 fw-bold mb-4 text-center">Sign Up</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-dark bg-opacity-25 text-white border-secondary"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          required
                        />
                        <label htmlFor="name" className="text-white-50">
                          <FaUser className="me-2" />
                          Full Name
                        </label>
                      </div>
                    </div>
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
                          <FaEnvelope className="me-2" />
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-floating">
                        <input
                          type="tel"
                          className="form-control bg-dark bg-opacity-25 text-white border-secondary"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          required
                        />
                        <label htmlFor="phone" className="text-white-50">
                          <FaPhone className="me-2" />
                          Phone Number
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
                    <div className="mb-3">
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control bg-dark bg-opacity-25 text-white border-secondary"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          required
                        />
                        <label htmlFor="confirmPassword" className="text-white-50">
                          <FaLock className="me-2" />
                          Confirm Password
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label text-white-50" htmlFor="agreeTerms">
                          I agree to the <Link to="/terms" className="text-primary text-decoration-none">Terms and Conditions</Link>
                        </label>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-primary w-100 mb-3"
                      type="submit"
                    >
                      Create Account
                    </motion.button>
                    <div className="text-center">
                      <span className="text-white-50">Already have an account? </span>
                      <Link to="/login" className="text-primary text-decoration-none">
                        Sign In
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

export default Signup
