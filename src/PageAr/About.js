// ============================================================
//  SECTOR: FRONTEND
//  Archivo: src/PageAr/About.js
//  Descripción: Sección Acerca de — información del club,
//               contacto, redes sociales y copyright.
//  BACKEND: ❌ No requiere backend. Datos estáticos.
// ============================================================

import { useEffect, useRef, useState } from "react";
import ArsenalLogo from "../assets/Arsenal.png";
import "./About.css";

const redes = [
  {
    nombre: "Web Oficial",
    icono: "🌐",
    link: "https://www.arsenal.com",
    label: "www.arsenal.com",
  },
  {
    nombre: "X / Twitter",
    icono: "𝕏",
    link: "https://twitter.com/Arsenal",
    label: "@Arsenal",
  },
  {
    nombre: "Instagram",
    icono: "📸",
    link: "https://www.instagram.com/arsenal",
    label: "@arsenal",
  },
  {
    nombre: "Facebook",
    icono: "📘",
    link: "https://www.facebook.com/Arsenal",
    label: "Arsenal FC",
  },
  {
    nombre: "YouTube",
    icono: "▶",
    link: "https://www.youtube.com/arsenal",
    label: "Arsenal FC",
  },
];

function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-wrapper" ref={ref}>

      {/* ── Contenido central ── */}
      <div className={`about-content ${visible ? "show" : ""}`}>

        {/* Título */}
        <div className="about-title-wrap">
          <div className="about-title-line" />
          <h2 className="about-title">Fútbol Club Arsenal</h2>
          <div className="about-title-line" />
        </div>

        {/* Logo */}
        <img
          src={ArsenalLogo}
          alt="Arsenal FC"
          className={`about-logo ${visible ? "show" : ""}`}
        />

        {/* Información del estadio */}
        <div className={`about-info ${visible ? "show" : ""}`}>
          <p className="about-info-name">Emirates Stadium</p>
          <p className="about-info-address">Hornsey Rd, London N7 7AJ, Reino Unido</p>
          <a
            href="mailto:contact@arsenal.co.uk"
            className="about-info-link"
          >
            ✉ contact@arsenal.co.uk
          </a>
          <a
            href="https://www.arsenal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="about-info-link"
          >
            🌐 www.arsenal.com
          </a>
        </div>

        {/* Divider */}
        <div className={`about-divider ${visible ? "show" : ""}`} />

        {/* Redes sociales */}
        <div className={`about-redes ${visible ? "show" : ""}`}>
          <p className="about-redes-title">Síguenos en</p>
          <div className="about-redes-grid">
            {redes.map((red, i) => (
              <a
                key={i}
                href={red.link}
                target="_blank"
                rel="noopener noreferrer"
                className="about-red-btn"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <span className="about-red-icono">{red.icono}</span>
                <span className="about-red-label">{red.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={`about-divider ${visible ? "show" : ""}`} />

        {/* Copyright */}
        <p className={`about-copy ${visible ? "show" : ""}`}>
          © 2026 Arsenal Football Club
        </p>

      </div>

    </div>
  );
}

export default About;