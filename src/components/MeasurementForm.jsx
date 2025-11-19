// src/components/MeasurementForm.jsx
import React, { useState, useEffect } from 'react';

const MeasurementForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({ name: '', state: false });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', state: false });
  };

  const handleChangeState = (e) => {
    setForm({ ...form, state: e.target.checked });
  };

  return (
    <form className="mb-4 col-md-3" onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        name="name"
        placeholder="Nombre de la Unidad de medida"
        value={form.name}
        onChange={handleChange}
      />
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          id="stateCheckbox"      
          name="state"
          type="checkbox"
          checked={form.state}
          onChange={handleChangeState}
        />
        <label className="form-check-label" htmlFor="stateCheckbox">
          {form.state ? "Activa" : "Inactiva"}
        </label>
      </div>

      <button className="btn btn-success" type="submit">
        {initialData ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
};

export default MeasurementForm;
