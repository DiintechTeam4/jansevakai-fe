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
import Admindashboard from './pages/Admindashboard'
import Clientdashboard from './pages/Clientdashboard'

function App() {
  return (
    <>
    <Router>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<><Header /><Home /><Footer /></>} />
            <Route path="/about" element={<><Header /><About /><Footer /></>} />
            <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/maharashtra" element={<><Header /><MahaAI /><Footer /></>} />
            <Route path="/haryana" element={<><Header /><HaryanaAI /><Footer /></>} />
            <Route path="/uttar" element={<><Header /><UttarAI /><Footer /></>} />
            <Route path="/madhya" element={<MadhyaAI />} />
            <Route path="/delhi" element={<><Header /><DelhiAI /><Footer /></>} />
            <Route path="/assam" element={<><Header /><AssamAI /><Footer /></>} />
            <Route path="/gujarat" element={<><Header /><GujaratAI /><Footer /></>} />
            <Route path="/rajasthan" element={<><Header /><RajasthanAI /><Footer /></>} />
            <Route path="/chattisgarh" element={<><Header /><ChattisgarhAI /><Footer /></>} />
            <Route path="/uttra" element={<><Header /><UttraAI /><Footer /></>} />
            <Route path="/admindashboard" element={<Admindashboard />} />
            <Route path="/clientdashboard" element={<Clientdashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
    
    </>
  )
}

export default App
