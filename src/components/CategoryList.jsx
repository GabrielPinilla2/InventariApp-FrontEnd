// src/components/CategoryList.jsx
import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../services/categoryService";
import { useNavigate } from "react-router-dom";
import imgedit from "../assets/edit.png";
import imgdelete from "../assets/delete.png";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    navigate("/categories/new");
  };

  const handleEdit = (category) => {
    navigate(`/categories/edit/${category.idcategory}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminarla?")) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.error("Error al eliminar categoría:", error);
      }
    }
  };

  return (
    <div>
      <hr />
      <h2>Parametrización de Categorías</h2>
      <hr />

      <div className="mb-3 text-center">
        <button className="btn btn-yellow" onClick={handleAdd}>
          Agregar Categoría
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-custom">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.idcategory}>
                <td>{c.idcategory}</td>
                <td>{c.name}</td>
                <td>{c.state ? "Activa" : "Inactiva"}</td>
                <td>
                  <img
                    src={imgedit}
                    title="Editar"
                    alt="Editar"
                    height="20"
                    className="action-icon"
                    onClick={() => handleEdit(c)}
                  />
                  <img
                    src={imgdelete}
                    title="Eliminar"
                    alt="Eliminar"
                    height="20"
                    className="action-icon"
                    onClick={() => handleDelete(c.idcategory)}
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

export default CategoryList;
