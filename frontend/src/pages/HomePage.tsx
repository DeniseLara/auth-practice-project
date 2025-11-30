import { useAuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { MdDone } from "react-icons/md";
import './HomePage.css'

export default function HomePage() {
    const { user } = useAuthContext()
    const { logout } = useAuth()

    const handleLogout = async() => {
        await logout();
    }

    return(
    <div className="home-page">
      <div className="home-container">
        <div className="welcome-card">
          <div className="emoji-badge">🔐</div>
          <h1 className="welcome-title">
            ¡Bienvenido, <span className="username">{user?.name}</span>! 
          </h1>
          <p className="welcome-subtitle">
            Has accedido exitosamente al sistema de autenticación. 
            Este es un proyecto de práctica desarrollado con NestJS, TypeScript 
            y autenticación JWT en cookies HTTP-only.
          </p>
        </div>

        <section className="grid-container">
        <article className="updates-card">
          <header className="updates-header">
            <span className="updates-icon">⚡</span>
            <h2>Tech Stack</h2>
          </header>
          <p className="updates-text">
            Backend: NestJS + TypeScript + JWT + Cookies HTTP-only
            <br />
            Frontend: React + Vite + Context API
            <br />
            Seguridad: bcrypt + cookies seguras
          </p>
          <div className="coming-soon">
            <span className="pulse-dot"></span>
            Proyecto práctico - Disponible en GitHub
          </div>
        </article>

        <article className="features-card">
          <header className="features-header">
            <span className="features-icon">🎯</span>
            <h2>Funcionalidades Implementadas</h2>
          </header>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon"><MdDone/></span>
              Registro de usuarios
            </div>
            <div className="feature-item">
              <span className="feature-icon"><MdDone/></span>
              Login con JWT
            </div>
            <div className="feature-item">
              <span className="feature-icon"><MdDone/></span>
              Cookies HTTP-only
            </div>
            <div className="feature-item">
              <span className="feature-icon"><MdDone/></span>
              Rutas protegidas
            </div>
          </div>
        </article>
        </section>

        <div className="action-zone">
          <button onClick={handleLogout} className="logout-btn">
            Cerrar sesión
          </button>
        </div>
        <footer className="home-footer">
          <p>Proyecto de práctica - Auth con NestJS & React</p>
          <p className="footer-sub">Hecho con 💜, café ☕ y ganas de aprender</p>
        </footer>
      </div>
    </div>
  );
}