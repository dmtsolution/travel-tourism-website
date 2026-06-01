export default function MentionsLegales() {
  return (
    <div className="py-16 md:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8 md:p-12">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-8">Mentions Légales</h1>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">1. Éditeur du site</h2>
              <p>Le site TravelWorld est édité par :</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li><strong>Raison sociale :</strong> TravelWorld SAS</li>
                <li><strong>Siège social :</strong> 123 Avenue des Champs-Élysées, 75008 Paris, France</li>
                <li><strong>Capital social :</strong> 50 000€</li>
                <li><strong>RCS :</strong> Paris B 123 456 789</li>
                <li><strong>TVA intracommunautaire :</strong> FR12345678901</li>
                <li><strong>Email :</strong> contact@travelworld.fr</li>
                <li><strong>Téléphone :</strong> +33 1 23 45 67 89</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">2. Directeur de la publication</h2>
              <p>Monsieur Jean-Pierre Dupont, en qualité de Président Directeur Général.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">3. Hébergement</h2>
              <p>Le site est hébergé par :</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li><strong>Hébergeur :</strong> GitHub Pages (GitHub, Inc.)</li>
                <li><strong>Adresse :</strong> 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA</li>
                <li><strong>Site :</strong> https://pages.github.com</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">4. Activité réglementée</h2>
              <p>TravelWorld est immatriculée au Registre des Opérateurs de Voyages et de Séjours sous le numéro IM075XXXXXXXX.</p>
              <p className="mt-2">Garantie financière : APST — 15 avenue Carnot, 75017 Paris.</p>
              <p className="mt-2">Assurance responsabilité civile professionnelle : Hiscox — 19 rue Louis le Grand, 75002 Paris.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">5. Propriété intellectuelle</h2>
              <p>L'ensemble du contenu du site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de TravelWorld. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site est interdite sans l'autorisation écrite préalable de TravelWorld.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">6. Responsabilité</h2>
              <p>TravelWorld s'efforce de fournir des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour. Les photos sont non contractuelles.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">7. Droit applicable</h2>
              <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
            </section>

            <section className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-400">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
