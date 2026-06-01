export default function Confidentialite() {
  return (
    <div className="py-16 md:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8 md:p-12">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-8">Politique de Confidentialité</h1>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">1. Responsable du traitement</h2>
              <p>Le responsable du traitement des données personnelles est TravelWorld SAS, 123 Avenue des Champs-Élysées, 75008 Paris. Pour toute question : privacy@travelworld.fr</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">2. Données collectées</h2>
              <p>Nous collectons les données suivantes :</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• <strong>Identité :</strong> nom, prénom</li>
                <li>• <strong>Contact :</strong> email, téléphone, adresse</li>
                <li>• <strong>Navigation :</strong> adresse IP, pages visitées, durée de visite</li>
                <li>• <strong>Réservation :</strong> dates de voyage, nombre de personnes, préférences</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">3. Finalités du traitement</h2>
              <p>Vos données sont utilisées pour :</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• Gérer vos réservations et le service client</li>
                <li>• Vous envoyer des confirmations et informations de voyage</li>
                <li>• Améliorer notre site et nos services (statistiques anonymes)</li>
                <li>• Vous proposer des offres personnalisées (avec votre consentement)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">4. Base légale</h2>
              <p>Le traitement de vos données repose sur :</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• L'exécution du contrat (réservation de voyage)</li>
                <li>• Votre consentement (newsletter, cookies)</li>
                <li>• Notre intérêt légitime (amélioration des services)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">5. Conservation des données</h2>
              <p>Vos données sont conservées pendant la durée nécessaire à la fourniture du service, puis pendant une durée maximale de 3 ans à compter de notre dernier contact. Les données de facturation sont conservées 10 ans conformément aux obligations légales.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">6. Vos droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• Droit d'accès et de rectification</li>
                <li>• Droit à l'effacement (droit à l'oubli)</li>
                <li>• Droit à la limitation du traitement</li>
                <li>• Droit à la portabilité</li>
                <li>• Droit d'opposition au traitement</li>
                <li>• Droit de retirer votre consentement à tout moment</li>
              </ul>
              <p className="mt-3">Pour exercer vos droits, contactez-nous à privacy@travelworld.fr. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">7. Sécurité</h2>
              <p>TravelWorld met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">8. Transferts de données</h2>
              <p>Vos données peuvent être transférées à des prestataires situés en dehors de l'Union européenne dans le cadre de l'organisation de votre voyage (compagnies aériennes, hôtels, guides locaux). Dans ce cas, des garanties appropriées sont mises en place.</p>
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
