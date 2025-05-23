import { motion, useInView } from 'framer-motion'
import { FaRobot, FaArrowRight, FaSearch, FaGoogle, FaFacebook, FaTimes, FaFilter, FaSort, FaBuilding } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const services = [
  { name: 'Agriculture Advisory', image: 'https://source.unsplash.com/random/300x200?agriculture' },
  { name: 'Education Assistance', image: 'https://source.unsplash.com/random/300x200?education' },
  { name: 'Healthcare Support', image: 'https://source.unsplash.com/random/300x200?healthcare' },
  { name: 'Tourism Guide', image: 'https://source.unsplash.com/random/300x200?tourism' },
  { name: 'Business Assistance', image: 'https://source.unsplash.com/random/300x200?business' },
  { name: 'Rural Development', image: 'https://source.unsplash.com/random/300x200?rural' },
]

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
      damping: 15
    }
  }),
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2 }
  }
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#0d6efd",
    color: "white",
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2 }
  }
}

const HaryanaAI = () => {
  const { stateid } = useParams()
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: "-100px" })
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [sortBy, setSortBy] = useState('alphabetical')
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [Image, setImage] = useState(null)
  const [ImageUrl, setImageUrl] = useState(null)
  const navigate = useNavigate()

  // Add getFirstLetter function
  const getFirstLetter = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };

  const fetchDepartments = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching departments for stateid:', stateid)
      const response = await axios.get(`http://localhost:4000/api/client/states/${stateid}/departments`)
      console.log('API Response:', response.data)
      if (response.data.success) {
        console.log('Setting departments:', response.data.data)
        setDepartments(response.data.data)
        setImage(response.data.data[0].image)
      } else {
        console.error('API returned error:', response.data)
        setError('Failed to fetch departments')
      }
    } catch (err) {
      console.error('Error fetching departments:', err)
      setError('Failed to fetch departments')
    } finally {
      setLoading(false)
    }
  }

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
      )
      const data = await response.json()
      console.log(data)
      if (data.success) {
        return data.data.presignedUrl
      }
      return null
    } catch (error) {
      console.error("Error getting image URL:", error)
      return null
    }
  }

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (Image) {
          const url = await getImageUrl(Image)
          if (!url) {
            throw new Error("Failed to generate presigned URL")
          }
          setImageUrl(url)
        }
      } catch (err) {
        console.error("Error loading image:", err)
      }
    }
    loadImage()
  }, [Image])

  useEffect(() => {
    console.log('Component mounted, stateid:', stateid)
    if (stateid) {
      fetchDepartments()
    } else {
      console.error('No stateid provided')
      setError('No state ID provided')
    }
  }, [stateid])

  // Filter and sort departments based on search query and sort option
  const filteredDepartments = departments
    .filter(dept => dept.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'websites') {
        return b.website.length - a.website.length
      }
      return 0
    })

  // Add handleCardClick function
  const handleCardClick = (department) => {
    console.log('Department clicked:', department)
    // Navigate to department chat page
    navigate(`/chat/${stateid}/${department._id}`, {
      state: {
        departmentName: department.name,
        stateId: stateid
      }
    })
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
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
    )
  }

  return (
    <div className="w-100">
      {/* Hero Section */}
      
      {isMobile ? (
        // Mobile Layout - Stacked (image on top, content below)
        <section className="position-relative bg-dark" style={{height:"auto"}}>
          {/* Hero Image for Mobile */}
          <img 
            src="/HARYANA MAP.png" 
            alt="Hero Background" 
            style={{
              width: '100%',
              height: '50vh',
              objectFit: 'cover',
            }}
          />
          
          {/* Hero Content Below Image in Mobile */}
          <div style={{
            padding: '1.5rem',
            width: '100%',
            textAlign: 'center'
          }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white mb-3"
              style={{ 
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                fontSize: '1.8rem',
                fontWeight: 'bold'
              }}
            >
              HaryanaAI
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white mb-3"
              style={{ 
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
             AI Powered Citizen Support For Haryana          
             </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white mb-3"
              style={{ fontSize: '1rem' }}
            >
          Revolutionizing Haryana Government Services With Intelligent AI Solutions.

</motion.p>
            <div className="d-flex gap-4 justify-content-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                style={{ fontSize: '0.9rem' }}
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
                style={{ fontSize: '0.9rem' }}
              >
                Try Now
              </motion.button>
            </div>
          </div>
        </section>
      ) : (
      <section className="position-relative bg-dark d-flex flex-column flex-md-row gap-5 flex-sm-row align-items-center justify-content-center" style={{ minHeight: "600px", height: "90vh" }}>
        {/* Left Side: Image */}
        <div className="flex-shrink-0" style={{ width: "100%", maxWidth: "40vw", height: "90vh", position: "relative", zIndex: 1 ,marginRight:"100px"}}>
          <img
            src="/HARYANA MAP.png"
            alt="Haryana AI"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              borderTopLeftRadius: "16px",
              borderBottomLeftRadius: "16px",
              marginRight:"100px"
            }}
          />
        </div>
        {/* Right Side: Content */}
        <div className="d-flex flex-column justify-content-center py-5" style={{ width: "100%", maxWidth: "40vw", zIndex: 2 }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="display-2 fw-bold mb-4 text-white hero-title"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            HaryanaAI
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="display-6 fw-bold mb-4 text-white hero-subtitle"
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}
          >
            AI Powered Citizen Support For Haryana
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h5 mb-4 text-white hero-text"
          >
            Revolutionizing Haryana Government Services With Intelligent AI Solutions.
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
          <section className='ms-4'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
              className="text-start mb-3 display-5 fw-bold"
          >
              HaryanaAI Departments
          </motion.h2>
            <div className="d-flex flex-column flex-md-row gap-4 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="d-flex align-items-center p-3 rounded-4"
                style={{
                  backgroundColor: 'rgba(255, 140, 0, 0.1)',
                  border: '1px solid rgba(255, 140, 0, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(255, 140, 0, 0.2)',
                    color: '#ff8c00'
                  }}
                >
                  <FaRobot style={{ fontSize: '1.5rem' }} />
                </div>
                <div>
                  <h3 className="h4 mb-0 fw-bold" style={{ color: '#ff8c00' }}>
                    {departments.length}
                  </h3>
                  <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Departments</p>
                </div>
              </motion.div>
              {/* ... rest of the existing code ... */}
            </div>

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
                      onClick={() => handleCardClick(department)}
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
          </section>
        </div>
      </section>

       {/* About HaryanaAI Section */}
       <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="display-5 fw-bold mb-4">About HaryanaAI</h2>
                <p className="lead mb-4">
                  HaryanaAI is dedicated to transforming government services across the state using cutting-edge Artificial Intelligence Agents.
                </p>
                <p className="mb-4">
                  Our solutions are designed to empower citizens, streamline government operations, and create a more connected, efficient state administration.
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
                src="/delhi.jpg"
                className="img-fluid rounded shadow"
                alt="Delhi "
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HaryanaAI 