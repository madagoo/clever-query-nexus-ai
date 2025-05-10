
import React, { useState } from "react";
import SidebarWrapper from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bell, Key, Lock, User, Shield } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Email invalide.",
  }),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  weeklyDigest: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
});

// Define the session timeout type to be more precise
const SessionTimeoutType = z.enum(["30mins", "1hour", "4hours", "1day", "1week"]);
type SessionTimeoutType = z.infer<typeof SessionTimeoutType>;

const securityFormSchema = z.object({
  twoFactorAuth: z.boolean().default(false),
  sessionTimeout: SessionTimeoutType.default("4hours"),
});

// Define the type based on the schema for type safety
type SecurityFormValues = z.infer<typeof securityFormSchema>;

export default function Settings() {
  const [currentTab, setCurrentTab] = useState("profil");

  const profileForm = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Admin User",
      email: "admin@example.com",
    },
  });

  const notificationsForm = useForm({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyDigest: false,
      marketingEmails: false,
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      twoFactorAuth: false,
      sessionTimeout: "4hours",
    },
  });

  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    toast.success("Profil mis à jour avec succès");
    console.log(data);
  }

  function onNotificationsSubmit(data: z.infer<typeof notificationsFormSchema>) {
    toast.success("Préférences de notifications mises à jour");
    console.log(data);
  }

  function onSecuritySubmit(data: SecurityFormValues) {
    toast.success("Paramètres de sécurité mis à jour");
    console.log(data);
  }

  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-screen">
        <Header title="Paramètres" />
        <div className="flex-1 p-6">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="profil" className="flex items-center gap-2">
                <User size={16} />
                <span>Profil</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell size={16} />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="securite" className="flex items-center gap-2">
                <Shield size={16} />
                <span>Sécurité</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profil" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations du profil</CardTitle>
                  <CardDescription>
                    Mettez à jour vos informations personnelles.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center gap-2">
                        <Button type="submit">Enregistrer</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Photo de profil</CardTitle>
                  <CardDescription>
                    Changez votre photo de profil.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-semibold">AD</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">Télécharger une nouvelle photo</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Supprimer la photo</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notifications</CardTitle>
                  <CardDescription>
                    Configurez comment vous souhaitez être notifié.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...notificationsForm}>
                    <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                      <FormField
                        control={notificationsForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Notifications par email</FormLabel>
                              <FormDescription>
                                Recevez des notifications par email concernant vos activités.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationsForm.control}
                        name="pushNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Notifications push</FormLabel>
                              <FormDescription>
                                Recevez des notifications push dans votre navigateur.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationsForm.control}
                        name="weeklyDigest"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Résumé hebdomadaire</FormLabel>
                              <FormDescription>
                                Recevez un résumé hebdomadaire de vos activités.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationsForm.control}
                        name="marketingEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Emails marketing</FormLabel>
                              <FormDescription>
                                Recevez des emails concernant les nouvelles fonctionnalités et promotions.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button type="submit">Enregistrer les préférences</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="securite" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mot de passe</CardTitle>
                  <CardDescription>
                    Modifiez votre mot de passe.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <div className="relative">
                        <Input id="current-password" type="password" />
                        <Lock className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <div className="relative">
                        <Input id="new-password" type="password" />
                        <Key className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                      <div className="relative">
                        <Input id="confirm-password" type="password" />
                        <Key className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    <Button onClick={() => toast.success("Mot de passe mis à jour avec succès")}>
                      Mettre à jour le mot de passe
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Options de sécurité avancées</CardTitle>
                  <CardDescription>
                    Gérez les paramètres de sécurité avancés pour votre compte.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...securityForm}>
                    <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                      <FormField
                        control={securityForm.control}
                        name="twoFactorAuth"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Authentification à deux facteurs</FormLabel>
                              <FormDescription>
                                Ajouter une couche de sécurité supplémentaire à votre compte.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={securityForm.control}
                        name="sessionTimeout"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Expiration de session</FormLabel>
                            <FormDescription>
                              Définissez la durée après laquelle vous serez automatiquement déconnecté.
                            </FormDescription>
                            <FormControl>
                              <select
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={field.value}
                                onChange={field.onChange}
                              >
                                <option value="30mins">30 minutes</option>
                                <option value="1hour">1 heure</option>
                                <option value="4hours">4 heures</option>
                                <option value="1day">1 jour</option>
                                <option value="1week">1 semaine</option>
                              </select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Separator />

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">Sessions actives</h3>
                          <p className="text-sm text-muted-foreground">
                            Les appareils sur lesquels vous êtes actuellement connecté.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">Chrome sur Windows</p>
                              <p className="text-xs text-muted-foreground">Dernière activité: Il y a 5 minutes</p>
                            </div>
                            <Button variant="outline" size="sm">Déconnecter</Button>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">Safari sur iPhone</p>
                              <p className="text-xs text-muted-foreground">Dernière activité: Il y a 2 jours</p>
                            </div>
                            <Button variant="outline" size="sm">Déconnecter</Button>
                          </div>
                        </div>
                      </div>

                      <Button type="submit">Enregistrer les paramètres</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarWrapper>
  );
}
