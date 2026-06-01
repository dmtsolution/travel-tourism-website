import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
              scrolled ? 'bg-primary-600 text-white' : 'bg-white/20 text-white backdrop-blur-sm'
            }`}>
              T
            </div>
            <span className={`font-display font-bold text-xl transition-colors ${
              scrolled ? 'text-primary-600' : 'text-white'
            }`}>
              TravelWorld
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? scrolled
                      ? 'bg-primary-50 text-primary-700'
                      : 'bg-white/20 text-white'
                    : scrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="w-px h-6 bg-gray-300/50 mx-2" />

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profil"
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    scrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {user.name}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    scrolled
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-red-200 hover:bg-white/10'
                  }`}
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    scrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    scrolled
                      ? 'btn-primary text-sm py-2'
                      : 'bg-white text-primary-600 hover:bg-white/90'
                  }`}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`rounded-2xl p-4 space-y-1 ${
            scrolled ? 'bg-white shadow-lg' : 'bg-white/10 backdrop-blur-md'
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(link.to)
                    ? scrolled ? 'bg-primary-50 text-primary-700' : 'bg-white/20 text-white'
                    : scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-200/50 my-2" />
            {user ? (
              <>
                <Link
                  to="/profil"
                  className={`block px-4 py-3 rounded-lg font-medium ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'}`}
                >
                  Mon Profil ({user.name})
                </Link>
                <button
                  onClick={logout}
                  className={`w-full text-left block px-4 py-3 rounded-lg font-medium ${scrolled ? 'text-red-600 hover:bg-red-50' : 'text-red-200 hover:bg-white/10'}`}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className={`block px-4 py-3 rounded-lg font-medium ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'}`}
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className={`block px-4 py-3 rounded-lg font-medium text-center ${
                    scrolled ? 'btn-primary' : 'bg-white text-primary-600'
                  }`}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
