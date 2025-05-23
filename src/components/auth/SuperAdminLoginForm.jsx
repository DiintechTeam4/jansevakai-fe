import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaUser, FaSignInAlt, FaShieldAlt } from 'react-icons/fa';

const SuperAdminLoginForm = ({ onLogin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = 'api/superadmin/login';
      
      console.log('Attempting super admin login with:', {
        email: formData.email
      });

      const response = await axios.post(`http://localhost:4000/${endpoint}`, formData);
      
      console.log('Server response:', response.data);
      
      if (!response.data.success && !response.data.token) {
        throw new Error(response.data.message || 'Login failed');
      }

      // Structure the data properly before calling onLogin
      const loginData = {
        token: response.data.token,
        userType: 'superadmin',
        user: response.data.user || {
          _id: response.data._id,
          ...response.data
        }
      };

      // Call the onLogin function with the properly structured data
      onLogin(loginData);
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Invalid super admin credentials. Please try again.';
      setError(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
  <h2 className="text-center h5 fw-semibold mb-4">Super Admin Login</h2>

  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="form-label d-flex align-items-center fw-bold text-muted">
        <FaUser className="me-2" /> Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="form-control"
        placeholder="superadmin@example.com"
      />
    </div>

    <div className="mb-4">
      <label className="form-label d-flex align-items-center fw-bold text-muted">
        <FaLock className="me-2" /> Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="form-control"
        placeholder="••••••••"
      />
    </div>

    {error && (
      <div className="mb-3 p-3 bg-danger bg-opacity-10 border border-danger text-danger rounded">
        {error}
      </div>
    )}

    <div className="d-flex justify-content-center">
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-100 d-flex align-items-center justify-content-center fw-bold"
        style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }} // purple-600 equivalent
      >
        {loading ? (
          <span className="d-inline-flex align-items-center">
            <svg
              className="me-2"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle className="opacity-25" cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"></circle>
              <path
                fill="currentColor"
                d="M4 8a4 4 0 014-4V0C3.582 0 0 3.582 0 8h4zm2 2a4 4 0 01-4-4H0c0 3.314 2.686 6 6 6v-2z"
              ></path>
            </svg>
            Logging in...
          </span>
        ) : (
          <span className="d-inline-flex align-items-center">
            <FaShieldAlt className="me-2" />
            Super Admin Login
          </span>
        )}
      </button>
    </div>
  </form>
</div>

  );
};

export default SuperAdminLoginForm; 