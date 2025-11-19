import React, { useState, useEffect } from "react";
import Modal from 'bootstrap/js/dist/modal';
import api from '../axiosConfig';
//import axios from "axios";

{/*function CustomerSearchForm({ onSelectCustomer, onCancel }) {*/}
const CustomerSearchForm = ({ onSelectCustomer, onCancel }) => {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchCustomers = async (nameFilter) => {
        try {
            //const res = await axios.get("http://localhost:8080/api/customer", {
            //    params: { name: nameFilter || "" },
            //});

            const res = await api.get("/customer", {
                params: { name: nameFilter || "" },
            });            

            if (Array.isArray(res.data)) {
                setCustomers(res.data);
            } else {
                console.warn("Respuesta inesperada:", res.data);
                setCustomers([]); // defensa contra estructura inesperada
            }
        } catch (err) {
            console.error("Error al obtener clientes:", err);
            setCustomers([]); // evita que falle el map si hay error
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        fetchCustomers(e.target.value);
    };

  const handleCancel = () => {
    const modalEl = document.getElementById('customerModal');
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
      <h3>Seleccionar Cliente</h3>
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
          {customers.map((cus) => (
            <tr key={cus.idcustomer}>
              <td>{cus.typeId}</td>
              <td>{cus.identification}</td>
              <td>{cus.name}</td>
              <td>{cus.phone}</td>
              <td>{cus.adress}</td>
              <td>
                <button onClick={() => onSelectCustomer(cus)}>Seleccionar</button>
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

export default CustomerSearchForm;
