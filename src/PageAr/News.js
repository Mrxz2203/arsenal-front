// ============================================================
//  SECTOR: FRONTEND
//  Archivo: src/PageAr/News.js
//  Descripción: Sección Noticias — 3 tarjetas con link externo
//  BACKEND: ❌ No requiere backend. Datos estáticos.
//           En el futuro las noticias podrían venir de una
//           API de Arsenal o de PostgreSQL.
// ============================================================

import { useEffect, useRef, useState } from "react";
import News1 from "../assets/00.png";
import News2 from "../assets/01.png";
import News3 from "../assets/02.png";
import "./News.css";

const noticias = [
  {
    img: News1,
    alt: "Arsenal vs Tottenham derby",
    desc: "El domingo trajo más alegría de día de derbi para los Gooners en todas partes, ya que vencimos al Tottenham Hotspur 4-1 por segunda vez esta temporada.",
    link: "https://www.arsenal.com/news/arsenal-analysed-secrets-our-success-spurs",
  },
  {
    img: News2,
    alt: "Arsenal 4-1 Tottenham galería",
    desc: "Aseguramos otra doble victoria en la liga sobre el Tottenham Hotspur el domingo, al imponernos por 4-1 en el derbi del norte de Londres.",
    link: "https://www.arsenal.com/news/gallery-41-photos-our-latest-spurs-4-1",
  },
  {
    img: News3,
    alt: "Mikel Arteta declaraciones",
    desc: "Declaraciones de Mikel Arteta",
    link: "https://www.arsenal.com/news/every-word-artetas-post-tottenham-presser-2",
  },
];

function News() {
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
    <div className="news-wrapper" ref={ref}>

      {/* ── Título ── */}
      <div className={`news-header ${visible ? "show" : ""}`}>
        <div className="news-header-line" />
        <h2 className="news-header-title">Últimas Noticias</h2>
        <div className="news-header-line" />
      </div>

      {/* ── Tarjetas ── */}
      <div className="news-grid">
        {noticias.map((noticia, i) => (
          <a
            key={i}
            href={noticia.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`news-card ${visible ? "show" : ""}`}
            style={{ transitionDelay: `${0.15 * i + 0.2}s` }}
          >
            {/* Imagen */}
            <div className="news-card-img-wrap">
              <img src={noticia.img} alt={noticia.alt} className="news-card-img" />
              <div className="news-card-overlay">
                <span className="news-card-read">Leer más →</span>
              </div>
            </div>

            {/* Descripción */}
            <p className="news-card-desc">{noticia.desc}</p>
          </a>
        ))}
      </div>

      {/* ── Flecha scroll hacia About ── */}
      <a href="#about" className={`news-scroll-arrow ${visible ? "show" : ""}`}>
        <span className="news-scroll-text">Acerca de</span>
        <div className="news-arrow-icon">↓</div>
      </a>

    </div>
  );
}

export default News;