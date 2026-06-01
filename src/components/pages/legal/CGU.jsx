export default function CGU() {
  return (
    <div className="py-16 md:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8 md:p-12">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-8">Conditions Générales d'Utilisation</h1>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">1. Objet</h2>
              <p>Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités et conditions dans lesquelles TravelWorld met à disposition son site internet et les services proposés. L'utilisation du site implique l'acceptation pleine et entière des présentes CGU.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">2. Services proposés</h2>
              <p>TravelWorld propose des services de réservation de voyages, circuits touristiques, hôtels et activités. Les descriptifs des voyages disponibles sur le site sont fournis à titre indicatif et sont susceptibles d'être modifiés.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">3. Réservation et tarifs</h2>
              <p>Les tarifs indiqués sont en euros TTC par personne, sous réserve de disponibilité au moment de la réservation. La réservation est confirmée après paiement intégral ou versement d'un acompte minimum de 30% du prix total. Le solde est dû au plus tard 30 jours avant la date de départ.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">4. Annulation et modification</h2>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Plus de 60 jours avant le départ :</strong> Frais de 50€ par personne</li>
                <li>• <strong>Entre 59 et 30 jours :</strong> 25% du prix total retenu</li>
                <li>• <strong>Entre 29 et 15 jours :</strong> 50% du prix total retenu</li>
                <li>• <strong>Entre 14 et 7 jours :</strong> 75% du prix total retenu</li>
                <li>• <strong>Moins de 7 jours :</strong> 100% du prix total retenu — aucun remboursement</li>
              </ul>
              <p className="mt-3">TravelWorld se réserve le droit d'annuler un voyage en cas de force majeure ou de nombre insuffisant de participants. Dans ce cas, un remboursement intégral sera effectué.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">5. Assurance</h2>
              <p>Il est fortement recommandé de souscrire une assurance voyage couvrant les risques d'annulation, de rapatriement et de perte de bagages. TravelWorld propose des options d'assurance lors de la réservation.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">6. Responsabilité</h2>
              <p>TravelWorld ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou des services. La responsabilité de TravelWorld est limitée au montant total du voyage réservé.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">7. Données personnelles</h2>
              <p>Les données collectées sont traitées conformément à notre politique de confidentialité et au Règlement Général sur la Protection des Données (RGPD). Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">8. Droit applicable</h2>
              <p>Les présentes CGU sont régies par le droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence des tribunaux de Paris.</p>
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
