import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, 
  FaProjectDiagram, 
  FaUsers, 
  FaFileInvoiceDollar, 
  FaChartPie, 
  FaCalendarAlt, 
  FaBell, 
  FaQuestionCircle, 
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaDownload,
  FaEye,
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Clientdashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
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
    { name: 'Dashboard', icon: <FaChartLine /> },
    { name: 'Projects', icon: <FaProjectDiagram /> },
    { name: 'Team', icon: <FaUsers /> },
    { name: 'Finances', icon: <FaFileInvoiceDollar /> },
    { name: 'Analytics', icon: <FaChartPie /> },
    { name: 'Calendar', icon: <FaCalendarAlt /> },
    { name: 'Notifications', icon: <FaBell /> },
    { name: 'Help', icon: <FaQuestionCircle /> },
    { name: 'Settings', icon: <FaCog />, subItems: ['Profile', 'Preferences', 'Log out'] }
  ];

  // Sample projects data
  const projects = [
    { id: 1, name: 'Website Redesign', progress: 75, status: 'In Progress', deadline: '2023-08-15' },
    { id: 2, name: 'Mobile App Development', progress: 40, status: 'In Progress', deadline: '2023-09-30' },
    { id: 3, name: 'Marketing Campaign', progress: 100, status: 'Completed', deadline: '2023-07-01' },
    { id: 4, name: 'CRM Implementation', progress: 20, status: 'Early Stages', deadline: '2023-11-15' },
    { id: 5, name: 'Data Migration', progress: 60, status: 'In Progress', deadline: '2023-08-30' },
  ];

  // Sample team members
  const teamMembers = [
    { id: 1, name: 'John Smith', role: 'Project Manager', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Sarah Johnson', role: 'Lead Developer', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Michael Brown', role: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Emily Davis', role: 'Marketing Specialist', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];

  // Sample financial data
  const financialData = {
    revenue: 128750,
    expenses: 76450,
    profit: 52300,
    pendingInvoices: 34200,
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'primary';
      case 'Early Stages': return 'warning';
      case 'On Hold': return 'danger';
      default: return 'secondary';
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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
          {isSidebarOpen && <h4 className="m-0">Client Portal</h4>}
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
                      {subItem === 'Profile' && <FaUsers className="me-2" />}
                      {subItem === 'Preferences' && <FaCog className="me-2" />}
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
            <h4 className="m-0">Client Portal</h4>
            <Link to="/" className="btn btn-outline-primary">
              <FaHome />
            </Link>
          </div>
        )}
        
        <div className="container-fluid px-0">
          <div className="row mb-4">
            <div className="col">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h2>{activeTab}</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#">Client Portal</a></li>
                      <li className="breadcrumb-item active" aria-current="page">{activeTab}</li>
                    </ol>
                  </nav>
                </div>
                <div className="d-flex flex-wrap mt-2 mt-sm-0">
                  <Link to="/" className="btn btn-outline-primary me-2 mb-2 mb-sm-0 d-flex align-items-center d-none d-sm-flex">
                    <FaArrowLeft className="me-2" /> Back to Home
                  </Link>
                  <button className="btn btn-outline-primary me-2 mb-2 mb-sm-0">
                    <FaDownload className="me-2" /> Export
                  </button>
                  <button className="btn btn-primary mb-2 mb-sm-0">
                    <FaEye className="me-2" /> Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          {activeTab === 'Dashboard' && (
            <>
              {/* Financial Overview */}
              <div className="row mb-4">
                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card h-100 border-start border-primary border-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div className="text-xs fw-bold text-primary text-uppercase mb-1">
                            Revenue (Monthly)
                          </div>
                          <div className="h5 mb-0 fw-bold text-gray-800">{formatCurrency(financialData.revenue)}</div>
                        </div>
                        <div className="col-auto">
                          <FaChartLine className="text-gray-300" style={{ fontSize: '2rem', opacity: 0.3 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card h-100 border-start border-success border-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div className="text-xs fw-bold text-success text-uppercase mb-1">
                            Expenses (Monthly)
                          </div>
                          <div className="h5 mb-0 fw-bold text-gray-800">{formatCurrency(financialData.expenses)}</div>
                        </div>
                        <div className="col-auto">
                          <FaFileInvoiceDollar className="text-gray-300" style={{ fontSize: '2rem', opacity: 0.3 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card h-100 border-start border-info border-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div className="text-xs fw-bold text-info text-uppercase mb-1">
                            Profit
                          </div>
                          <div className="h5 mb-0 fw-bold text-gray-800">{formatCurrency(financialData.profit)}</div>
                        </div>
                        <div className="col-auto">
                          <FaChartPie className="text-gray-300" style={{ fontSize: '2rem', opacity: 0.3 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card h-100 border-start border-warning border-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div className="text-xs fw-bold text-warning text-uppercase mb-1">
                            Pending Invoices
                          </div>
                          <div className="h5 mb-0 fw-bold text-gray-800">{formatCurrency(financialData.pendingInvoices)}</div>
                        </div>
                        <div className="col-auto">
                          <FaFileInvoiceDollar className="text-gray-300" style={{ fontSize: '2rem', opacity: 0.3 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Overview */}
              {/* <div className="row mb-4">
                <div className="col-12">
                  <div className="card shadow">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="m-0 fw-bold">Project Status</h6>
                      <button className="btn btn-sm btn-primary mt-2 mt-sm-0">View All Projects</button>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover align-middle">
                          <thead>
                            <tr>
                              <th>Project</th>
                              <th>Progress</th>
                              <th className="d-none d-md-table-cell">Status</th>
                              <th className="d-none d-md-table-cell">Deadline</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projects.map(project => (
                              <tr key={project.id}>
                                <td>{project.name}</td>
                                <td style={{ minWidth: '150px' }}>
                                  <div className="progress" style={{ height: '10px' }}>
                                    <div 
                                      className={`progress-bar bg-${getStatusColor(project.status)}`} 
                                      role="progressbar" 
                                      style={{ width: `${project.progress}%` }}
                                      aria-valuenow={project.progress} 
                                      aria-valuemin="0" 
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <small className="ms-1">{project.progress}%</small>
                                </td>
                                <td className="d-none d-md-table-cell">
                                  <span className={`badge bg-${getStatusColor(project.status)}`}>
                                    {project.status}
                                  </span>
                                </td>
                                <td className="d-none d-md-table-cell">{project.deadline}</td>
                                <td>
                                  <button className="btn btn-sm btn-outline-primary">Details</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Team and Calendar Row */}
              {/* <div className="row"> */}
                {/* Team Members */}
                {/* <div className="col-12 col-lg-6 mb-4">
                  <div className="card shadow h-100">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="m-0 fw-bold">Team Members</h6>
                      <button className="btn btn-sm btn-primary mt-2 mt-sm-0">View All</button>
                    </div>
                    <div className="card-body">
                      {teamMembers.map(member => (
                        <div key={member.id} className="d-flex align-items-center mb-3 flex-wrap">
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="rounded-circle me-3"
                            style={{ width: '50px', height: '50px' }}
                          />
                          <div className="me-auto mb-2 mb-sm-0">
                            <h6 className="mb-0">{member.name}</h6>
                            <small className="text-muted">{member.role}</small>
                          </div>
                          <button className="btn btn-sm btn-outline-primary">Contact</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div> */}

                {/* Upcoming Deadlines */}
                {/* <div className="col-12 col-lg-6 mb-4">
                  <div className="card shadow h-100">
                    <div className="card-header py-3">
                      <h6 className="m-0 fw-bold">Upcoming Deadlines</h6>
                    </div>
                    <div className="card-body">
                      <div className="list-group">
                        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center flex-wrap">
                          <div className="mb-2 mb-sm-0">
                            <h6 className="mb-1">Website Redesign</h6>
                            <small>Final delivery</small>
                          </div>
                          <span className="badge bg-danger">Aug 15</span>
                        </div>
                        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center flex-wrap">
                          <div className="mb-2 mb-sm-0">
                            <h6 className="mb-1">Data Migration</h6>
                            <small>Phase 1 completion</small>
                          </div>
                          <span className="badge bg-warning">Aug 30</span>
                        </div>
                        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center flex-wrap">
                          <div className="mb-2 mb-sm-0">
                            <h6 className="mb-1">Mobile App Development</h6>
                            <small>Beta release</small>
                          </div>
                          <span className="badge bg-primary">Sep 30</span>
                        </div>
                        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center flex-wrap">
                          <div className="mb-2 mb-sm-0">
                            <h6 className="mb-1">CRM Implementation</h6>
                            <small>Initial setup</small>
                          </div>
                          <span className="badge bg-info">Nov 15</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              {/* </div> */}
            </>
          )}

          {/* Other tabs content */}
          {activeTab !== 'Dashboard' && (
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
