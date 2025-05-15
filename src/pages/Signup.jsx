import { motion } from 'framer-motion'
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    <div className="w-100 min-vh-100 d-flex align-items-center" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #ff8c00 100%)'
    }}>
      <section className="w-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
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
                    <h1 className="display-4 fw-bold mb-3 text-white">Create Account</h1>
                    <p className="lead text-white-50">
                      Join us to access all services and manage your account.
                    </p>
                  </motion.div>

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
                          I agree to the <Link to="/terms" className="text-primary">Terms of Service</Link> and <Link to="/privacy" className="text-primary">Privacy Policy</Link>
                        </label>
                      </div>
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
                      Create Account
                    </motion.button>

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

export default SignUp
