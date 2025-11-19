// src/components/PersonForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPersonById,
  createPerson,
  updatePerson,
} from "../services/personService";

const PersonForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado inicial para campos de persona
  const [form, setForm] = useState({
    typeId: "",
    identification: "",
    name: "",
    adress: "",
    email: "",
    phone: "",
    birthdate: "",
    genre: "",
    state: true, // Mantengo “state” por si tu API espera este campo
  });

  // Cuando exista un “id” en la URL, traigo datos para editar
  useEffect(() => {
    if (id) {
      getPersonById(id)
        .then((res) => {
          const p = res.data;
          setForm({
            typeId: p.typeId || "",
            identification: p.identification || "",
            name: p.name || "",
            adress: p.adress || "",
            email: p.email || "",
            phone: p.phone || "",
            birthdate: p.birthdate
              ? p.birthdate.substring(0, 10)
              : "", // convierto a “YYYY-MM-DD”
            genre: p.genre || "",
            state: p.state ?? true,
          });
        })
        .catch((err) => {
          console.error("Error cargando persona:", err);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Se disparó handleSubmit con:", form);

    try {
      if (id) {
        await updatePerson(id, form);
      } else {
        await createPerson(form);
      }
      // Si la petición va bien, redirijo a la lista:
      navigate("/persons");
    } catch (error) {
      console.error("Error guardando persona:", error);
      alert("Ocurrió un error al guardar. Revisa la consola para más detalles.");
    }
  };

  const handleCancel = () => {
    navigate("/persons");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setForm({ ...form, [name]: checked });
  };

  return (
    <div>
      <hr />
      <h2 className="section-header">
        {id ? "Editar Persona" : "Nueva Persona"}
      </h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="container">
          {/* --- Fila 1: typeId y identification --- */}
          <div className="row justify-content-center mb-3">
            <div className="col-md-3">
              <label htmlFor="typeId" className="form-label">
                Tipo ID
              </label>
              <input
                id="typeId"
                name="typeId"
                className="form-control"
                placeholder="Ej: CC, TI..."
                value={form.typeId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="identification" className="form-label">
                Identificación
              </label>
              <input
                id="identification"
                name="identification"
                className="form-control"
                placeholder="Núm. de documento"
                value={form.identification}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* --- Fila 2: name y address --- */}
          <div className="row justify-content-center mb-3">
            <div className="col-md-3">
              <label htmlFor="name" className="form-label">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                className="form-control"
                placeholder="Nombre y Apellido"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="adress" className="form-label">
                Dirección
              </label>
              <input
                id="adress"
                name="adress"
                className="form-control"
                placeholder="Dirección"
                value={form.adress}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* --- Fila 3: email y phone --- */}
          <div className="row justify-content-center mb-3">
            <div className="col-md-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Ej: 3001234567"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* --- Fila 4: birthdate y genre --- */}
          <div className="row justify-content-center mb-3">
            <div className="col-md-3">
              <label htmlFor="birthdate" className="form-label">
                Fecha de Nacimiento
              </label>
              <input
                id="birthdate"
                name="birthdate"
                type="date"
                className="form-control"
                value={form.birthdate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="genre" className="form-label">
                Género
              </label>
              <select
                id="genre"
                name="genre"
                className="form-select"
                value={form.genre}
                onChange={handleChange}
              >
                <option value="">Seleccione...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
            </div>
          </div>

          {/* --- Fila opcional: estado --- */}
          <div className="row justify-content-center mb-3">
            <div className="col-md-3 d-flex align-items-center">
              <input
                className="form-check-input me-2"
                id="stateCheckbox"
                name="state"
                type="checkbox"
                checked={form.state}
                onChange={handleChangeCheckbox}
              />
              <label
                className="form-check-label"
                htmlFor="stateCheckbox"
                style={{ userSelect: "none" }}
              >
                {form.state ? "Activo" : "Inactivo"}
              </label>
            </div>
          </div>

          {/* --- Botones Guardar y Cancelar --- */}
          <div className="row form-button-row justify-content-center">
            <div className="col-md-3 text-center mb-2">
              {/* El botón tiene type="submit" para invocar handleSubmit */}
              <button className="btn btn-yellow w-100" type="submit">
                {id ? "Actualizar" : "Agregar"}
              </button>
            </div>
            <div className="col-md-3 text-center mb-2">
              <button
                className="btn btn-cancel w-100"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
