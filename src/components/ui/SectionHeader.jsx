import useScrollReveal from '../../hooks/useScrollReveal.jsx'

export default function SectionHeader({ title, subtitle, light }) {
  const [ref, isVisible] = useScrollReveal()
  return (
    <div ref={ref} className={`text-center mb-12 md:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <h2 className={`font-display font-bold text-3xl md:text-4xl mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      {subtitle && <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-white/80' : 'text-gray-600'}`}>{subtitle}</p>}
    </div>
  )
}
