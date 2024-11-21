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
  { name: "Mi Perfil", href: "/dashboard/profileInversor" },
  { name: "Empezar una Campaña", href: "/proyecto/nuevo" },
  { name: "Acerca de", href: "/about" },
  { name: "Contáctanos", href: "/contacto" },
];

export const NavigationUsers: NavigationUser[] = [
  { name: "Inicio", href: "/" },
  { name: "Acerca de", href: "/acerca-de" },
  { name: "Contáctanos", href: "/contacto" },
];

