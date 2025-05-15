import { motion } from 'framer-motion'
import { FaUser, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa'
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }
      
      // Store token and user data
      localStorage.setItem('token', data.token)
      
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
    } catch (err) {
      console.error('Login error:', err)
      setError('Invalid email or password. Please try again.')
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
                <h1 className="display-4 fw-bold mb-3 text-white">Welcome Back</h1>
                <p className="lead text-white-50">
                  Sign in to access your account and manage your services.
                </p>
              </motion.div>

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
                {/* Error message */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

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
                        Signing In...
                      </>
                    ) : 'Sign In'}
                  </motion.button>
                  <div className="text-center">
                    <span className="text-white-50">Don't have an account? </span>
                    <Link to="/signup" className="text-primary text-decoration-none">
                      Sign Up
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

export default Login
