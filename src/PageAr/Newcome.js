// ============================================================
//  SECTOR: FRONTEND
//  Archivo: src/PageAr/Newcome.js
//  Descripción: Primera sección del scroll — presentación
//               del club Arsenal. Sin botones, con flecha
//               de scroll hacia la siguiente sección.
//  BACKEND: ❌ No requiere backend. Sección estática.
// ============================================================

import { useState, useEffect } from "react";
import PageArImg from "../assets/PageAr.jpg";
import "./Newcome.css";

function Newcome() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="newcome-wrapper">

      {/* ── HERO ── */}
      <section className="newcome-hero">

        {/* LEFT */}
        <div className="newcome-left">

          <div className={`newcome-eyebrow ${loaded ? "show" : ""}`}>
            <div className="newcome-eyebrow-line" />
            <span className="newcome-eyebrow-text">Temporada 2025 / 2026</span>
          </div>

          <h1 className={`newcome-title ${loaded ? "show" : ""}`}>
            Somos el <span>Arsenal</span>
          </h1>

          <p className={`newcome-desc ${loaded ? "show" : ""}`}>
            El Arsenal Football Club es uno de los clubes más emblemáticos
            del fútbol mundial. Con una rica historia, un estilo de juego
            ofensivo y una afición apasionada, el equipo representa tradición,
            excelencia y orgullo deportivo. Desde el Emirates Stadium, los
            Gunners continúan inspirando a millones de seguidores en todo
            el mundo.
          </p>

        </div>

        {/* RIGHT — Imagen del equipo */}
        <div className={`newcome-right ${loaded ? "show" : ""}`}>
          <div className="newcome-img-wrap">
            <img src={PageArImg} alt="Arsenal FC" className="newcome-img" />
          </div>
          <div className="newcome-club-name">Fútbol Club Arsenal</div>
        </div>

      </section>

      {/* ── FOOTER STRIP ── */}
      <div className={`newcome-footer-strip ${loaded ? "show" : ""}`}>
        <div className="newcome-stat">
          <span className="newcome-stat-num">1886</span>
          <span className="newcome-stat-label">Fundado</span>
        </div>
        <div className="newcome-stat-div" />
        <div className="newcome-stat">
          <span className="newcome-stat-num">13</span>
          <span className="newcome-stat-label">Títulos de Liga</span>
        </div>
        <div className="newcome-stat-div" />
        <div className="newcome-stat">
          <span className="newcome-stat-num">14</span>
          <span className="newcome-stat-label">FA Cups</span>
        </div>
        <div className="newcome-stat-div" />
        <div className="newcome-stat">
          <span className="newcome-stat-num">60K</span>
          <span className="newcome-stat-label">Emirates Stadium</span>
        </div>
      </div>

      {/* ── FLECHA SCROLL ── */}
      <a href="#team" className={`newcome-scroll-arrow ${loaded ? "show" : ""}`}>
        <span className="newcome-scroll-text">Conoce el Equipo</span>
        <div className="newcome-arrow-icon">↓</div>
      </a>

    </div>
  );
}

export default Newcome;