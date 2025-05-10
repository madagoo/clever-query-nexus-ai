
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Conditions d'Utilisation</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptation des conditions</h2>
            <p className="text-gray-700">
              En accédant à AI DataFlow ou en l'utilisant, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas l'intégralité de ces conditions, vous ne pouvez pas accéder au site web ni utiliser aucun service.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Modifications des conditions</h2>
            <p className="text-gray-700">
              Nous nous réservons le droit de modifier ou de remplacer ces conditions d'utilisation à tout moment et à notre seule discrétion. Il est de votre responsabilité de consulter périodiquement nos conditions d'utilisation pour prendre connaissance des modifications.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Accès aux services</h2>
            <p className="text-gray-700">
              Nous ne pouvons pas garantir que le service ou tout contenu sera disponible sans interruption. Nous nous réservons le droit de restreindre la disponibilité du service ou de tout contenu à toute personne, zone géographique ou juridiction, à tout moment et pour quelque raison que ce soit.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Compte utilisateur</h2>
            <p className="text-gray-700">
              Lorsque vous créez un compte chez nous, vous devez nous fournir des informations précises, complètes et à jour à tout moment. Le non-respect de cette obligation constitue une violation des conditions, ce qui peut entraîner la résiliation immédiate de votre compte sur notre service.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Propriété intellectuelle</h2>
            <p className="text-gray-700">
              Le service et son contenu original, ses fonctionnalités et ses fonctionnalités sont et resteront la propriété exclusive de AI DataFlow et de ses concédants de licence. Le service est protégé par le droit d'auteur, les marques déposées et d'autres lois.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">6. Liens vers d'autres sites web</h2>
            <p className="text-gray-700">
              Notre service peut contenir des liens vers des sites web ou des services tiers qui ne sont ni détenus ni contrôlés par AI DataFlow. AI DataFlow n'a aucun contrôle sur le contenu, les politiques de confidentialité ou les pratiques des sites web ou services tiers et n'assume aucune responsabilité à leur égard.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">7. Résiliation</h2>
            <p className="text-gray-700">
              Nous pouvons résilier ou suspendre votre compte immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans limitation, si vous violez les conditions d'utilisation.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">8. Limitation de responsabilité</h2>
            <p className="text-gray-700">
              En aucun cas, AI DataFlow, ses administrateurs, employés, partenaires, agents, fournisseurs ou affiliés ne seront responsables de tout dommage indirect, accessoire, spécial, consécutif ou punitif, y compris, sans limitation, la perte de profits, de données, d'utilisation, de clientèle ou autres pertes immatérielles.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">9. Loi applicable</h2>
            <p className="text-gray-700">
              Ces conditions sont régies et interprétées conformément aux lois françaises, sans tenir compte des dispositions en matière de conflit de lois.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
            <p className="text-gray-700">
              Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à support@aidataflow.com.
            </p>
          </section>
        </div>
        
        <div className="mt-8 text-center">
          <Button asChild>
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
