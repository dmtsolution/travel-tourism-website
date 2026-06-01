export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePassword(password) {
  return password.length >= 6
}

export function validateRequired(value) {
  return value.trim().length > 0
}

export function validateContactForm({ name, email, message }) {
  const errors = {}
  if (!validateRequired(name)) errors.name = 'Le nom est requis'
  if (!validateEmail(email)) errors.email = 'Email invalide'
  if (!validateRequired(message)) errors.message = 'Le message est requis'
  if (message.trim().length > 0 && message.trim().length < 10) errors.message = 'Le message doit contenir au moins 10 caractères'
  return errors
}

export function validateRegisterForm({ name, email, password, confirmPassword }) {
  const errors = {}
  if (!validateRequired(name)) errors.name = 'Le nom est requis'
  if (name.trim().length > 0 && name.trim().length < 2) errors.name = 'Le nom doit contenir au moins 2 caractères'
  if (!validateEmail(email)) errors.email = 'Email invalide'
  if (!validatePassword(password)) errors.password = 'Le mot de passe doit contenir au moins 6 caractères'
  if (password !== confirmPassword) errors.confirmPassword = 'Les mots de passe ne correspondent pas'
  return errors
}

export function validateLoginForm({ email, password }) {
  const errors = {}
  if (!validateEmail(email)) errors.email = 'Email invalide'
  if (!validateRequired(password)) errors.password = 'Le mot de passe est requis'
  return errors
}
