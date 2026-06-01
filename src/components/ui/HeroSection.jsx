import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-hero bg-cover bg-center bg-fixed" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="animate-fade-in-up font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
          Explorez le Monde<br /><span className="text-primary-400">avec TravelWorld</span>
        </h1>
        <p className="animate-fade-in-up text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8" style={{ animationDelay: '200ms' }}>
          Des voyages sur mesure, des destinations de reve et des souvenirs inoubliables. Votre prochaine aventure commence ici.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/services" className="btn-primary text-lg px-8 py-4 shadow-xl shadow-primary-600/30">Decouvrir nos destinations</Link>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all">Nous contacter</Link>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '500+', label: 'Destinations' },
            { value: '10K+', label: 'Voyageurs' },
            { value: '4.9', label: 'Note moyenne' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-display font-bold text-white">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
