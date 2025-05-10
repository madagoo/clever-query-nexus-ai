
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { User, KeyRound, UserPlus } from "lucide-react";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  
  const password = watch("password", "");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      // En environnement de production, remplacez ceci par votre logique d'inscription réelle
      console.log("Registration data:", data);
      
      // Simuler un délai d'inscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Compte créé avec succès",
        description: "Vous pouvez maintenant vous connecter",
      });
      
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'inscription",
        description: "Impossible de créer votre compte. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">AI DataFlow</h1>
          <p className="mt-2 text-gray-600">Créez votre compte</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5 text-gray-400" />
                <Label htmlFor="fullName">Nom complet</Label>
              </div>
              <Input
                id="fullName"
                type="text"
                {...register("fullName", { required: "Le nom complet est requis" })}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-gray-400" />
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
                id="email"
                type="email"
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
            
            <div className="space-y-2">
              <div className="flex items-center">
                <KeyRound className="mr-2 h-5 w-5 text-gray-400" />
                <Label htmlFor="password">Mot de passe</Label>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password", { 
                  required: "Le mot de passe est requis",
                  minLength: {
                    value: 8,
                    message: "Le mot de passe doit contenir au moins 8 caractères"
                  }
                })}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <KeyRound className="mr-2 h-5 w-5 text-gray-400" />
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              </div>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", { 
                  required: "Veuillez confirmer votre mot de passe",
                  validate: value => value === password || "Les mots de passe ne correspondent pas"
                })}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="acceptTerms" 
                {...register("acceptTerms", { 
                  required: "Vous devez accepter les conditions d'utilisation"
                })}
              />
              <Label htmlFor="acceptTerms" className="text-sm text-gray-600">
                J'accepte les {" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                  conditions d'utilisation
                </Link>{" "}
                et la {" "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                  politique de confidentialité
                </Link>
              </Label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Création en cours..." : "Créer un compte"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Déjà un compte?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
