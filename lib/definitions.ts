export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

export const mainNavigationItems: NavigationItem[] = [
  { name: "Explorar", href: "#", current: false },
  { name: "Empezar una Campaña", href: "#", current: false },
  { name: "Acerca de", href: "#", current: false },
  { name: "Contáctanos", href: "#", current: false },
];

export const userNavigationItems: NavigationItem[] = [
  { name: "Perfil", href: "#" },
  { name: "Opciones", href: "#" },
  { name: "Iniciar Sesión", href: "#" },
];
