export function validateEmail(email) {
  if (!email) return 'Email requis'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email invalide'
  return ''
}

export function validatePassword(password) {
  if (!password) return 'Mot de passe requis'
  if (password.length < 6) return 'Minimum 6 caracteres'
  return ''
}

export function validateRequired(value, field) {
  if (!value || !value.trim()) return `${field} requis(e)`
  return ''
}

export function validateLoginForm({ email, password }) {
  const errors = {}
  const e1 = validateEmail(email); if (e1) errors.email = e1
  const e2 = validatePassword(password); if (e2) errors.password = e2
  return errors
}

export function validateRegisterForm({ name, email, password, confirmPassword }) {
  const errors = {}
  const e1 = validateRequired(name, 'Nom'); if (e1) errors.name = e1
  const e2 = validateEmail(email); if (e2) errors.email = e2
  const e3 = validatePassword(password); if (e3) errors.password = e3
  if (password !== confirmPassword) errors.confirmPassword = 'Les mots de passe ne correspondent pas'
  return errors
}

export function validateContactForm({ name, email, message }) {
  const errors = {}
  const e1 = validateRequired(name, 'Nom'); if (e1) errors.name = e1
  const e2 = validateEmail(email); if (e2) errors.email = e2
  if (!message || message.trim().length < 10) errors.message = 'Message trop court (min. 10 caracteres)'
  return errors
}
