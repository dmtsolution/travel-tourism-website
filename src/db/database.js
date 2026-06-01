let db = null

export async function initializeDB() {
  if (db) return db

  const initSqlJs = (await import('sql.js')).default
  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  })

  // Try to restore from localStorage
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
}

function ensureSeeded() {
  const res = db.exec("SELECT COUNT(*) FROM destinations")
  if (res[0]?.values[0]?.[0] === 0 || res.length === 0) {
    seedDestinations()
  }
}

function seedDestinations() {
  const destinations = [
    ['Safari Safari Safari au Kenya', 'Kenya', 'Nairobi', 'Découvrez la grande migration des gnous et des zèbres dans la réserve nationale du Masaï Mara. Une aventure inoubliable au cœur de la savane africaine avec des guides expérimentés.', 2499, 10, 'aventure', 4.8, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', 1],
    ['Paris Romantique', 'France', 'Paris', 'Week-end en amoureux à Paris : Tour Eiffel, croisière sur la Seine, dîner gastronomique et visite du Louvre. La ville lumière vous accueille.', 599, 4, 'culture', 4.7, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', 1],
    ['Plages de Thaïlande', 'Thaïlande', 'Phuket', 'Relaxation sur les plus belles plages du monde. Snorkeling, massages traditionnels, cuisine locale et couchers de soleil spectaculaires.', 1899, 12, 'detente', 4.9, 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80', 1],
    ['Temple du Japon', 'Japon', 'Kyoto', 'Immersion dans la culture japonaise traditionnelle. Visite des temples, cérémonie du thé, jardins zen et découverte de la gastronomie locale.', 3299, 14, 'culture', 4.9, 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', 1],
    ['Trek dans les Andes', 'Pérou', 'Cusco', 'Trekking vers le Machu Picchu à travers les paysages spectaculaires des Andes péruviennes. Une aventure unique et mythique.', 2799, 12, 'aventure', 4.8, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80', 0],
    ['Lune de miel aux Maldives', 'Maldives', 'Malé', 'Luxe et détente dans un resort 5 étoiles sur pilotis. Eaux cristallines, spa, plongée sous-marine et moments inoubliables à deux.', 4599, 10, 'detente', 5.0, 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', 1],
    ['Road trip Islande', 'Islande', 'Reykjavik', 'Découvrez les paysages spectaculaires de l\'Islande : cascades, geysers, aurores boréales et bains thermaux naturels.', 2199, 8, 'aventure', 4.6, 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80', 0],
    ['Safari Photo Tanzanie', 'Tanzanie', 'Arusha', 'Safari photographique au Serengeti et au cratère du Ngorongoro. Guides professionnels et équipement inclus.', 3499, 11, 'aventure', 4.7, 'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?w=800&q=80', 0],
    ['Venise en Gondole', 'Italie', 'Venise', 'Découvrez la magie de Venise : balade en gondole, Saint-Marc, Murano, Burano et la gastronomie italienne authentique.', 899, 5, 'culture', 4.5, 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80', 0],
    ['Caribes en Croisière', 'Caraïbes', 'La Havane', 'Croisière de rêve dans les Caraïbes : plages de sable blanc, eaux turquoise, snorkeling et fêtes tropicales.', 2999, 9, 'detente', 4.6, 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80', 0],
    ['Laponie en Hiver', 'Finlande', 'Rovaniemi', 'Aventure arctique : chiens de traîneau, aurores boréales, rencontre avec le Père Noigt et nuit dans un igloo de verre.', 2699, 7, 'aventure', 4.8, 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80', 0],
    ['Marrakech Authentique', 'Maroc', 'Marrakech', 'Plongez dans l\'ambiance envoûtante de Marrakech : souks, palais, jardin Majelleh, hammam traditionnel et cuisine marocaine.', 799, 6, 'culture', 4.4, 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80', 0],
  ]

  const stmt = db.prepare(
    'INSERT OR IGNORE INTO destinations (title, country, city, description, price, duration, category, rating, image, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  )
  destinations.forEach((d) => {
    stmt.run(d)
  })
  stmt.free()
  persist()
}

export function persist() {
  if (!db) return
  const data = db.export()
  const btoa_data = btoa(String.fromCharCode(...data))
  localStorage.setItem('travel_db_sqlite', btoa_data)
}

export function createUser({ name, email, password, role = 'client' }) {
  db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
    name,
    email,
    password,
    role,
  ])
  persist()
  const res = db.exec('SELECT * FROM users WHERE email = ?', [email])
  return rowToObj(res[0])
}

export function getUserByEmail(email) {
  const res = db.exec('SELECT * FROM users WHERE email = ?', [email])
  return res[0] ? rowToObj(res[0]) : null
}

export function getUserById(id) {
  const res = db.exec('SELECT * FROM users WHERE id = ?', [id])
  return res[0] ? rowToObj(res[0]) : null
}

export function updateUser(id, data) {
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
  let res
  if (category && category !== 'all') {
    res = db.exec('SELECT * FROM destinations WHERE category = ? ORDER BY featured DESC, rating DESC', [category])
  } else {
    res = db.exec('SELECT * FROM destinations ORDER BY featured DESC, rating DESC')
  }
  if (!res[0]) return []
  return res[0].values.map((row) => ({
    id: row[0],
    title: row[1],
    country: row[2],
    city: row[3],
    description: row[4],
    price: row[5],
    duration: row[6],
    category: row[7],
    rating: row[8],
    image: row[9],
    featured: row[10],
  }))
}

export function getDestinationById(id) {
  const res = db.exec('SELECT * FROM destinations WHERE id = ?', [id])
  if (!res[0]) return null
  const row = res[0].values[0]
  return {
    id: row[0], title: row[1], country: row[2], city: row[3],
    description: row[4], price: row[5], duration: row[6],
    category: row[7], rating: row[8], image: row[9], featured: row[10],
  }
}

export function getFeaturedDestinations() {
  const res = db.exec('SELECT * FROM destinations WHERE featured = 1 ORDER BY rating DESC LIMIT 4')
  if (!res[0]) return []
  return res[0].values.map((row) => ({
    id: row[0], title: row[1], country: row[2], city: row[3],
    description: row[4], price: row[5], duration: row[6],
    category: row[7], rating: row[8], image: row[9], featured: row[10],
  }))
}

export function saveContactMessage({ name, email, message }) {
  return { success: true, id: Date.now() }
}

function rowToObj(res) {
  const cols = res.columns
  const vals = res.values[0]
  const obj = {}
  cols.forEach((col, i) => { obj[col] = vals[i] })
  return obj
}
