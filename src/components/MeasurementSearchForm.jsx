import React, { useState, useEffect } from "react";
import Modal from 'bootstrap/js/dist/modal';
import api from '../axiosConfig';
//import axios from "axios";

{/*function MeasurementSearchForm({ onSelectMeasurement, onCancel }) {*/}
const MeasurementSearchForm = ({ onSelectMeasurement, onCancel }) => {
  const [measurements, setMeasurements] = useState([]);
  const [search, setSearch] = useState("");

const fetchMeasurements = async (nameFilter) => {
try {
    //const res = await axios.get("http://localhost:8080/api/measurement", {
    //params: { name: nameFilter || "" },
    //});

    const res = await api.get("/measurement", {
        params: { name: nameFilter || "" },
    });     

    if (Array.isArray(res.data)) {
    setMeasurements(res.data);
    } else {
    console.warn("Respuesta inesperada:", res.data);
    setMeasurements([]); // defensa contra estructura inesperada
    }

} catch (err) {
    console.error("Error al obtener categorías:", err);
    setMeasurements([]); // evita que falle el map si hay error
}
};  

  useEffect(() => {
    fetchMeasurements();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    fetchMeasurements(e.target.value);
  };

  const handleCancel = () => {
    const modalEl = document.getElementById('measurementModal');
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
      <h3>Seleccionar Unidad de Medida</h3>
      <input
        value={search}
        onChange={handleSearchChange}
        placeholder="Buscar por nombre de unidad de medida"
      />
      <table>
        <thead>
          <tr><th>Nombre</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {measurements.map((mea) => (
            <tr key={mea.idmeasurement}>
              <td>{mea.name}</td>
              <td>
                <button onClick={() => onSelectMeasurement(mea)}>Seleccionar</button>
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

export default MeasurementSearchForm;
