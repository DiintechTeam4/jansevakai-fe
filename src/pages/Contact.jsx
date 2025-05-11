import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { useState, useEffect } from "react";

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt size={24} className="text-primary" />,
      title: "Address",
      content: "D-53, 2nd floor Noida Sector-2",
    },
    {
      icon: <FaPhone size={24} className="text-primary" />,
      title: "Phone",
      content: "+91 XXXXXXXXXX",
    },
    {
      icon: <FaEnvelope size={24} className="text-primary" />,
      title: "Email",
      content: "info@jansevak.com",
    },
    {
      icon: <FaClock size={24} className="text-primary" />,
      title: "Working Hours",
      content: "Mon - Fri: 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <div className="w-100">
      {/* Hero Section */}
      {isMobile ? (
        // Mobile Layout - Stacked (image on top, content below)
        <section className="position-relative" style={{height:"auto"}}>
          {/* Hero Image for Mobile */}
          <img 
            src="/image.png" 
            alt="Contact Hero" 
            style={{
              width: '100%',
              height: '50vh',
              objectFit: 'cover',
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
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white mb-3"
              style={{ fontSize: '1rem' }}
            >
              We're here to help you. Get in touch with us today.
            </motion.p>
          </div>
        </section>
      ) : (
        // Desktop Layout - Content overlaid on image
        <section className="position-relative" style={{height:"95vh", minHeight: "500px"}}>
          {/* Hero Background Image for Desktop */}
          <img 
            src="/INDIA_BANNER.jpg" 
            alt="Contact Hero" 
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
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '2.5rem',
              borderRadius: '8px',
              maxWidth: '600px',
              textAlign: 'center'
            }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="display-4 fw-bold mb-4 text-white"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
              >
                Contact Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h5 mb-4 text-white"
              >
                We're here to help you. Get in touch with us today.
              </motion.p>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="col-md-4"
            >
              <div className=" border-0 shadow-sm" style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                backdropFilter: 'blur(10px)',
                height: '100%',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <div className="card-body p-4">
                  <h2 className="h4 fw-bold mb-4 text-white">Contact Information</h2>
                  <div className="d-flex flex-column gap-4">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="d-flex align-items-start gap-3"
                      >
                        <div className="mt-1">{info.icon}</div>
                        <div>
                          <h3 className="h6 fw-bold mb-1 text-white">{info.title}</h3>
                          <p className="text-white-50 mb-0">{info.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="col-md-8"
            >
              <div className=" border-0 shadow-sm" style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                backdropFilter: 'blur(10px)',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <div className="card-body p-4">
                  <h2 className="h4 fw-bold mb-4 text-white">Send us a Message</h2>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            id="name"
                            placeholder="Your Name"
                          />
                          <label htmlFor="name" className="text-white-50">Your Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control bg-dark text-white border-secondary"
                            id="email"
                            placeholder="Your Email"
                          />
                          <label htmlFor="email" className="text-white-50">Your Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            id="subject"
                            placeholder="Subject"
                          />
                          <label htmlFor="subject" className="text-white-50">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control bg-dark text-white border-secondary"
                            id="message"
                            placeholder="Your Message"
                            style={{ height: "150px" }}
                          ></textarea>
                          <label htmlFor="message" className="text-white-50">Your Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn btn-primary btn-lg w-100"
                          type="submit"
                          style={{ 
                            backgroundColor: '#ff8c00',
                            borderColor: '#ff8c00',
                            color: 'white',
                            fontWeight: '600'
                          }}
                        >
                          Send Message
                        </motion.button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="ratio ratio-21x9 rounded-3 overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5953603175503!2d77.31287667495492!3d28.581911086378625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4594dba18af%3A0x1db81df5ca570f05!2s41%2C%20Red%20FM%20Road%2C%20D%20Block%2C%20Sector%202%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1746534329263!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
