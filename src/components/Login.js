// ============================================================
//  SECTOR: FRONTEND + BACKEND
//  Archivo: src/components/Login.js
//  BACKEND: ✅ Conectado a FastAPI POST /api/login
//           Recibe JWT token y lo guarda en localStorage
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArsenalLogo from "../assets/Arsenal.png";
import FondImg     from "../assets/Fond.png";
import "./Login.css";

function Login() {
  const [loaded, setLoaded]     = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errorServidor, setErrorServidor] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario:  "",
    password: "",
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
    setErrorServidor("");
  };

  const validar = () => {
    const err = {};
    if (!form.usuario.trim())  err.usuario  = "El usuario es obligatorio.";
    if (!form.password.trim()) err.password = "La contraseña es obligatoria.";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validar();
    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors);
      return;
    }

    setCargando(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario:  form.usuario,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorServidor(data.detail || "Usuario o contraseña incorrectos.");
        setCargando(false);
        return;
      }

      // ── Login exitoso — guardar token y datos ──
      localStorage.setItem("token",            data.access_token);
      localStorage.setItem("usuario_nombre",   data.nombre);
      localStorage.setItem("usuario_apellido", data.apellido);

      navigate("/club");

    } catch (error) {
      setErrorServidor("No se pudo conectar con el servidor.");
      setCargando(false);
    }
  };

  return (
    <div className="login-wrapper">

      <div className={`login-left ${loaded ? "show" : ""}`}>
        <img src={ArsenalLogo} alt="Arsenal FC" className="login-logo" />
        <h2 className="login-welcome-title">¡Bienvenido de vuelta!</h2>
        <div className="login-fond-wrap">
          <img src={FondImg} alt="Arsenal Equipo" className="login-fond-img" />
        </div>
        <p className="login-slogan">
          Una vez Gunner,<br />siempre Gunner.
        </p>
      </div>

      <div className={`login-right ${loaded ? "show" : ""}`}>
        <div className="login-form-card">

          <div className="login-form-header">
            <h1 className="login-form-title">Iniciar Sesión</h1>
            <p className="login-form-subtitle">
              ¿No tienes cuenta?{" "}
              <span className="login-link" onClick={() => navigate("/register")}>
                Regístrate aquí
              </span>
            </p>
          </div>

          {errorServidor && (
            <div className="login-server-error">{errorServidor}</div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>

            <div className="login-field">
              <label className="login-label">Usuario</label>
              <input
                className={`login-input ${errores.usuario ? "error" : ""}`}
                type="text" name="usuario"
                placeholder="Código institucional"
                value={form.usuario} onChange={handleChange}
              />
              {errores.usuario && <span className="login-error">{errores.usuario}</span>}
            </div>

            <div className="login-field">
              <label className="login-label">Contraseña</label>
              <div className="login-input-wrap">
                <input
                  className={`login-input with-suffix ${errores.password ? "error" : ""}`}
                  type={showPass ? "text" : "password"} name="password"
                  placeholder="Contraseña"
                  value={form.password} onChange={handleChange}
                />
                <span className="login-eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </span>
              </div>
              {errores.password && <span className="login-error">{errores.password}</span>}
            </div>

            <div className="login-btns">
              <button type="submit" className="login-btn-submit" disabled={cargando}>
                {cargando ? "Ingresando..." : "Iniciar Sesión"}
              </button>
              <button type="button" className="login-btn-cancel" onClick={() => navigate("/")}>
                Cancelar
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}

export default Login;