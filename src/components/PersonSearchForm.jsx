import React, { useState, useEffect } from "react";
import Modal from 'bootstrap/js/dist/modal';
import api from '../axiosConfig';

const PersonSearchForm = ({ onSelectPerson, onCancel }) => {
    const [persons, setPersons] = useState([]);
    const [search, setSearch] = useState("");

    const fetchPersons = async (nameFilter) => {
        try {
            const res = await api.get("/persons", {
                params: { name: nameFilter || "" },
            });            

            if (Array.isArray(res.data)) {
                setPersons(res.data);
            } else {
                console.warn("Respuesta inesperada:", res.data);
                setPersons([]); // defensa contra estructura inesperada
            }
        } catch (err) {
            console.error("Error al obtener Personas:", err);
            setPersons([]); // evita que falle el map si hay error
        }
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        fetchPersons(e.target.value);
    };

  const handleCancel = () => {
    const modalEl = document.getElementById('personModal');
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
      <h3>Seleccionar Persona</h3>
      <input
        value={search}
        onChange={handleSearchChange}
        placeholder="Buscar por nombre de Persona"
      />
      <table>
        <thead>
          <tr><th>TipoId</th><th>Identificación</th><th>Nombre</th><th>Teléfono</th><th>Dirección</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {persons.map((cus) => (
            <tr key={cus.idperson}>
              <td>{cus.typeId}</td>
              <td>{cus.identification}</td>
              <td>{cus.name}</td>
              <td>{cus.phone}</td>
              <td>{cus.adress}</td>
              <td>
                <button onClick={() => onSelectPerson(cus)}>Seleccionar</button>
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

export default PersonSearchForm;
