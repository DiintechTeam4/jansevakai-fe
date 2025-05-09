import { motion, useInView } from 'framer-motion'
import { FaRobot, FaArrowRight } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'

const departments = [
  { name: 'Administrative Reforms Department', website: 'ard.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Archaeology Department', website: 'delhi.gov.in/departments-offices/archaeology-department', image: '/delhi_dept.jpg' },
  { name: 'Art, Culture and Language Department', website: 'delhi.gov.in/departments-offices/art-culture-language-department', image: '/delhi_dept.jpg' },
  { name: 'Delhi Archives Department', website: 'delhi.gov.in/departments-offices/delhi-archives-department', image: '/delhi_dept.jpg' },
  { name: 'Delhi Jal Board', website: 'delhijalboard.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Development Department', website: 'development.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Directorate of Education', website: 'edudel.nic.in', image: '/delhi_dept.jpg' },
  { name: 'Directorate of Employment', website: 'delhi.gov.in/departments-offices/directorate-employment', image: '/delhi_dept.jpg' },
  { name: 'Directorate of Training & Technical Education (DTTE)', website: 'dtte.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Drugs Control Department', website: 'delhi.gov.in/departments-offices/drugs-control-department', image: '/delhi_dept.jpg' },
  { name: 'Environment Department', website: 'environment.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Excise, Entertainment & Luxury Tax Department', website: 'delhi.gov.in/departments-offices/excise-entertainment-luxury-tax-department', image: '/delhi_dept.jpg' },
  { name: 'Finance Department', website: 'finance.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Food Safety Department', website: 'delhi.gov.in/departments-offices/food-safety-department', image: '/delhi_dept.jpg' },
  { name: 'Food, Supplies & Consumer Affairs Department', website: 'fsd.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'General Administration Department (GAD)', website: 'gad.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Health & Family Welfare Department', website: 'health.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Home Department', website: 'home.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Industries Department', website: 'delhi.gov.in/departments-offices/industries-department', image: '/delhi_dept.jpg' },
  { name: 'Information & Publicity Department', website: 'delhi.gov.in/departments-offices/information-publicity-department', image: '/delhi_dept.jpg' },
  { name: 'Labour Department', website: 'labour.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Land & Building Department', website: 'delhi.gov.in/departments-offices/land-building-department', image: '/delhi_dept.jpg' },
  { name: 'Law, Justice & Legislative Affairs Department', website: 'delhi.gov.in/departments-offices/law-justice-legislative-affairs-department', image: '/delhi_dept.jpg' },
  { name: 'Planning Department', website: 'delhi.gov.in/departments-offices/planning-department', image: '/delhi_dept.jpg' },
  { name: 'Power Department', website: 'power.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Prosecution Department', website: 'delhi.gov.in/departments-offices/prosecution-department', image: '/delhi_dept.jpg' },
  { name: 'Public Works Department (PWD)', website: 'pwddelhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Revenue Department', website: 'revenue.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Social Welfare Department', website: 'socialwelfare.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Tourism Department', website: 'delhi.gov.in/departments-offices/tourism-department', image: '/delhi_dept.jpg' },
  { name: 'Transport Department', website: 'transport.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Urban Development Department', website: 'udd.delhi.gov.in', image: '/delhi_dept.jpg' },
  { name: 'Women & Child Development Department', website: 'wcd.delhi.gov.in', image: '/delhi_dept.jpg' },
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

const DelhiAI = () => {
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
            alt="Delhi  AI" 
            style={{
              width: '100%',
              height: '60vh',
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
              {/* महाराष्ट्र AI */}
              Delhi  AI
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
              AI Powered Citizen Support For Delhi 
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white mb-3"
              style={{ fontSize: '1rem' }}
            >
              Revolutionizing Delhi  Government Services With Intelligent AI Solutions.
            </motion.p>
            <div className="d-flex gap-2 justify-content-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                style={{ fontSize: '0.9rem' }}
              >
                Get Started
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
                Learn More
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
            alt="Delhi  AI" 
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
              maxWidth: '600px',
            }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="display-2 fw-bold mb-4 text-white hero-title"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
              >
                {/* महाराष्ट्र AI */}
                Delhi  AI
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="display-6 fw-bold mb-4 text-white hero-subtitle"
                style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}
              >
                AI Powered Citizen Support For Delhi 
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h5 mb-4 text-white hero-text"
              >
                Revolutionizing Delhi  Government Services With Intelligent AI Solutions.
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
                  Learn More
                </motion.button>
              </div>
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
            Delhi Government Departments
          </motion.h2>
          <div className="row g-4" ref={gridRef}>
            {departments.map((department, index) => (
              <motion.div
                key={department.name}
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
                  className="card h-100 shadow-sm"
                >
                  <div className="card-body d-flex flex-column">
                    <motion.h3 
                      className="card-title h5 fw-bold"
                      whileHover={{ color: "#0d6efd" }}
                      transition={{ duration: 0.3 }}
                    >
                      {department.name}
                    </motion.h3>
                    
                    <div className="my-3">
                      <img 
                        src={department.image} 
                        alt={department.name}
                        className="img-fluid rounded" 
                        style={{ height: '100%', width: '100%', objectFit: 'fill' }}
                      />
                    </div>
                    
                    {/* <p className="card-text text-muted mt-2 mb-3">
                      <a href={`https://${department.website}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        🔗 {department.website}
                      </a>
                    </p> */}
                    
                    <motion.a
                      href={`https://${department.website}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="btn btn-outline-primary mt-auto d-flex align-items-center justify-content-center gap-2"
                    >
                      Visit Website <FaArrowRight />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Delhi  AI Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="display-5 fw-bold mb-4">About Delhi  AI</h2>
                <p className="lead mb-4">
                  Delhi  AI is dedicated to transforming government services across the state using cutting-edge artificial intelligence.
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

export default DelhiAI 