// ============================================================
//  SECTOR: FRONTEND + BACKEND
//  Archivo: src/components/Register.js
//  BACKEND: ✅ Conectado a FastAPI POST /api/register
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArsenalLogo from "../assets/Arsenal.png";
import "./Register.css";

function Register() {
  const [loaded, setLoaded]       = useState(false);
  const [showPass, setShowPass]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorServidor, setErrorServidor] = useState("");
  const [cargando, setCargando]   = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre:    "",
    apellido:  "",
    email:     "",
    usuario:   "",
    password:  "",
    confirmar: "",
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
    if (!form.nombre.trim())       err.nombre    = "El nombre es obligatorio.";
    if (!form.apellido.trim())     err.apellido  = "El apellido es obligatorio.";
    if (!form.email.includes("@")) err.email     = "Ingresa un email válido.";
    if (!form.usuario.trim())      err.usuario   = "El usuario es obligatorio.";
    if (form.password.length < 6)  err.password  = "Mínimo 6 caracteres.";
    if (form.password !== form.confirmar) err.confirmar = "Las contraseñas no coinciden.";
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
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:   form.nombre,
          apellido: form.apellido,
          email:    form.email,
          usuario:  form.usuario,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorServidor(data.detail || "Error al registrarse.");
        setCargando(false);
        return;
      }

      // Registro exitoso — ir al login
      navigate("/login");

    } catch (error) {
      setErrorServidor("No se pudo conectar con el servidor.");
      setCargando(false);
    }
  };

  return (
    <div className="register-wrapper">

      <div className={`reg-left ${loaded ? "show" : ""}`}>
        <div className="reg-left-inner">
          <img src={ArsenalLogo} alt="Arsenal FC" className="reg-logo" onClick={() => navigate("/")} />
          <h2 className="reg-left-title">Únete a los<br /><span>Gunners</span></h2>
          <p className="reg-left-desc">
            Crea tu cuenta y accede a noticias exclusivas,
            estadísticas del equipo e historia del club más
            apasionante del fútbol inglés.
          </p>
          <div className="reg-stats">
            <div className="reg-stat">
              <span className="reg-stat-num">13</span>
              <span className="reg-stat-label">Ligas</span>
            </div>
            <div className="reg-stat-div" />
            <div className="reg-stat">
              <span className="reg-stat-num">14</span>
              <span className="reg-stat-label">FA Cups</span>
            </div>
            <div className="reg-stat-div" />
            <div className="reg-stat">
              <span className="reg-stat-num">1886</span>
              <span className="reg-stat-label">Fundado</span>
            </div>
          </div>
          <div className="reg-left-motto">Victoria Concordia Crescit</div>
        </div>
      </div>

      <div className="reg-right">
        <div className={`reg-form-card ${loaded ? "show" : ""}`}>

          <div className="reg-form-header">
            <h1 className="reg-form-title">Crear cuenta</h1>
            <p className="reg-form-sub">
              ¿Ya tienes una cuenta?{" "}
              <span className="reg-link" onClick={() => navigate("/login")}>
                Inicia sesión
              </span>
            </p>
          </div>

          {errorServidor && (
            <div className="reg-server-error">{errorServidor}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            <div className="reg-row">
              <div className="reg-field">
                <label className="reg-label">Nombre</label>
                <input className={`reg-input ${errores.nombre ? "error" : ""}`}
                  type="text" name="nombre" placeholder="Ej: Mikel"
                  value={form.nombre} onChange={handleChange} />
                {errores.nombre && <span className="reg-error">{errores.nombre}</span>}
              </div>
              <div className="reg-field">
                <label className="reg-label">Apellido</label>
                <input className={`reg-input ${errores.apellido ? "error" : ""}`}
                  type="text" name="apellido" placeholder="Ej: Arteta"
                  value={form.apellido} onChange={handleChange} />
                {errores.apellido && <span className="reg-error">{errores.apellido}</span>}
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Correo electrónico</label>
              <input className={`reg-input ${errores.email ? "error" : ""}`}
                type="email" name="email" placeholder="correo@ejemplo.com"
                value={form.email} onChange={handleChange} />
              {errores.email && <span className="reg-error">{errores.email}</span>}
            </div>

            <div className="reg-field">
              <label className="reg-label">Nombre de usuario</label>
              <div className="reg-input-wrap">
                <span className="reg-input-prefix">@</span>
                <input className={`reg-input with-prefix ${errores.usuario ? "error" : ""}`}
                  type="text" name="usuario" placeholder="tu_usuario"
                  value={form.usuario} onChange={handleChange} />
              </div>
              {errores.usuario && <span className="reg-error">{errores.usuario}</span>}
            </div>

            <div className="reg-field">
              <label className="reg-label">Contraseña</label>
              <div className="reg-input-wrap">
                <input className={`reg-input with-suffix ${errores.password ? "error" : ""}`}
                  type={showPass ? "text" : "password"} name="password"
                  placeholder="Mínimo 6 caracteres"
                  value={form.password} onChange={handleChange} />
                <button type="button" className="reg-eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              {errores.password && <span className="reg-error">{errores.password}</span>}
            </div>

            <div className="reg-field">
              <label className="reg-label">Confirmar contraseña</label>
              <div className="reg-input-wrap">
                <input className={`reg-input with-suffix ${errores.confirmar ? "error" : ""}`}
                  type={showConfirm ? "text" : "password"} name="confirmar"
                  placeholder="Repite tu contraseña"
                  value={form.confirmar} onChange={handleChange} />
                <button type="button" className="reg-eye" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
              {errores.confirmar && <span className="reg-error">{errores.confirmar}</span>}
            </div>

            <button type="submit" className="reg-btn-submit" disabled={cargando}>
              {cargando ? "Registrando..." : "Crear mi cuenta →"}
            </button>

          </form>

          <p className="reg-terms">
            Al registrarte aceptas los{" "}
            <span className="reg-link">términos y condiciones</span>{" "}
            del Arsenal FC Fan Club.
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register;