export interface NavigationItem {
  name: string;
  href: string;
}

export const mainNavigationItems: NavigationItem[] = [
  { name: "Explorar", href: "/" },
  { name: "Empezar una Campaña", href: "/empezar" },
  { name: "Acerca de", href: "/acerca-de" },
  { name: "Contáctanos", href: "/contacto" },
];

export const userNavigationItems: NavigationItem[] = [
  { name: "Perfil", href: "/profile" },
  { name: "Opciones", href: "/profile" },
  { name: "Iniciar Sesión", href: "/sign-in" },
];

export type UsuarioProductor = {
  idusuario: number;
  descripcion: string;
  nombre: string;
  fechaNacimiento: Date;
  email: string;
};

export type ProjectCardData = {
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
