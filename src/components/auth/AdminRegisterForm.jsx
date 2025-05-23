import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaUser, FaEnvelope, FaKey, FaUserShield } from 'react-icons/fa';

const AdminRegisterForm = ({ onSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    admincode: '',
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
      const response = await axios.post('http://localhost:4000/api/admin/register', formData);
      
      console.log('Registration response:', response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Registration failed');
      }

      // Show success message
      setError('');
      onSuccess();
      alert('Admin registration successful! You can now log in.');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <h2 className="fs-4 fw-semibold mb-4 text-center">Admin Registration</h2>
  
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label d-flex align-items-center fw-bold text-muted small">
          <FaUser className="me-2" /> Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="John Doe"
        />
      </div>
  
      <div className="mb-3">
        <label className="form-label d-flex align-items-center fw-bold text-muted small">
          <FaEnvelope className="me-2" /> Email
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
  
      <div className="mb-3">
        <label className="form-label d-flex align-items-center fw-bold text-muted small">
          <FaLock className="me-2" /> Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
          className="form-control"
          placeholder="••••••••"
        />
      </div>
  
      <div className="mb-4">
        <label className="form-label d-flex align-items-center fw-bold text-muted small">
          <FaKey className="me-2" /> Admin Registration Code
        </label>
        <input
          type="text"
          name="admincode"
          value={formData.admincode}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Enter admin registration code"
        />
        <p className="form-text text-muted mt-1">
          Contact system administrator to obtain a valid code
        </p>
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
              Registering...
            </span>
          ) : (
            <span className="d-inline-flex align-items-center">
              <FaUserShield className="me-2" />
              Register as Admin
            </span>
          )}
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default AdminRegisterForm; 