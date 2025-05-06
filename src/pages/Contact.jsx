import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const Contact = () => {
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
      <section className="position-relative bg-dark text-white" style={{ minHeight: '90vh' }}>
        <div
          className="position-absolute top-25 end-0 p-5"
          style={{ maxWidth: "600px" }}
        >
          <div className="bg-opacity-75 p-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="display-2 fw-bold mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h5 mb-4"
            >
              We're here to help you. Get in touch with us today.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="col-md-4"
            >
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h2 className="h4 fw-bold mb-4">Contact Information</h2>
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
                          <h3 className="h6 fw-bold mb-1">{info.title}</h3>
                          <p className="text-muted mb-0">{info.content}</p>
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
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h2 className="h4 fw-bold mb-4">Send us a Message</h2>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                          />
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                          />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="message"
                            placeholder="Your Message"
                            style={{ height: "150px" }}
                          ></textarea>
                          <label htmlFor="message">Your Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn btn-primary btn-lg w-100"
                          type="submit"
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
      <section className="py-5 bg-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="ratio ratio-21x9 rounded-3 overflow-hidden"
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
