import { motion, useInView } from 'framer-motion'
import { FaRobot, FaArrowRight } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'

const states = [
  { name: 'UttarAI', image: '/img1.png' },
  { name: 'MahaAI', image: '/img2.png' },
  { name: 'MadhyaAI', image: '/img3.png' },
  { name: 'DelhiAI', image: '' },
  { name: 'GujaratAI', image: 'https://source.unsplash.com/random/300x200?ahmedabad' },
  { name: 'RajasthanAI', image: 'https://source.unsplash.com/random/300x200?jaipur' },
  { name: 'HaryanaAI', image: '' },
  { name: 'UttraAI', image: 'https://source.unsplash.com/random/300x200?lucknow' },
  { name: 'AssamAI', image: 'https://source.unsplash.com/random/300x200?kochi' },
  { name: 'ChattisgarhAI', image: 'https://source.unsplash.com/random/300x200?chandigarh' },
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

const Home = () => {
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
        <section className="position-relative" style={{height:"auto"}}>
          {/* Hero Image for Mobile */}
          <img 
            src="/image.png" 
            alt="Hero Background" 
            style={{
              width: '100%',
              height: '50vh',
              objectFit: 'fill',
            }}
          />
          
          {/* Hero Content Below Image in Mobile */}
          <div style={{
            backgroundColor: 'black',
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
              JansevakAI
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
              AI Powered Citizen Support For Bharat
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white mb-3"
              style={{ fontSize: '1rem' }}
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
        // Desktop Layout - Content overlaid on image
        <section className="position-relative" style={{height:"95vh", minHeight: "600px"}}>
          {/* Hero Background Image for Desktop */}
          <img 
            src="/INDIA_BANNER.jpg" 
            alt="Hero Background" 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '95vh',
              objectFit: 'fill',
              zIndex: 1
            }}
          />
          
          {/* Hero Content - Directly on the image for Desktop */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 5%'
          }}>
            <div style={{
              backgroundColor: 'transparent',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '500px',
            }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="display-2 fw-bold mb-4 text-white hero-title"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
              >
                JansevakAI
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="display-6 fw-bold mb-4 text-white hero-subtitle"
                style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}
              >
                AI Powered Citizen Support For Bharat
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
                  Get In Touch
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline-light btn-lg hero-btn"
                >
                  Try For Free
                </motion.button>
              </div>
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
            className="text-center mb-5 display-5 fw-bold"
          >
            State-wise AI Services
          </motion.h2>
          <div className="row g-4" ref={gridRef}>
            {states.map((state, index) => (
              <motion.div
                key={state.name}
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
                      src={state.image}
                      className="card-img-top object-fit-fill"
                      style={{ height: '50vh' }}
                      alt={state.name}
                    />
                  </motion.div>
                  <div className="card-body">
                    <motion.h3 
                      className="card-title h4"
                      whileHover={{ color: "#0d6efd" }}
                      transition={{ duration: 0.3 }}
                    >
                      {state.name}
                    </motion.h3>
                    <p className="card-text text-muted">
                      Discover AI solutions tailored for {state.name}
                    </p>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="btn btn-outline-primary"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 