import React, { useState, useEffect } from "react";
import Modal from 'bootstrap/js/dist/modal';
import api from '../axiosConfig';
//import axios from "axios";

{/*function SellerSearchForm({ onSelectSeller, onCancel }) {*/}
const SellerSearchForm = ({ onSelectSeller, onCancel }) => {
    const [sellers, setSellers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchSellers = async (nameFilter) => {
        try {
            //const res = await axios.get("http://localhost:8080/api/sellers", {
            //    params: { name: nameFilter || "" },
            //});

            const res = await api.get("/sellers", {
                params: { name: nameFilter || "" },
            });            

            if (Array.isArray(res.data)) {
                setSellers(res.data);
            } else {
                console.warn("Respuesta inesperada:", res.data);
                setSellers([]); // defensa contra estructura inesperada
            }
        } catch (err) {
            console.error("Error al obtener Vendedores:", err);
            setSellers([]); // evita que falle el map si hay error
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        fetchSellers(e.target.value);
    };

  const handleCancel = () => {
    const modalEl = document.getElementById('sellerModal');
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
      <h3>Seleccionar Vendedor</h3>
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
          {sellers.map((sel) => (
            <tr key={sel.idseller}>
              <td>{sel.typeId}</td>
              <td>{sel.identification}</td>
              <td>{sel.name}</td>
              <td>{sel.phone}</td>
              <td>{sel.adress}</td>
              <td>
                <button onClick={() => onSelectSeller(sel)}>Seleccionar</button>
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

export default SellerSearchForm;
