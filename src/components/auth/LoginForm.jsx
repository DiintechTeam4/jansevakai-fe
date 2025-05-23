import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ userType, onLogin, switchToRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for stored client email when the component mounts
  useEffect(() => {
    // If this is a client login and we have a stored email, use it
    if (userType === 'client') {
      const storedEmail = sessionStorage.getItem('tempClientEmail');
      if (storedEmail) {
        setFormData(prev => ({ ...prev, email: storedEmail }));
        // Remove from storage after using it
        sessionStorage.removeItem('tempClientEmail');
      }
    }
  }, [userType]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google login success:', decoded);

      // This endpoint will handle both client and user types based on userType prop
      const endpoint = `http://localhost:4000/api/${userType}/login`;
      
      const response = await axios.post(endpoint, {
        token: credentialResponse.credential,
        email: decoded.email,
        name: decoded.name,
        googleAuth: true // Flag to indicate this is Google authentication
      });
      
      console.log('Server response:', response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }

      // Structure the data for the app to consume
      const loginData = {
        token: response.data.token,
        userType,
        user: response.data.user || response.data.client || {
          _id: response.data._id || decoded.sub,
          name: decoded.name,
          email: decoded.email
        }
      };

      // Call the onLogin function with the properly structured data
      onLogin(loginData);
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google Sign In failed');
    setError('Google Sign In was unsuccessful. Please try again.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let endpoint = '';
      
      switch (userType) {
        case 'user':
          endpoint = 'api/user/login';
          break;
        case 'admin':
          endpoint = 'api/admin/login';
          break;
        case 'client':
          endpoint = 'api/client/login';
          break;
        default:
          throw new Error('Invalid user type');
      }

      console.log('Attempting login with:', {
        endpoint,
        email: formData.email,
        userType,
      });

      const response = await axios.post(`http://localhost:4000/${endpoint}`, formData);
      
      console.log('Server response for login:', response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }

      // Structure the data properly before calling onLogin
      const loginData = {
        token: response.data.token,
        userType,
        user: response.data.client || response.data.user || response.data.admin || {
          _id: response.data._id,
          ...response.data
        }
      };

      console.log('Processed login data:', loginData);

      // Call the onLogin function with the properly structured data
      onLogin(loginData);
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setError(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Create a robust handler for switching to register
  const handleRegisterClick = (e) => {
    // Prevent any default button behavior
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    console.log("Register button clicked in LoginForm");
    
    // Call the parent switchToRegister function
    if (typeof switchToRegister === 'function') {
      console.log("Calling parent switchToRegister function");
      switchToRegister();
    } else {
      console.error("switchToRegister is not a function:", switchToRegister);
    }
  };

  return (
    <div className="mb-4">
    {/* Google Sign In Button */}
    <div className="d-flex flex-column align-items-center mb-4">
      <div className="mb-3 w-100">
        <p className="text-center text-muted mb-3">
          Sign in to {userType === 'user' ? 'User Account' : 'Business Account'} with Google
        </p>
        <div className="d-flex justify-content-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            text="signin_with"
            theme="filled_blue"
            shape="rectangular"
            size="large"
            logo_alignment="center"
          />
        </div>
      </div>
      <div className="w-100 d-flex align-items-center justify-content-center my-3">
        <div className="flex-grow-1 border-top border-secondary"></div>
        <span className="px-3 text-muted small">OR</span>
        <div className="flex-grow-1 border-top border-secondary"></div>
      </div>
    </div>
  
    {/* Regular Login Form */}
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label d-flex align-items-center fw-bold text-white">
          <FaEnvelope className="me-2" /> Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-control shadow-sm"
          placeholder='example@gmail.com'
        />
      </div>
  
      <div className="mb-4">
        <label className="form-label d-flex align-items-center fw-bold text-white">
          <FaLock className="me-2" /> Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-control shadow-sm"
          placeholder="••••••••"
        />
      </div>
  
      {error && (
        <div className="mb-3 p-2 bg-danger bg-opacity-10 border border-danger text-danger rounded">
          {error}
        </div>
      )}
  
      <div className="d-flex flex-column align-items-center">
        <button
          type="submit"
          disabled={loading}
          className="w-100 btn btn-primary fw-bold"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
  
        <div className="mt-3 text-center">
          <p className="text-muted mb-1">Don't have an account?</p>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="btn btn-link p-0 text-decoration-none text-primary fw-medium"
          >
            Register Here
          </button>
        </div>
      </div>
    </form>
  </div>
  
  );
};

export default LoginForm; 