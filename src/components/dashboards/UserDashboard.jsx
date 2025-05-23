import React, { useState, useEffect } from 'react';
import {
  FaChartBar,
  FaUser,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaArrowLeft,
  FaHistory,
  FaQuestionCircle,
  FaFileAlt,
  FaUserCircle
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDashboard = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
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

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const navItems = [
    { name: "Overview", icon: <FaChartBar /> },
    { name: "Profile", icon: <FaUser /> },
    { name: "Messages", icon: <FaEnvelope /> },
    { name: "History", icon: <FaHistory /> },
    { name: "Help", icon: <FaQuestionCircle /> },
    { name: "Settings", icon: <FaCog />, subItems: ["Log out"] },
  ];

  return (
    <div className="min-vh-100 bg-white">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1040 
          }}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className="position-fixed top-0 start-0 h-100 bg-white shadow"
        style={{
          width: isMobile ? (isSidebarOpen ? '16rem' : '0') : (isSidebarOpen ? '16rem' : '5rem'),
          zIndex: 1050,
          transition: 'all 0.3s ease-in-out',
          transform: isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          borderRight: '1px solid #eee'
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          {isSidebarOpen && (
            <h4 className="m-0 fw-semibold fs-5 text-dark">User Panel</h4>
          )}
          <button
            className="btn btn-link text-dark p-0"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaArrowLeft size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <div
          className="d-flex flex-column mt-3 overflow-auto"
          style={{ maxHeight: "calc(100vh - 60px)" }}
        >
          {navItems.map((item, index) => (
            <div key={index}>
              <button
                className={`d-flex align-items-center w-100 py-3 px-4 text-start border-0 bg-transparent ${
                  activeTab === item.name
                    ? "text-primary"
                    : "text-dark"
                }`}
                onClick={() => handleTabClick(item.name)}
                style={{
                  borderLeft: activeTab === item.name ? '3px solid #0d6efd' : '3px solid transparent'
                }}
              >
                <span className="me-3 fs-5">{item.icon}</span>
                {(isSidebarOpen || isMobile) && <span>{item.name}</span>}
              </button>

              {/* Dropdown for Settings */}
              {isSidebarOpen && item.subItems && activeTab === item.name && (
                <div className="ms-4 mt-1 mb-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className="d-flex align-items-center w-100 py-2 px-3 text-start border-0 bg-transparent text-dark"
                      onClick={() => {
                        if (subItem === "Log out") onLogout();
                      }}
                    >
                      {subItem === "Log out" && (
                        <FaSignOutAlt className="me-2" />
                      )}
                      <span>{subItem}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen ? '16rem' : '5rem',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <header className="bg-white border-bottom">
          <div className="container-fluid px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 fw-bold text-dark mb-0">
                Welcome, {user.name}
              </h1>
            </div>
          </div>
        </header>

        <main className="container-fluid p-4">
          <div className="bg-white rounded-3">
            <div className="p-4">
              <h2 className="h3 fw-bold mb-4 text-dark">{activeTab}</h2>
              
              {activeTab === "Overview" && (
                <div className="row g-4">
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-md">
                      <div className="card-body bg-success">
                        <h3 className="h5 fw-bold mb-2 text-white">Profile</h3>
                        <p className="card-text text-white">View and update your profile</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-md">
                      <div className="card-body bg-warning">
                        <h3 className="h5 fw-bold mb-2 text-white">Messages</h3>
                        <p className="card-text text-white">View your messages</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-md">
                      <div className="card-body bg-primary">
                        <h3 className="h5 fw-bold mb-2 text-white">History</h3>
                        <p className="card-text text-white">View your activity history</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-md">
                      <div className="card-body bg-danger">
                        <h3 className="h5 fw-bold mb-2 text-white">Help</h3>
                        <p className="card-text text-white">Get help and support</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-md">
                      <div className="card-body bg-secondary">
                        <h3 className="h5 fw-bold mb-2 text-white">Settings</h3>
                        <p className="card-text text-white">Manage your settings</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Profile" && (
                <div className="card border-0 shadow-md">
                  <div className="card-body">
                    <div className="row g-4">
                      <div className="col-12 col-md-6">
                        <div className="mb-3">
                          <label className="text-dark fw-bold">Name</label>
                          <p className="fw-semibold mb-0 text-dark">{user.name}</p>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="mb-3">
                          <label className="text-dark fw-bold">Email</label>
                          <p className="fw-semibold mb-0 text-dark">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Messages" && (
                <div className="card border-0 shadow-md">
                  <div className="card-body">
                    <p className="card-text">Your messages will appear here</p>
                  </div>
                </div>
              )}

              {activeTab === "History" && (
                <div className="card border-0 shadow-md">
                  <div className="card-body">
                    <p className="card-text">Your activity history will appear here</p>
                  </div>
                </div>
              )}

              {activeTab === "Help" && (
                <div className="card border-0 shadow-md">
                  <div className="card-body">
                    <p className="card-text">Help and support resources will appear here</p>
                  </div>
                </div>
              )}

              {activeTab === "Settings" && (
                <div className="card border-0 shadow-md">
                  <div className="card-body">
                    <p className="card-text">Your settings will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;