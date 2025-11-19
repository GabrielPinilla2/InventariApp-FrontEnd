// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'bootstrap/js/dist/modal';
import PersonSearchForm from './PersonSearchForm'

const UserForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState( initialData || {
    username: '', password: '', roleUser: '', idperson: '', name: '', typeId: '', identification: '', adress: '', phone: '', state: false 
  });

  const handlePersonSelect = (person) => {
    console.log("idPerson: "+person.idperson);
    console.log("NamePerson: "+person.name);
    setForm({ ...form, idperson: person.idperson, typeId: person.typeId, identification: person.identification, name: person.name, adress: person.adress, phone: person.phone});

    const modalEl = document.getElementById('personModal');
    if (modalEl) {
      // ✅ Mover foco antes de cerrar el modal
      const focusTarget = document.getElementById('btnOpenPersonModal');
      if (focusTarget) focusTarget.focus();

      const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
      modal.hide();

      // ⚠️ Esperar un poco y eliminar backdrop si quedó atascado
      setTimeout(() => {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'auto';  
      }, 300);
    }    
  };
  //*---------------------------*/  

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ username: '', password: '', roleUser: '', idperson: '', name: '', typeId: '', identification: '', adress: '', phone: '', state: false });
  };

  const handleChangeState = (e) => {
    setForm({ ...form, state: e.target.checked });
  };

  return (
    <>
    {/* <h2>{initialData ? "Editar Cliente" : "Crear Cliente"}</h2> */}
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="container">
        <div className="row">
            <div className="col-md-3">
                <label className="form-text-label" htmlFor="username">Nombre de Usuario</label>         
                <input
                className="form-control mb-2"
                id="username"
                name="username"
                placeholder="Usuario"
                readOnly={initialData ? true : false}
                value={form.username}
                onChange={handleChange}
                />                 
            </div>
            <div className="col-md-3">
                <label className="form-text-label" htmlFor="password">Password</label>         
                <input
                className="form-control mb-2"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                readOnly={initialData ? true : false}
                value={form.password}
                onChange={handleChange}
                />                 
            </div>
            <div className="col-md-3">
                <label className="form-text-label" htmlFor="roleUser">Rol de Usuario</label> 
                <select
                    id="roleUser"
                    name="roleUser"
                    className="form-select"
                    value={form.roleUser}
                    onChange={handleChange}
                >
                <option value="">Seleccione...</option>
                <option value="ADMIN">Administrador</option>
                <option value="SELLER">Vendedor</option>
                <option value="CUSTOMER">Cliente</option>
              </select>                
            </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="form-text-label" htmlFor="identification">Identificación</label>         
            <input
              className="form-control mb-2"
              id="identification"
              name="identification"
              placeholder="Id. de Persona"
              readOnly={true}
              value={form.identification || "No seleccionada"}
              onChange={handleChange}
            /> 
          </div>

          {/* Seleccionar Categorìa */}
          <div className="col-md-1">
            <label className="form-text-label" htmlFor="btnOpenPersonModal">Selec.</label> 
            <button id="btnOpenPersonModal" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#personModal">
              ...
            </button>             
          </div>

          <div className="col-md-8">
            <label className="form-text-label" htmlFor="name">Nombre de Persona</label>         
            <input
              className="form-control mb-2"
              id="name"
              name="name"
              placeholder="Nombre de Cliente"
              readOnly={true}
              value={form.name || "No seleccionada"}
              onChange={handleChange}
            /> 
          </div>          
        </div>
        
        <div className="row">
          <div className="form-check col-md-2">
            <br />
            <input
              className="form-check-input"
              id="stateCheckbox"      
              name="state"
              type="checkbox"
              checked={form.state}
              onChange={handleChangeState}
            />
            <label className="form-check-label" htmlFor="stateCheckbox">
              {form.state ? "Activo" : "Inactivo"}
            </label>
          </div>
          <div className="col-md-2">
            <br />
            <button className="btn btn-success" type="submit">
              {initialData ? 'Actualizar' : 'Agregar'}
            </button>             
          </div>
        </div>

      </div>  
    </form>

    {/* modal Person */}
    <div className="modal fade" id="personModal" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar Persona</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <PersonSearchForm onSelectPerson={handlePersonSelect} onCancel={() => {/* cerrar modal manual si quieres */}} />
          </div>
        </div>
      </div>
    </div>   

    </>
  );
};

export default UserForm;
