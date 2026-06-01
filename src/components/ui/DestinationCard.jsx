import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { isAlreadyBooked } from '../../db/reservations.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.jsx'

const categoryStyles = {
  aventure: { badge: 'bg-green-100 text-green-700', label: 'Aventure' },
  culture: { badge: 'bg-purple-100 text-purple-700', label: 'Culture' },
  detente: { badge: 'bg-blue-100 text-blue-700', label: 'Detente' },
}

function getCategoryStyle(category) {
  if (category === 'aventure') return categoryStyles.aventure
  if (category === 'culture') return categoryStyles.culture
  if (category === 'detente') return categoryStyles.detente
  return { badge: 'bg-gray-100 text-gray-700', label: category }
}

export default function DestinationCard({ destination, index = 0 }) {
  const [ref, isVisible] = useScrollReveal(0.1)
  const { user } = useAuth()
  const cat = getCategoryStyle(destination.category)
  const alreadyBooked = user ? isAlreadyBooked(user.id, destination.id) : false

  return (
    <div ref={ref} className={`card card-hover group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 100}ms` }}>
      <div className="relative h-56 overflow-hidden">
        <img src={destination.image} alt={destination.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${cat.badge}`}>{cat.label}</span>
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
          <span className="text-primary-600 font-bold text-lg">{destination.price}€</span>
          <span className="text-gray-500 text-xs"> /pers.</span>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          <span className="text-white text-sm font-medium">{destination.rating}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {destination.city}, {destination.country}
          <span className="mx-1">•</span>
          <span>{destination.duration} jours</span>
        </div>
        <h3 className="font-display font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">{destination.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{destination.description}</p>
        {alreadyBooked ? (
          <div className="w-full py-2.5 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold text-sm text-center flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Deja reserve
          </div>
        ) : (
          <Link to={`/destination/${destination.slug}`} className="block w-full btn-primary text-sm py-2.5 text-center">Voir les details</Link>
        )}
      </div>
    </div>
  )
}
