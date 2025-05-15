import React, { useState, useEffect } from 'react';
import { 
  FaChartBar, 
  FaUser, 
  FaClipboardList, 
  FaComments, 
  FaHeadset, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaArrowLeft,
  FaCalendarAlt,
  FaFileAlt,
  FaBell
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function Clientdashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if screen is mobile and handle resize events
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth < 992) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch('http://localhost:4000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUserData(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Close sidebar automatically on mobile after clicking a tab
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  // Sidebar navigation items
  const navItems = [
    { name: 'Dashboard', icon: <FaChartBar /> },
    { name: 'Profile', icon: <FaUser /> },
    { name: 'Services', icon: <FaClipboardList /> },
    { name: 'Appointments', icon: <FaCalendarAlt /> },
    { name: 'Documents', icon: <FaFileAlt /> },
    { name: 'Notifications', icon: <FaBell /> },
    { name: 'Messages', icon: <FaComments /> },
    { name: 'Support', icon: <FaHeadset /> },
    { name: 'Settings', icon: <FaCog /> }
  ];

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}. Please <Link to="/login">login again</Link>.
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex position-relative">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark" 
          style={{ 
            opacity: 0.5, 
            zIndex: 990,
          }}
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`sidebar bg-dark text-white ${isSidebarOpen ? 'open' : 'closed'}`} style={{
        width: isSidebarOpen ? (isMobile ? '280px' : '250px') : (isMobile ? '0' : '70px'),
        minHeight: '100vh',
        transition: 'all 0.3s ease',
        position: 'fixed',
        zIndex: 1000,
        overflow: 'hidden',
        left: isMobile && !isSidebarOpen ? '-100%' : '0'
      }}>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
          {isSidebarOpen && <h4 className="m-0">Client Dashboard</h4>}
          <button 
            className="btn btn-link text-white" 
            onClick={toggleSidebar}
            style={{ padding: isSidebarOpen ? '' : '0' }}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        {isSidebarOpen && userData && (
          <div className="p-3 border-bottom border-secondary">
            <div className="d-flex align-items-center">
              <div className="bg-primary rounded-circle me-3 d-flex justify-content-center align-items-center" 
                   style={{ width: '40px', height: '40px' }}>
                <FaUser className="text-white" />
              </div>
              <div>
                <h6 className="m-0">{userData.name}</h6>
                <small className="text-muted">{userData.email}</small>
              </div>
            </div>
          </div>
        )}
        
        <div className="nav flex-column mt-3 overflow-auto" style={{ maxHeight: 'calc(100vh - 60px)' }}>
          {navItems.map((item, index) => (
            <div key={index}>
              <button 
                className={`nav-link text-white d-flex align-items-center border-0 bg-transparent w-100 py-3 ${activeTab === item.name ? 'active bg-primary' : ''}`}
                onClick={() => handleTabClick(item.name)}
                style={{
                  textAlign: 'left',
                  paddingLeft: '20px',
                  borderRadius: '0',
                  position: 'relative'
                }}
              >
                <span className="me-3" style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                {(isSidebarOpen || isMobile) && <span>{item.name}</span>}
              </button>
            </div>
          ))}
          
          <button 
            className="nav-link text-white d-flex align-items-center border-0 bg-transparent w-100 py-3"
            onClick={handleLogout}
            style={{
              textAlign: 'left',
              paddingLeft: '20px',
              borderRadius: '0',
              position: 'relative'
            }}
          >
            <span className="me-3" style={{ fontSize: '1.2rem' }}><FaSignOutAlt /></span>
            {(isSidebarOpen || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content" style={{
        marginLeft: isMobile ? '0' : (isSidebarOpen ? '250px' : '70px'),
        width: isMobile ? '100%' : `calc(100% - ${isSidebarOpen ? '250px' : '70px'})`,
        transition: 'margin-left 0.3s ease, width 0.3s ease',
        padding: isMobile ? '15px' : '20px'
      }}>
        {/* Mobile header with toggle button */}
        {isMobile && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button 
              className="btn btn-dark d-lg-none" 
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
            <h4 className="m-0">Client Dashboard</h4>
            <Link to="/" className="btn btn-outline-primary">
              <FaHome />
            </Link>
          </div>
        )}
        
        <div className="container-fluid px-0">
          <div className="row mb-4">
            <div className="col">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2>{activeTab}</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#">Client Dashboard</a></li>
                      <li className="breadcrumb-item active" aria-current="page">{activeTab}</li>
                    </ol>
                  </nav>
                </div>
                <Link to="/" className="btn btn-outline-primary d-none d-md-flex align-items-center">
                  <FaArrowLeft className="me-2" /> Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          {activeTab === 'Dashboard' && (
            <div className="row">
              {/* Welcome Card */}
              <div className="col-12 mb-4">
                <div className="card bg-gradient-primary text-white">
                  <div className="card-body p-4">
                    <h4 className="mb-1">Welcome back, {userData?.name || 'Client'}!</h4>
                    <p className="opacity-75 mb-3">Here's an overview of your services and status.</p>
                    <button className="btn btn-light">View Services</button>
                  </div>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div className="bg-primary p-2 rounded text-white me-3">
                        <FaClipboardList />
                      </div>
                      <h6 className="m-0">Active Services</h6>
                    </div>
                    <h2 className="mt-3 mb-0">3</h2>
                    <small className="text-muted">2 pending approvals</small>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div className="bg-success p-2 rounded text-white me-3">
                        <FaCalendarAlt />
                      </div>
                      <h6 className="m-0">Appointments</h6>
                    </div>
                    <h2 className="mt-3 mb-0">2</h2>
                    <small className="text-muted">Next: Jul 15, 2023</small>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div className="bg-warning p-2 rounded text-white me-3">
                        <FaFileAlt />
                      </div>
                      <h6 className="m-0">Documents</h6>
                    </div>
                    <h2 className="mt-3 mb-0">5</h2>
                    <small className="text-muted">3 require action</small>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div className="bg-danger p-2 rounded text-white me-3">
                        <FaBell />
                      </div>
                      <h6 className="m-0">Notifications</h6>
                    </div>
                    <h2 className="mt-3 mb-0">7</h2>
                    <small className="text-muted">4 unread messages</small>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Appointments */}
              <div className="col-12 col-lg-8 mb-4">
                <div className="card h-100">
                  <div className="card-header d-flex justify-content-between">
                    <h5 className="mb-0">Upcoming Appointments</h5>
                    <button className="btn btn-sm btn-outline-primary">View All</button>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover m-0">
                        <thead className="bg-light">
                          <tr>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Document Verification</td>
                            <td>Jul 15, 2023</td>
                            <td>10:30 AM</td>
                            <td><span className="badge bg-success">Confirmed</span></td>
                            <td><button className="btn btn-sm btn-outline-secondary">Details</button></td>
                          </tr>
                          <tr>
                            <td>Consultation</td>
                            <td>Jul 22, 2023</td>
                            <td>2:00 PM</td>
                            <td><span className="badge bg-warning">Pending</span></td>
                            <td><button className="btn btn-sm btn-outline-secondary">Details</button></td>
                          </tr>
                          <tr>
                            <td>Application Review</td>
                            <td>Aug 05, 2023</td>
                            <td>11:00 AM</td>
                            <td><span className="badge bg-info">Scheduled</span></td>
                            <td><button className="btn btn-sm btn-outline-secondary">Details</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Notifications */}
              <div className="col-12 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-header d-flex justify-content-between">
                    <h5 className="mb-0">Recent Notifications</h5>
                    <button className="btn btn-sm btn-outline-primary">View All</button>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item px-3 py-3 d-flex justify-content-between align-items-start">
                        <div>
                          <div className="d-flex align-items-center">
                            <span className="bg-success rounded-circle p-1 me-2"></span>
                            <p className="mb-0 fw-bold">Document Approved</p>
                          </div>
                          <p className="text-muted small mb-0 mt-1">Your identity document has been verified and approved.</p>
                          <small className="text-muted">2 hours ago</small>
                        </div>
                      </li>
                      <li className="list-group-item px-3 py-3 d-flex justify-content-between align-items-start">
                        <div>
                          <div className="d-flex align-items-center">
                            <span className="bg-primary rounded-circle p-1 me-2"></span>
                            <p className="mb-0 fw-bold">Appointment Reminder</p>
                          </div>
                          <p className="text-muted small mb-0 mt-1">Your appointment is scheduled for tomorrow at 10:30 AM.</p>
                          <small className="text-muted">Yesterday</small>
                        </div>
                      </li>
                      <li className="list-group-item px-3 py-3 d-flex justify-content-between align-items-start">
                        <div>
                          <div className="d-flex align-items-center">
                            <span className="bg-warning rounded-circle p-1 me-2"></span>
                            <p className="mb-0 fw-bold">Action Required</p>
                          </div>
                          <p className="text-muted small mb-0 mt-1">Please submit additional documentation for your application.</p>
                          <small className="text-muted">2 days ago</small>
                        </div>
                      </li>
                      <li className="list-group-item px-3 py-3 d-flex justify-content-between align-items-start">
                        <div>
                          <div className="d-flex align-items-center">
                            <span className="bg-info rounded-circle p-1 me-2"></span>
                            <p className="mb-0 fw-bold">New Message</p>
                          </div>
                          <p className="text-muted small mb-0 mt-1">You have a new message from your support agent.</p>
                          <small className="text-muted">3 days ago</small>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Quick Actions</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 col-md-3 mb-3">
                        <div className="d-grid">
                          <button className="btn btn-outline-primary p-3">
                            <FaFileAlt className="mb-2 fs-4 d-block mx-auto" />
                            Upload Document
                          </button>
                        </div>
                      </div>
                      <div className="col-6 col-md-3 mb-3">
                        <div className="d-grid">
                          <button className="btn btn-outline-success p-3">
                            <FaCalendarAlt className="mb-2 fs-4 d-block mx-auto" />
                            Schedule Appointment
                          </button>
                        </div>
                      </div>
                      <div className="col-6 col-md-3 mb-3">
                        <div className="d-grid">
                          <button className="btn btn-outline-warning p-3">
                            <FaClipboardList className="mb-2 fs-4 d-block mx-auto" />
                            Apply for Service
                          </button>
                        </div>
                      </div>
                      <div className="col-6 col-md-3 mb-3">
                        <div className="d-grid">
                          <button className="btn btn-outline-info p-3">
                            <FaHeadset className="mb-2 fs-4 d-block mx-auto" />
                            Contact Support
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'Profile' && (
            <div className="row">
              <div className="col-12 col-lg-4 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3" 
                         style={{ width: '100px', height: '100px' }}>
                      <FaUser className="text-white" style={{ fontSize: '3rem' }} />
                    </div>
                    <h4>{userData?.name || 'User Name'}</h4>
                    <p className="text-muted">{userData?.email || 'user@example.com'}</p>
                    <p className="badge bg-info">Client</p>
                    <button className="btn btn-primary mt-2">Edit Profile</button>
                  </div>
                </div>
                <div className="card mt-4">
                  <div className="card-header">
                    <h5 className="mb-0">Contact Information</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="small text-muted">Email Address</label>
                      <p>{userData?.email || 'user@example.com'}</p>
                    </div>
                    <div className="mb-3">
                      <label className="small text-muted">Phone Number</label>
                      <p>+1 (123) 456-7890</p>
                    </div>
                    <div>
                      <label className="small text-muted">Address</label>
                      <p className="mb-0">123 Main Street</p>
                      <p className="mb-0">Apt 4B</p>
                      <p className="mb-0">New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">Personal Information</h5>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-12 col-md-6 mb-3">
                        <label className="small text-muted">Full Name</label>
                        <p>{userData?.name || 'User Name'}</p>
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="small text-muted">Date of Birth</label>
                        <p>January 1, 1980</p>
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="small text-muted">Gender</label>
                        <p>Male</p>
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="small text-muted">Nationality</label>
                        <p>United States</p>
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="small text-muted">Identification Number</label>
                        <p>XXX-XX-XXXX</p>
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="small text-muted">Language Preference</label>
                        <p>English</p>
                      </div>
                    </div>
                    <button className="btn btn-primary">Edit Information</button>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Security Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6>Password</h6>
                        <button className="btn btn-sm btn-outline-primary">Change Password</button>
                      </div>
                      <p className="small text-muted">Last updated 3 months ago</p>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6>Two-Factor Authentication</h6>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="twoFactorAuth" />
                        </div>
                      </div>
                      <p className="small text-muted">Secure your account with two-factor authentication</p>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6>Email Notifications</h6>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="emailNotifications" checked />
                        </div>
                      </div>
                      <p className="small text-muted">Receive email notifications about account activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Other tabs content */}
          {activeTab !== 'Dashboard' && activeTab !== 'Profile' && (
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{activeTab} Content</h5>
                    <p className="card-text">This is the {activeTab.toLowerCase()} section of your client dashboard. Content for this section will be implemented based on specific requirements.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
