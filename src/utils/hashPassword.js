// Simple hash function for demo purposes (simulates bcrypt)
// In production, use bcrypt on the server side
export function hashPassword(password) {
  let hash = 0
  const saltedPassword = 'travel_salt_' + password + '_world_2024'
  for (let i = 0; i < saltedPassword.length; i++) {
    const char = saltedPassword.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return 'hashed_' + Math.abs(hash).toString(36)
}

export function verifyPassword(password, hashedPassword) {
  return hashPassword(password) === hashedPassword
}
