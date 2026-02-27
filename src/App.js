// ============================================================
//  SECTOR: FRONTEND
//  Archivo: src/App.js
//  Descripción: Enrutador principal del proyecto.
//               Aquí se conectan todas las páginas.
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";

// ── Páginas activas ──
import Welcome  from "./components/Welcome";
import Register from "./components/Register";
import Login from "./components/Login";
import PrincipalAr from "./PageAr/PrincipalAr";

// ── Próximamente ──
// import Login   from "./components/Login";
// import PageAr  from "./components/PageAr";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Welcome ── */}
        <Route path="/"         element={<Welcome />}  />

        {/* ── Register ── */}
        <Route path="/register" element={<Register />} />
{/* ── Login ── */}
        <Route path="/login" element={<Login />} />

        <Route path="/club" element={<PrincipalAr />} />
{/* ── PageAr ── */}
        {/* ── Próximas rutas ── */}
        {/* <Route path="/login" element={<Login />}  /> */}
        {/* <Route path="/club"  element={<PageAr />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;