import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { validateRegisterForm } from '../../utils/validators.jsx'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    const vErrors = validateRegisterForm(form)
    if (Object.keys(vErrors).length > 0) { setErrors(vErrors); return }
    setLoading(true)
    try {
      register(form.name, form.email, form.password)
      setSuccess(true)
      setTimeout(() => navigate('/', { replace: true }), 1500)
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-16 md:py-20 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="card p-8 md:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-2xl md:text-3xl text-gray-900">Inscription</h1>
          <p className="text-gray-600 mt-2">Creez votre compte et commencez a voyager.</p>
        </div>
        {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">Compte cree avec succes ! Redirection...</div>}
        {submitError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{submitError}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="reg-name" className="label">Nom complet</label>
            <input type="text" id="reg-name" name="name" value={form.name} onChange={handleChange} placeholder="Jean Dupont" className={`input-field ${errors.name ? 'input-error' : ''}`} />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="reg-email" className="label">Adresse email</label>
            <input type="email" id="reg-email" name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" className={`input-field ${errors.email ? 'input-error' : ''}`} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="reg-password" className="label">Mot de passe</label>
            <input type="password" id="reg-password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 caracteres" className={`input-field ${errors.password ? 'input-error' : ''}`} />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="reg-confirm" className="label">Confirmer le mot de passe</label>
            <input type="password" id="reg-confirm" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirmez" className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`} />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-lg disabled:opacity-50">
            {loading ? 'Creation...' : 'Creer mon compte'}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6 text-sm">
          Deja un compte ? <Link to="/connexion" className="text-primary-600 font-semibold hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
