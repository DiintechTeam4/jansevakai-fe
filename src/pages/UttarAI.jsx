import { motion, useInView } from "framer-motion";
import {
  FaRobot,
  FaArrowRight,
  FaSearch,
  FaGoogle,
  FaFacebook,
  FaTimes,
  FaFilter,
  FaSort,
  FaBuilding,
} from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const departments = [
  {
    name: "Agriculture Department",
    website: "upagriculture.com",
    image: "/up/agriculture.png",
  },
  {
    name: "Basic Education Department",
    website: "basicedu.up.gov.in",
    image: "/up/education1.png",
  },
  {
    name: "Finance Department",
    website: "finance.up.gov.in",
    image: "/up/Finance.png",
  },
  {
    name: "Health & Family Welfare Department",
    website: "uphealth.up.gov.in",
    image: "/up/hospital.png",
  },
  {
    name: "Home Department",
    website: "home.up.nic.in",
    image: "/up/Homeland.png",
  },
  {
    name: "Information & Public Relations Department",
    website: "information.up.gov.in",
    image: "/up/Info-Public.png",
  },
  {
    name: "Labour Department",
    website: "uplabour.gov.in",
    image: "/up/labour.png",
  },
  {
    name: "Revenue Department",
    website: "bor.up.nic.in",
    image: "/up/revenue.png",
  },
  {
    name: "Transport Department",
    website: "uptransport.upsdc.gov.in",
    image: "/up/transport.png",
  },
  {
    name: "Urban Development Department",
    website: "localbodies.up.nic.in",
    image: "/up/Urban-devvelopment.png",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 50,
      damping: 15,
    },
  }),
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#0d6efd",
    color: "white",
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// Function to get first letter of department name
const getFirstLetter = (name) => {
  return name.charAt(0).toUpperCase();
};

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };
  if (!isOpen) return null;
  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="modal-content"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(60px)",
          padding: "2rem",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "400px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          className="btn-close btn-close-white"
          style={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
          }}
        />
        <h2 className="text-white text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control bg-dark text-white border-secondary"
              placeholder="enter Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control bg-dark text-white border-secondary"
              placeholder="enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            style={{ backgroundColor: "#ff8c00", borderColor: "#ff8c00" }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn btn-link text-white-50"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>
          {isLogin && (
            <div className="text-center mb-3">
              <button
                type="button"
                className="btn btn-link text-white-50"
                onClick={() => {
                  /* Handle forgot password */
                }}
              >
                Forgot Password?
              </button>
            </div>
          )}
          <div className="text-center text-white-50 mb-3">OR</div>
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2"
              onClick={() => {
                /* Handle Google login */
              }}
            >
              <FaGoogle /> Continue with Google
            </button>
            <button
              type="button"
              className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2"
              onClick={() => {
                /* Handle Facebook login */
              }}
            >
              <FaFacebook /> Continue with Facebook
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const UttarAI = () => {
  const { stateid } = useParams();
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("alphabetical");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Image, setImage] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching departments for stateid:", stateid);
      const response = await axios.get(`http://localhost:4000/api/client/states/${stateid}/departments`);
      console.log("API Response:", response.data);
      if (response.data.success) {
        console.log("Setting departments:", response.data.data);
        setDepartments(response.data.data);
        setImage(response.data.data[0].image);
      } else {
        console.error("API returned error:", response.data);
        setError("Failed to fetch departments");
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = async (imageUrl) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/client/get-image-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        return data.data.presignedUrl;
      }
      return null;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (Image) {
          const url = await getImageUrl(Image);
          if (!url) {
            throw new Error("Failed to generate presigned URL");
          }
          setImageUrl(url);
        }
      } catch (err) {
        console.error("Error loading image:", err);
      }
    };
    loadImage();
  }, [Image]);

  useEffect(() => {
    console.log("Component mounted, stateid:", stateid);
    if (stateid) {
      fetchDepartments();
    } else {
      console.error("No stateid provided");
      setError("No state ID provided");
    }
  }, [stateid]);

  // Filter and sort departments based on search query and sort option
  const filteredDepartments = departments
    .filter((dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "websites") {
        return b.website.length - a.website.length;
      }
      return 0;
    });

  const handleCardClick = () => {
    setIsLoginModalOpen(true);
    // navigate("/login")
  };

  useEffect(() => {
    // Check if screen is mobile on load
    setIsMobile(window.innerWidth <= 768);

    // Add resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <p className="text-danger mb-3">{error}</p>
        <button 
          className="btn btn-primary"
          onClick={fetchDepartments}
          style={{ backgroundColor: '#ff8c00', borderColor: '#ff8c00' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-100">
      {/* Hero Section */}
      {isMobile ? (
        // Mobile Layout - Stacked (image on top, content below)
        <section
          className="position-relative bg-dark"
          style={{ height: "auto" }}
        >
          {/* Hero Image for Mobile */}
          <img
            src="/DELHI_MAP.png"
            alt="Hero Background"
            style={{
              width: "100%",
              height: "50vh",
              objectFit: "cover",
            }}
          />

          {/* Hero Content Below Image in Mobile */}
          <div
            style={{
              padding: "1.5rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white mb-3"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                fontSize: "1.8rem",
                fontWeight: "bold",
              }}
            >
              UttarPradeshAI
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white mb-3"
              style={{
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              AI Powered Citizen Support For Uttar Pradesh{" "}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white mb-3"
              style={{ fontSize: "1rem" }}
            >
              Revolutionizing UP Government Services With Intelligent AI
              Solutions.
            </motion.p>
            <div className="d-flex gap-4 justify-content-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                style={{ fontSize: "0.9rem" }}
              >
                Get In Touch
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline-light"
                style={{ fontSize: "0.9rem" }}
              >
                Try Now
              </motion.button>
            </div>
          </div>
        </section>
      ) : (
        <section
        className="position-relative bg-dark d-flex flex-column gap-5 flex-md-row flex-sm-row align-items-center justify-content-space-between"
        style={{ minHeight: "600px", height: "90vh" }}
      >
        {/* Left Side: Image */}
        <div
          className="flex-shrink-0"
          style={{
            width: "100%",
            maxWidth: "60vw",
            height: "95vh",
            position: "relative",
            zIndex: 1,
            marginRight: "100px",
          }}
        >
          <img
            src="/DELHI_MAP.png"
            alt="Delhi AI"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              borderTopLeftRadius: "16px",
              borderBottomLeftRadius: "16px",
            }}
          />
        </div>
        {/* Right Side: Content */}
        <div
          className="d-flex flex-column justify-content-center px-4 py-5"
          style={{
            width: "100%",
            maxWidth: "40vw",
            zIndex: 2,

            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="display-2 fw-bold mb-4 text-white hero-title"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          UttarPradeshAI
        </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="display-6 fw-bold mb-4 text-white hero-subtitle"
            style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)" }}
          >
            Revolutionizing Citizen Services with Agentic AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h5 mb-4 text-white hero-text"
          >
            Revolutionizing UP Government Services With Intelligent AI Solutions.
          </motion.p>
          <div className="d-flex gap-3">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg hero-btn"
            >
              Get Started
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline-light btn-lg hero-btn"
            >
              Try Now
            </motion.button>
          </div>
        </div>
      </section>
      )}

      {/* Services Grid */}
      <section className="container py-5">
        <div className="container px-4">
          <section className="ms-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-start mb-3 display-5 fw-bold"
            >
              UttarAI Departments
            </motion.h2>
            <div className="d-flex flex-column flex-md-row gap-4 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="d-flex align-items-center p-3 rounded-4"
                style={{
                  backgroundColor: "rgba(255, 140, 0, 0.1)",
                  border: "1px solid rgba(255, 140, 0, 0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "rgba(255, 140, 0, 0.2)",
                    color: "#ff8c00",
                  }}
                >
                  <FaRobot style={{ fontSize: "1.5rem" }} />
                </div>
                <div>
                  <h3 className="h4 mb-0 fw-bold" style={{ color: "#ff8c00" }}>
                    {departments.length}
                  </h3>
                  <p
                    className="mb-0"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Total Departments
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="d-flex align-items-center p-3 rounded-4"
                style={{
                  backgroundColor: "rgba(13, 110, 253, 0.1)",
                  border: "1px solid rgba(13, 110, 253, 0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "rgba(13, 110, 253, 0.2)",
                    color: "#0d6efd",
                  }}
                >
                  <FaBuilding style={{ fontSize: "1.5rem" }} />
                </div>
                <div>
                  <h3 className="h4 mb-0 fw-bold" style={{ color: "#0d6efd" }}>
                    +195
                  </h3>
                  <p
                    className="mb-0"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Total Websites
                  </p>
                </div>
              </motion.div>
            </div>
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 d-flex justify-content-start"
            >
              <div
                className="input-group"
                style={{ maxWidth: "400px", borderRadius: "50px" }}
              >
                <input
                  type="text"
                  className="form-control border-start-0 bg-dark text-white"
                  placeholder="Search departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: "0" }}
                />
                <span className="input-group-text bg-dark text-white">
                  <FaSearch className="text-warning" />
                </span>
              </div>
            </motion.div>

            {/* Filter Buttons */}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div className="d-flex gap-5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-outline-primary px-4 d-flex align-items-center gap-2"
                  style={{ borderRadius: "20px" }}
                >
                  Select Departments
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-outline-primary px-4 d-flex align-items-center gap-2"
                  style={{ borderRadius: "20px" }}
                >
                  Select Websites
                </motion.button>
              </div>
            </div>

            {/* Filter and Sort Section */}
            <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
              <div className="d-flex gap-3">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="btn px-4 d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(5px)",
                  }}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <FaFilter style={{ fontSize: "1.1rem" }} />
                  <span style={{ fontWeight: "500" }}>Filter</span>
                </motion.button>
                <div className="position-relative">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="btn px-4 d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(5px)",
                    }}
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <FaSort style={{ fontSize: "1.1rem" }} />
                    <span style={{ fontWeight: "500" }}>Sort</span>
                  </motion.button>
                  {showSortDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="position-absolute top-100 start-0 mt-2"
                      style={{
                        zIndex: 1000,
                        minWidth: "200px",
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <button
                        className="btn btn-link text-white text-decoration-none d-block w-100 text-start p-3"
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => {
                          setSortBy("alphabetical");
                          setShowSortDropdown(false);
                        }}
                      >
                        A-Z
                      </button>
                      <button
                        className="btn btn-link text-white text-decoration-none d-block w-100 text-start p-3"
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => {
                          setSortBy("alphabetical");
                          setShowSortDropdown(false);
                        }}
                      >
                        Z-A
                      </button>
                      <button
                        className="btn btn-link text-white text-decoration-none d-block w-100 text-start p-3"
                        style={{
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => {
                          setSortBy("websites");
                          setShowSortDropdown(false);
                        }}
                      >
                        Least Websites
                      </button>
                      <button
                        className="btn btn-link text-white text-decoration-none d-block w-100 text-start p-3"
                        style={{
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => {
                          setSortBy("websites");
                          setShowSortDropdown(false);
                        }}
                      >
                        Most Websites
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="row g-4" ref={gridRef}>
            {filteredDepartments.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p>No departments found matching your search criteria</p>
              </div>
            ) : (
              filteredDepartments.map((department, index) => (
                <motion.div
                  key={department.name}
                  custom={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="col-md-6 col-lg-4 mb-5 mt-4"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="card h-100 shadow-sm"
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                    onClick={handleCardClick}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="card-body d-flex flex-column p-4">
                      <div
                        className="ratio ratio-16x9"
                        style={{ borderRadius: "16px" }}
                      >
                        <img
                          src={ImageUrl}
                          alt={department.name}
                          className="img-fluid object-fit-fill"
                          style={{ height: "180px" }}
                        />
                      </div>
                      <div className="d-flex align-items-center">
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
                          {getFirstLetter(department.name)}
                        </div>
                        <motion.h3
                          className="card-title h6 fw-bold mb-0 text-truncate"
                          whileHover={{ color: "#0d6efd" }}
                          transition={{ duration: 0.3 }}
                        >
                          {department.name}
                        </motion.h3>
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
                  </motion.div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
      {/* About UPAI Section */}

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="display-5 fw-bold mb-4">
                  About Uttar Pradesh AI
                </h2>
                <p className="lead mb-4">
                  Uttar Pradesh AI is dedicated to transforming government
                  services across the state using cutting-edge Artificial
                  Intelligence Agents.
                </p>
                <p className="mb-4">
                  Our solutions are designed to empower citizens, streamline
                  government operations, and create a more connected, efficient
                  state administration.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg"
                >
                  Learn More About Us
                </motion.button>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.img
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                src="/up.jpeg"
                className="img-fluid rounded shadow"
                alt="Delhi "
              />
            </div>
          </div>
        </div>
      </section>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default UttarAI;
