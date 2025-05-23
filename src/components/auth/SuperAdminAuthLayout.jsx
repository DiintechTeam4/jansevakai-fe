import { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import SuperAdminLoginForm from './SuperAdminLoginForm';

const SuperAdminAuthLayout = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" >
  <div className="w-100" style={{ maxWidth: '480px' }}>
    <div className="rounded-4 shadow border border-light p-4 p-md-5">
      
      <div className="text-center mb-4">
        <h1 className="h3 fw-bold text-primary">Super Admin Portal</h1>
        <p className="text-muted mt-2">Restricted access for system administrators</p>
      </div>

      <div className="mb-4">
        <Routes>
          <Route path="/" element={
            <SuperAdminLoginForm 
              onLogin={onLogin} 
              switchToRegister={() => {}} 
            />
          } />
        </Routes>
      </div>

      <hr className="mt-4 mb-3" />

      <div className="text-center">
        <Link to="/selectrole" className="text-muted text-decoration-none fw-medium">
          Return to main login
        </Link>
      </div>

    </div>
  </div>
</div>

  );
};

export default SuperAdminAuthLayout; 