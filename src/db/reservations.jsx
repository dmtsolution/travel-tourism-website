const STORAGE_KEY = 'travel_reservations'

function getAll() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveAll(reservations) { localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations)) }

export function isAlreadyBooked(userId, destinationId) {
  return getAll().some(r => r.userId === userId && r.destinationId === destinationId)
}

export function getUserReservations(userId) {
  return getAll().filter(r => r.userId === userId).sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
}

export function bookDestination(userId, destination, details = {}) {
  if (isAlreadyBooked(userId, destination.id)) return null
  const reservation = {
    id: Date.now(),
    userId,
    destinationId: destination.id,
    destination: destination.title,
    country: destination.country,
    slug: destination.slug,
    price: destination.price,
    duration: destination.duration,
    image: destination.image,
    status: 'confirmee',
    bookedAt: new Date().toISOString(),
    departureDate: details.departureDate || null,
    travelers: details.travelers || 1,
    travelerName: details.travelerName || '',
    travelerEmail: details.travelerEmail || '',
  }
  const reservations = getAll()
  reservations.push(reservation)
  saveAll(reservations)
  return reservation
}

export function cancelReservation(userId, reservationId) {
  const reservations = getAll()
  const idx = reservations.findIndex(r => r.id === reservationId && r.userId === userId)
  if (idx === -1) return false
  reservations.splice(idx, 1)
  saveAll(reservations)
  return true
}
