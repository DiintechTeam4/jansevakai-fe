import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUserTie, FaArrowRight, FaSpinner } from 'react-icons/fa';

export default function Roleselection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState('');

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Get current user data
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUserId(userData.id);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user information. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      
      // Update user role in backend
      const response = await fetch(`http://localhost:4000/api/auth/updaterole`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          role: selectedRole
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update role');
      }

      // Update role in local storage
      localStorage.setItem('userRole', selectedRole);
      
      setSuccess('Role updated successfully! Redirecting to dashboard...');
      
      // Redirect based on selected role
      setTimeout(() => {
        if (selectedRole === 'user') {
          navigate('/userdashboard');
        } else if (selectedRole === 'client') {
          navigate('/clientdashboard');
        }
      }, 2000);
      
    } catch (err) {
      console.error('Error updating role:', err);
      setError(err.message || 'Failed to update role. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Select Your Role</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}
              
              <div className="mb-4">
                <p className="text-muted text-center">
                  Please select your role to continue to the appropriate dashboard
                </p>
              </div>
              
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div 
                    className={`card h-100 ${selectedRole === 'user' ? 'border-primary' : ''}`}
                    onClick={() => handleRoleSelect('user')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body text-center p-4">
                      <div className="mb-3">
                        <FaUser size={40} className={selectedRole === 'user' ? 'text-primary' : 'text-secondary'} />
                      </div>
                      <h5 className="card-title">User</h5>
                      <p className="card-text small text-muted">
                        Apply for services and track your applications
                      </p>
                      {selectedRole === 'user' && (
                        <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
                          <div className="bg-primary rounded-circle text-white p-1">
                            <FaArrowRight size={12} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div 
                    className={`card h-100 ${selectedRole === 'client' ? 'border-primary' : ''}`}
                    onClick={() => handleRoleSelect('client')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body text-center p-4">
                      <div className="mb-3">
                        <FaUserTie size={40} className={selectedRole === 'client' ? 'text-primary' : 'text-secondary'} />
                      </div>
                      <h5 className="card-title">Client</h5>
                      <p className="card-text small text-muted">
                        Manage services and process applications
                      </p>
                      {selectedRole === 'client' && (
                        <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
                          <div className="bg-primary rounded-circle text-white p-1">
                            <FaArrowRight size={12} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="d-grid">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleSubmit}
                  disabled={!selectedRole || isLoading}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="spin me-2" />
                      Updating Role...
                    </>
                  ) : (
                    <>Continue</>
                  )}
                </button>
              </div>
              
              <div className="mt-3 text-center">
                <button 
                  className="btn btn-link text-muted"
                  onClick={() => navigate('/login')}
                  disabled={isLoading}
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
