import { motion, useInView } from "framer-motion";
import { FaRobot, FaArrowRight } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const states = [
  { name: "UttarAI", image: "/UTTAR_MAP.png", linkTo: "/uttar" },
  { name: "MahaAI", image: "/MAHARASHTRA MAP_COLLAGE.png", linkTo: "/maharashtra" },
  { name: "MadhyaAI", image: "/MP MAP.png", linkTo: "/madhya" },
  { name: "DelhiAI", image: "/DELHI_MAP.png", linkTo: "/delhi" },
  {
    name: "GujaratAI",
    image: "/GUJARAT_MAP.png",
    linkTo: "/gujarat",
  },
  {
    name: "RajasthanAI",
    image: "RAJASTHAN MAP.png",
    linkTo: "/rajasthan",
  },
  { name: "HaryanaAI", image: "/HARYANA MAP.png", linkTo: "/haryana" },
  {
    name: "UttraAI",
    image: "https://source.unsplash.com/random/300x200?lucknow",
    linkTo: "/uttra",
  },
  {
    name: "AssamAI",
    image: "https://source.unsplash.com/random/300x200?kochi",
    linkTo: "/assam",
  },
  {
    name: "ChattisgarhAI",
    image: "https://source.unsplash.com/random/300x200?chandigarh",
    linkTo: "/chattisgarh",
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
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState("states");

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
              height: "65vh",
              objectFit: "fill",
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
              JnsevakAI
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
              AI Powered Citizen Support For Bharat{" "}
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
            {/* <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="display-2 fw-bold mb-4 text-white hero-title"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            JansevakAI
          </motion.h1> */}
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
            {states.map((state, index) => (
              <motion.div
                key={state.name}
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
                  }}
                >
                  <motion.div className="overflow-hidden text-center p-4">
                    <img
                      src={state.image}
                      className="card-img-top object-fit-fill"
                      style={{ height: "20vh" }}
                      alt={state.name}
                    />
                  </motion.div>
                  <div className="card-body p-4">
                    <motion.h3
                      className="card-title h4 mb-3"
                      whileHover={{ color: "#0d6efd" }}
                      transition={{ duration: 0.3 }}
                    >
                      {state.name}
                    </motion.h3>
                    <p className="card-text mb-4">
                      Discover AI solutions tailored for <br /> {state.name}
                    </p>
                    <div className="d-flex gap-3">
                      <Link>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="btn btn-outline-primary px-4"
                        >
                          Departments
                        </motion.button>
                      </Link>
                      <Link to={state.linkTo}>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
