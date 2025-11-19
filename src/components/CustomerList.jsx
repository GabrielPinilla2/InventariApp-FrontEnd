// src/components/CustomersList.jsx
import React, { useEffect, useState } from 'react';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../services/customerService';
import CustomerForm from './CustomerForm';
import imgedit from '../assets/edit.png';
import imgdelete from '../assets/delete.png';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchCustomers = async () => {
    const res = await getCustomers();
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSave = async (customer) => {
    if (editing) {
      await updateCustomer(editing.idcustomer, customer);
      setEditing(null);
    } else {
      await createCustomer(customer);
    }
    fetchCustomers();
  };

  const handleEdit = (customer) => setEditing(customer);

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminarlo?')) {
      await deleteCustomer(Number(id));
      fetchCustomers();
    }
  };

  return (
    <>
      <hr />
      <h2>Gestión de Clientes</h2>
      <CustomerForm onSubmit={handleSave} initialData={editing} />
      <hr />
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Identificación</th><th>Nombre</th><th>Teléfono</th><th>Dirección</th><th>Email</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(p => (
            <tr key={p.idcustomer}>
              <td>{p.identification}</td>
              <td>{p.name}</td>
              <td>{p.phone}</td>
              <td>{p.adress}</td>
              <td>{p.email}</td>
              <td>{p.state ? 'Activo' : 'Inactivo'}</td>
              <td>
                <a onClick={() => handleEdit(p)}><img src={imgedit} title="Editar" alt="Editar" height="20"/></a>
                <a onClick={() => handleDelete(p.idcustomer)}><img src={imgdelete} title="Eliminar" alt="Eliminar" height="20"/></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomersList;
