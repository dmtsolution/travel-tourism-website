const STORAGE_KEY = 'travel_reservations'

function getAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveAll(reservations) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
}

/**
 * Check if a user has already booked a specific destination
 */
export function isAlreadyBooked(userId, destinationId) {
  const reservations = getAll()
  return reservations.some(
    r => r.userId === userId && r.destinationId === destinationId
  )
}

/**
 * Get all reservations for a specific user
 */
export function getUserReservations(userId) {
  const reservations = getAll()
  return reservations
    .filter(r => r.userId === userId)
    .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
}

/**
 * Book a destination for a user
 * Returns the new reservation or null if already booked
 */
export function bookDestination(userId, destination, details = {}) {
  if (isAlreadyBooked(userId, destination.id)) {
    return null
  }

  const reservation = {
    id: Date.now(),
    userId,
    destinationId: destination.id,
    destination: destination.title,
    country: destination.country,
    city: destination.city,
    slug: destination.slug,
    price: destination.price,
    duration: destination.duration,
    image: destination.image,
    status: 'confirmée',
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

/**
 * Cancel a reservation by id (only if same user)
 */
export function cancelReservation(userId, reservationId) {
  const reservations = getAll()
  const idx = reservations.findIndex(
    r => r.id === reservationId && r.userId === userId
  )
  if (idx === -1) return false
  reservations.splice(idx, 1)
  saveAll(reservations)
  return true
}
