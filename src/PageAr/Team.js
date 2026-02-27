// ============================================================
//  SECTOR: FRONTEND
//  Archivo: src/PageAr/Team.js
//  Descripción: Sección Equipo — Plantilla Arsenal 25/26
//  BACKEND: ❌ No requiere backend. Datos estáticos.
// ============================================================

import { useState, useEffect, useRef } from "react";
import SquadImg from "../assets/Squad.png";
import "./Team.css";

const plantilla = [
  {
    posicion: "🧤 Porteros",
    jugadores: ["David Raya", "Kepa Arrizabalaga", "Karl Hein"],
  },
  {
    posicion: "🛡️ Defensas",
    jugadores: [
      "Ben White",
      "William Saliba",
      "Gabriel Magalhães",
      "Ricardo Calafiori",
      "Cristhian Mosquera",
      "Myles Lewis-Skelly",
    ],
  },
  {
    posicion: "⚙️ Mediocampistas",
    jugadores: [
      "Martin Ødegaard",
      "Declan Rice",
      "Martin Zubimendi",
      "Kai Havertz",
      "Christian Nørgaard",
    ],
  },
  {
    posicion: "⚡ Delanteros",
    jugadores: [
      "Bukayo Saka",
      "Gabriel Martinelli",
      "Leandro Trossard",
      "Gabriel Jesus",
      "Viktor Gyökeres",
      "Noni Madueke",
    ],
  },
  {
    posicion: "🎯 Entrenador",
    jugadores: ["Mikel Arteta"],
  },
];

function Team() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Animación al entrar en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="team-wrapper" ref={ref}>

      {/* Título superior */}
      <div className={`team-header ${visible ? "show" : ""}`}>
        <div className="team-header-line" />
        <h2 className="team-header-title">Fútbol Club Arsenal</h2>
        <div className="team-header-line" />
      </div>

      {/* Contenido principal */}
      <div className="team-body">

        {/* LEFT — Imagen + botón */}
        <div className={`team-left ${visible ? "show" : ""}`}>
          <div className="team-img-wrap">
            <img src={SquadImg} alt="Plantilla Arsenal" className="team-img" />
          </div>
          <div className="team-squad-badge">
            Plantilla Arsenal 25/26
          </div>
        </div>

        {/* RIGHT — Lista de jugadores */}
        <div className={`team-right ${visible ? "show" : ""}`}>

          <h3 className="team-right-title">Equipo conformado por:</h3>

          <div className="team-grid">
            {plantilla.map((grupo, i) => (
              <div
                key={i}
                className="team-group"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <h4 className="team-group-title">{grupo.posicion}</h4>
                <ul className="team-group-list">
                  {grupo.jugadores.map((j, k) => (
                    <li key={k} className="team-player">
                      <span className="team-player-dot">•</span>
                      {j}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Flecha scroll hacia News */}
      <a href="#news" className={`team-scroll-arrow ${visible ? "show" : ""}`}>
        <span className="team-scroll-text">Noticias</span>
        <div className="team-arrow-icon">↓</div>
      </a>

    </div>
  );
}

export default Team;