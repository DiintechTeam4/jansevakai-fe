import { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import AdminLoginForm from './AdminLoginForm';
import AdminRegisterForm from './AdminRegisterForm';

const AdminAuthLayout = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const navigate = useNavigate();

  const switchToRegister = () => {
    setAuthMode('register');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  const handleRegisterSuccess = () => {
    setAuthMode('login');
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center ">
  <div className="w-100 rounded shadow-lg p-4 border border-secondary" style={{ maxWidth: '28rem' }}>
    <div className="text-center mb-4">
      <h1 className="fs-1 fw-bold text-primary">Admin Portal</h1>
      <p className="text-muted mt-2">Secured access for administrators</p>
    </div>

    <div className="mb-4">
      <Routes>
        <Route
          path="/"
          element={
            <AdminLoginForm
              onLogin={onLogin}
              switchToRegister={switchToRegister}
            />
          }
        />
        <Route
          path="/register"
          element={
            <AdminRegisterForm
              onSuccess={handleRegisterSuccess}
              switchToLogin={switchToLogin}
            />
          }
        />
      </Routes>
    </div>

    <div className="mt-4 border-top pt-4">
      <div className="text-center">
        {authMode === 'login' ? (
          <div className="mt-3">
            <p className="text-muted">Need to create an account?</p>
            <Link
              to="/admin/register"
              className="mt-2 d-inline-block text-primary fw-medium"
              onClick={switchToRegister}
            >
              Register as Admin
            </Link>
          </div>
        ) : (
          <div className="mt-3">
            <p className="text-muted">Already have an account?</p>
            <Link
              to="/admin"
              className="mt-2 d-inline-block text-primary fw-medium"
              onClick={switchToLogin}
            >
              Log in as Admin
            </Link>
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <Link to="/selectrole" className="text-secondary fw-medium">
          Return to main login
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default AdminAuthLayout; 