// src/components/MeasurementList.jsx
import React, { useEffect, useState } from 'react';
import {
  getMeasurements,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
} from '../services/measurementService';
import MeasurementForm from './MeasurementForm';
import imgedit from '../assets/edit.png';
import imgdelete from '../assets/delete.png';

const MeasurementList = () => {
  const [measurements, setMeasurements] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchMeasurements = async () => {
    const res = await getMeasurements();
    setMeasurements(res.data);
  };

  useEffect(() => {
    fetchMeasurements();
  }, []);

  const handleSave = async (measurement) => {
    if (editing) {
      await updateMeasurement(editing.idmeasurement, measurement);
      setEditing(null);
    } else {
      await createMeasurement(measurement);
    }
    fetchMeasurements();
  };

  const handleEdit = (measurement) => setEditing(measurement);

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminarla?')) {
      await deleteMeasurement(id);
      fetchMeasurements();
    }
  };

  return (
    <>
      <hr />
      <h2>Parametrización de Unidades de Medidas</h2>
      <hr />
      <MeasurementForm onSubmit={handleSave} initialData={editing} />
      <hr />
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {measurements.map(m => (
            <tr key={m.idmeasurement}>
              <td>{m.idmeasurement}</td>
              <td>{m.name}</td>
              <td>{m.state ? 'Activa' : 'Inactiva'}</td>
              <td>
                <a onClick={() => handleEdit(m)}><img src={imgedit} title="Editar" alt="Editar" height="20"/></a>
                <a onClick={() => handleDelete(m.idmeasurement)}><img src={imgdelete} title="Eliminar" alt="Eliminar" height="20"/></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MeasurementList;
