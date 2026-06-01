export default function Cookies() {
  return (
    <div className="py-16 md:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8 md:p-12">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-8">Politique de Cookies</h1>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">1. Qu'est-ce qu'un cookie ?</h2>
              <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite sur un site web. Il permet au site de mémoriser des informations relatives à votre visite, comme votre langue préférée ou vos préférences d'affichage.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">2. Cookies utilisés par TravelWorld</h2>

              <div className="space-y-4 mt-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Cookies essentiels</h3>
                  <p className="text-sm">Ces cookies sont nécessaires au fonctionnement du site (session, préférences, authentification). Ils ne peuvent pas être désactivés.</p>
                  <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p><strong>travel_current_user</strong> — Gère votre session de connexion (durée : session)</p>
                    <p><strong>travel_users</strong> — Stocke les comptes utilisateurs enregistrés (durée : persistant)</p>
                    <p><strong>travel_db_sqlite</strong> — Base de données locale des destinations (durée : persistant)</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Cookies de performance</h3>
                  <p className="text-sm">Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site en collectant des informations anonymes (pages les plus visitées, temps passé, etc.).</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Cookies de personnalisation</h3>
                  <p className="text-sm">Ces cookies permettent de mémoriser vos préférences (langue, recherches récentes) pour personnaliser votre expérience.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">3. Gestion des cookies</h2>
              <p>Lors de votre première visite, vous êtes informé de l'utilisation des cookies. En continuant à naviguer, vous acceptez leur utilisation.</p>
              <p className="mt-3">Vous pouvez à tout moment configurer votre navigateur pour :</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• Accepter ou refuser les cookies</li>
                <li>• Supprimer les cookies existants</li>
                <li>• Être averti avant qu'un cookie soit déposé</li>
              </ul>
              <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-sm"><strong>Attention :</strong> La désactivation des cookies essentiels peut affecter le bon fonctionnement du site et empêcher certaines fonctionnalités (connexion, réservation).</p>
              </div>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">4. Cookies tiers</h2>
              <p>TravelWorld utilise des services tiers pouvant déposer des cookies :</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• <strong>Google Fonts :</strong> pour l'affichage des polices Inter et Poppins</li>
                <li>• <strong>Unsplash :</strong> pour l'hébergement des images de démonstration</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">5. Durée de conservation</h2>
              <p>Les cookies de session sont supprimés à la fermeture du navigateur. Les cookies persistants sont conservés pour une durée maximale de 13 mois conformément aux recommandations de la CNIL.</p>
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
