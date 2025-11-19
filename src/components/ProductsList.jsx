// src/components/ProductsList.jsx
import React, { useEffect, useState } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService';
import ProductForm from './ProductForm';
import imgedit from '../assets/edit.png';
import imgdelete from '../assets/delete.png';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (product) => {
    if (editing) {
      await updateProduct(editing.idproduct, product);
      setEditing(null);
    } else {
      await createProduct(product);
    }
    fetchProducts();
  };

  const handleEdit = (product) => setEditing(product);

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminarlo?')) {
      await deleteProduct(Number(id));
      fetchProducts();
    }
  };

  return (
    <>
      <hr />
      <h2>Gestión de Productos</h2>
      <ProductForm onSubmit={handleSave} initialData={editing} />
      <hr />
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Código</th><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Categoría</th><th>Unidad</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.idproduct}>
              <td>{p.code}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>{p.namecategory}</td>
              <td>{p.namemeasurement}</td>
              <td>{p.state ? 'Activo' : 'Inactivo'}</td>
              <td>
                <a onClick={() => handleEdit(p)}><img src={imgedit} title="Editar" alt="Editar" height="20"/></a>
                <a onClick={() => handleDelete(p.idproduct)}><img src={imgdelete} title="Eliminar" alt="Eliminar" height="20"/></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductsList;
