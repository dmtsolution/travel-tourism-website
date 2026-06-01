import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './components/pages/Home.jsx'
import Services from './components/pages/Services.jsx'
import Login from './components/pages/Login.jsx'
import Register from './components/pages/Register.jsx'
import Contact from './components/pages/Contact.jsx'
import Profile from './components/pages/Profile.jsx'
import ScrollToTop from './hooks/ScrollToTop.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profil" element={<Profile />} />
        </Routes>
      </Layout>
    </>
  )
}
