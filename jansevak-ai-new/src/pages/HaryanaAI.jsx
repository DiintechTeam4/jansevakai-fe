import { motion, useInView } from 'framer-motion'
import { FaRobot, FaArrowRight } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'

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
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: "-100px" })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if screen is mobile on load
    setIsMobile(window.innerWidth <= 768)
    
    // Add resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
      <section className="py-5">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5 display-5 fw-bold"
          >
            Haryana AI Services
          </motion.h2>
          {/* <div className="row g-4" ref={gridRef}>
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                className="col-12 col-md-6 col-lg-4"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="card h-100"
                >
                  <motion.div
                    className="overflow-hidden text-center px-4 py-4"
                  >
                    <img
                      src={service.image}
                      className="card-img-top object-fit-fill"
                      style={{ height: '200px' }}
                      alt={service.name}
                    />
                  </motion.div>
                  <div className="card-body">
                    <motion.h3 
                      className="card-title h4"
                      whileHover={{ color: "#0d6efd" }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.name}
                    </motion.h3>
                    <p className="card-text text-muted">
                      AI-powered {service.name.toLowerCase()} solutions for Haryana citizens
                    </p>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="btn btn-outline-primary"
                    >
                      Explore
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div> */}
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