import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserShield,
  FaUsers,
  FaBuilding,
  FaTools,
  FaServer,
  FaNetworkWired,
  FaArrowLeft,
} from "react-icons/fa";
import LoginForm from "../auth/LoginForm";

const SuperAdminDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMobile, setIsMobile] = useState(false);
  const [admins, setAdmins] = useState(null);
  const [clients, setClients] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setshowLoginModal] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [selectedAdminName, setSelectedAdminName] = useState("");
  const [showClientLoginModal, setshowClientLoginModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedClientName, setSelectedClientName] = useState("");
  const [admincount, setadmincount] = useState(null);
  const [clientcount, setclientcount] = useState(null);
  const [showAddAdminModal, setshowAddAdminModal] = useState(false);
  const [showAddClientModal, setshowAddClientModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    websiteUrl: "",
    city: "",
    pincode: "",
    gstNo: "",
    panNo: "",
    aadharNo: "",
  });

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
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
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

  const getAdmins = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:4000/api/superadmin/getadmins"
      );
      const data = await response.json();
      console.log(data);
      setAdmins(data.data);
      setadmincount(data.count);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getClients = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:4000/api/superadmin/getclients"
      );
      const data = await response.json();
      console.log(data);
      setClients(data.data);
      setclientcount(data.count);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteadmin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `http://localhost:4000/api/superadmin/deleteadmin/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete admin");
      }

      // Refresh the admin list
      await getAdmins();

      // Show success message
      alert("Admin deleted successfully");
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert(error.message || "Failed to delete admin. Please try again.");
    }
  };

  const deleteclient = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `http://localhost:4000/api/superadmin/deleteclient/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete client");
      }

      // Refresh the client list
      await getClients();

      // Show success message
      alert("Client deleted successfully");
    } catch (error) {
      console.error("Error deleting client:", error);
      alert(error.message || "Failed to delete client. Please try again.");
    }
  };

  useEffect(() => {
    console.log(activeTab);
    if (activeTab === "Overview") {
      getAdmins();
      getClients();
    }
    if (activeTab === "Admin Management") {
      getAdmins();
    }
    if (activeTab === "Client Management") {
      getClients();
    }
  }, [activeTab]);

  // Handle admin login
  const handleAdminLogin = (loginData) => {
    console.log('Admin login data:', loginData);
    
    // Close the modal
    setshowLoginModal(false);

    onLogout(); // First logout from super admin

    // Set admin credentials
    localStorage.setItem("token", loginData.token);
    localStorage.setItem("userType", "admin");
    localStorage.setItem("userId", loginData.user._id || loginData.user.id);

    console.log('Admin credentials set:', {
      token: loginData.token,
      userType: 'admin',
      userId: loginData.user._id || loginData.user.id
    });

    // Navigate to admin dashboard
    console.log('Navigating to admin dashboard...');
    navigate('/dashboard');
  };

  // Handle client login
  const handleClientLogin = (loginData) => {
    console.log('Client login data:', loginData);
    
    // Close the modal
    setshowClientLoginModal(false);

    onLogout(); // First logout from super admin

    // Set client credentials
    localStorage.setItem("token", loginData.token);
    localStorage.setItem("userType", "client");
    localStorage.setItem("userId", loginData.user._id || loginData.user.id);

    console.log('Client credentials set:', {
      token: loginData.token,
      userType: 'client',
      userId: loginData.user._id || loginData.user.id
    });

    // Navigate to client dashboard
    console.log('Navigating to client dashboard...');
    navigate('/dashboard');
  };

  // Open login modal for a specific admin
  const openAdminLogin = (adminId, adminEmail, adminName) => {
    setSelectedAdminId(adminId);
    setSelectedAdminName(adminName);
    setshowLoginModal(true);

    // Store the admin email in sessionStorage for the login form to use
    if (adminEmail) {
      sessionStorage.setItem("tempadminEmail", adminEmail);
    }
  };

  // Open login modal for a specific admin
  const openClientLogin = (clientId, clientEmail, clientName) => {
    setSelectedClientId(clientId);
    setSelectedClientName(clientName);
    setshowClientLoginModal(true);

    // Store the admin email in sessionStorage for the login form to use
    if (clientEmail) {
      sessionStorage.setItem("tempClientEmail", clientEmail);
    }
  };

  // Filter admins based on search term
  const filteredAdmins = admins
    ? admins.filter(
        (admin) =>
          admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Filter clients based on search term
  const filteredClients = clients
    ? clients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.businessName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const navItems = [
    { name: "Overview", icon: <FaChartBar /> },
    { name: "Admin Management", icon: <FaUserShield /> },
    { name: "Client Management", icon: <FaBuilding /> },
    { name: "System Settings", icon: <FaTools /> },
    { name: "Server Management", icon: <FaServer /> },
    { name: "API Management", icon: <FaNetworkWired /> },
    { name: "Database", icon: <FaDatabase /> },
    { name: "Security", icon: <FaShieldAlt /> },
    { name: "Support", icon: <FaHeadset /> },
    { name: "Configuration", icon: <FaCog /> },
    { name: "Settings", icon: <FaCog />, subItems: ["Log out"] },
  ];

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      if (newAdmin.password !== newAdmin.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        "http://localhost:4000/api/superadmin/registeradmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newAdmin.name,
            email: newAdmin.email,
            password: newAdmin.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create admin");
      }

      setshowAddAdminModal(false);
      setNewAdmin({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      await getAdmins();
      alert("Admin created successfully");
    } catch (error) {
      console.error("Error creating admin:", error);
      alert(error.message || "Failed to create admin. Please try again.");
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      if (newClient.password !== newClient.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        "http://localhost:4000/api/superadmin/registerclient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newClient.name,
            email: newClient.email,
            password: newClient.password,
            businessName: newClient.businessName,
            websiteUrl: newClient.websiteUrl,
            city: newClient.city,
            pincode: newClient.pincode,
            gstNo: newClient.gstNo,
            panNo: newClient.panNo,
            aadharNo: newClient.aadharNo,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create client");
      }

      setshowAddClientModal(false);
      setNewClient({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        businessName: "",
        websiteUrl: "",
        city: "",
        pincode: "",
        gstNo: "",
        panNo: "",
        aadharNo: "",
      });
      await getClients();
      alert("Client created successfully");
    } catch (error) {
      console.error("Error creating client:", error);
      alert(error.message || "Failed to create client. Please try again.");
    }
  };

  return (
    <div className="min-vh-100 bg-white text-dark">
      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content bg-dark text-white">
              <div className="text-white bg-orange position-relative p-4">
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-3"
                  style={{
                    backgroundColor: "orange",
                    padding: "0.5rem",
                    borderRadius: "20%",
                    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                    opacity: 1, // override Bootstrap fade
                    width: "1rem",
                    height: "0.5rem",
                  }}
                  aria-label="Close"
                  onClick={() => setshowAddAdminModal(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <h2 className="h4 fw-bold text-center mb-4">Add New Admin</h2>
                <form onSubmit={handleAddAdmin}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={newAdmin.name}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={newAdmin.email}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={newAdmin.password}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={newAdmin.confirmPassword}
                      onChange={(e) =>
                        setNewAdmin({
                          ...newAdmin,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Create Admin
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddClientModal && (
        <>
          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            onClick={() => {
              setshowAddClientModal(false);
              setNewClient({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                businessName: "",
                websiteUrl: "",
                city: "",
                pincode: "",
                gstNo: "",
                panNo: "",
                aadharNo: "",
              });
            }}
          ></div>

          {/* Modal */}
          <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1055 }}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              style={{ maxWidth: "600px" }}
            >
              <div className="modal-content bg-dark text-white">
                <div className="text-white bg-orange position-relative p-4">
                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 m-3"
                    style={{
                      backgroundColor: "orange",
                      padding: "0.5rem",
                      borderRadius: "20%",
                      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                      opacity: 1, // override Bootstrap fade
                      width: "1rem",
                      height: "0.5rem",
                    }}
                    aria-label="Close"
                    onClick={() => {
                      setshowAddClientModal(false);
                      setNewClient({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        businessName: "",
                        websiteUrl: "",
                        city: "",
                        pincode: "",
                        gstNo: "",
                        panNo: "",
                        aadharNo: "",
                      });
                    }}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <h2 className="h4 fw-bold text-center mb-4">
                    Add New Client
                  </h2>
                  <form onSubmit={handleAddClient}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={newClient.name}
                        onChange={(e) =>
                          setNewClient({ ...newClient, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={newClient.email}
                        onChange={(e) =>
                          setNewClient({ ...newClient, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        required
                        value={newClient.password}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        required
                        value={newClient.confirmPassword}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Business Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={newClient.businessName}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            businessName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Website URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={newClient.websiteUrl}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            websiteUrl: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={newClient.city}
                          onChange={(e) =>
                            setNewClient({ ...newClient, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={newClient.pincode}
                          onChange={(e) =>
                            setNewClient({
                              ...newClient,
                              pincode: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">GST Number</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={newClient.gstNo}
                        onChange={(e) =>
                          setNewClient({ ...newClient, gstNo: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">PAN Number</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={newClient.panNo}
                        onChange={(e) =>
                          setNewClient({ ...newClient, panNo: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Aadhar Number</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={newClient.aadharNo}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            aadharNo: e.target.value,
                          })
                        }
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Create Client
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content bg-dark text-white">
            <div className="text-white bg-orange position-relative p-4">
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-3"
                  style={{
                    backgroundColor: "orange",
                    padding: "0.5rem",
                    borderRadius: "20%",
                    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                    opacity: 1, // override Bootstrap fade
                    width: "1rem",
                    height: "0.5rem",
                  }}
                  aria-label="Close"
                  onClick={() => setshowLoginModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <h2 className="h4 fw-bold text-center mb-3">Admin Login</h2>
                {selectedAdminName && (
                  <p className="text-center text-muted mb-3">
                    Logging in as: <strong>{selectedAdminName}</strong>
                  </p>
                )}
                <LoginForm
                  userType="admin"
                  onLogin={handleAdminLogin}
                  switchToRegister={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Login Modal */}

      {showClientLoginModal && (
        <>
          {/* Backdrop (optional for dark background) */}
          <div className="modal-backdrop fade show"></div>

          {/* Modal */}
          <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1055 }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content bg-dark text-white position-relative">
              <div className="text-white bg-orange position-relative p-4">
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-3"
                  style={{
                    backgroundColor: "orange",
                    padding: "0.5rem",
                    borderRadius: "20%",
                    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                    opacity: 1, // override Bootstrap fade
                    width: "1rem",
                    height: "0.5rem",
                  }}
                  aria-label="Close"
                  onClick={() => setshowClientLoginModal(false)}
                ></button>
              </div>
                <div className="modal-body p-4">
                  <h2 className="h4 fw-bold text-center mb-3">Client Login</h2>
                  {selectedClientName && (
                    <p className="text-center text-muted mb-3">
                      Logging in as: <strong>{selectedClientName}</strong>
                    </p>
                  )}
                  <LoginForm
                    userType="client"
                    onLogin={handleClientLogin}
                    switchToRegister={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-opacity-50 tw-z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`position-fixed top-0 start-0 h-100 shadow zindex-sticky bg-white text-adrk`}
        style={{
          width: isMobile ? "100%" : isSidebarOpen ? "250px" : "75px",
          transform: isMobile
            ? isSidebarOpen
              ? "translateX(0)"
              : "translateX(-100%)"
            : "translateX(0)",
          transition: "transform 0.3s ease, width 0.3s ease",
          zIndex: 1020, // bootstrap sticky + modal layering
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          {isSidebarOpen && (
            <h4 className="m-0 fw-semibold text-dark">Super Admin Panel</h4>
          )}
          <button
            className="btn btn-link p-0 text-dark"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaArrowLeft size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <div
          className="d-flex flex-column overflow-auto mt-3"
          style={{ maxHeight: "calc(100vh - 60px)" }}
        >
          {navItems.map((item, index) => (
            <div key={index}>
              <button
                className={`btn text-start w-100 px-3 py-2 d-flex align-items-center ${
                  activeTab === item.name
                    ? "bg-primary text-white"
                    : "text-dark"
                }`}
                onClick={() => handleTabClick(item.name)}
              >
                <span className="me-2 fs-5">{item.icon}</span>
                {(isSidebarOpen || isMobile) && <span>{item.name}</span>}
              </button>

              {isSidebarOpen && item.subItems && activeTab === item.name && (
                <div className="ms-4 mt-1 mb-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className="btn text-start w-100 px-3 py-1 text-dark"
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

      {/* Main content */}
      <div
        style={{
          marginLeft: isMobile ? 0 : isSidebarOpen ? "250px" : "75px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {isMobile && (
          <div className="d-flex justify-content-between align-items-center p-3 bg-transparent shadow-sm">
            <button className="btn btn-dark" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <h4 className="m-0 fw-bold text-dark">Super Admin Panel</h4>
          </div>
        )}

        <div className="p-4">
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold text-dark">{activeTab}</h2>
                <nav className="text-muted small">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#" className="text-primary">
                        Dashboard
                      </a>
                    </li>
                    <li className="breadcrumb-item active">{activeTab}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          {/* Dashboard Content based on active tab */}
          {activeTab === "Overview" && (
            <div className="row g-3">
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="bg-warning text-white rounded p-4 shadow h-100">
                  <h5 className="fw-semibold">Total Admins</h5>
                  <h2 className="my-2">{admincount}</h2>
                  <p className="small">12% increase from last month</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="bg-primary text-white rounded p-4 shadow h-100">
                  <h5 className="fw-semibold">Total Clients</h5>
                  <h2 className="my-2">{clientcount}</h2>
                  <p className="small">12% increase from last month</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="bg-success text-white rounded p-4 shadow h-100">
                  <h5 className="fw-semibold">System Health</h5>
                  <h2 className="my-2">99.8%</h2>
                  <p className="small">All systems operational</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Admin Management" && (
            <div className=" rounded shadow overflow-hidden">
              <div className="p-4 border-bottom">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
                  <h3 className="h5 fw-semibold text-dark">Admin Users</h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => setshowAddAdminModal(true)}
                  >
                    Add Admin
                  </button>
                </div>
                <div
                  className="position-relative m-2"
                  style={{ maxWidth: "300px" }}
                >
                  <input
                    type="text"
                    placeholder="Search admins..."
                    className="form-control ps-5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
                    <FaSearch />
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                {isLoading ? (
                  <div className="p-4 text-center">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                    <p className="mt-2 text-muted">Loading admins...</p>
                  </div>
                ) : !admins || admins.length === 0 ? (
                  <div className="p-4 text-center">
                    <p className="text-muted">No admins found.</p>
                  </div>
                ) : (
                  <table className="table table-hover ">
                    <thead className="table">
                      <tr>
                        <th>Admin</th>
                        <th>Contact Info</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAdmins.map((admin, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div
                                className="rounded-circle bg-light text-primary fw-bold d-flex align-items-center justify-content-center me-3"
                                style={{ width: "40px", height: "40px" }}
                              >
                                {admin.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="fw-semibold">{admin.name}</div>
                                <div className="small">
                                  Admin since {formatDate(admin.createdAt)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{admin.email}</td>
                          <td>
                            <span className="badge bg-success">Active</span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                onClick={() =>
                                  openAdminLogin(
                                    admin._id,
                                    admin.email,
                                    admin.name
                                  )
                                }
                                className="btn btn-link text-primary p-0"
                                title="Log in as this admin"
                              >
                                Login
                              </button>
                              <button
                                onClick={() => deleteadmin(admin._id)}
                                className="btn btn-link text-danger p-0"
                                title="Delete admin"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === "Client Management" && (
            <div className="rounded shadow overflow-hidden">
              <div className="p-4 border-bottom">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
                  <h3 className="h5 fw-semibold text-dark">Clients</h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => setshowAddClientModal(true)}
                  >
                    Add Client
                  </button>
                </div>
                <div
                  className="position-relative m-2"
                  style={{ maxWidth: "300px" }}
                >
                  <input
                    type="text"
                    placeholder="Search admins..."
                    className="form-control ps-5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
                    <FaSearch />
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                {isLoading ? (
                  <div className="p-4 text-center">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                    <p className="mt-2 text-muted">Loading clients...</p>
                  </div>
                ) : !clients || clients.length === 0 ? (
                  <div className="p-4 text-center">
                    <p className="text-muted">No clients found.</p>
                  </div>
                ) : (
                  <table className="table table-hover">
                    <thead className="table">
                      <tr>
                        <th>Name</th>
                        <th>Business Details</th>
                        <th>Contact Info</th>
                        <th>ID Details</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((client, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div
                                className="rounded-circle bg-light text-primary fw-bold d-flex align-items-center justify-content-center me-3"
                                style={{ width: "40px", height: "40px" }}
                              >
                                {client.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="fw-semibold">{client.name}</div>
                                <div className="small">
                                  Client since {formatDate(client.createdAt)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>{client.businessName}</div>
                            <div className="text-muted small">
                              {client.websiteUrl ? (
                                <a
                                  href={client.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Website
                                </a>
                              ) : (
                                "No website"
                              )}
                            </div>
                          </td>
                          <td>
                            <div>{client.email}</div>
                            <div className="text-muted small">
                              {client.city}, {client.pincode}
                            </div>
                          </td>
                          <td>
                            <div className="small">
                              <div>GST: {client.gstNo}</div>
                              <div>PAN: {client.panNo}</div>
                              <div>Aadhar: {client.aadharNo}</div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                onClick={() =>
                                  openClientLogin(
                                    client._id,
                                    client.email,
                                    client.name
                                  )
                                }
                                className="btn btn-link text-primary p-0"
                                title="Log in as this client"
                              >
                                Login
                              </button>
                              <button
                                onClick={() => deleteclient(client._id)}
                                className="btn btn-link text-danger p-0"
                                title="Delete client"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === "System Settings" && (
            <div className="bg-white rounded shadow p-4">
              <h3 className="h5 fw-semibold mb-4">System Configuration</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="border rounded p-3">
                    <h5 className="fw-semibold mb-2">Email Settings</h5>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">SMTP Server</span>
                      <span>smtp.example.com</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">SMTP Port</span>
                      <span>587</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">From Email</span>
                      <span>system@example.com</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded p-3">
                    <h5 className="fw-semibold mb-2">API Configuration</h5>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">API Version</span>
                      <span>v2.3.1</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Rate Limit</span>
                      <span>100/minute</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Timeout</span>
                      <span>30 seconds</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded p-3">
                    <h5 className="fw-semibold mb-2">Security Settings</h5>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Password Policy</span>
                      <span>Strong</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">2FA</span>
                      <span>Enabled</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Session Timeout</span>
                      <span>30 minutes</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded p-3">
                    <h5 className="fw-semibold mb-2">Storage</h5>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Provider</span>
                      <span>AWS S3</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Region</span>
                      <span>us-east-1</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Retention Policy</span>
                      <span>90 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
