export interface NavigationItem {
  name: string;
  href: string;
}

export interface NavigationUser {
  name: string;
  href: string;
}

export const mainNavigationItems: NavigationItem[] = [
  { name: "Inicio", href: "/" },
  { name: "Dashboard", href: "/dashboard/emprendedores" },
  { name: "Empezar una Campaña", href: "/proyecto/nuevo" },
  { name: "Acerca de", href: "/acerca-de" },
  { name: "Contáctanos", href: "/contacto" },
];

export const NavigationUsers: NavigationUser[] = [
  { name: "Inicio", href: "/" },
  { name: "Acerca de", href: "/acerca-de" },
  { name: "Contáctanos", href: "/contacto" },
];

/* export type ProjectCardData = {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
};

export type Project = {
  id: number;
  name: string;
  info: string;
  progress: number;
};

export type ProjectInversor = {
  title: string;
  description: string;
  image: string;
  progress: number;
};
 */
