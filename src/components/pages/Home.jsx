import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../ui/HeroSection.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import DestinationCard from '../ui/DestinationCard.jsx'
import ServiceCard from '../ui/ServiceCard.jsx'
import { getFeaturedDestinations } from '../../db/database.js'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Voyages Sur Mesure',
    description: 'Créez votre voyage idéal avec nos experts. Itinéraires personnalisés, hébergements sélectionnés et activités adaptées à vos envies.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Hôtels d\'Exception',
    description: 'Des hébergements soigneusement sélectionnés pour leur confort, leur authenticité et leur emplacement privilégié.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Circuits Guidés',
    description: 'Explorez les merveilles du monde avec nos guides locaux passionnés. Des circuits riches en découvertes et en émotions.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Activités & Aventures',
    description: 'Plongée, randonnée, safari... Vivez des expériences uniques et fortes en adrénaline avec nos partenaires de confiance.',
  },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80', alt: 'Tourisme mondial', caption: 'Destinations de rêve' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', alt: 'Voyage en nature', caption: 'Nature sauvage' },
  { src: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80', alt: 'Aventure tropicale', caption: 'Aventures tropicales' },
  { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80', alt: 'Road trip', caption: 'Road trips' },
  { src: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=600&q=80', alt: 'Coucher de soleil', caption: 'Coucher de soleil' },
  { src: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&q=80', alt: 'Montagnes', caption: 'Montagnes majestueuses' },
]

export default function Home() {
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    setDestinations(getFeaturedDestinations())
  }, [])

  return (
    <div>
      <HeroSection />

      {/* Services */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Nos Services"
            subtitle="Tout ce dont vous avez besoin pour des vacances parfaites, de la conception au retour."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Destinations Populaires"
            subtitle="Découvrez les destinations préférées de nos voyageurs. Des lieux magiques qui vous attendent."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {destinations.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary text-lg px-8 py-4">
              Voir toutes nos destinations
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Galerie Photos"
            subtitle="Laissez-vous inspirer par ces magnifiques destinations qui n'attendent que vous."
            light
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative group overflow-hidden rounded-2xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${i === 0 ? 'h-64 md:h-full' : 'h-48 md:h-64'}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-display font-semibold text-lg">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 md:p-16 text-white shadow-2xl">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Prêt à vivre l'aventure ?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
              Contactez nos experts et commencez à planifier votre prochain voyage de rêve. Devis gratuit et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-accent text-lg px-8 py-4">
                Demander un devis
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300">
                Explorer les destinations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
