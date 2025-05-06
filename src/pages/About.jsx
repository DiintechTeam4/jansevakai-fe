import { motion } from 'framer-motion'
import { FaRobot, FaUsers, FaChartLine, FaGlobeAsia } from 'react-icons/fa'

const About = () => {
  const features = [
    {
      icon: <FaRobot size={40} className="text-primary" />,
      title: "AI-Powered Solutions",
      description: "Leveraging cutting-edge artificial intelligence to transform governance and citizen services."
    },
    {
      icon: <FaUsers size={40} className="text-primary" />,
      title: "Citizen-Centric Approach",
      description: "Designing solutions that prioritize citizen needs and improve service delivery."
    },
    {
      icon: <FaChartLine size={40} className="text-primary" />,
      title: "Data-Driven Insights",
      description: "Utilizing data analytics to make informed decisions and optimize service delivery."
    },
    {
      icon: <FaGlobeAsia size={40} className="text-primary" />,
      title: "Pan-India Coverage",
      description: "Extending our services across all states to ensure comprehensive coverage."
    }
  ]

  return (
    <div className="w-100">
      {/* Hero Section */}
      <section className="position-relative bg-dark text-white" style={{ minHeight: '90vh' }}>
        <div className="position-absolute top-25 end-0 p-5" style={{ maxWidth: "600px" }}>
          <div className="bg-opacity-75 p-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="display-2 fw-bold mb-4"
            >
              About JansevakAI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h5 mb-4"
            >
              Transform governance with advanced AI solutions tailored for all 50 states. Improve efficiency, transparency, and citizen engagement while empowering state governments with cutting-edge technology designed for public service innovation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="display-5 fw-bold mb-4">Our Mission</h2>
                <p className="lead mb-4">
                  To revolutionize governance in India by leveraging artificial intelligence to create efficient, transparent, and citizen-friendly services.
                </p>
                <p className="mb-4">
                  We believe in harnessing the power of technology to bridge the gap between citizens and government services, making them more accessible and efficient.
                </p>
              </motion.div>
            </div>
            <div className="col-md-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="ratio ratio-16x9"
              >
                <img
                  src="/about-mission.jpg"
                  alt="Our Mission"
                  className="rounded-3 object-fit-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-5 bg-light">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center display-5 fw-bold mb-5"
          >
            Our Key Features
          </motion.h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="col-md-6 col-lg-3"
              >
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">{feature.icon}</div>
                    <h3 className="h5 fw-bold mb-3">{feature.title}</h3>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center display-5 fw-bold mb-5"
          >
            Our Team
          </motion.h2>
          <div className="row g-4">
            {[1, 2, 3, 4].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="col-md-6 col-lg-3"
              >
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="ratio ratio-1x1 rounded-circle overflow-hidden mb-3 mx-auto" style={{ maxWidth: '150px' }}>
                      <img
                        src={`/team-${member}.jpg`}
                        alt={`Team Member ${member}`}
                        className="object-fit-cover"
                      />
                    </div>
                    <h3 className="h5 fw-bold mb-2">Team Member {member}</h3>
                    <p className="text-muted mb-0">Position</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
