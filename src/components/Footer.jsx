import { FaGithub, FaTwitter, FaLinkedin, FaRobot } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com' },
    { icon: FaTwitter, url: 'https://twitter.com' },
    { icon: FaLinkedin, url: 'https://linkedin.com' },
  ]

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="d-flex align-items-center mb-3"
            >
              <FaRobot size={24} className="me-2" />
              <h5 className="mb-0">JansevakAI</h5>
            </motion.div>
            <p className="text-muted">
              Empowering India with AI-driven solutions across all states. We provide cutting-edge artificial intelligence services tailored to meet the unique needs of each region.
            </p>
          </div>
          <div className="col-md-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="d-flex justify-content-center justify-content-md-end gap-3"
            >
              {socialLinks.map(({ icon: Icon, url }, index) => (
                <motion.a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-4 pt-3 border-top border-secondary"
        >
          <p className=" mb-0">
            &copy; {new Date().getFullYear()} JansevakAI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 