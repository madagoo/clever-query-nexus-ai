
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    try {
      // En environnement de production, remplacez ceci par votre logique réelle
      console.log("Password reset request:", data);
      
      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte de réception pour les instructions de réinitialisation",
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer l'email de réinitialisation",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">AI DataFlow</h1>
          <p className="mt-2 text-gray-600">Réinitialisation du mot de passe</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          {submitted ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Mail className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">Email envoyé</h2>
              <p className="text-gray-600 mb-6">
                Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation.
              </p>
              <Button asChild className="w-full">
                <Link to="/login">Retour à la connexion</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <p className="mb-4 text-gray-600">
                  Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-gray-400" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  {...register("email", { 
                    required: "L'email est requis",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Format d'email invalide"
                    } 
                  })}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
              </Button>
              
              <div className="text-center">
                <Link to="/login" className="text-sm text-blue-600 hover:text-blue-800">
                  Retour à la connexion
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
