import { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ userType, onSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      let endpoint = '';
      
      switch (userType) {
        case 'user':
          endpoint = 'api/user/register';
          break;
        // case 'admin':
        //   endpoint = 'api/admin/register';
        //   break;
        case 'client':
          endpoint = 'api/client/register';
          break;
        default:
          throw new Error('Invalid user type');
      }

      const response = await axios.post(`http://localhost:4000/${endpoint}`, formData);
      console.log(response);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Create a robust handler for switching to login
  const handleLoginClick = (e) => {
    // Prevent any default form submission
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    console.log("Login button clicked in RegisterForm");
    
    // Call the parent switchToLogin function
    if (typeof switchToLogin === 'function') {
      console.log("Calling parent switchToLogin function");
      switchToLogin();
    } else {
      console.error("switchToLogin is not a function:", switchToLogin);
    }
  };

  const renderUserFields = () => (
    <>
      <div className="mb-3">
        <label className="form-label fw-bold text-white">Name</label>
        <input
          type="text"
          name="name"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder='enter name'
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold text-white">Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder='enter email'
        />
      </div>
      <div className="mb-4">
        <label className="form-label fw-bold text-white">Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder="••••••••"
        />
      </div>
    </>
  );
  
  const renderClientFields = () => (
    <div className="row g-3 mb-3">
      <div className="col-md-6">
        <label className="form-label fw-bold text-white">Full Name</label>
        <input
          type="text"
          name="name"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder='enter name'
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold text-white">Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder='example@gmail.com'

        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold text-white">Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder="••••••••"
          />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold text-white">Business Name</label>
        <input
          type="text"
          name="businessName"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder='enter business'
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold text-white">GST Number</label>
        <input
          type="text"
          name="gstNo"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder='enter GST'
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold text-white">PAN Number</label>
        <input
          type="text"
          name="panNo"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder='enter PAN no.'
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold text-white">Aadhar Number</label>
        <input
          type="text"
          name="aadharNo"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder="enter Aadhar no."
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold text-white">City</label>
        <input
          type="text"
          name="city"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder='enter city'
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold text-white">Pincode</label>
        <input
          type="text"
          name="pincode"
          required
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder='enter pincode'
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold text-white">Website URL (optional)</label>
        <input
          type="url"
          name="websiteUrl"
          onChange={handleChange}
          className="form-control shadow-sm"
          placeholder='enter Web URL'
        />
      </div>
    </div>
  );
  
  return (
    <>
      {/* Direct login button */}
      <div className="mb-3 text-center">
        <button
          type="button"
          onClick={() => {
            console.log("Direct login button clicked");
            if (typeof switchToLogin === 'function') {
              switchToLogin();
            }
          }}
          className="btn btn-link text-decoration-underline text-primary"
        >
          Go to Login Form
        </button>
      </div>
  
      <form onSubmit={handleSubmit}>
        {userType === 'user' && renderUserFields()}
        {/* {userType === 'admin' && renderAdminFields()} */}
        {userType === 'client' && renderClientFields()}
  
        {error && (
          <div className="mb-3 p-2 bg-danger bg-opacity-10 border border-danger text-danger rounded">
            {error}
          </div>
        )}
  
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary fw-bold"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <button
            type="button"
            onClick={handleLoginClick}
            className="btn btn-link text-primary p-0"
          >
            Already have an account? Log in
          </button>
        </div>
      </form>
    </>
  );
  
};

export default RegisterForm; 