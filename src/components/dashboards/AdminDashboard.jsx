import React, { useState, useEffect } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
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
  FaExternalLinkAlt,
  FaUsers,
  FaFileInvoiceDollar,
  FaChartLine,
  FaArrowLeft,
  FaHistory,
  FaFileAlt,
  FaUserCircle,
} from "react-icons/fa";
import LoginForm from "../auth/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMobile, setIsMobile] = useState(false);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClientName, setSelectedClientName] = useState("");
  const [clientcount, setclientcount] = useState(null);
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
  const getclients = async (req, res) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:4000/api/admin/getclients"
      );
      const data = await response.json();
      console.log(data.data);
      setClients(data.data);
      setclientcount(data.count);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(activeTab);
    if (activeTab == "Client" || activeTab == "Overview") {
      getclients();
    }
  }, [activeTab]);

  // Handle client login
  const handleClientLogin = (loginData) => {
    // Close the modal
    setShowLoginModal(false);

    onLogout(); // First logout from admin

    // Set client credentials
    localStorage.setItem("token", loginData.token);
    localStorage.setItem("userType", "client");
    localStorage.setItem("userId", loginData.user._id || loginData.user.id);

    // Navigate to client dashboard
    navigate('/dashboard');
  };

  // Open login modal for a specific client
  const openClientLogin = (clientId, clientEmail, clientName) => {
    setSelectedClient(clientId);
    setSelectedClientName(clientName);
    setShowLoginModal(true);

    // Store the client email in sessionStorage for the login form to use
    if (clientEmail) {
      sessionStorage.setItem("tempClientEmail", clientEmail);
    }
  };

  // Filter clients based on search term
  const filteredClients = clients
    ? clients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const navItems = [
    { name: "Overview", icon: <FaChartBar /> },
    { name: "Clients", icon: <FaUsers /> },
    { name: "Transactions", icon: <FaFileInvoiceDollar /> },
    { name: "Reports", icon: <FaChartLine /> },
    { name: "Support", icon: <FaHeadset /> },
    { name: "History", icon: <FaHistory /> },
    { name: "Help", icon: <FaQuestionCircle /> },
    { name: "Settings", icon: <FaCog />, subItems: ["Log out"] },
  ];

  const sidebarWidth = isSidebarOpen ? "16rem" : "5rem";

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
        "http://localhost:4000/api/admin/registerclient",
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

      setShowAddClientModal(false);
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
      await getclients();
      alert("Client created successfully");
    } catch (error) {
      console.error("Error creating client:", error);
      alert(error.message || "Failed to create client. Please try again.");
    }
  };

  return (
    <div className="min-vh-100 bg-white">
      {/* Client Login Modal */}
      {showLoginModal && (
        <>
          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowLoginModal(false)}
          ></div>

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
                    onClick={() => setShowLoginModal(false)}
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

      {/* Add Client Modal */}
      {showAddClientModal && (
        <>
          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            onClick={() => {
              setShowAddClientModal(false);
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
                      setShowAddClientModal(false);
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

      {/* Sidebar */}
      <div
        className={`position-fixed top-0 start-0 h-100 bg-white text-dark shadow zindex-sticky`}
        style={{
          width: isMobile ? "280px" : isSidebarOpen ? "250px" : "75px",
          backgroundColor: "#cc7000",
          transform: isMobile
            ? isSidebarOpen
              ? "translateX(0)"
              : "translateX(-100%)"
            : "translateX(0)",
          transition: "all 0.3s ease",
          zIndex: 1050,
          overflowY: "auto",
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          {isSidebarOpen && (
            <h4 className="m-0 fw-bold text-dark">Admin Panel</h4>
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
                    ? "bg-success text-white"
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
                      className="btn text-start w-100 px-3 py-1 text-white"
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

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ 
            zIndex: 1040,
            transition: "opacity 0.3s ease",
            opacity: isSidebarOpen ? 1 : 0,
            pointerEvents: isSidebarOpen ? "auto" : "none"
          }}
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div
        style={{
          marginLeft: isMobile ? 0 : isSidebarOpen ? "250px" : "75px",
          transition: "margin-left 0.3s ease",
          color: "black",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa"
        }}
      >
        {isMobile && (
          <div className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">
            <button 
              className="btn btn-link p-0 text-dark" 
              onClick={toggleSidebar}
            >
              <FaBars size={20} />
            </button>
            <h4 className="m-0 fw-bold text-dark">Admin Panel</h4>
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

          {/* Client Management Table */}
          {activeTab === "Clients" && (
            <div className="bg-transparent rounded shadow overflow-hidden">
              {/* Search and filters */}
              <div className="p-4 border-bottom">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
                  <h3 className="h5 fw-semibold text-dark">Clients</h3>
                  <button
                    className="btn btn-purple text-white px-4 py-2 rounded bg-primary"
                    onClick={() => setShowAddClientModal(true)}
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

              {/* Table */}
              <div className="table-responsive">
                {isLoading ? (
                  <div className="p-5 text-center">
                    <div className="spinner-border text-purple" role="status" />
                    <p className="mt-2 text-muted">Loading clients...</p>
                  </div>
                ) : !clients || clients.length === 0 ? (
                  <div className="p-5 text-center">
                    <p>No clients found.</p>
                  </div>
                ) : (
                  <table className="table">
                    <thead>
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
                                className="rounded-circle  text-primary bg-light d-flex align-items-center justify-content-center fw-semibold me-3"
                                style={{ width: "40px", height: "40px" }}
                              >
                                {client.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="fw-semibold text-dark">{client.name}</div>
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
                                  className="text-primary text-decoration-underline"
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
                              <p>GST: {client.gstNo}</p>
                              <p>PAN: {client.panNo}</p>
                              <p>Aadhar: {client.aadharNo}</p>
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
                                className="btn btn-link text-purple p-0"
                                title="Log in as this client"
                              >
                                Login
                              </button>
                              <button
                                className="btn btn-link text-danger p-0"
                                onClick={() => deleteclient(client._id)}
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

          {/* Rest of dashboard content here (to be converted next) */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
