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
  { name: "Emprendedor", href: "/dashboard/emprendedores" },
  { name: "Inversionista", href: "/dashboard/profileInversor" },
  { name: "Empezar una Campaña", href: "/empezar" },
  { name: "Acerca de", href: "/acerca-de" },
  { name: "Contáctanos", href: "/contacto" },
];

export const NavigationUsers: NavigationUser[] = [
  { name: "Inicio", href: "/" },
  { name: "Acerca de", href: "/acerca-de" },
  { name: "Contáctanos", href: "/contacto" },
];