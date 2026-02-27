// ============================================================
//  SECTOR: FRONTEND + BACKEND
//  Archivo: src/PageAr/PrincipalAr.js
//  BACKEND: ✅ Lee nombre del usuario desde localStorage
//           (guardado por Login.js al recibir el JWT token)
// ============================================================

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArsenalLogo from "../assets/Arsenal.png";
import "./PrincipalAr.css";

import Newcome from "./Newcome";
import Team    from "./Team";
import News    from "./News";
import About   from "./About";

function PrincipalAr() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ── Leer datos del usuario desde localStorage ──
  const nombre   = localStorage.getItem("usuario_nombre")   || "Usuario";
  const apellido = localStorage.getItem("usuario_apellido") || "";
  const nombreCompleto = `${nombre} ${apellido}`.trim();

  // ── Proteger ruta — si no hay token redirigir al login ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario_nombre");
    localStorage.removeItem("usuario_apellido");
    navigate("/");
  };

  return (
    <div className="principal-wrapper">

      {/* ── NAVBAR FIJA ── */}
      <nav className="principal-nav">

        <a href="#newcomer" className="principal-nav-logo">
          <img src={ArsenalLogo} alt="Arsenal FC" className="principal-nav-img" />
        </a>

        <div className="principal-nav-links">
          <a href="#newcomer" className="principal-nav-link">Club</a>
          <a href="#team"     className="principal-nav-link">Equipo</a>
          <a href="#news"     className="principal-nav-link">Noticias</a>
          <a href="#about"    className="principal-nav-link">Acerca de</a>
        </div>

        {/* Usuario con dropdown */}
        <div className="principal-nav-user" ref={dropdownRef}>
          <button className="principal-user-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="principal-user-avatar">
              {nombre.charAt(0).toUpperCase()}
            </span>
            <span className="principal-user-name">{nombreCompleto}</span>
            <span className={`principal-user-arrow ${menuOpen ? "open" : ""}`}>▾</span>
          </button>

          {menuOpen && (
            <div className="principal-dropdown">
              <button className="principal-dropdown-item"
                onClick={() => { setMenuOpen(false); }}>
                👤 Ver Perfil
              </button>
              <div className="principal-dropdown-divider" />
              <button className="principal-dropdown-item danger"
                onClick={handleCerrarSesion}>
                🚪 Cerrar Sesión
              </button>
            </div>
          )}
        </div>

      </nav>

      {/* ── SECCIONES ── */}
      <section id="newcomer"><Newcome /></section>
      <section id="team">    <Team />   </section>
      <section id="news">    <News />   </section>
      <section id="about">   <About />  </section>

    </div>
  );
}

export default PrincipalAr;