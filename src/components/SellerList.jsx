// src/components/SellersList.jsx
import React, { useEffect, useState } from 'react';
import {
  getSellers,
  createSeller,
  updateSeller,
  deleteSeller,
} from '../services/sellerService';
import SellerForm from './SellerForm';
import imgedit from '../assets/edit.png';
import imgdelete from '../assets/delete.png';

const SellersList = () => {
  const [sellers, setSellers] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchSellers = async () => {
    const res = await getSellers();
    setSellers(res.data);
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleSave = async (seller) => {
    if (editing) {
      await updateSeller(editing.idseller, seller);
      setEditing(null);
    } else {
      await createSeller(seller);
    }
    fetchSellers();
  };

  const handleEdit = (seller) => setEditing(seller);

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminarlo?')) {
      await deleteSeller(Number(id));
      fetchSellers();
    }
  };

  return (
    <>
      <hr />
      <h2>Gestión de Vendedores</h2>
      <SellerForm onSubmit={handleSave} initialData={editing} />
      <hr />
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Identificación</th><th>Nombre</th><th>Teléfono</th><th>Dirección</th><th>Email</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map(s => (
            <tr key={s.idseller}>
              <td>{s.identification}</td>
              <td>{s.name}</td>
              <td>{s.phone}</td>
              <td>{s.adress}</td>
              <td>{s.email}</td>
              <td>{s.state ? 'Activo' : 'Inactivo'}</td>
              <td>
                <a onClick={() => handleEdit(s)}><img src={imgedit} title="Editar" alt="Editar" height="20"/></a>
                <a onClick={() => handleDelete(s.idseller)}><img src={imgdelete} title="Eliminar" alt="Eliminar" height="20"/></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SellersList;
