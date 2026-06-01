// Database module - uses localStorage as primary storage
// sql.js is loaded lazily only if needed

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const FALLBACK_DESTINATIONS = [
  { id: 1, slug: 'safari-kenya', title: 'Safari au Kenya', country: 'Kenya', city: 'Nairobi', description: 'Découvrez la grande migration des gnous et des zèbres dans la réserve nationale du Masaï Mara. Une aventure inoubliable au cœur de la savane africaine avec des guides expérimentés. Ce safari de 10 jours vous emmènera à travers les paysages les plus spectaculaires du Kenya.', price: 2499, duration: 10, category: 'aventure', rating: 4.8, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', featured: 1 },
  { id: 2, slug: 'paris-romantique', title: 'Paris Romantique', country: 'France', city: 'Paris', description: 'Week-end en amoureux à Paris : Tour Eiffel, croisière sur la Seine, dîner gastronomique et visite du Louvre. La ville lumière vous accueille pour un séjour inoubliable de 4 jours.', price: 599, duration: 4, category: 'culture', rating: 4.7, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', featured: 1 },
  { id: 3, slug: 'plages-thailande', title: 'Plages de Thaïlande', country: 'Thaïlande', city: 'Phuket', description: 'Relaxation sur les plus belles plages du monde. Snorkeling, massages traditionnels, cuisine locale et couchers de soleil spectaculaires pendant 12 jours de pur bonheur.', price: 1899, duration: 12, category: 'detente', rating: 4.9, image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80', featured: 1 },
  { id: 4, slug: 'temples-japon', title: 'Temples du Japon', country: 'Japon', city: 'Kyoto', description: 'Immersion dans la culture japonaise traditionnelle. Visite des temples, cérémonie du thé, jardins zen et découverte de la gastronomie locale lors de ce voyage de 14 jours.', price: 3299, duration: 14, category: 'culture', rating: 4.9, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', featured: 1 },
  { id: 5, slug: 'trek-andes', title: 'Trek dans les Andes', country: 'Pérou', city: 'Cusco', description: 'Trekking vers le Machu Picchu à travers les paysages spectaculaires des Andes péruviennes. Une aventure unique et mythique de 12 jours.', price: 2799, duration: 12, category: 'aventure', rating: 4.8, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80', featured: 1 },
  { id: 6, slug: 'maldives-luxe', title: 'Lune de miel aux Maldives', country: 'Maldives', city: 'Malé', description: 'Luxe et détente dans un resort 5 étoiles sur pilotis. Eaux cristallines, spa, plongée sous-marine et moments inoubliables à deux pendant 10 jours.', price: 4599, duration: 10, category: 'detente', rating: 5.0, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', featured: 1 },
  { id: 7, slug: 'road-trip-islande', title: 'Road trip Islande', country: 'Islande', city: 'Reykjavik', description: 'Découvrez les paysages spectaculaires de l\'Islande : cascades, geysers, aurores boréales et bains thermaux naturels lors de ce road trip de 8 jours.', price: 2199, duration: 8, category: 'aventure', rating: 4.6, image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80', featured: 0 },
  { id: 8, slug: 'safari-tanzanie', title: 'Safari Photo Tanzanie', country: 'Tanzanie', city: 'Arusha', description: 'Safari photographique au Serengeti et au cratère du Ngorongoro. Guides professionnels et équipement inclus pour 11 jours d\'observation.', price: 3499, duration: 11, category: 'aventure', rating: 4.7, image: 'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?w=800&q=80', featured: 0 },
  { id: 9, slug: 'venise-gondole', title: 'Venise en Gondole', country: 'Italie', city: 'Venise', description: 'Découvrez la magie de Venise : balade en gondole, Saint-Marc, Murano, Burano et la gastronomie italienne authentique en 5 jours.', price: 899, duration: 5, category: 'culture', rating: 4.5, image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80', featured: 0 },
  { id: 10, slug: 'croisieres-caraibes', title: 'Croisière Caraïbes', country: 'Caraïbes', city: 'La Havane', description: 'Croisière de rêve dans les Caraïbes : plages de sable blanc, eaux turquoise, snorkeling et fêtes tropicales pendant 9 jours.', price: 2999, duration: 9, category: 'detente', rating: 4.6, image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80', featured: 0 },
  { id: 11, slug: 'laponie-hiver', title: 'Laponie en Hiver', country: 'Finlande', city: 'Rovaniemi', description: 'Aventure arctique : chiens de traîneau, aurores boréales, rencontre avec le Père Noël et nuit dans un igloo de verre. 7 jours magiques.', price: 2699, duration: 7, category: 'aventure', rating: 4.8, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80', featured: 0 },
  { id: 12, slug: 'marrakech-authentique', title: 'Marrakech Authentique', country: 'Maroc', city: 'Marrakech', description: 'Plongez dans l\'ambiance envoûtante de Marrakech : souks, palais, jardin Majorelle, hammam traditionnel et cuisine marocaine en 6 jours.', price: 799, duration: 6, category: 'culture', rating: 4.4, image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80', featured: 0 },
]

// ---------- localStorage-based user store ----------

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('travel_users') || '[]')
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem('travel_users', JSON.stringify(users))
}

// ---------- Public API ----------

export async function initializeDB() {
  // Ensure users array exists
  if (!localStorage.getItem('travel_users')) {
    localStorage.setItem('travel_users', JSON.stringify([]))
  }
  // Try to load sql.js lazily - but don't block on it
  trySqlite()
  return null
}

async function trySqlite() {
  // Fire and forget - sql.js won't block rendering
  try {
    const initSqlJs = (await import('sql.js')).default
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })
    console.log('sql.js loaded successfully (async)')
  } catch {
    console.log('sql.js not available, using localStorage fallback')
  }
}

export function createUser({ name, email, password, role = 'client' }) {
  const users = getUsers()
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name, email, password, role,
    created_at: new Date().toISOString()
  }
  users.push(newUser)
  saveUsers(users)
  return newUser
}

export function getUserByEmail(email) {
  const users = getUsers()
  return users.find(u => u.email === email) || null
}

export function getUserById(id) {
  const users = getUsers()
  return users.find(u => u.id === id) || null
}

export function updateUser(id, data) {
  const users = getUsers()
  const idx = users.findIndex(u => u.id === id)
  if (idx === -1) return null
  if (data.name) users[idx].name = data.name
  if (data.email) users[idx].email = data.email
  if (data.password) users[idx].password = data.password
  saveUsers(users)
  return users[idx]
}

export function getDestinations(category = null) {
  if (category && category !== 'all') {
    return FALLBACK_DESTINATIONS.filter(d => d.category === category)
  }
  return [...FALLBACK_DESTINATIONS]
}

export function getFeaturedDestinations() {
  return FALLBACK_DESTINATIONS.filter(d => d.featured === 1).slice(0, 4)
}

export function getDestinationById(id) {
  return FALLBACK_DESTINATIONS.find(d => d.id === id) || null
}

export function getDestinationBySlug(slug) {
  return FALLBACK_DESTINATIONS.find(d => d.slug === slug) || null
}
