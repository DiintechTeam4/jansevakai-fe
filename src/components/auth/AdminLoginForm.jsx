import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaUser, FaSignInAlt } from 'react-icons/fa';

const AdminLoginForm = ({ onLogin, switchToRegister }) => {
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
      const endpoint = 'api/admin/login';
      
      console.log('Attempting admin login with:', {
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
        userType: 'admin',
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
      const errorMessage = err.response?.data?.message || err.message || 'Invalid admin credentials. Please try again.';
      setError(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
  <h2 className="fs-4 fw-semibold mb-4 text-center">Admin Login</h2>

  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="form-label d-flex align-items-center fw-bold text-muted small">
        <FaUser className="me-2" /> Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="form-control"
        placeholder="admin@example.com"
      />
    </div>

    <div className="mb-4">
      <label className="form-label d-flex align-items-center fw-bold text-muted small">
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

    <div className="d-flex align-items-center justify-content-center">
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-100 fw-bold py-2 d-flex align-items-center justify-content-center"
      >
        {loading ? (
          <span className="d-inline-flex align-items-center">
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Logging in...
          </span>
        ) : (
          <span className="d-inline-flex align-items-center">
            <FaSignInAlt className="me-2" />
            Admin Login
          </span>
        )}
      </button>
    </div>
  </form>
</div>

  );
};

export default AdminLoginForm; 