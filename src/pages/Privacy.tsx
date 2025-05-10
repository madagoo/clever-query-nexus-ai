
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Politique de Confidentialité</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Collecte d'informations</h2>
            <p className="text-gray-700">
              Nous collectons plusieurs types d'informations à différentes fins pour vous fournir et améliorer notre service. Les types de données que nous pouvons collecter incluent les informations personnelles comme votre nom, adresse e-mail, et d'autres données similaires.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Utilisation des données</h2>
            <p className="text-gray-700">
              AI DataFlow utilise les données collectées à diverses fins :
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700">
              <li>Pour fournir et maintenir notre service</li>
              <li>Pour vous notifier des changements apportés à notre service</li>
              <li>Pour vous permettre de participer aux fonctionnalités interactives de notre service</li>
              <li>Pour fournir un support client</li>
              <li>Pour recueillir des analyses afin d'améliorer notre service</li>
              <li>Pour surveiller l'utilisation de notre service</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Transfert de données</h2>
            <p className="text-gray-700">
              Vos informations, y compris vos données personnelles, peuvent être transférées et conservées sur des ordinateurs situés en dehors de votre état, province, pays ou autre juridiction gouvernementale où les lois sur la protection des données peuvent différer.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Divulgation des données</h2>
            <p className="text-gray-700">
              Nous pouvons divulguer vos informations personnelles dans la bonne foi que cette action est nécessaire pour :
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700">
              <li>Se conformer à une obligation légale</li>
              <li>Protéger et défendre les droits ou la propriété de AI DataFlow</li>
              <li>Prévenir ou enquêter sur d'éventuels actes répréhensibles en rapport avec le service</li>
              <li>Protéger la sécurité personnelle des utilisateurs du service ou du public</li>
              <li>Se protéger contre la responsabilité juridique</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Sécurité des données</h2>
            <p className="text-gray-700">
              La sécurité de vos données est importante pour nous, mais rappelez-vous qu'aucune méthode de transmission sur Internet ou de stockage électronique n'est sûre à 100%. Bien que nous nous efforcions d'utiliser des moyens commercialement acceptables pour protéger vos données personnelles, nous ne pouvons garantir leur sécurité absolue.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">6. Droits de protection des données</h2>
            <p className="text-gray-700">
              Vous disposez de certains droits en matière de protection des données. AI DataFlow vise à prendre des mesures raisonnables pour vous permettre de corriger, modifier, supprimer ou limiter l'utilisation de vos données personnelles.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">7. Cookies et technologies similaires</h2>
            <p className="text-gray-700">
              Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité sur notre service et conserver certaines informations. Vous pouvez demander à votre navigateur de refuser tous les cookies ou d'indiquer quand un cookie est envoyé.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">8. Changements à cette politique de confidentialité</h2>
            <p className="text-gray-700">
              Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page et en vous notifiant par e-mail et/ou par un avis bien visible sur notre service.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">9. Contact</h2>
            <p className="text-gray-700">
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à privacy@aidataflow.com.
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

export default Privacy;
