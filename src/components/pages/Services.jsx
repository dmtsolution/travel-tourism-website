import { useEffect, useState } from 'react'
import DestinationCard from '../ui/DestinationCard.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import { getDestinations } from '../../db/database.js'

const categories = [
  { key: 'all', label: 'Toutes', icon: '🌍' },
  { key: 'aventure', label: 'Aventure', icon: '🏔️' },
  { key: 'culture', label: 'Culture', icon: '🏛️' },
  { key: 'detente', label: 'Détente', icon: '🏖️' },
]

export default function Services() {
  const [destinations, setDestinations] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setDestinations(getDestinations(activeCategory))
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [activeCategory])

  return (
    <div>
      {/* Page Header */}
      <section className="relative py-20 md:py-28 bg-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-primary-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
            🌍 Notre Catalogue Complet
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Nos Destinations
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Explorez notre sélection de destinations soigneusement choisies pour vous offrir des expériences de voyage exceptionnelles.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Choisissez votre aventure"
            subtitle="Filtrez par catégorie pour trouver la destination parfaite."
          />

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-56 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : destinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {destinations.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                Aucune destination trouvée
              </h3>
              <p className="text-gray-600">
                Essayez une autre catégorie ou contactez-nous pour un voyage sur mesure.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
