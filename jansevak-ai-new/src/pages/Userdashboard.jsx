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
  FaBell,
  FaCheckCircle,
  FaHourglassHalf,
  FaPlusCircle
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('My Applications');
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Sample application data
  const applications = [
    { id: 1, service: 'Income Certificate', date: '2023-07-10', status: 'Approved', lastUpdated: '2023-07-15' },
    { id: 2, service: 'Residence Certificate', date: '2023-07-20', status: 'Pending', lastUpdated: '2023-07-20' },
    { id: 3, service: 'Community Certificate', date: '2023-06-05', status: 'Rejected', lastUpdated: '2023-06-10' },
    { id: 4, service: 'Land Registration', date: '2023-08-01', status: 'In Process', lastUpdated: '2023-08-05' }
  ];
  
  // Available services
  const services = [
    { id: 1, name: 'Income Certificate', description: 'Apply for income proof document', icon: <FaFileAlt /> },
    { id: 2, name: 'Residence Certificate', description: 'Proof of residence document', icon: <FaFileAlt /> },
    { id: 3, name: 'Community Certificate', description: 'Certificate for community identity', icon: <FaFileAlt /> },
    { id: 4, name: 'Land Registration', description: 'Register land property records', icon: <FaFileAlt /> },
    { id: 5, name: 'Birth Certificate', description: 'Official birth documentation', icon: <FaFileAlt /> },
    { id: 6, name: 'Death Certificate', description: 'Official death documentation', icon: <FaFileAlt /> }
  ];
  
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
    
    // For demo purposes, comment this out and use the setTimeout below
    // fetchUserData();
    
    // Simulate loading for demo
    setTimeout(() => {
      // For demo purposes, set demo user data
      setUserData({
        name: "Raj Sharma",
        email: "raj.sharma@example.com",
        phone: "+91 98765 43210",
        address: "123 Main Street, Mumbai, Maharashtra"
      });
      setIsLoading(false);
    }, 1000);
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
    { name: 'My Applications', icon: <FaClipboardList /> },
    { name: 'Available Services', icon: <FaFileAlt /> },
    { name: 'Appointments', icon: <FaCalendarAlt /> },
    { name: 'My Documents', icon: <FaFileAlt /> },
    { name: 'Messages', icon: <FaComments /> },
    { name: 'Support', icon: <FaHeadset /> },
    { name: 'Profile', icon: <FaUser /> },
    { name: 'Settings', icon: <FaCog /> }
  ];

  // Get badge color based on status
  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'approved':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'rejected':
        return 'bg-danger';
      case 'in process':
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  };

  // Add this CSS class to fix the dashboard cards
  const dashboardCardStyle = {
    maxWidth: 'none',
    maxHeight: 'none',
    margin: '0'
  };

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
    <div className="d-flex position-relative min-vh-100">
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
        height: '100vh',
        transition: 'all 0.3s ease',
        position: 'fixed',
        zIndex: 1000,
        overflow: 'hidden',
        left: isMobile && !isSidebarOpen ? '-100%' : '0'
      }}>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
          {isSidebarOpen && <h4 className="m-0">User Dashboard</h4>}
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
        
        <div className="nav flex-column mt-3 overflow-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
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
        padding: isMobile ? '15px' : '20px',
        minHeight: '100vh'
      }}>
        {/* Mobile header with toggle button */}
        {isMobile && (
          <div className="d-flex justify-content-between align-items-center mb-3 sticky-top bg-dark p-3" style={{ zIndex: 900, boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
            <button 
              className="btn btn-dark d-lg-none" 
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
            <h4 className="m-0 text-white">User Dashboard</h4>
            <Link to="/" className="btn btn-outline-primary">
              <FaHome />
            </Link>
          </div>
        )}
        
        <div className="container-fluid px-0">
          <div className="row mb-4">
            <div className="col">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div>
                  <h2>{activeTab}</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#">User Dashboard</a></li>
                      <li className="breadcrumb-item active" aria-current="page">{activeTab}</li>
                    </ol>
                  </nav>
                </div>
                <Link to="/" className="btn btn-outline-primary mt-3 mt-md-0 d-flex align-items-center">
                  <FaArrowLeft className="me-2" /> Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* My Applications Content */}
          {activeTab === 'My Applications' && (
            <div className="row">
              {/* Summary Cards */}
              <div className="col-12 mb-4">
                <div className="row g-3">
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="card bg-success text-white h-100" style={dashboardCardStyle}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="mb-0">Approved</h5>
                            <h2 className="mt-2 mb-0">1</h2>
                          </div>
                          <FaCheckCircle style={{ fontSize: '2rem', opacity: 0.7 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="card bg-warning text-white h-100" style={dashboardCardStyle}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="mb-0">Pending</h5>
                            <h2 className="mt-2 mb-0">2</h2>
                          </div>
                          <FaHourglassHalf style={{ fontSize: '2rem', opacity: 0.7 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="card bg-primary text-white h-100" style={dashboardCardStyle}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="mb-0">Total Applications</h5>
                            <h2 className="mt-2 mb-0">4</h2>
                          </div>
                          <FaClipboardList style={{ fontSize: '2rem', opacity: 0.7 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Applications Table */}
              <div className="col-12 mb-4">
                <div className="card" style={dashboardCardStyle}>
                  <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <h5 className="mb-3 mb-md-0">Application History</h5>
                    <button className="btn btn-primary"><FaPlusCircle className="me-2" />New Application</button>
                  </div>
                  <div className="card-body p-0 table-responsive">
                    <table className="table table-hover m-0">
                      <thead className="bg-light">
                        <tr>
                          <th>#</th>
                          <th>Service Type</th>
                          <th>Application Date</th>
                          <th>Last Updated</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app) => (
                          <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.service}</td>
                            <td>{new Date(app.date).toLocaleDateString()}</td>
                            <td>{new Date(app.lastUpdated).toLocaleDateString()}</td>
                            <td><span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span></td>
                            <td>
                              <div className="d-flex flex-column flex-sm-row gap-2">
                                <button className="btn btn-sm btn-outline-primary">View</button>
                                {app.status === 'Pending' && (
                                  <button className="btn btn-sm btn-outline-danger">Cancel</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Tips and Information */}
              <div className="col-12">
                <div className="card bg-light" style={dashboardCardStyle}>
                  <div className="card-body">
                    <h5 className="card-title">Application Guidelines</h5>
                    <ul className="mb-0">
                      <li>Keep all your documents ready before starting a new application</li>
                      <li>For most applications, you will need proof of identity, address, and income</li>
                      <li>Processing typically takes 5-7 working days</li>
                      <li>You can track the status of your application in real-time</li>
                      <li>For any queries, please contact our support team</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Available Services Content */}
          {activeTab === 'Available Services' && (
            <div className="row">
              {/* Introduction */}
              <div className="col-12 mb-4">
                <div className="card bg-light" style={dashboardCardStyle}>
                  <div className="card-body">
                    <h5 className="card-title">Services Available for Online Application</h5>
                    <p className="mb-0">
                      Apply for various government services and certificates online. 
                      Select a service to start your application process.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Services Cards */}
              {services.map((service) => (
                <div key={service.id} className="col-12 col-sm-6 col-lg-4 mb-4">
                  <div className="card h-100" style={{ ...dashboardCardStyle, transition: 'all 0.3s ease' }}>
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary p-2 rounded text-white me-3">
                          {service.icon}
                        </div>
                        <h5 className="mb-0">{service.name}</h5>
                      </div>
                      <p className="text-muted">{service.description}</p>
                      <div className="mt-3 d-flex flex-column flex-sm-row gap-2">
                        <button className="btn btn-primary">Apply Now</button>
                        <button className="btn btn-link">Learn More</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Eligibility Information */}
              <div className="col-12">
                <div className="card bg-light" style={dashboardCardStyle}>
                  <div className="card-header">
                    <h5 className="mb-0">Eligibility Requirements</h5>
                  </div>
                  <div className="card-body table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Service Type</th>
                          <th>Required Documents</th>
                          <th>Processing Time</th>
                          <th>Service Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Income Certificate</td>
                          <td>Aadhaar, PAN, Salary Slip/Form 16</td>
                          <td>5-7 days</td>
                          <td>₹50</td>
                        </tr>
                        <tr>
                          <td>Residence Certificate</td>
                          <td>Aadhaar, Utility Bills, Rental Agreement</td>
                          <td>3-5 days</td>
                          <td>₹30</td>
                        </tr>
                        <tr>
                          <td>Community Certificate</td>
                          <td>Aadhaar, Family Records, Previous Certificates</td>
                          <td>7-10 days</td>
                          <td>₹50</td>
                        </tr>
                        <tr>
                          <td>Land Registration</td>
                          <td>Property Documents, ID Proof, Tax Receipts</td>
                          <td>15-20 days</td>
                          <td>Based on property value</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Profile Tab */}
          {activeTab === 'Profile' && (
            <div className="row">
              <div className="col-12 col-lg-4 mb-4">
                <div className="card" style={dashboardCardStyle}>
                  <div className="card-body text-center">
                    <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3" 
                         style={{ width: '100px', height: '100px' }}>
                      <FaUser className="text-white" style={{ fontSize: '3rem' }} />
                    </div>
                    <h4>{userData?.name || 'User Name'}</h4>
                    <p className="text-muted">{userData?.email || 'user@example.com'}</p>
                    <button className="btn btn-primary mt-2">Edit Profile</button>
                  </div>
                </div>
                <div className="card mt-4" style={dashboardCardStyle}>
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
                      <p>{userData?.phone || '+91 12345 67890'}</p>
                    </div>
                    <div>
                      <label className="small text-muted">Address</label>
                      <p className="mb-0">{userData?.address || '123 Main Street, City, State'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div className="card mb-4" style={dashboardCardStyle}>
                  <div className="card-header">
                    <h5 className="mb-0">Personal Information</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="row mb-3">
                        <div className="col-12 col-md-6 mb-3">
                          <label className="form-label">Full Name</label>
                          <input type="text" className="form-control" defaultValue={userData?.name} />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                          <label className="form-label">Email Address</label>
                          <input type="email" className="form-control" defaultValue={userData?.email} />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                          <label className="form-label">Phone Number</label>
                          <input type="tel" className="form-control" defaultValue={userData?.phone} />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                          <label className="form-label">Date of Birth</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="form-label">Address</label>
                          <textarea className="form-control" rows="3" defaultValue={userData?.address}></textarea>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                  </div>
                </div>
                
                <div className="card" style={dashboardCardStyle}>
                  <div className="card-header">
                    <h5 className="mb-0">Change Password</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Current Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Confirm New Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <button type="submit" className="btn btn-primary">Update Password</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Other tabs content */}
          {activeTab !== 'My Applications' && activeTab !== 'Available Services' && activeTab !== 'Profile' && (
            <div className="row">
              <div className="col">
                <div className="card" style={dashboardCardStyle}>
                  <div className="card-body">
                    <h5 className="card-title">{activeTab} Content</h5>
                    <p className="card-text">This is the {activeTab.toLowerCase()} section of your dashboard. Content for this section will be implemented based on specific requirements.</p>
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
