import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MahaAI from './pages/MahaAI'
import ScrollToTop from './components/ScrollToTop'
import HaryanaAI from './pages/HaryanaAI'
import UttarAI from './pages/UttarAI'
import MadhyaAI from './pages/MadhyaAI'
import DelhiAI from './pages/DelhiAI'
import AssamAI from './pages/AssamAI'
import GujaratAI from './pages/GujaratAI'
import RajasthanAI from './pages/RajasthanAI'
import ChattisgarhAI from './pages/Chattisgarh'
import UttraAI from './pages/UttraAI'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/maharashtra" element={<MahaAI />} />
            <Route path="/haryana" element={<HaryanaAI />} />
            <Route path="/uttar" element={<UttarAI />} />
            <Route path="/madhya" element={<MadhyaAI />} />
            <Route path="/delhi" element={<DelhiAI/>} />
            <Route path="/assam" element={<AssamAI />} />
            <Route path="/gujarat" element={<GujaratAI />} />
            <Route path="/rajasthan" element={<RajasthanAI />} />
            <Route path="/chattisgarh" element={<ChattisgarhAI />} />
            <Route path="/uttra" element={<UttraAI />} />


          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
