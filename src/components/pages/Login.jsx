import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { validateLoginForm } from '../../utils/validators.jsx'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
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
    const vErrors = validateLoginForm(form)
    if (Object.keys(vErrors).length > 0) { setErrors(vErrors); return }
    setLoading(true)
    try {
      login(form.email, form.password)
      navigate('/', { replace: true })
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
          <h1 className="font-display font-bold text-2xl md:text-3xl text-gray-900">Connexion</h1>
          <p className="text-gray-600 mt-2">Connectez-vous pour acceder a votre espace personnel.</p>
        </div>
        {submitError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{submitError}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="label">Adresse email</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" className={`input-field ${errors.email ? 'input-error' : ''}`} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="label">Mot de passe</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} placeholder="Votre mot de passe" className={`input-field ${errors.password ? 'input-error' : ''}`} />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-lg disabled:opacity-50">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6 text-sm">
          Pas encore de compte ? <Link to="/inscription" className="text-primary-600 font-semibold hover:underline">S'inscrire</Link>
        </p>
      </div>
    </div>
  )
}
