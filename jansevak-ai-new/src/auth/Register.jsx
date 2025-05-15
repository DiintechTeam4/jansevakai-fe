import { motion } from 'framer-motion'
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook } from 'react-icons/fa'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset messages
    setError(null)
    setSuccessMessage(null)
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Post data to backend
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }
      
      // Registration successful
      setSuccessMessage('Registration successful! Redirecting to login...')
      console.log(data)
      
      // Store token if returned by the server
      if (data.token) {
        localStorage.setItem('token', data.token)
        
        // If user data is returned, store the role
        if (data.user && data.user.role) {
          localStorage.setItem('userRole', data.user.role)
          
          // Redirect based on role
          setTimeout(() => {
            if (data.user.role === 'user') {
              navigate('/userdashboard')
            } else {
              navigate('/clientdashboard')
            }
          }, 2000)
          return
        }
      }
      
      // If no token or immediate redirect, redirect to login after delay
      setTimeout(() => {
        navigate('/login')
      }, 2000)
      
    } catch (err) {
      console.error('Registration error:', err)
      setError(err.message || 'Failed to register. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-100 min-vh-100 d-flex align-items-center" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #ff8c00 100%)'
    }}>
      <section className="w-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-4"
              >
                <h1 className="display-4 fw-bold mb-3 text-white">Create Account</h1>
                <p className="lead text-white-50">
                  Join our community to access services and support.
                </p>
              </motion.div>

              {/* Registration Form */}
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
                {/* Error message */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                {/* Success message */}
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}

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
                  
                  <div className="text-center text-white-50 mb-4">OR</div>
                  
                  {/* Social Registration Buttons */}
                  <div className="d-grid gap-2 mb-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2"
                    >
                      <FaGoogle /> Continue with Google
                    </motion.button>
                    <motion.button
                      type="button"
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
                    disabled={isLoading}
                    style={{ 
                      backgroundColor: '#ff8c00',
                      borderColor: '#ff8c00'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registering...
                      </>
                    ) : 'Register'}
                  </motion.button>
                  
                  <div className="text-center">
                    <span className="text-white-50">Already have an account? </span>
                    <Link to="/login" className="text-primary text-decoration-none">
                      Sign In
                    </Link>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
