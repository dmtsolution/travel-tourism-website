// Fallback data - used if sql.js fails to load
const FALLBACK_DESTINATIONS = [
  { id: 1, title: 'Safari au Kenya', country: 'Kenya', city: 'Nairobi', description: 'Découvrez la grande migration des gnous et des zèbres dans la réserve nationale du Masaï Mara. Une aventure inoubliable au cœur de la savane africaine.', price: 2499, duration: 10, category: 'aventure', rating: 4.8, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', featured: 1 },
  { id: 2, title: 'Paris Romantique', country: 'France', city: 'Paris', description: 'Week-end en amoureux à Paris : Tour Eiffel, croisière sur la Seine, dîner gastronomique et visite du Louvre.', price: 599, duration: 4, category: 'culture', rating: 4.7, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', featured: 1 },
  { id: 3, title: 'Plages de Thaïlande', country: 'Thaïlande', city: 'Phuket', description: 'Relaxation sur les plus belles plages du monde. Snorkeling, massages traditionnels et couchers de soleil spectaculaires.', price: 1899, duration: 12, category: 'detente', rating: 4.9, image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80', featured: 1 },
  { id: 4, title: 'Temples du Japon', country: 'Japon', city: 'Kyoto', description: 'Immersion dans la culture japonaise traditionnelle. Visite des temples, cérémonie du thé, jardins zen et gastronomie locale.', price: 3299, duration: 14, category: 'culture', rating: 4.9, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', featured: 1 },
  { id: 5, title: 'Trek dans les Andes', country: 'Pérou', city: 'Cusco', description: 'Trekking vers le Machu Picchu à travers les paysages spectaculaires des Andes péruviennes.', price: 2799, duration: 12, category: 'aventure', rating: 4.8, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80', featured: 0 },
  { id: 6, title: 'Maldives Luxueuses', country: 'Maldives', city: 'Malé', description: 'Luxe et détente dans un resort 5 étoiles sur pilotis. Eaux cristallines, spa et plongée sous-marine.', price: 4599, duration: 10, category: 'detente', rating: 5.0, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', featured: 1 },
  { id: 7, title: 'Road trip Islande', country: 'Islande', city: 'Reykjavik', description: 'Cascades, geysers, aurores boréales et bains thermaux naturels.', price: 2199, duration: 8, category: 'aventure', rating: 4.6, image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80', featured: 0 },
  { id: 8, title: 'Safari Tanzanie', country: 'Tanzanie', city: 'Arusha', description: 'Safari photographique au Serengeti et au cratère du Ngorongoro.', price: 3499, duration: 11, category: 'aventure', rating: 4.7, image: 'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?w=800&q=80', featured: 0 },
  { id: 9, title: 'Venise en Gondole', country: 'Italie', city: 'Venise', description: 'Balade en gondole, Saint-Marc, Murano, Burano et gastronomie italienne.', price: 899, duration: 5, category: 'culture', rating: 4.5, image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80', featured: 0 },
  { id: 10, title: 'Croisière Caraïbes', country: 'Caraïbes', city: 'La Havane', description: 'Croisière dans les Caraïbes : plages de sable blanc, eaux turquoise et snorkeling.', price: 2999, duration: 9, category: 'detente', rating: 4.6, image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80', featured: 0 },
  { id: 11, title: 'Laponie en Hiver', country: 'Finlande', city: 'Rovaniemi', description: 'Chiens de traîneau, aurores boréales et nuit dans un igloo de verre.', price: 2699, duration: 7, category: 'aventure', rating: 4.8, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80', featured: 0 },
  { id: 12, title: 'Marrakech Authentique', country: 'Maroc', city: 'Marrakech', description: 'Souks, palais, jardin Majelleh, hammam traditionnel et cuisine marocaine.', price: 799, duration: 6, category: 'culture', rating: 4.4, image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80', featured: 0 },
]

let db = null
let usingFallback = false

export async function initializeDB() {
  if (db) return db

  try {
    const initSqlJs = (await import('sql.js')).default
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })

    const saved = localStorage.getItem('travel_db_sqlite')
    if (saved) {
      try {
        const bytes = Uint8Array.from(atob(saved), (c) => c.charCodeAt(0))
        db = new SQL.Database(bytes)
        ensureSeeded()
        return db
      } catch {
        // corrupted, recreate
      }
    }

    db = new SQL.Database()
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'client',
        created_at TEXT DEFAULT (datetime('now'))
      )
    `)
    db.run(`
      CREATE TABLE IF NOT EXISTS destinations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        country TEXT NOT NULL,
        city TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        duration INTEGER NOT NULL,
        category TEXT NOT NULL,
        rating REAL DEFAULT 4.5,
        image TEXT,
        featured INTEGER DEFAULT 0
      )
    `)
    seedDestinations()
    persist()
    return db
  } catch (err) {
    console.warn('SQLite not available, using fallback data:', err)
    usingFallback = true
    seedFallbackUsers()
    return null
  }
}

function ensureSeeded() {
  if (usingFallback) return
  const res = db.exec("SELECT COUNT(*) FROM destinations")
  if (!res[0] || res[0].values[0][0] === 0) {
    seedDestinations()
  }
}

function seedDestinations() {
  if (usingFallback) return
  const destinations = FALLBACK_DESTINATIONS.map(d => [
    d.title, d.country, d.city, d.description, d.price, d.duration,
    d.category, d.rating, d.image, d.featured
  ])
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO destinations (title, country, city, description, price, duration, category, rating, image, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  )
  destinations.forEach((d) => stmt.run(d))
  stmt.free()
  persist()
}

// Fallback user storage in localStorage
function seedFallbackUsers() {
  const existing = localStorage.getItem('travel_users')
  if (!existing) {
    localStorage.setItem('travel_users', JSON.stringify([]))
  }
}

export function persist() {
  if (!db || usingFallback) return
  try {
    const data = db.export()
    const btoa_data = btoa(String.fromCharCode(...data))
    localStorage.setItem('travel_db_sqlite', btoa_data)
  } catch (e) {
    console.warn('Failed to persist DB:', e)
  }
}

export function createUser({ name, email, password, role = 'client' }) {
  if (usingFallback) {
    const users = JSON.parse(localStorage.getItem('travel_users') || '[]')
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name, email, password, role,
      created_at: new Date().toISOString()
    }
    users.push(newUser)
    localStorage.setItem('travel_users', JSON.stringify(users))
    return newUser
  }

  db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role])
  persist()
  const res = db.exec('SELECT * FROM users WHERE email = ?', [email])
  return rowToObj(res[0])
}

export function getUserByEmail(email) {
  if (usingFallback) {
    const users = JSON.parse(localStorage.getItem('travel_users') || '[]')
    return users.find(u => u.email === email) || null
  }

  const res = db.exec('SELECT * FROM users WHERE email = ?', [email])
  return res[0] ? rowToObj(res[0]) : null
}

export function getUserById(id) {
  if (usingFallback) {
    const users = JSON.parse(localStorage.getItem('travel_users') || '[]')
    return users.find(u => u.id === id) || null
  }

  const res = db.exec('SELECT * FROM users WHERE id = ?', [id])
  return res[0] ? rowToObj(res[0]) : null
}

export function updateUser(id, data) {
  if (usingFallback) {
    const users = JSON.parse(localStorage.getItem('travel_users') || '[]')
    const idx = users.findIndex(u => u.id === id)
    if (idx === -1) return null
    if (data.name) users[idx].name = data.name
    if (data.email) users[idx].email = data.email
    if (data.password) users[idx].password = data.password
    localStorage.setItem('travel_users', JSON.stringify(users))
    return users[idx]
  }

  const fields = []
  const values = []
  if (data.name) { fields.push('name = ?'); values.push(data.name) }
  if (data.email) { fields.push('email = ?'); values.push(data.email) }
  if (data.password) { fields.push('password = ?'); values.push(data.password) }
  if (fields.length === 0) return getUserById(id)
  values.push(id)
  db.run(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values)
  persist()
  return getUserById(id)
}

export function getDestinations(category = null) {
  if (usingFallback) {
    if (category && category !== 'all') {
      return FALLBACK_DESTINATIONS.filter(d => d.category === category)
    }
    return [...FALLBACK_DESTINATIONS]
  }

  let res
  if (category && category !== 'all') {
    res = db.exec('SELECT * FROM destinations WHERE category = ? ORDER BY featured DESC, rating DESC', [category])
  } else {
    res = db.exec('SELECT * FROM destinations ORDER BY featured DESC, rating DESC')
  }
  if (!res[0]) return []
  return res[0].values.map((row) => ({
    id: row[0], title: row[1], country: row[2], city: row[3],
    description: row[4], price: row[5], duration: row[6],
    category: row[7], rating: row[8], image: row[9], featured: row[10],
  }))
}

export function getFeaturedDestinations() {
  if (usingFallback) {
    return FALLBACK_DESTINATIONS.filter(d => d.featured === 1).slice(0, 4)
  }

  const res = db.exec('SELECT * FROM destinations WHERE featured = 1 ORDER BY rating DESC LIMIT 4')
  if (!res[0]) return []
  return res[0].values.map((row) => ({
    id: row[0], title: row[1], country: row[2], city: row[3],
    description: row[4], price: row[5], duration: row[6],
    category: row[7], rating: row[8], image: row[9], featured: row[10],
  }))
}

export function getDestinationById(id) {
  if (usingFallback) {
    return FALLBACK_DESTINATIONS.find(d => d.id === id) || null
  }

  const res = db.exec('SELECT * FROM destinations WHERE id = ?', [id])
  if (!res[0]) return null
  const row = res[0].values[0]
  return {
    id: row[0], title: row[1], country: row[2], city: row[3],
    description: row[4], price: row[5], duration: row[6],
    category: row[7], rating: row[8], image: row[9], featured: row[10],
  }
}

function rowToObj(res) {
  const cols = res.columns
  const vals = res.values[0]
  const obj = {}
  cols.forEach((col, i) => { obj[col] = vals[i] })
  return obj
}
