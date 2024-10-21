import Link from "next/link";
import styles from "./navbar.module.css"; 

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>                
                <img src="/logo.png" alt="AgroStarter Logo" />
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/">Inicio</Link>
                </li>
                <li>
                    <Link href="/proyectos">Proyectos</Link>
                </li>
                <li>
                    <Link href="/como-funciona">Cómo Funciona</Link>
                </li>
                <li>
                    <Link href="/contacto">Contacto</Link>
                </li>
                <li>
                    <Link href="/iniciar-sesion">Iniciar Sesión</Link>
                </li>
                <li>
                    <Link href="/registrarse">Registrarse</Link>
                </li>
            </ul>
        </nav>
    );
};
