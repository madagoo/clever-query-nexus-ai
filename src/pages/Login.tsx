
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      // En environnement de production, remplacez ceci par votre logique d'authentification réelle
      console.log("Login attempt:", data);
      
      // Simuler un délai d'authentification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Pour démonstration: si email contient 'admin', connecter en tant qu'admin
      const userRole = data.email.includes('admin') ? 'admin' : 'user';
      login(userRole);
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue sur AI DataFlow Platform (${userRole})`,
      });
      
      if (userRole === 'admin') {
        navigate("/");  // Rediriger vers le tableau de bord admin
      } else {
        navigate("/prompt-analyzer");  // Rediriger vers l'analyseur de prompt pour les utilisateurs
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
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
          <p className="mt-2 text-gray-600">Connectez-vous à votre compte</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            
            <div className="space-y-2">
              <div className="flex items-center">
                <KeyRound className="mr-2 h-5 w-5 text-gray-400" />
                <Label htmlFor="password">Mot de passe</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...register("password", { required: "Le mot de passe est requis" })}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  {...register("rememberMe")}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800">
                  Mot de passe oublié?
                </Link>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              <p>Pour tester: utilisez un email avec "admin" pour le rôle admin</p>
              <p className="mt-1">Exemple: admin@example.com / user@example.com</p>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            <Button variant="outline" type="button" className="w-full">
              Continuer avec Google
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
