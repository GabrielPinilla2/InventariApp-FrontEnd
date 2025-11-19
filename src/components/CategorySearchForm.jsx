import React, { useState, useEffect } from "react";
import Modal from 'bootstrap/js/dist/modal';
import api from '../axiosConfig';
//import axios from "axios";

{/*function CategorySearchForm({ onSelectCategory, onCancel }) {*/}
const CategorySearchForm = ({ onSelectCategory, onCancel }) => {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    const fetchCategories = async (nameFilter) => {
        try {
            //const res = await axios.get("http://localhost:8080/api/categories", {
            //    params: { name: nameFilter || "" },
            //});

            const res = await api.get("/categories", {
                params: { name: nameFilter || "" },
            });            

            if (Array.isArray(res.data)) {
                setCategories(res.data);
            } else {
                console.warn("Respuesta inesperada:", res.data);
                setCategories([]); // defensa contra estructura inesperada
            }
        } catch (err) {
            console.error("Error al obtener categorías:", err);
            setCategories([]); // evita que falle el map si hay error
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        fetchCategories(e.target.value);
    };

  const handleCancel = () => {
    const modalEl = document.getElementById('categoryModal');
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
      <h3>Seleccionar Categoría</h3>
      <input
        value={search}
        onChange={handleSearchChange}
        placeholder="Buscar por nombre de Categoría"
      />
      <table>
        <thead>
          <tr><th>Nombre</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.idcategory}>
              <td>{cat.name}</td>
              <td>
                <button onClick={() => onSelectCategory(cat)}>Seleccionar</button>
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

export default CategorySearchForm;
