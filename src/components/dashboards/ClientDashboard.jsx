import React, { useState, useEffect } from "react";
import {
  FaChartBar,
  FaBuilding,
  FaFileInvoiceDollar,
  FaChartLine,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHistory,
  FaQuestionCircle,
  FaFileAlt,
  FaUserCircle,
  FaArrowLeft,
  FaMapMarkedAlt,
  FaPlus,
  FaSpinner,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Add DepartmentCard component before the main ClientDashboard component
const DepartmentCard = ({ department, onEdit, onDelete, showMenu, setShowMenu, getImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (department.image) {
          // console.log("Loading image for department:", department.name, "Image URL:", department.image);
          const url = await getImageUrl(department.image);
          // console.log("Generated presigned URL:", url);

          if (!url) {
            throw new Error("Failed to generate presigned URL");
          }

          // Test if the image URL is valid
          const img = new Image();
          img.onload = () => {
            // console.log("Image loaded successfully");
            setImageUrl(url);
            setImageLoading(false);
          };
          img.onerror = () => {
            console.error("Image failed to load during preload");
            setImageError("Failed to load image");
            setImageLoading(false);
          };
          img.src = url;
        } else {
          console.log("No image URL found for department:", department.name);
          setImageLoading(false);
        }
      } catch (err) {
        console.error("Error loading image:", err);
        setError("Failed to load image");
        setImageLoading(false);
      }
    };
    loadImage();
  }, [department.image, getImageUrl]);

  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-4">
      <div className="card h-100" style={{ borderRadius: "16px", overflow: "hidden" }}>
        <div className="card-body d-flex flex-column">
          <div className="position-relative">
            {/* Three-dot menu */}
            <div
              className="dropdown position-absolute"
              style={{ top: "0px", right: "0px", zIndex: 1000 }}
            >
              <button
                className="btn btn-warning"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(department._id);
                }}
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  border: "none",
                }}
              >
                <span className="d-inline-block" style={{ fontSize: "20px" }}>
                  ⋮
                </span>
              </button>
              {showMenu === department._id && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    zIndex: 1000,
                    minWidth: "150px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    marginTop: "5px",
                  }}
                >
                  <button
                    className="dropdown-item d-flex align-items-center gap-2"
                    onClick={() => {
                      onEdit(department);
                      setShowMenu(null);
                    }}
                  >
                    <FaCog size={14} />
                    Edit
                  </button>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 text-danger"
                    onClick={() => {
                      onDelete(department);
                      setShowMenu(null);
                    }}
                  >
                    <FaTimes size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="ratio ratio-16x9" style={{ borderRadius: "16px" }}>
              {imageLoading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <FaSpinner className="fa-spin fa-2x" />
                </div>
              ) : imageError ? (
                <div className="d-flex justify-content-center align-items-center h-100 text-danger">
                  <p className="mb-0">{imageError}</p>
                </div>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={department.name}
                  className="img-fluid object-fit-cover"
                  style={{ height: "180px" }}
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    console.error("Failed URL:", imageUrl);
                    setImageError("Failed to load image");
                  }}
                />
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                  <p className="mb-0">No image available</p>
                </div>
              )}
            </div>
          </div>

          <div className="d-flex align-items-center mt-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "orange",
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              {department.name.charAt(0)}
            </div>
            <h3 className="card-title h6 fw-bold mb-0 text-truncate">
              {department.name}
            </h3>
          </div>

          <div className="mt-auto">
            <div
              className="d-flex align-items-center p-2 rounded-3"
              style={{
                backgroundColor: "rgba(255, 140, 0, 0.1)",
                border: "1px solid rgba(255, 140, 0, 0.2)",
                backdropFilter: "blur(5px)",
                fontSize: "4px",
                justifyContent: "space-around",
              }}
            >
              {/* Total Websites */}
              <div className="d-flex align-items-center justify-content-center">
                <div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontWeight: "500",
                    }}
                  >
                    Websites
                  </span>
                  <div>
                    <span
                      style={{
                        fontSize: "1rem",
                        color: "#ff8c00",
                        fontWeight: "bold",
                      }}
                    >
                      {department.websites}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "1px",
                  height: "40px",
                  backgroundColor: "rgba(255, 140, 0, 0.2)",
                  margin: "0 15px",
                }}
              />

              {/* Total Conversations */}
              <div className="d-flex align-items-start justify-content-center">
                <div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontWeight: "500",
                    }}
                  >
                    Conversations
                  </span>
                  <div>
                    <span
                      style={{
                        fontSize: "1rem",
                        color: "#ff8c00",
                        fontWeight: "bold",
                      }}
                    >
                      {department.Conversations}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientDashboard = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMobile, setIsMobile] = useState(false);
  const [states, setStates] = useState([]);
  const [showAddStateModal, setShowAddStateModal] = useState(false);
  const [newState, setNewState] = useState({
    name: "",
    description: "",
    websiteurl: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditStateModal, setShowEditStateModal] = useState(false);
  const [editingState, setEditingState] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [stateToDelete, setStateToDelete] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    image: null,
    websites: 0,
    Conversations: 0,
    stateId: "",
  });
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [showEditDepartmentModal, setShowEditDepartmentModal] = useState(false);
  const [deleteDepartmentConfirmModal, setDeleteDepartmentConfirmModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [stateDepartments, setStateDepartments] = useState([]);

  //datastore
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [newContentData, setNewContentData] = useState({ title: '', content: '' });
  const [addingContent, setAddingContent] = useState(false);
  const [addContentError, setAddContentError] = useState(null);
  const [selectedContentType, setSelectedContentType] = useState('Text'); // Default to Text
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [datastoreContents, setDatastoreContents] = useState([]);
  const [loadingDatastore, setLoadingDatastore] = useState(false);
  const [datastoreError, setDatastoreError] = useState(null);
  const [contentToDelete, setContentToDelete] = useState(null);
  const [showEditContentModal, setShowEditContentModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

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

  // Fetch states when States tab is active
  useEffect(() => {
    if (activeTab === "States") {
      fetchStates();
    }
  }, [activeTab]);

  // Fetch datastore contents when Datastore tab is active
  useEffect(() => {
    if (activeTab === "Datastore") {
      fetchDatastoreContents();
    }
  }, [activeTab]);

  const fetchStates = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching states...");
      const response = await axios.get(
        "http://localhost:4000/api/client/states"
      );
      console.log("States response:", response.data);
      if (response.data.success) {
        setStates(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setError(error.response?.data?.message || "Error fetching states");
    } finally {
      setLoading(false);
    }
  };

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
    { name: "Business Profile", icon: <FaBuilding /> },
    { name: "Datastore", icon: <FaChartLine /> },
    { name: "History", icon: <FaHistory /> },
    { name: "States", icon: <FaMapMarkedAlt /> },
    { name: "Support", icon: <FaHeadset /> },
    { name: "Help", icon: <FaQuestionCircle /> },
    { name: "Settings", icon: <FaCog />, subItems: ["Log out"] },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      setNewState({ ...newState, image: file });
      setError(null);
    }
  };

  const handleAddState = async () => {
    if (!newState.name) {
      setError("State name is required");
      return;
    }

    if (!newState.image) {
      setError("State image is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Step 1: Get presigned URL and image URL
      const presignedResponse = await axios.post(
        "http://localhost:4000/api/client/get-presigned-url",
        {
          fileName: newState.image.name,
          contentType: newState.image.type,
        }
      );

      if (!presignedResponse.data.success) {
        throw new Error("Failed to get upload URL");
      }

      const { presignedUrl, imageUrl } = presignedResponse.data.data;

      // Step 2: Upload image to S3 using presigned URL
      await fetch(presignedUrl, {
        method: "PUT",
        body: newState.image,
        headers: {
          "Content-Type": newState.image.type,
        },
      });

      // Step 3: Create state with image URL
      const response = await axios.post(
        "http://localhost:4000/api/client/states",
        {
          name: newState.name,
          description: newState.description,
          websiteurl: newState.websiteurl,
          imageUrl,
        }
      );

      if (response.data.success) {
        setStates([...states, response.data.data]);
        setNewState({ name: "", description: "", websiteurl: "", image: null });
        setShowAddStateModal(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Error creating state");
    } finally {
      setLoading(false);
    }
  };

  // Function to get presigned URL for viewing images
  const getImageUrl = async (imageUrl) => {
    try {
      // console.log("Requesting presigned URL for:", imageUrl);
      const response = await axios.post(
        "http://localhost:4000/api/client/get-image-url",
        {
          imageUrl,
        }
      );

      if (!response.data.success) {
        console.error("Failed to get presigned URL:", response.data.message);
        return null;
      }

      const presignedUrl = response.data.data.presignedUrl;
      // console.log("Received presigned URL:", presignedUrl);
      return presignedUrl;
    } catch (error) {
      console.error(
        "Error getting image URL:",
        error.response?.data || error.message
      );
      return null;
    }
  };

  // Function to handle state deletion
  const handleDeleteState = async (stateId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete(
        `http://localhost:4000/api/client/states/${stateId}`
      );

      if (response.data.success) {
        setStates(states.filter((state) => state._id !== stateId));
        setDeleteConfirmModal(false);
        setStateToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting state:", error);
      setError(error.response?.data?.message || "Error deleting state");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle state update
  const handleUpdateState = async () => {
    if (!editingState.name) {
      setError("State name is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let imageUrl = editingState.image;

      // If there's a new image file, upload it first
      if (editingState.newImage) {
        const presignedResponse = await axios.post(
          "http://localhost:4000/api/client/get-presigned-url",
          {
            fileName: editingState.newImage.name,
            contentType: editingState.newImage.type,
          }
        );

        if (!presignedResponse.data.success) {
          throw new Error("Failed to get upload URL");
        }

        const { presignedUrl, imageUrl: newImageUrl } =
          presignedResponse.data.data;

        await fetch(presignedUrl, {
          method: "PUT",
          body: editingState.newImage,
          headers: {
            "Content-Type": editingState.newImage.type,
          },
        });

        imageUrl = newImageUrl;
      }

      // Update the state
      const response = await axios.put(
        `http://localhost:4000/api/client/states/${editingState._id}`,
        {
          name: editingState.name,
          description: editingState.description,
          websiteurl: editingState.websiteurl,
          imageUrl,
        }
      );

      if (response.data.success) {
        setStates(
          states.map((state) =>
            state._id === editingState._id ? response.data.data : state
          )
        );
        setShowEditStateModal(false);
        setEditingState(null);
      }
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || "Error updating state");
    } finally {
      setLoading(false);
    }
  };

  // Add function to fetch departments for a specific state
  const fetchStateDepartments = async (stateId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:4000/api/client/states/${stateId}/departments`
      );
      if (response.data.success) {
        setStateDepartments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching state departments:", error);
      setError(error.response?.data?.message || "Error fetching departments");
    } finally {
      setLoading(false);
    }
  };

  // Update the StateCard component
  const StateCard = ({ state }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
      const loadImage = async () => {
        try {
          if (state.image) {
            console.log(
              "Loading image for state:",
              state.name,
              "Image URL:",
              state.image
            );
            const url = await getImageUrl(state.image);
            console.log("Generated presigned URL:", url);

            if (!url) {
              throw new Error("Failed to generate presigned URL");
            }

            // Test if the image URL is valid
            const img = new Image();
            img.onload = () => {
              console.log("Image loaded successfully");
              setImageUrl(url);
              setLoading(false);
            };
            img.onerror = () => {
              console.error("Image failed to load during preload");
              setError("Failed to load image");
              setLoading(false);
            };
            img.src = url;
          } else {
            console.log("No image URL found for state:", state.name);
            setLoading(false);
          }
        } catch (err) {
          console.error("Error loading image:", err);
          setError("Failed to load image");
          setLoading(false);
        }
      };
      loadImage();
    }, [state.image, getImageUrl]);

    // Close menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          showMenu &&
          !event.target.closest(".dropdown-menu") &&
          !event.target.closest(".dropdown-toggle")
        ) {
          setShowMenu(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu]);

    return (
      <div className="col-12 col-sm-6 col-lg-4 mb-4">
        <div 
          className="card h-100" 
          style={{ borderRadius: "16px", cursor: "pointer" }}
          onClick={() => {
            setSelectedState(state);
            fetchStateDepartments(state._id);
          }}
        >
          <div
            className="text-center pt-3 position-relative"
            style={{ height: "200px", width: "100%" }}
          >
            {/* Three-dot menu */}
            <div
              className="dropdown position-absolute"
              style={{ top: "5px", right: "5px", zIndex: 1000 }}
            >
              <button
                className="btn btn-warning"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  border: "none",
                }}
              >
                <span className="d-inline-block" style={{ fontSize: "20px" }}>
                  ⋮
                </span>
              </button>
              {showMenu && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    zIndex: 1000,
                    minWidth: "150px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    marginTop: "5px",
                  }}
                >
                  <button
                    className="dropdown-item d-flex align-items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingState(state);
                      setShowEditStateModal(true);
                      setShowMenu(false);
                    }}
                  >
                    <FaCog size={14} />
                    Edit
                  </button>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 text-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStateToDelete(state);
                      setDeleteConfirmModal(true);
                      setShowMenu(false);
                    }}
                  >
                    <FaTimes size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <FaSpinner className="fa-spin fa-2x" />
              </div>
            ) : error ? (
              <div className="d-flex justify-content-center align-items-center h-100 text-danger">
                <p className="mb-0">{error}</p>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt={state.name}
                className="card-img-top"
                style={{
                  maxHeight: "250px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  console.error("Image failed to load:", e);
                  console.error("Failed URL:", imageUrl);
                  setError("Failed to load image");
                }}
              />
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                <p className="mb-0">No image available</p>
              </div>
            )}
          </div>

          <div className="card-body px-3 px-md-4 py-3 py-md-4">
            <h3 className="card-title h4 mb-3">{state.name}</h3>
            <p className="card-text mb-4">
              {state.description ||
                `Discover AI solutions tailored for ${state.name}`}
            </p>
            <div className="d-flex flex-wrap gap-3">
              <div>
                <div
                  className="d-flex align-items-center px-2 rounded-3"
                  style={{
                    backgroundColor: "rgba(255, 140, 0, 0.1)",
                    border: "1px solid rgba(255, 140, 0, 0.2)",
                    backdropFilter: "blur(5px)",
                    fontSize: "4px",
                    justifyContent: "space-around",
                  }}
                >
                  {/* Total Websites */}
                  <div className="d-flex align-items-center justify-content-center">
                    <div>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255, 255, 255, 0.9)",
                          fontWeight: "500",
                        }}
                      >
                        Websites
                      </span>
                      <div>
                        <span
                          style={{
                            fontSize: "1rem",
                            color: "#ff8c00",
                            fontWeight: "bold",
                          }}
                        >
                          {state.websiteurl?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      width: "1px",
                      height: "40px",
                      backgroundColor: "rgba(255, 140, 0, 0.2)",
                      margin: "0 15px",
                    }}
                  />

                  {/* Total Departments */}
                  <div className="d-flex align-items-start justify-content-center">
                    <div>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255, 255, 255, 0.9)",
                          fontWeight: "500",
                        }}
                      >
                        Departments
                      </span>
                      <div>
                        <span
                          style={{
                            fontSize: "1rem",
                            color: "#ff8c00",
                            fontWeight: "bold",
                          }}
                        >
                          {state.departments?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {state.websiteurl && (
                <a
                  href={state.websiteurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary px-3 px-md-4 py-2"
                  style={{
                    backgroundColor: "#ff8c00",
                    borderColor: "#ff8c00",
                  }}
                >
                  Go
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add new component for displaying state departments
  const StateDepartmentsView = ({ state, departments, onBack }) => {
    return (
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <button 
            className="btn btn-link text-dark me-3" 
            onClick={onBack}
          >
            <FaArrowLeft />
          </button>
          <h3 className="mb-0 text-dark ">Departments in {state.name}</h3>
          <div className="mt-4">
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => {
              setNewDepartment({
                ...newDepartment,
                stateId: state._id
              });
              setShowAddDepartmentModal(true);
            }}
            disabled={loading}
          >
            <FaPlus className="me-2" /> Add New Department
          </button>
        </div>
        </div>

        <div className="row g-4">
          {departments.map((department) => (
            <DepartmentCard
              key={department._id}
              department={department}
              onEdit={(dept) => {
                setEditingDepartment(dept);
                setShowEditDepartmentModal(true);
              }}
              onDelete={(dept) => {
                setDepartmentToDelete(dept);
                setDeleteDepartmentConfirmModal(true);
              }}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              getImageUrl={getImageUrl}
            />
          ))}
        </div>

        
      </div>
    );
  };

  // Update the renderStates function
  const renderStates = () => {
    if (selectedState) {
      return (
        <StateDepartmentsView
          state={selectedState}
          departments={stateDepartments}
          onBack={() => {
            setSelectedState(null);
            setStateDepartments([]);
          }}
        />
      );
    }

    if (loading && !showAddStateModal && !showEditStateModal) {
      return (
        <div className="text-center py-5">
          <FaSpinner className="fa-spin fa-2x mb-3" />
          <p>Loading states...</p>
        </div>
      );
    }

    return (
      <>
        <div className="row g-4">
          {states.map((state, index) => (
            <StateCard key={index} state={state} />
          ))}
        </div>
        {renderEditStateModal()}
        {renderDeleteConfirmModal()}
      </>
    );
  };


  const handleDepartmentImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      setNewDepartment({ ...newDepartment, image: file });
      setError(null);
    }
  };

  const handleCreateDepartment = async () => {
    if (!newDepartment.name) {
      setError("Department name is required");
      return;
    }

    if (!newDepartment.image) {
      setError("Department image is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Step 1: Get presigned URL and image URL
      const presignedResponse = await axios.post(
        "http://localhost:4000/api/client/get-presigned-url",
        {
          fileName: newDepartment.image.name,
          contentType: newDepartment.image.type,
        }
      );

      if (!presignedResponse.data.success) {
        throw new Error("Failed to get upload URL");
      }

      const { presignedUrl, imageUrl } = presignedResponse.data.data;

      // Step 2: Upload image to S3 using presigned URL
      await fetch(presignedUrl, {
        method: "PUT",
        body: newDepartment.image,
        headers: {
          "Content-Type": newDepartment.image.type,
        },
      });

      // Step 3: Create department with image URL
      const response = await axios.post(
        `http://localhost:4000/api/client/states/${selectedState._id}/departments`,
        {
          name: newDepartment.name,
          image: imageUrl,
          websites: newDepartment.websites,
          Conversations: newDepartment.Conversations,
        }
      );

      if (response.data.success) {
        // Refresh departments for the current state
        await fetchStateDepartments(selectedState._id);
        setNewDepartment({
          name: "",
          image: null,
          websites: 0,
          Conversations: 0,
        });
        setShowAddDepartmentModal(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Error creating department");
    } finally {
      setLoading(false);
    }
  };

  // Update the handleUpdateDepartment function
  const handleUpdateDepartment = async () => {
    if (!editingDepartment.name || !editingDepartment.state) {
      setError("Department name and state are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let imageUrl = editingDepartment.image;

      // If there's a new image file, upload it first
      if (editingDepartment.newImage) {
        const presignedResponse = await axios.post(
          "http://localhost:4000/api/client/get-presigned-url",
          {
            fileName: editingDepartment.newImage.name,
            contentType: editingDepartment.newImage.type,
          }
        );

        if (!presignedResponse.data.success) {
          throw new Error("Failed to get upload URL");
        }

        const { presignedUrl, imageUrl: newImageUrl } = presignedResponse.data.data;

        await fetch(presignedUrl, {
          method: "PUT",
          body: editingDepartment.newImage,
          headers: {
            "Content-Type": editingDepartment.newImage.type,
          },
        });

        imageUrl = newImageUrl;
      }

      // Update the department
      const response = await axios.put(
        `http://localhost:4000/api/client/states/${editingDepartment.state}/departments/${editingDepartment._id}`,
        {
          name: editingDepartment.name,
          image: imageUrl,
          websites: editingDepartment.websites,
          Conversations: editingDepartment.Conversations,
        }
      );

      if (response.data.success) {
        // Refresh departments for the current state
        await fetchStateDepartments(editingDepartment.state);
        setShowEditDepartmentModal(false);
        setEditingDepartment(null);
      }
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || "Error updating department");
    } finally {
      setLoading(false);
    }
  };

  // Update the handleDeleteDepartment function
  const handleDeleteDepartment = async (department) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete(
        `http://localhost:4000/api/client/states/${department.state}/departments/${department._id}`
      );

      if (response.data.success) {
        // Refresh departments for the current state
        await fetchStateDepartments(department.state);
        setDeleteDepartmentConfirmModal(false);
        setDepartmentToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      setError(error.response?.data?.message || "Error deleting department");
    } finally {
      setLoading(false);
    }
  };

  // Add click outside handler for menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMenu &&
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".dropdown-toggle")
      ) {
        setShowMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  // Add Edit State Modal
  const renderEditStateModal = () => {
    if (!showEditStateModal || !editingState) return null;

    return (
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark">Edit State</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowEditStateModal(false);
                  setEditingState(null);
                }}
                disabled={loading}
              ></button>
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">State Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingState.name}
                  onChange={(e) =>
                    setEditingState({ ...editingState, name: e.target.value })
                  }
                  disabled={loading}
                  placeholder="Enter state name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={editingState.description}
                  onChange={(e) =>
                    setEditingState({
                      ...editingState,
                      description: e.target.value,
                    })
                  }
                  disabled={loading}
                  placeholder="Enter state description"
                  rows="3"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Website URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={editingState.websiteurl}
                  onChange={(e) =>
                    setEditingState({
                      ...editingState,
                      websiteurl: e.target.value,
                    })
                  }
                  disabled={loading}
                  placeholder="https://example.com"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">State Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        setError("Image size should be less than 5MB");
                        return;
                      }
                      if (!file.type.startsWith("image/")) {
                        setError("Please upload an image file");
                        return;
                      }
                      setEditingState({ ...editingState, newImage: file });
                      setError(null);
                    }
                  }}
                  disabled={loading}
                  accept="image/*"
                />
                <small className="text-muted">
                  Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                </small>
                {editingState.newImage && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(editingState.newImage)}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowEditStateModal(false);
                  setEditingState(null);
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateState}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="fa-spin me-2" />
                    Updating...
                  </>
                ) : (
                  "Update State"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add Delete Confirmation Modal
  const renderDeleteConfirmModal = () => {
    if (!deleteConfirmModal || !stateToDelete) return null;

    return (
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setDeleteConfirmModal(false);
                  setStateToDelete(null);
                }}
                disabled={loading}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete the state "{stateToDelete.name}"? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setDeleteConfirmModal(false);
                  setStateToDelete(null);
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDeleteState(stateToDelete._id)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="fa-spin me-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete State"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fetch datastore contents
  const fetchDatastoreContents = async () => {
    try {
      setLoadingDatastore(true);
      setDatastoreError(null);
      const response = await axios.get("http://localhost:4000/api/datastore/content");
      if (response.data.success) {
        setDatastoreContents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching datastore contents:", error);
      setDatastoreError(error.response?.data?.message || "Error fetching datastore contents");
    } finally {
      setLoadingDatastore(false);
    }
  };

  const handleDeleteContent = async (contentId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/datastore/content/${contentId}`);
      if (response.data.success) {
        fetchDatastoreContents();
        setDeleteConfirmModal(false);
        setContentToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      setDatastoreError(error.response?.data?.message || "Error deleting content");
    }
  };

  const handleEditContent = async () => {
    if (!editingContent.title) {
      setAddContentError("Title is required");
      return;
    }

    try {
      setAddingContent(true);
      setAddContentError(null);

      const formData = new FormData();
      formData.append('type', editingContent.type);
      formData.append('title', editingContent.title);

      if (editingContent.type === 'Text') {
        formData.append('content', editingContent.content);
      } 
      else if (selectedFile) {
        formData.append('contentFile', selectedFile);
      } 
      else if (editingContent.content) {
        formData.append('content', editingContent.content);
      }

      const response = await axios.put(
        `http://localhost:4000/api/datastore/content/${editingContent._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        fetchDatastoreContents();
        setShowEditContentModal(false);
        setEditingContent(null);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error updating content:", error);
      setAddContentError(error.response?.data?.message || "Error updating content");
    } finally {
      setAddingContent(false);
    }
  };

  // Add Delete Confirmation Modal
  const renderDeleteContentConfirmModal = () => {
    if (!deleteConfirmModal || !contentToDelete) return null;

    return (
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setDeleteConfirmModal(false);
                  setContentToDelete(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete "{contentToDelete.title}"? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer d-flex flex-column flex-sm-row gap-2">
              <button
                type="button"
                className="btn btn-secondary w-100 w-sm-auto"
                onClick={() => {
                  setDeleteConfirmModal(false);
                  setContentToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger w-100 w-sm-auto"
                onClick={() => handleDeleteContent(contentToDelete._id)}
              >
                Delete Content
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add Edit Content Modal
  const renderEditContentModal = () => {
    if (!showEditContentModal || !editingContent) return null;

    return (
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark">Edit Content</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowEditContentModal(false);
                  setEditingContent(null);
                  setSelectedFile(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              {addContentError && (
                <div className="alert alert-danger" role="alert">
                  {addContentError}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a title"
                  value={editingContent.title}
                  onChange={(e) =>
                    setEditingContent({ ...editingContent, title: e.target.value })
                  }
                  disabled={addingContent}
                />
              </div>

              {editingContent.type === 'Text' && (
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter your text content"
                    value={editingContent.content}
                    onChange={(e) =>
                      setEditingContent({ ...editingContent, content: e.target.value })
                    }
                    disabled={addingContent}
                  ></textarea>
                </div>
              )}

              {(editingContent.type === 'Image' || editingContent.type === 'Video' || editingContent.type === 'PDF') && (
                <div className="mb-3">
                  <div className="mt-2 p-2 rounded">
                    <p className="mb-0 text-truncate">
                      Current file: {editingContent.metadata?.fileName || editingContent.content}
                    </p>
                  </div>
                </div>
              )}

              {(editingContent.type === 'YouTube' || editingContent.type === 'Link' || editingContent.type === 'Website') && (
                <div className="mb-3">
                  <label className="form-label">URL</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder={`Enter ${editingContent.type} URL`}
                    value={editingContent.content}
                    onChange={(e) =>
                      setEditingContent({ ...editingContent, content: e.target.value })
                    }
                    disabled={addingContent}
                  />
                </div>
              )}
            </div>
            <div className="modal-footer d-flex flex-column flex-sm-row gap-2">
              <button
                type="button"
                className="btn btn-secondary w-100 w-sm-auto"
                onClick={() => {
                  setShowEditContentModal(false);
                  setEditingContent(null);
                  setSelectedFile(null);
                }}
                disabled={addingContent}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary w-100 w-sm-auto"
                onClick={handleEditContent}
                disabled={addingContent}
              >
                {addingContent ? (
                  <>
                    <FaSpinner className="fa-spin me-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add Add Content Modal
  const renderAddContentModal = () => {
    if (!showAddContentModal) return null;

    const contentTypes = [
      { name: 'Text', icon: <FaFileAlt /> },
      { name: 'Image', icon: <FaFileAlt /> }, // Replace with actual icons
      { name: 'Video', icon: <FaFileAlt /> },
      { name: 'YouTube', icon: <FaFileAlt /> },
      { name: 'Link', icon: <FaFileAlt /> },
      { name: 'Website', icon: <FaFileAlt /> },
      { name: 'PDF', icon: <FaFileAlt /> },
    ];

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Add file size and type validation here if needed
        setSelectedFile(file);
        setNewContentData({ ...newContentData, content: file.name }); // Store file name in content for display
        setAddContentError(null);
      }
    };

    return (
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark">Add Content</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAddContentModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {/* Content Type Selection */}
              <div className="mb-4">
                <label className="form-label">Content Type</label>
                <select 
                  className="form-select"
                  value={selectedContentType}
                  onChange={(e) => setSelectedContentType(e.target.value)}
                >
                  <option value="Text">Text</option>
                  <option value="Image">Image</option>
                  <option value="Video">Video</option>
                  <option value="PDF">PDF</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Link">Link</option>
                  <option value="Website">Website</option>
                </select>
              </div>

              {addContentError && (
                <div className="alert alert-danger" role="alert">
                  {addContentError}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a title"
                  value={newContentData.title}
                  onChange={(e) =>
                    setNewContentData({ ...newContentData, title: e.target.value })
                  }
                  disabled={addingContent}
                />
              </div>

              {selectedContentType === 'Text' && (
                 <div className="mb-3">
                   <label className="form-label">Content</label>
                   <textarea
                     className="form-control"
                     rows="4"
                     placeholder="Enter your text content"
                     value={newContentData.content}
                     onChange={(e) =>
                       setNewContentData({ ...newContentData, content: e.target.value })
                     }
                     disabled={addingContent}
                   ></textarea>
                 </div>
              )}

              {(selectedContentType === 'Image' || selectedContentType === 'Video' || selectedContentType === 'PDF') && (
                 <div className="mb-3">
                   <label className="form-label">Upload File</label>
                   <input
                     type="file"
                     className="form-control"
                     onChange={handleFileChange}
                     disabled={addingContent}
                     accept={selectedContentType === 'Image' ? 'image/*' : selectedContentType === 'Video' ? 'video/*' : '.pdf'}
                   />
                   {selectedFile && (
                     <div className="mt-2 p-2 bg-light rounded">
                       <p className="mb-0 text-truncate">
                         Selected: {selectedFile.name}
                       </p>
                     </div>
                   )}
                 </div>
              )}

              {(selectedContentType === 'YouTube' || selectedContentType === 'Link' || selectedContentType === 'Website') && (
                 <div className="mb-3">
                   <label className="form-label">URL</label>
                   <input
                     type="url"
                     className="form-control"
                     placeholder={`Enter ${selectedContentType} URL`}
                     value={newContentData.content}
                     onChange={(e) =>
                       setNewContentData({ ...newContentData, content: e.target.value })
                     }
                     disabled={addingContent}
                   />
                 </div>
              )}

            </div>
            <div className="modal-footer d-flex flex-column flex-sm-row gap-2">
              <button
                type="button"
                className="btn btn-secondary w-100 w-sm-auto"
                onClick={() => setShowAddContentModal(false)}
                disabled={addingContent}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary w-100 w-sm-auto"
                onClick={handleAddContent}
                disabled={addingContent}
              >
                {addingContent ? (
                  <>
                    <FaSpinner className="fa-spin me-2" />
                    Saving...
                  </>
                ) : (
                  "Save Content"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add this helper function at the top of your component
  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'Text':
        return 'primary';
      case 'Image':
        return 'success';
      case 'Video':
        return 'info';
      case 'PDF':
        return 'danger';
      case 'YouTube':
        return 'warning';
      case 'Link':
        return 'secondary';
      case 'Website':
        return 'dark';
      default:
        return 'primary';
    }
  };

  // Add content to datastore
  const handleAddContent = async () => {
    if (!newContentData.title) {
      setAddContentError("Title is required");
      return;
    }

    // Check for content based on type
    if (selectedContentType === 'Text' && !newContentData.content) {
      setAddContentError("Content is required for Text type");
      return;
    }

    if ((
      selectedContentType === 'Image' ||
      selectedContentType === 'Video' ||
      selectedContentType === 'PDF') && !selectedFile
    ) {
      setAddContentError(`File upload is required for ${selectedContentType} type`);
      return;
    }

    if ((
      selectedContentType === 'YouTube' ||
      selectedContentType === 'Link' ||
      selectedContentType === 'Website') && !newContentData.content
    ) {
      setAddContentError(`URL is required for ${selectedContentType} type`);
      return;
    }

    try {
      setAddingContent(true);
      setAddContentError(null);

      const formData = new FormData();
      formData.append('type', selectedContentType);
      formData.append('title', newContentData.title);

      if (selectedContentType === 'Text') {
        formData.append('content', newContentData.content);
      } 
      else if (selectedFile) {
        formData.append('contentFile', selectedFile);
        // The backend will handle setting the content field with the S3 key
      } 
      else if (newContentData.content) {
        formData.append('content', newContentData.content); // For URL types
      }

      const response = await axios.post(
        "http://localhost:4000/api/datastore/content",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        }
      );

      if (response.data.success) {
        fetchDatastoreContents();
        setNewContentData({ title: '', content: '' });
        setSelectedContentType('Text');
        setSelectedFile(null);
        setShowAddContentModal(false);
      } else {
        setAddContentError(response.data.message || "Error adding content");
      }
    } catch (error) {
      console.error("Error adding content:", error);
      setAddContentError(
        error.response?.data?.message || "Error adding content"
      );
    } finally {
      setAddingContent(false);
    }
  };

  return (
    <div className="min-vh-100 bg-white">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1040,
          }}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className="position-fixed top-0 start-0 h-100 bg-white shadow"
        style={{
          width: isMobile
            ? isSidebarOpen
              ? "100%"
              : "0"
            : isSidebarOpen
            ? "16rem"
            : "5rem",
          zIndex: 1050,
          transition: "all 0.3s ease-in-out",
          transform:
            isMobile && !isSidebarOpen ? "translateX(-100%)" : "translateX(0)",
          borderRight: "1px solid #eee",
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          {isSidebarOpen && (
            <h4 className="m-0 fw-semibold fs-5 text-dark">INDIA</h4>
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
                  activeTab === item.name ? "text-primary" : "text-dark"
                }`}
                onClick={() => handleTabClick(item.name)}
                style={{
                  borderLeft:
                    activeTab === item.name
                      ? "3px solid #0d6efd"
                      : "3px solid transparent",
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
          marginLeft: isMobile ? "1.5rem" : isSidebarOpen ? "16rem" : "5rem",
          transition: "all 0.3s ease-in-out",
          padding: isMobile ? "0.5rem" : "1.5rem",
        }}
      >
        <main className="container-fluid px-2 px-md-3 px-lg-4">
          <div className="bg-white rounded-3">
            <div className="p-2 p-md-3 p-lg-4">
              <h2 className="h3 fw-bold mb-3 mb-md-4 text-dark">{activeTab}</h2>

              {/* Content Sections */}
              {activeTab === "Overview" && (
                <div className="row g-3 g-md-4">
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm hover-shadow">
                      <div className="card-body bg-success rounded-3">
                        <h3 className="h5 fw-bold mb-2 text-white">
                          Business Profile
                        </h3>
                        <p className="card-text text-white-50">
                          View and update your business information
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm hover-shadow">
                      <div className="card-body bg-warning rounded-3">
                        <h3 className="h5 fw-bold mb-2 text-white">
                          Transactions
                        </h3>
                        <p className="card-text text-white-50">
                          Manage and view transaction history
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm hover-shadow">
                      <div className="card-body bg-primary rounded-3">
                        <h3 className="h5 fw-bold mb-2 text-white">Reports</h3>
                        <p className="card-text text-white-50">
                          Generate and download business reports
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm hover-shadow">
                      <div className="card-body bg-danger rounded-3">
                        <h3 className="h5 fw-bold mb-2 text-white">
                          Tax Information
                        </h3>
                        <p className="card-text text-white-50">
                          Manage GST, PAN, and other tax details
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm hover-shadow">
                      <div className="card-body bg-secondary rounded-3">
                        <h3 className="h5 fw-bold mb-2 text-white">Support</h3>
                        <p className="card-text text-white-50">
                          Contact support and view help resources
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "States" && (
               
                <div className="border-0 shadow-sm rounded-3">
                  <div className="card-body p-3 p-md-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                      <h3 className="h4 fw-bold text-dark mb-0">Manage States</h3>
                      <button
                        className="btn btn-primary d-flex align-items-center"
                        onClick={() => setShowAddStateModal(true)}
                        disabled={loading}
                      >
                        <FaPlus className="me-2" /> Add New State
                      </button>
                    </div>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    {renderStates()}
                  </div>
                </div>
              )}

              {activeTab === "Datastore" && (
                <div className="border-0 shadow-sm rounded-3">
                  <div className="card-body p-2 p-md-3 p-lg-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                      <h3 className="h4 fw-bold text-dark mb-0">Datastore</h3>
                      <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 w-100 w-md-auto">
                        <div className="input-group">
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search datastore..." 
                          />
                        </div>
                        <div className="dropdown">
                          <button 
                            className="btn btn-secondary dropdown-toggle w-100 w-md-auto" 
                            type="button" 
                            id="allTypesDropdown" 
                            aria-expanded="false"
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                          >
                            All Types
                          </button>
                          <ul 
                            className={`dropdown-menu ${showFilterDropdown ? 'show' : ''}`} 
                            aria-labelledby="allTypesDropdown"
                            style={{ minWidth: '200px' }}
                          >
                            <li><a className="dropdown-item" href="#">Text</a></li>
                            <li><a className="dropdown-item" href="#">Image</a></li>
                            <li><a className="dropdown-item" href="#">Video</a></li>
                            <li><a className="dropdown-item" href="#">YouTube</a></li>
                            <li><a className="dropdown-item" href="#">Link</a></li>
                            <li><a className="dropdown-item" href="#">Website</a></li>
                            <li><a className="dropdown-item" href="#">PDF</a></li>
                          </ul>
                        </div>
                        <button
                          className="btn btn-primary d-flex align-items-center justify-content-center w-100 w-md-auto"
                          onClick={() => setShowAddContentModal(true)}
                        >
                          <FaPlus className="me-2" /> Add Content
                        </button>
                      </div>
                    </div>
                    {datastoreError && (
                      <div className="alert alert-danger" role="alert">
                        {datastoreError}
                      </div>
                    )}

                    {loadingDatastore ? (
                      <div className="text-center py-5">
                        <FaSpinner className="fa-spin fa-2x mb-3" />
                        <p>Loading datastore contents...</p>
                      </div>
                    ) : datastoreContents.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover table-striped w-100 mb-0">
                          <thead className="table-light">
                            <tr>
                              <th scope="col" className="col-12 col-md-2">Title</th>
                              <th scope="col" className="col-12 col-md-2">Type</th>
                              <th scope="col" className="col-12 col-md-3">Content</th>
                              <th scope="col" className="col-12 col-md-3">Created At</th>
                              <th scope="col" className="col-12 col-md-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datastoreContents.map((item) => (
                              <tr key={item._id}>
                                <td className="text-truncate" style={{ maxWidth: '200px' }}>{item.title}</td>
                                <td>
                                  <span className={`badge bg-${getTypeBadgeColor(item.type)}`}>
                                    {item.type}
                                  </span>
                                </td>
                                <td className="text-truncate" style={{ maxWidth: '400px' }}>
                                  {item.type === 'Text' && (
                                    <span>{item.metadata?.fileName || 'Text Content'}</span>
                                  )}
                                  {(item.type === 'Image' || item.type === 'Video' || item.type === 'PDF') && (
                                    <span>File: {item.metadata?.fileName || item.content}</span>
                                  )}
                                  {(item.type === 'YouTube' || item.type === 'Link' || item.type === 'Website') && (
                                    <a 
                                      href={item.content} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-primary text-truncate d-inline-block" 
                                      style={{ maxWidth: '100%' }}
                                    >
                                      {item.content}
                                    </a>
                                  )}
                                </td>
                                <td>
                                  {new Date(item.createdAt).toLocaleString()}
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button 
                                      className="btn btn-secondary" 
                                      onClick={() => {
                                        setEditingContent(item);
                                        setShowEditContentModal(true);
                                      }}
                                    >
                                      <FaEdit />
                                    </button>
                                    <button 
                                      className="btn btn-danger" 
                                      onClick={() => {
                                        setContentToDelete(item);
                                        setDeleteConfirmModal(true);
                                      }}
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <p className="text-muted">No content added yet.</p>
                        <p className="text-muted">Click "Add Content" to add your first item.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "History" && (
                <div className="border-0 shadow-sm rounded-3">
                  <div className="card-body p-3 p-md-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                      <h3 className="h4 fw-bold text-dark mb-0">History</h3>
                      <button
                        className="btn btn-primary d-flex align-items-center"
                        onClick={() => setShowAddContentModal(true)}
                      >
                        <FaPlus className="me-2" /> Add New Content
                      </button>
                    </div>
                    {/* Placeholder for History Content */}
                     <div className="row g-4">
                       <div className="col-12">
                         <div className="card h-100">
                           <div className="card-body">
                              <h5 className="card-title">No history content added yet.</h5>
                             <p className="card-text">Click "Add New Content" to add your first item.</p>
                           </div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modals */}
              {showAddStateModal && (
                <div className="modal fade show" style={{ display: "block" }}>
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-dark">Add New State</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowAddStateModal(false)}
                          disabled={loading}
                        ></button>
                      </div>
                      <div className="modal-body">
                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}
                        <div className="mb-3">
                          <label className="form-label">State Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newState.name}
                            onChange={(e) =>
                              setNewState({ ...newState, name: e.target.value })
                            }
                            disabled={loading}
                            placeholder="Enter state name"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            value={newState.description}
                            onChange={(e) =>
                              setNewState({
                                ...newState,
                                description: e.target.value,
                              })
                            }
                            disabled={loading}
                            placeholder="Enter state description"
                            rows="3"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Website URL</label>
                          <input
                            type="url"
                            className="form-control"
                            value={newState.websiteurl}
                            onChange={(e) =>
                              setNewState({
                                ...newState,
                                websiteurl: e.target.value,
                              })
                            }
                            disabled={loading}
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">State Image *</label>
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleImageChange}
                            disabled={loading}
                            accept="image/*"
                          />
                          <small className="text-muted d-block mt-1">
                            Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                          </small>
                          {newState.image && (
                            <div className="mt-2">
                              <img
                                src={URL.createObjectURL(newState.image)}
                                alt="Preview"
                                className="img-thumbnail"
                                style={{ maxHeight: "200px", width: "auto" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="modal-footer d-flex flex-column flex-sm-row gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary w-100 w-sm-auto"
                          onClick={() => setShowAddStateModal(false)}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary w-100 w-sm-auto"
                          onClick={handleAddState}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <FaSpinner className="fa-spin me-2" />
                              Adding...
                            </>
                          ) : (
                            "Add State"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showAddDepartmentModal && (
                <div className="modal fade show" style={{ display: "block" }}>
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-dark">Add New Department</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowAddDepartmentModal(false)}
                          disabled={loading}
                        ></button>
                      </div>
                      <div className="modal-body">
                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}
                        <div className="mb-3">
                          <label className="form-label">Department Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newDepartment.name}
                            onChange={(e) =>
                              setNewDepartment({
                                ...newDepartment,
                                name: e.target.value,
                              })
                            }
                            disabled={loading}
                            placeholder="Enter department name"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Department Image *</label>
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleDepartmentImageChange}
                            disabled={loading}
                            accept="image/*"
                          />
                          <small className="text-muted d-block mt-1">
                            Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                          </small>
                          {newDepartment.image && (
                            <div className="mt-2">
                              <img
                                src={URL.createObjectURL(newDepartment.image)}
                                alt="Preview"
                                className="img-thumbnail"
                                style={{ maxHeight: "200px", width: "auto" }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="row g-3">
                          <div className="col-12 col-sm-6">
                            <label className="form-label">Number of Websites</label>
                            <input
                              type="number"
                              className="form-control"
                              onChange={(e) =>
                                setNewDepartment({
                                  ...newDepartment,
                                  websites: parseInt(e.target.value) || 0,
                                })
                              }
                              disabled={loading}
                              min="0"
                            />
                          </div>
                          <div className="col-12 col-sm-6">
                            <label className="form-label">Number of Conversations</label>
                            <input
                              type="number"
                              className="form-control"
                              onChange={(e) =>
                                setNewDepartment({
                                  ...newDepartment,
                                  Conversations: parseInt(e.target.value) || 0,
                                })
                              }
                              disabled={loading}
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer d-flex flex-column flex-sm-row gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary w-100 w-sm-auto"
                          onClick={() => setShowAddDepartmentModal(false)}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary w-100 w-sm-auto"
                          onClick={handleCreateDepartment}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <FaSpinner className="fa-spin me-2" />
                              Adding...
                            </>
                          ) : (
                            "Add Department"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showEditDepartmentModal && editingDepartment && (
                <div className="modal fade show" style={{ display: "block" }}>
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-dark">Edit Department</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => {
                            setShowEditDepartmentModal(false);
                            setEditingDepartment(null);
                          }}
                          disabled={loading}
                        ></button>
                      </div>
                      <div className="modal-body">
                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}
                        <div className="mb-3">
                          <label className="form-label">Department Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editingDepartment.name}
                            onChange={(e) =>
                              setEditingDepartment({
                                ...editingDepartment,
                                name: e.target.value,
                              })
                            }
                            disabled={loading}
                            placeholder="Enter department name"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Department Image</label>
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.size > 5 * 1024 * 1024) {
                                  setError("Image size should be less than 5MB");
                                  return;
                                }
                                if (!file.type.startsWith("image/")) {
                                  setError("Please upload an image file");
                                  return;
                                }
                                setEditingDepartment({
                                  ...editingDepartment,
                                  newImage: file,
                                });
                                setError(null);
                              }
                            }}
                            disabled={loading}
                            accept="image/*"
                          />
                          <small className="text-muted d-block mt-1">
                            Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                          </small>
                          {editingDepartment.newImage && (
                            <div className="mt-2">
                              <img
                                src={URL.createObjectURL(editingDepartment.newImage)}
                                alt="Preview"
                                className="img-thumbnail"
                                style={{ maxHeight: "200px", width: "auto" }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="row g-3">
                          <div className="col-12 col-sm-6">
                            <label className="form-label">Number of Websites</label>
                            <input
                              type="number"
                              className="form-control"
                              value={editingDepartment.websites}
                              onChange={(e) =>
                                setEditingDepartment({
                                  ...editingDepartment,
                                  websites: parseInt(e.target.value) || 0,
                                })
                              }
                              disabled={loading}
                              min="0"
                            />
                          </div>
                          <div className="col-12 col-sm-6">
                            <label className="form-label">Number of Conversations</label>
                            <input
                              type="number"
                              className="form-control"
                              value={editingDepartment.Conversations}
                              onChange={(e) =>
                                setEditingDepartment({
                                  ...editingDepartment,
                                  Conversations: parseInt(e.target.value) || 0,
                                })
                              }
                              disabled={loading}
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer d-flex flex-column flex-sm-row gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary w-100 w-sm-auto"
                          onClick={() => {
                            setShowEditDepartmentModal(false);
                            setEditingDepartment(null);
                          }}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary w-100 w-sm-auto"
                          onClick={handleUpdateDepartment}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <FaSpinner className="fa-spin me-2" />
                              Updating...
                            </>
                          ) : (
                            "Update Department"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {deleteDepartmentConfirmModal && departmentToDelete && (
                <div className="modal fade show" style={{ display: "block" }}>
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-dark">Confirm Delete</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => {
                            setDeleteDepartmentConfirmModal(false);
                            setDepartmentToDelete(null);
                          }}
                          disabled={loading}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          Are you sure you want to delete the department "{departmentToDelete.name}"? This action cannot be undone.
                        </p>
                      </div>
                      <div className="modal-footer d-flex flex-column flex-sm-row gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary w-100 w-sm-auto"
                          onClick={() => {
                            setDeleteDepartmentConfirmModal(false);
                            setDepartmentToDelete(null);
                          }}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger w-100 w-sm-auto"
                          onClick={() => handleDeleteDepartment(departmentToDelete)}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <FaSpinner className="fa-spin me-2" />
                              Deleting...
                            </>
                          ) : (
                            "Delete Department"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {renderAddContentModal()}

              {renderDeleteContentConfirmModal()}
              {renderEditContentModal()}

              {/* Modal Backdrop */}
              {(showAddStateModal || showAddDepartmentModal || showEditStateModal || showEditDepartmentModal || deleteConfirmModal || deleteDepartmentConfirmModal || showAddContentModal || showEditContentModal) && (
                <div className="modal-backdrop fade show"></div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};



export default ClientDashboard;
