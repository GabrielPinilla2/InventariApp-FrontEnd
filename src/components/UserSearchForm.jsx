import React, { useState, useEffect } from "react";
import Modal from 'bootstrap/js/dist/modal';
import api from '../axiosConfig';
//import axios from "axios";

{/*function UserSearchForm({ onSelectUser, onCancel }) {*/}
const UserSearchForm = ({ onSelectUser, onCancel }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchUsers = async (nameFilter) => {
        try {
            //const res = await axios.get("http://localhost:8080/api/users", {
            //    params: { name: nameFilter || "" },
            //});

            const res = await api.get("/users", {
                params: { name: nameFilter || "" },
            });            

            if (Array.isArray(res.data)) {
                setUsers(res.data);
            } else {
                console.warn("Respuesta inesperada:", res.data);
                setUsers([]); // defensa contra estructura inesperada
            }
        } catch (err) {
            console.error("Error al obtener Usuarios:", err);
            setUsers([]); // evita que falle el map si hay error
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        fetchUsers(e.target.value);
    };

  const handleCancel = () => {
    const modalEl = document.getElementById('userModal');
    if (modalEl) {
      const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
      modal.hide();

      setTimeout(() => {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
      }, 300);
    }
  };


  return (
    <>
    <div >
      <h3>Seleccionar Vendedor</h3>
      <input
        value={search}
        onChange={handleSearchChange}
        placeholder="Buscar por nombre de Cliente"
      />
      <table>
        <thead>
          <tr><th>TipoId</th><th>Identificación</th><th>Nombre</th><th>Teléfono</th><th>Dirección</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.iduser}>
              <td>{u.typeId}</td>
              <td>{u.identification}</td>
              <td>{u.name}</td>
              <td>{u.phone}</td>
              <td>{u.adress}</td>
              <td>
                <button onClick={() => onSelectUser(u)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleCancel}>Cancelar</button>
    </div>
    </>
  );
}

export default UserSearchForm;
