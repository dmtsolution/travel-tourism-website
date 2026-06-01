import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const mockReservations = [
  {
    id: 1,
    destination: 'Safari au Kenya',
    country: 'Kenya',
    date: '2025-03-15',
    status: 'confirmée',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=200&q=80',
  },
  {
    id: 2,
    destination: 'Paris Romantique',
    country: 'France',
    date: '2025-06-20',
    status: 'en attente',
    price: 599,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&q=80',
  },
  {
    id: 3,
    destination: 'Plages de Thaïlande',
    country: 'Thaïlande',
    date: '2024-12-10',
    status: 'terminée',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=200&q=80',
  },
]

function getStatusClass(status) {
  if (status === 'confirmée') return 'bg-green-100 text-green-700'
  if (status === 'en attente') return 'bg-yellow-100 text-yellow-700'
  if (status === 'terminée') return 'bg-gray-100 text-gray-600'
  if (status === 'annulée') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-600'
}

export default function Profile() {
  const { user, loading, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: '', email: '' })
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email })
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/connexion" replace />
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setUpdateSuccess(false)
  }

  const handleSave = () => {
    try {
      updateProfile(form)
      setEditing(false)
      setUpdateSuccess(true)
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900">Mon Profil</h1>
          <p className="text-gray-600 mt-2">Gérez vos informations personnelles et consultez vos réservations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-3xl font-display font-bold shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="font-display font-bold text-xl text-gray-900">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold capitalize">
                {user.role}
              </span>
            </div>

            <div className="card p-6">
              <h3 className="font-display font-semibold text-gray-900 mb-4">Statistiques</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Réservations</span>
                  <span className="font-semibold text-gray-900">{mockReservations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Voyages terminés</span>
                  <span className="font-semibold text-gray-900">
                    {mockReservations.filter((r) => r.status === 'terminée').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Total dépensé</span>
                  <span className="font-semibold text-primary-600">
                    {mockReservations.reduce((sum, r) => sum + r.price, 0)}€
                  </span>
                </div>
              </div>
            </div>

            <div className="card p-4 space-y-2">
              <Link to="/services" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Explorer les destinations
              </Link>
              <Link to="/contact" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Nous contacter
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-xl text-gray-900">Informations personnelles</h3>
                {!editing && (
                  <button onClick={() => setEditing(true)} className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Modifier
                  </button>
                )}
              </div>

              {updateSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Profil mis à jour !
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="label">Nom complet</label>
                  {editing ? (
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  )}
                </div>
                <div>
                  <label className="label">Adresse email</label>
                  {editing ? (
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  )}
                </div>
                {editing && (
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} className="btn-primary px-6 py-2.5">Enregistrer</button>
                    <button onClick={() => { setEditing(false); setForm({ name: user.name, email: user.email }); }} className="btn-secondary px-6 py-2.5">Annuler</button>
                  </div>
                )}
              </div>
            </div>

            <div className="card p-8">
              <h3 className="font-display font-bold text-xl text-gray-900 mb-6">Historique des réservations</h3>
              <div className="space-y-4">
                {mockReservations.map((res) => (
                  <div key={res.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <img src={res.image} alt={res.destination} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{res.destination}</h4>
                      <p className="text-sm text-gray-500">{res.country} • {new Date(res.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900">{res.price}€</p>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(res.status)}`}>
                        {res.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
