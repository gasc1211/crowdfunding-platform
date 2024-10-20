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

export type UsuarioProductor = {
  idusuario: number;
  descripcion: string;
  nombre: string;
  fechaNacimiento: Date;
  email: string;
}

export type Project = {
  id: number;
  name: string;
  info: string;
  progress: number;
}