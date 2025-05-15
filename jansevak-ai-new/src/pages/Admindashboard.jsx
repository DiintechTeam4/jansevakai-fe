import React, { useState, useEffect } from 'react';
import { 
  FaChartBar, 
  FaDatabase, 
  FaRobot, 
  FaComments, 
  FaHeadset, 
  FaCog, 
  FaShieldAlt, 
  FaQuestionCircle, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Admindashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isMobile, setIsMobile] = useState(false);
  
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
  

  // Sidebar navigation items
  const navItems = [
    { name: 'Overview', icon: <FaChartBar /> },
    { name: 'Datarecord', icon: <FaDatabase /> },
    { name: 'AI Agent', icon: <FaRobot /> },
    { name: 'Conversation', icon: <FaComments /> },
    { name: 'Support', icon: <FaHeadset /> },
    { name: 'Configuration', icon: <FaCog /> },
    { name: 'Security', icon: <FaShieldAlt /> },
    { name: 'Help', icon: <FaQuestionCircle /> },
    { name: 'Settings', icon: <FaCog />, subItems: ['Log out'] }
  ];

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
          {isSidebarOpen && <h4 className="m-0">Admin Panel</h4>}
          <button 
            className="btn btn-link text-white" 
            onClick={toggleSidebar}
            style={{ padding: isSidebarOpen ? '' : '0' }}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
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
              
              {/* Dropdown for Settings */}
              {isSidebarOpen && item.subItems && activeTab === item.name && (
                <div className="ms-4 mt-1 mb-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <button 
                      key={subIndex}
                      className="nav-link text-white d-flex align-items-center border-0 bg-transparent w-100 py-2"
                      onClick={() => alert(`${subItem} clicked`)}
                      style={{ textAlign: 'left' }}
                    >
                      {subItem === 'Log out' && <FaSignOutAlt className="me-2" />}
                      <span>{subItem}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
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
            <h4 className="m-0">Admin Panel</h4>
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
                      <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
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

          {/* Dashboard Content based on active tab */}
          {activeTab === 'Overview' && (
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-4 mb-4">
                <div className="card bg-primary text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title">Total Users</h5>
                    <h2 className="card-text">1,245</h2>
                    <p className="card-text"><small>12% increase from last month</small></p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 mb-4">
                <div className="card bg-success text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title">Active Sessions</h5>
                    <h2 className="card-text">423</h2>
                    <p className="card-text"><small>5% increase from yesterday</small></p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 mb-4">
                <div className="card bg-warning text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title">AI Interactions</h5>
                    <h2 className="card-text">8,732</h2>
                    <p className="card-text"><small>18% increase from last week</small></p>
                  </div>
                </div>
              </div>
              {/* <div className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="card bg-danger text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title">Support Tickets</h5>
                    <h2 className="card-text">42</h2>
                    <p className="card-text"><small>7 new tickets today</small></p>
                  </div>
                </div>
              </div> */}
              
              {/* Recent Activity */}
              {/* <div className="col-12 col-lg-8 mb-4">
                <div className="card h-100">
                  <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="m-0 fw-bold">Recent Activity</h6>
                    <div className="d-flex mt-2 mt-sm-0">
                      <button className="btn btn-sm btn-outline-secondary me-2 d-none d-sm-block">Filter</button>
                      <button className="btn btn-sm btn-primary">View All</button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Activity</th>
                            <th className="d-none d-md-table-cell">Time</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>John Doe</td>
                            <td>Updated profile</td>
                            <td className="d-none d-md-table-cell">2 minutes ago</td>
                            <td><span className="badge bg-success">Completed</span></td>
                          </tr>
                          <tr>
                            <td>Jane Smith</td>
                            <td>AI conversation</td>
                            <td className="d-none d-md-table-cell">15 minutes ago</td>
                            <td><span className="badge bg-primary">Active</span></td>
                          </tr>
                          <tr>
                            <td>Robert Johnson</td>
                            <td>Submitted form</td>
                            <td className="d-none d-md-table-cell">1 hour ago</td>
                            <td><span className="badge bg-warning">Pending</span></td>
                          </tr>
                          <tr>
                            <td>Emily Davis</td>
                            <td>Created account</td>
                            <td className="d-none d-md-table-cell">3 hours ago</td>
                            <td><span className="badge bg-success">Completed</span></td>
                          </tr>
                          <tr>
                            <td>Michael Wilson</td>
                            <td>Support request</td>
                            <td className="d-none d-md-table-cell">5 hours ago</td>
                            <td><span className="badge bg-danger">Urgent</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> */}
              
              {/* System Status */}
              {/* <div className="col-12 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h6 className="m-0 fw-bold">System Status</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>CPU Usage</span>
                        <span>65%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success" role="progressbar" style={{width: "65%"}} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Memory Usage</span>
                        <span>82%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-warning" role="progressbar" style={{width: "82%"}} aria-valuenow="82" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Disk Space</span>
                        <span>47%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-info" role="progressbar" style={{width: "47%"}} aria-valuenow="47" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Network Load</span>
                        <span>53%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "53%"}} aria-valuenow="53" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>API Response Time</span>
                        <span>230ms</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success" role="progressbar" style={{width: "35%"}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Additional Responsive Widgets */}
              {/* <div className="col-12 col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h6 className="m-0 fw-bold">User Distribution</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Mobile Users</span>
                        <span>65%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "65%"}} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Desktop Users</span>
                        <span>25%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Tablet Users</span>
                        <span>10%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-info" role="progressbar" style={{width: "10%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="col-12 col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h6 className="m-0 fw-bold">Quick Actions</h6>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary">Add New User</button>
                      <button className="btn btn-success">Generate Report</button>
                      <button className="btn btn-info">System Backup</button>
                      <button className="btn btn-warning">Update Settings</button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          )}

          {activeTab !== 'Overview' && (
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{activeTab} Content</h5>
                    <p className="card-text">This is the {activeTab.toLowerCase()} section of your admin dashboard. Content for this section will be implemented based on specific requirements.</p>
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
