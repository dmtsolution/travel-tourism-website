import useScrollReveal from '../../hooks/useScrollReveal.jsx'

export default function ServiceCard({ icon, title, description, index = 0 }) {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`card card-hover p-8 text-center group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="font-display font-bold text-xl text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}
