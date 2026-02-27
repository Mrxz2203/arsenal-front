// ============================================================
//  SECTOR: FRONTEND
//  Archivo: src/components/Welcome.js
//  BACKEND: ❌ No requiere backend. Página 100% estática.
//           Los botones usan React Router para navegar.
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArsenalLogo from "../assets/Arsenal.png";
import EquipoImg from "../assets/Equipo.jpg";
import "./Welcome.css";

function Welcome() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="welcome-wrapper">

      {/* ── NAVBAR ── */}
      <nav className={`nav ${loaded ? "show" : ""}`}>
        <span className="nav-logo-wrap" onClick={() => navigate("/")}>
          <img src={ArsenalLogo} alt="Arsenal FC" className="nav-logo-img" />
        </span>

        <div className="nav-links">
          <span className="nav-link">Club</span>
          <span className="nav-link">Equipo</span>
          <span className="nav-link">Noticias</span>
          <span className="nav-link">Acerca de</span>
        </div>

        <div className="nav-actions">
          <button className="btn-login-nav" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        {/* LEFT */}
        <div className="hero-left">
          <div className={`hero-eyebrow ${loaded ? "show" : ""}`}>
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Temporada 2025 / 2026</span>
          </div>

          <h1 className={`hero-title ${loaded ? "show" : ""}`}>
            Bienvenido al <span>Arsenal</span>
          </h1>

          <p className={`hero-desc ${loaded ? "show" : ""}`}>
            Únete a la comunidad de los Gunners. Regístrate y vive el fútbol de
            otra manera — noticias, estadísticas, historia y mucho más en un
            solo lugar.
          </p>

          <div className={`hero-btns ${loaded ? "show" : ""}`}>
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Unirse al Club
            </button>
            <button className="btn-secondary" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>
          </div>
        </div>

       {/* RIGHT — Imagen del equipo */}
<div className={`hero-right ${loaded ? "show" : ""}`}>
  <div className="team-img-wrap">
    <img src={EquipoImg} alt="Arsenal FC Equipo" className="team-img" />
  </div>
  <div className="hero-club-name">Fútbol Club Arsenal</div>
</div>
</section>
      {/* ── FOOTER STRIP — Estadísticas estáticas ── */}
      <div className={`footer-strip ${loaded ? "show" : ""}`}>
        <div className="footer-stat">
          <span className="footer-stat-num">1886</span>
          <span className="footer-stat-label">Fundado</span>
        </div>
        <div className="footer-divider" />
        <div className="footer-stat">
          <span className="footer-stat-num">13</span>
          <span className="footer-stat-label">Títulos de Liga</span>
        </div>
        <div className="footer-divider" />
        <div className="footer-stat">
          <span className="footer-stat-num">14</span>
          <span className="footer-stat-label">FA Cups</span>
        </div>
        <div className="footer-divider" />
        <div className="footer-stat">
          <span className="footer-stat-num">60K</span>
          <span className="footer-stat-label">Emirates Stadium</span>
        </div>
      </div>

    </div>
  );
}

export default Welcome;