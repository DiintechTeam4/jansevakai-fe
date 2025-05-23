import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import './tailwind.output.css'
import './index.css'
import About from './pages/About'
import Contact from './pages/Contact'
import MahaAI from './pages/MahaAI'
import ScrollToTop from './components/ScrollToTop'
import HaryanaAI from './pages/HaryanaAI'
import UttarAI from './pages/UttarAI'
import MadhyaAI from './pages/MadhyaAI'
import DelhiAI from './pages/DelhiAI'
import AssamAI from './pages/AssamAI'
import GujaratAI from './pages/GujaratAI'
import RajasthanAI from './pages/RajasthanAI'
import ChattisgarhAI from './pages/Chattisgarh'
import UttraAI from './pages/UttraAI'
import { useState, useEffect } from 'react'

import AuthLayout from './components/auth/AuthLayout'
import UserDashboard from './components/dashboards/UserDashboard'
import AdminDashboard from './components/dashboards/AdminDashboard'
import ClientDashboard from './components/dashboards/ClientDashboard'
import SuperAdminDashboard from './components/dashboards/SuperAdminDashboard'
import AdminAuthLayout from './components/auth/AdminAuthLayout'
import SuperAdminAuthLayout from './components/auth/SuperAdminAuthLayout'
import axios from 'axios'

// Protected Route component
const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      // Set default axios auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      // Try to get user data using the token
      const userType = localStorage.getItem('userType')
      const userId = localStorage.getItem('userId')
      
      if (userType && userId) {
        setIsAuthenticated(true)
        setUser({
          id: userId,
          userType,
          // Other user data will be loaded in the dashboard
        })
      }
    }
    
    setLoading(false)
  }, [])

  // Handle login
  const handleLogin = (userData) => {
    console.log("Login data:", userData); // For debugging
    
    // Save auth data
    localStorage.setItem('token', userData.token)
    localStorage.setItem('userType', userData.userType)
    localStorage.setItem('userId', userData.user._id || userData.user.id)
    
    // Set axios default auth header
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    
    setIsAuthenticated(true)
    setUser({
      ...userData.user,
      userType: userData.userType,
    })
  }

  // Handle logout
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    localStorage.removeItem('userId')
    
    // Clear axios auth header
    delete axios.defaults.headers.common['Authorization']
    
    setIsAuthenticated(false)
    setUser(null)
  }

  // Show loading screen
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="h4">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        <Route path="/mahaai/:stateid" element={<><Header /><MahaAI /><Footer /></>} />
        <Route path="/haryanaai/:stateid" element={<><Header /><HaryanaAI /><Footer /></>} />
        <Route path="/uttarai/:stateid" element={<><Header /><UttarAI /><Footer /></>} />
        <Route path="/madhyaai/:stateid" element={<><Header /><MadhyaAI /><Footer /></>} />
        <Route path="/delhiai/:stateid" element={<><Header /><DelhiAI /><Footer /></>} />
        <Route path="/assamai/:stateid" element={<><Header /><AssamAI /><Footer /></>} />
        <Route path="/gujaratai/:stateid" element={<><Header /><GujaratAI /><Footer /></>} />
        <Route path="/rajasthanai/:stateid" element={<><Header /><RajasthanAI /><Footer /></>} />
        <Route path="/chattisgarhai/:stateid" element={<><Header /><ChattisgarhAI /><Footer /></>} />
        <Route path="/uttraai/:stateid" element={<><Header /><UttraAI /><Footer /></>} />


        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminAuthLayout onLogin={handleLogin} />} />
          
        {/* Super Admin Routes */}
        <Route path="/superadmin/*" element={<SuperAdminAuthLayout onLogin={handleLogin} />} />
          
        {/* Regular Authentication Routes */}
        <Route path="/selectrole" element={<AuthLayout onLogin={handleLogin} /> }/>
          {/* !isAuthenticated 
            ? <AuthLayout onLogin={handleLogin} /> 
            : <Navigate to="/" replace />
        } /> */}
          
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/">
            {user?.userType === 'user' && <UserDashboard user={user} onLogout={handleLogout} />}
            {user?.userType === 'admin' && <AdminDashboard user={user} onLogout={handleLogout} />}
            {user?.userType === 'client' && <ClientDashboard user={user} onLogout={handleLogout} />}
            {user?.userType === 'superadmin' && <SuperAdminDashboard user={user} onLogout={handleLogout} />}
          </ProtectedRoute>
        } />
          
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
