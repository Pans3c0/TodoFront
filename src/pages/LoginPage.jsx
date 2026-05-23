import React, { useState, useEffect } from "react"; // <-- Importa useEffect
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import styles from "../styles/Auth.module.css";

const LoginPage = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombreUsuario: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const navegar = useNavigate();

  // --- NUEVA DEFENSA: Redirigir si ya está logueado ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navegar("/tareas", { replace: true });
    }
  }, [navegar]);
  // ----------------------------------------------------

  const manejarCambio = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    // ... tu código de envío se queda exactamente igual ...
    e.preventDefault();
    try {
      const respuesta = await api.post("/auth/login", datosFormulario);
      const datos = respuesta.data;
      if (!datos.token || !datos.usuario) {
        console.error("❌ Respuesta incompleta del servidor:", datos);
        setError("Respuesta inválida del servidor");
        return;
      }

      localStorage.setItem("token", datos.token);
      localStorage.setItem("loggedUser", JSON.stringify(datos.usuario));

      navegar("/tareas");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Usuario o contraseña incorrectos");
      } else {
        setError("No se pudo conectar con el servidor");
      }
    }
  };

  return (
    // ... tu JSX se queda exactamente igual ...
    <div className={styles.container}>{/* ... */}</div>
  );
};

export default LoginPage;
