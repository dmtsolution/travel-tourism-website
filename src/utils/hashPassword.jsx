function simpleHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + btoa(str).slice(0, 8)
}

export function hashPassword(password) {
  return simpleHash(password)
}

export function verifyPassword(password, hashed) {
  return simpleHash(password) === hashed
}
