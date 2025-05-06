import { motion, useInView } from 'framer-motion'
import { FaRobot, FaArrowRight } from 'react-icons/fa'
import { useRef } from 'react'

const states = [
  { name: 'UttarAI', image: 'https://source.unsplash.com/random/300x200?mumbai' },
  { name: 'MahaAI', image: 'https://source.unsplash.com/random/300x200?bangalore' },
  { name: 'MadhyaAI', image: 'https://source.unsplash.com/random/300x200?chennai' },
  { name: 'DelhiAI', image: 'https://source.unsplash.com/random/300x200?delhi' },
  { name: 'GujaratAI', image: 'https://source.unsplash.com/random/300x200?ahmedabad' },
  { name: 'RajasthanAI', image: 'https://source.unsplash.com/random/300x200?jaipur' },
  { name: 'HaryanaAI', image: 'https://source.unsplash.com/random/300x200?kolkata' },
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
      stiffness: 100
    }
  }),
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300
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

  return (
    <div className="w-100">
      {/* Hero Section */}
      <section className="position-relative vh-100 bg-dark text-white">
  <div className="position-absolute top-25 end-0 p-5" style={{ maxWidth: "600px" }}>
    <div className=" bg-opacity-75 p-4">
    <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="display-2 fw-bold mb-4"
      >
        JansevakAI
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="display-6 fw-bold mb-4"
      >
        AI Powered Citizen Support For Bharat
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h5 mb-4"
      >
        Revolutionizing Government Services With Intelligent AI Solutons.
        
      </motion.p>
      <div className="d-flex gap-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary btn-lg"
        >
          Get In Touch
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline-light btn-lg"
        >
          Try For Free
        </motion.button>
      </div>
    </div>
  </div>
</section>


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
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <img
                      src={state.image}
                      className="card-img-top object-fit-cover"
                      style={{ height: '200px' }}
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