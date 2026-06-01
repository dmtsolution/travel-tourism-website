import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext.jsx'
import { getDestinationBySlug } from '../../../db/database.jsx'
import { bookDestination, isAlreadyBooked } from '../../../db/reservations.jsx'

const categoryLabels = { aventure: 'Aventure', culture: 'Culture', detente: 'Detente' }

const inclusions = [
  { icon: 'M5 13l4 4L19 7', label: 'Vol aller-retour inclus' },
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Hebergement 4 etoiles' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', label: 'Guide francophone' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Assurance voyage' },
]

const itinerary = [
  { day: 'Jour 1', title: 'Arrivee & Installation', description: 'Accueil a l\'aeroport, transfert a l\'hotel. Installation et temps libre.' },
  { day: 'Jour 2', title: 'Decouverte guidee', description: 'Visite guidee des principaux sites touristiques avec un guide local francophone.' },
  { day: 'Jour 3', title: 'Activites & Excursions', description: 'Journee d\'activites : randonnee, plongee, visite culturelle...' },
  { day: 'Jour 4', title: 'Temps libre & Shopping', description: 'Matinee libre. Preparation des valises.' },
  { day: 'Jour 5', title: 'Dernieres decouvertes', description: 'Dernieres visites et photos souvenirs. Transfert vers l\'aeroport.' },
]

export default function DestinationDetail() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [destination, setDestination] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [showBooking, setShowBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [alreadyBooked, setAlreadyBooked] = useState(false)

  useEffect(() => {
    const dest = getDestinationBySlug(slug)
    setDestination(dest || { notFound: true })
    if (dest && user) setAlreadyBooked(isAlreadyBooked(user.id, dest.id))
    window.scrollTo(0, 0)
  }, [slug, user])

  if (destination?.notFound) return <Navigate to="/services" replace />
  if (!destination) return null

  const handleBooking = (e) => {
    e.preventDefault()
    if (!user) { window.location.href = '/connexion'; return }
    const formData = new FormData(e.target)
    const reservation = bookDestination(user.id, destination, {
      departureDate: formData.get('departureDate'),
      travelers: formData.get('travelers'),
      travelerName: formData.get('travelerName'),
      travelerEmail: formData.get('travelerEmail'),
    })
    if (reservation) { setBookingSuccess(true); setAlreadyBooked(true); setTimeout(() => setShowBooking(false), 2500) }
  }

  return (
    <div>
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={destination.image} alt={destination.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <Link to="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Retour aux destinations
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">{categoryLabels[destination.category] || destination.category}</span>
              <div className="flex items-center gap-1 text-white/90">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-sm font-medium">{destination.rating}</span>
              </div>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-2">{destination.title}</h1>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <span>{destination.city}, {destination.country}</span>
              <span>{destination.duration} jours</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex gap-1 mb-8 border-b border-gray-200">
                {[{ key: 'overview', label: 'Apercu' }, { key: 'itinerary', label: 'Itineraire' }, { key: 'inclusions', label: 'Inclus' }].map((tab) => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-3 font-medium text-sm transition-all border-b-2 -mb-px ${activeTab === tab.key ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">A propos de ce voyage</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">{destination.description}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Duree', value: `${destination.duration} jours`, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                      { label: 'Destination', value: destination.country, icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                      { label: 'Note', value: `${destination.rating}/5`, icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                      { label: 'Type', value: categoryLabels[destination.category] || destination.category, icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center">
                        <svg className="w-6 h-6 mx-auto mb-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                        <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                        <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Itineraire detaille</h2>
                  <div className="space-y-6">
                    {itinerary.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                          {i < itinerary.length - 1 && <div className="w-0.5 flex-1 bg-primary-200 mt-2" />}
                        </div>
                        <div className="pb-6">
                          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">{item.day}</span>
                          <h3 className="font-display font-bold text-lg text-gray-900 mt-1">{item.title}</h3>
                          <p className="text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Ce qui est inclus</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {inclusions.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                        <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 mb-1">A partir de</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-display font-bold text-primary-600">{destination.price}</span>
                    <span className="text-lg text-gray-500">EUR</span>
                  </div>
                  <p className="text-sm text-gray-500">par personne</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>{destination.duration} jours / {destination.duration - 1} nuits</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    <span>{destination.city}, {destination.country}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    <span>{destination.rating} / 5</span>
                  </div>
                </div>

                {alreadyBooked ? (
                  <div className="w-full py-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold text-center flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Deja reserve
                  </div>
                ) : user ? (
                  <button onClick={() => setShowBooking(true)} className="btn-primary w-full py-3.5 text-lg">Reserver maintenant</button>
                ) : (
                  <Link to="/connexion" className="block w-full btn-primary py-3.5 text-center">Se connecter pour reserver</Link>
                )}

                <p className="text-center text-xs text-gray-400 mt-3">Annulation gratuite 48h avant le depart.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button onClick={() => { setShowBooking(false); setBookingSuccess(false); }} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Reservation confirmee !</h3>
                <p className="text-gray-600 text-sm mb-4">Enregistree avec succes.</p>
                <Link to="/profil" className="btn-primary inline-flex px-6 py-2.5">Voir mes reservations</Link>
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-1">Reserver ce voyage</h3>
                <p className="text-gray-500 text-sm mb-6">{destination.title}</p>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div><label className="label">Nom complet</label><input type="text" name="travelerName" required placeholder="Jean Dupont" className="input-field" defaultValue={user?.name || ''} /></div>
                  <div><label className="label">Email</label><input type="email" name="travelerEmail" required placeholder="votre@email.com" className="input-field" defaultValue={user?.email || ''} /></div>
                  <div><label className="label">Date de depart</label><input type="date" name="departureDate" required className="input-field" /></div>
                  <div><label className="label">Nombre de voyageurs</label><select name="travelers" className="input-field"><option value="1">1 personne</option><option value="2">2 personnes</option><option value="3">3 personnes</option><option value="4">4 personnes</option><option value="5">5+ personnes</option></select></div>
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-primary-600">{destination.price} EUR</span></div>
                  </div>
                  <button type="submit" className="btn-primary w-full py-3.5">Confirmer la reservation</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
