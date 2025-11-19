// src/components/PersonList.jsx
import React, { useEffect, useState } from "react";
import {
  getPersons,
  deletePerson,
  updatePerson,
} from "../services/personService";
import { useNavigate } from "react-router-dom";
import imgedit from "../assets/edit.png";
import imgdelete from "../assets/delete.png";

const PersonList = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState([]);

  const fetchPersons = async () => {
    try {
      const res = await getPersons();
      setPersons(res.data);
    } catch (error) {
      console.error("Error al obtener personas:", error);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleAdd = () => {
    navigate("/persons/new");
  };

  const handleEdit = (person) => {
    navigate(`/persons/edit/${person.idperson}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta persona?")) {
      try {
        await deletePerson(id);
        fetchPersons();
      } catch (error) {
        console.error("Error al eliminar persona:", error);
      }
    }
  };

  return (
    <div>
      <hr />
      <h2 className="section-header">Gestión de Personas</h2>
      <hr />

      <div className="mb-3 text-center">
        <button className="btn btn-yellow" onClick={handleAdd}>
          Agregar Persona
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-custom">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo ID</th>
              <th>Identificación</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Fecha de Nac.</th>
              <th>Género</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((p) => (
              <tr key={p.idperson}>
                <td>{p.idperson}</td>
                <td>{p.typeId}</td>
                <td>{p.identification}</td>
                <td>{p.name}</td>
                <td>{p.adress}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>
                <td>
                  {p.birthdate
                    ? new Date(p.birthdate).toLocaleDateString()
                    : ""}
                </td>
                <td>{p.genre}</td>
                <td>
                  <img
                    src={imgedit}
                    title="Editar"
                    alt="Editar"
                    height="20"
                    className="action-icon"
                    onClick={() => handleEdit(p)}
                  />
                  <img
                    src={imgdelete}
                    title="Eliminar"
                    alt="Eliminar"
                    height="20"
                    className="action-icon"
                    onClick={() => handleDelete(p.idperson)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonList;
