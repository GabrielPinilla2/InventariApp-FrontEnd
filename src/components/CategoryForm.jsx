// src/components/CategoryForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCategoryById,
  createCategory,
  updateCategory,
} from "../services/categoryService";

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", state: true });

  useEffect(() => {
    if (id) {
      getCategoryById(id)
        .then((res) => {
          setForm({
            name: res.data.name || "",
            state: res.data.state ?? true,
          });
        })
        .catch((err) => {
          console.error("Error cargando categoría:", err);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCategory(id, form);
      } else {
        await createCategory(form);
      }
      navigate("/categories");
    } catch (error) {
      console.error("Error guardando categoría:", error);
      alert("Ocurrió un error al guardar la categoría.");
    }
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeState = (e) => {
    const { name, checked } = e.target;
    setForm({ ...form, [name]: checked });
  };

  return (
    <div>
      <hr />
      <h2>
        {id ? "Editar Categoría" : "Nueva Categoría"}
      </h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="container">
          {/* Campo “Nombre de la Categoría” */}
          <div className="row justify-content-center mb-3">
            <div className="col-md-6">
              {/* <label htmlFor="name" className="form-label">
                Nombre de la Categoría
              </label> */}
              <input
                id="name"
                name="name"
                className="form-control"
                placeholder="Nombre de la Categoría"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Checkbox “Estado” */}
          <div className="row justify-content-center mb-3">
            <div className="col-md-6 d-flex align-items-center">
              <input
                className="form-check-input me-2"
                id="stateCheckbox"
                name="state"
                type="checkbox"
                checked={form.state}
                onChange={handleChangeState}
              />
              <label
                className="form-check-label"
                htmlFor="stateCheckbox"
                style={{ userSelect: "none" }}
              >
                {form.state ? "Activa" : "Inactiva"}
              </label>
            </div>
          </div>

          {/* Botones “Agregar / Actualizar” y “Cancelar” */}
          <div className="row form-button-row justify-content-center">
            <div className="col-md-3 text-center mb-2">
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

export default CategoryForm;
