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
  { name: "Empezar una Campaña", href: "/productor/editar" },
  { name: "Acerca de", href: "/about" },
  { name: "Contáctanos", href: "/contact" },
];

export const NavigationUsers: NavigationUser[] = [
  { name: "Inicio", href: "/" },
  { name: "Acerca de", href: "/about" },
  { name: "Contáctanos", href: "/contacto" },
];

