import { motion } from 'framer-motion'
import { FaUser, FaLock, FaShieldAlt } from 'react-icons/fa'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Adminlogin = () => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/admin/login', {
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
      
      // Store token
      localStorage.setItem('token', data.token)
      
      // Admin user should always have admin role
      localStorage.setItem('userRole', 'admin')
      
      // Redirect to admin dashboard
      navigate('/admindashboard')
      
    } catch (err) {
      console.error('Admin login error:', err)
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
                <h1 className="display-4 fw-bold mb-3 text-white">Admin Login</h1>
                <div className="d-flex justify-content-center mb-3">
                  <FaShieldAlt className="text-warning" style={{ fontSize: '3rem' }} />
                </div>
                <p className="lead text-white-50">
                  Access your administrative dashboard
                </p>
              </motion.div>

              {/* Admin Login Form */}
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
                        Admin Email
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
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
                        Admin Password
                      </label>
                    </div>
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
                    ) : 'Admin Sign In'}
                  </motion.button>
                  
                  <div className="text-center">
                    <span className="text-white-50">Need an admin account? </span>
                    <Link to="/adminregister" className="text-primary text-decoration-none">
                      Register as Admin
                    </Link>
                  </div>
                  <div className="text-center mt-2">
                    <Link to="/login" className="text-white-50 text-decoration-none">
                      Back to User Login
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

export default Adminlogin 