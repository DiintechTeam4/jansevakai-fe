import { motion, useInView } from "framer-motion";
import { FaRobot, FaArrowRight } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      type: "spring",
      stiffness: 30,
      damping: 20,
    },
  }),
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 50,
      damping: 15,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.02,
    backgroundColor: "#0d6efd",
    color: "white",
    transition: {
      duration: 0.2,
      type: "tween",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      type: "tween",
    },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState("states");
  const [States, setStates] = useState([]);
  const [ImageUrl,setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(null);
  const [loading, setLoading] = useState(true);


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

  const getStates = async () => {
    try {
      setLoading(true);
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
      console.log(data)
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
    getStates();
  }, []);

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (States.image) {
          const url = await getImageUrl(States.image);
          if (!url) {
            throw new Error("Failed to generate presigned URL");
          }
          setImageUrl(url);
          setImageLoading(false);
        } else {
          setImageLoading(false);
        }
      } catch (err) {
        console.error("Error loading image:", err);
        setImageError("Failed to load image");
        setImageLoading(false);
      }
    };
    loadImage();
  }, [States.image]);

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
            src="/INDIA MAP.png"
            alt="Hero Background"
            style={{
              width: "100%",
              height: "60vh",
              objectFit: "fill",
            }}
          />

          {/* Hero Content Below Image in Mobile */}
          <div
            style={{
              paddingBottom: "2rem",
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
              JansevakAI
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
              Revolutionizing Citizen Services with Agentic AI{" "}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white mb-3"
              style={{ fontSize: "1rem" }}
            >
              Revolutionizing Government Services With Intelligent AI Solutions.
            </motion.p>
            <div className="d-flex gap-4 justify-content-center">
              <Link to="/selectrole">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                  style={{ fontSize: "0.9rem" }}
                >
                  Get Started
                </motion.button>
              </Link>
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
          className="position-relative bg-dark d-flex flex-column flex-md-row flex-sm-row align-items-center justify-content-space-between"
          style={{ minHeight: "600px", height: "90vh" }}
        >
          {/* Left Side: Image */}
          <div
            className="flex-shrink-0"
            style={{
              width: "100%",
              maxWidth: "40vw",
              height: "95vh",
              position: "relative",
              zIndex: 1,
              marginLeft: "100px",
            }}
          >
            <img
              src="/INDIA MAP.png"
              alt="India AI"
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
              Revolutionizing Government Services With Intelligent AI Solutions.
            </motion.p>
            <div className="d-flex gap-3">
              <Link to="/selectrole">
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
              </Link>
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

      {/* States Grid */}
      <section className="py-5">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4 display-5 fw-bold"
          >
            AI Services
          </motion.h2>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="d-flex justify-content-center gap-4 mb-5"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn ${
                activeFilter === "states"
                  ? "btn-primary"
                  : "btn-outline-primary"
              } px-5 py-2`}
              onClick={() => setActiveFilter("states")}
              style={
                activeFilter === "states"
                  ? {
                      backgroundColor: "#ff8c00",
                      borderColor: "#ff8c00",
                    }
                  : {}
              }
            >
              States
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn ${
                activeFilter === "ut" ? "btn-primary" : "btn-outline-primary"
              } px-5 py-2`}
              onClick={() => setActiveFilter("ut")}
              style={
                activeFilter === "ut"
                  ? {
                      backgroundColor: "#ff8c00",
                      borderColor: "#ff8c00",
                    }
                  : {}
              }
            >
              Union Territories
            </motion.button>
          </motion.div>

          <div className="row g-4" ref={gridRef}>
            {loading ? (
              <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : States && States.length > 0 ? (
              States.map((state, index) => (
                <motion.div
                  key={state._id}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={cardVariants}
                  className="col-12 col-md-6 col-lg-4 mb-5 mt-4"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="card h-100"
                    style={{
                      borderRadius: "16px",
                      maxHeight: "450px",
                      maxWidth: "100%",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <motion.div
                      className="text-center pt-3"
                      style={{ 
                        height: "200px", 
                        width: "100%",
                        overflow: "hidden"
                      }}
                    >
                      {state.image ? (
                        <img
                          src={state.image}
                          alt={state.name}
                          className="card-img-top"
                          style={{
                            maxHeight: "250px",
                            maxWidth: "100%",
                            objectFit: "contain",
                          }}
                          onError={async (e) => {
                            console.error("Image failed to load:", e);
                            try {
                              const presignedUrl = await getImageUrl(state.image);
                              if (presignedUrl) {
                                e.target.src = presignedUrl;
                              } else {
                                e.target.style.display = 'none';
                              }
                            } catch (error) {
                              console.error("Error getting presigned URL:", error);
                              e.target.style.display = 'none';
                            }
                          }}
                        />
                      ) : (
                        <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                          <p className="mb-0">No image available</p>
                        </div>
                      )}
                    </motion.div>

                    <div className="card-body px-4 py-4">
                      <motion.h3
                        className="card-title h4 mb-3"
                        whileHover={{ color: "#0d6efd" }}
                        transition={{ duration: 0.3 }}
                      >
                        {state.name}
                      </motion.h3>
                      <p className="card-text mb-4"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: "1.5",
                          height: "3em"
                        }}
                      >
                        {state.description}
                      </p>
                      <div className="d-flex gap-3">
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
                                    3
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
                                    {state.departments?.length}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Link 
                          to={`/${state.name.toLowerCase()}/${state._id}`}
                          onClick={() => {
                            console.log(`Navigating to ${state.name} with ID: ${state._id}`);
                          }}
                        >
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="btn btn-primary px-4"
                            style={{
                              backgroundColor: "#ff8c00",
                              borderColor: "#ff8c00",
                            }}
                          >
                            Go
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No states found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
