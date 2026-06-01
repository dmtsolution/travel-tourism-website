import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './components/pages/Home.jsx'
import Services from './components/pages/Services.jsx'
import Login from './components/pages/Login.jsx'
import Register from './components/pages/Register.jsx'
import Contact from './components/pages/Contact.jsx'
import Profile from './components/pages/Profile.jsx'
import DestinationDetail from './components/pages/destinations/DestinationDetail.jsx'
import MentionsLegales from './components/pages/legal/MentionsLegales.jsx'
import CGU from './components/pages/legal/CGU.jsx'
import Confidentialite from './components/pages/legal/Confidentialite.jsx'
import Cookies from './components/pages/legal/Cookies.jsx'
import ScrollToTop from './hooks/ScrollToTop.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/destination/:slug" element={<DestinationDetail />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
      </Layout>
    </>
  )
}
