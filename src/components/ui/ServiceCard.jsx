import useScrollReveal from '../../hooks/useScrollReveal.jsx'

export default function ServiceCard({ icon, title, description, index = 0 }) {
  const [ref, isVisible] = useScrollReveal()
  return (
    <div ref={ref} className={`card p-6 text-center group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 100}ms` }}>
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">{icon}</div>
      <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
