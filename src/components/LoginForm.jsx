import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      const token = response.data.token;
      const requestUserName = response.data.username;
      const requestUserRole = response.data.roleUser;

      localStorage.setItem('token', token);
      localStorage.setItem('username', requestUserName);
      localStorage.setItem('roleUser', requestUserRole); 

      window.location.reload(); // Forzar recarga para refrescar estado de autenticación
    } catch (error) {
      alert("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Iniciar Sesión</h3>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default LoginForm;
