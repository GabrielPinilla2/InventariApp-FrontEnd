// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'bootstrap/js/dist/modal';
import CategorySearchForm from './CategorySearchForm'
import MeasurementSearchForm from './MeasurementSearchForm'

const ProductForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState( initialData || {
    code: '', name: '', price: '', stock: '', stockmin: '', stockmax: '', idcategory: '', namecategory: '', idmeasurement:'', namemeasurement:'', state: false 
  });


  //** For Show Category Selector
  //const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  //** For Show Measurement Selector
  //const [showMeasurementForm, setShowMeasurementForm] = useState(false);

  const handleCategorySelect = (category) => {
    console.log("idCategory: "+category.idcategory);
    console.log("NameCategory: "+category.name);
    setForm({ ...form, idcategory: category.idcategory, namecategory: category.name});
    //setShowCategoryForm(false);

    const modalEl = document.getElementById('categoryModal');
    if (modalEl) {
      // ✅ Mover foco antes de cerrar el modal
      const focusTarget = document.getElementById('btnOpenCategoryModal');
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

  const handleMeasurementSelect = (measurement) => {
    console.log("idMeasurement: "+measurement.idmeasurement);
    console.log("NameMeasurement: "+measurement.name);      
    setForm({ ...form, idmeasurement: measurement.idmeasurement, namemeasurement: measurement.name});
    //setShowMeasurementForm(false);

    const modalEl = document.getElementById('measurementModal');
    if (modalEl) {
      // ✅ Mover foco antes de cerrar el modal
      const focusTarget = document.getElementById('btnOpenMeasurementModal');
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

  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/products", {
      name: product.name,
      price: product.price,
      idcategory: product.idcategory,
    });
    // manejo de redirección o confirmación
  };
  */ 
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ code: '', name: '', price: '', stock: '', stockmin: '', stockmax: '', namecategory: '', idmeasurement:'', namemeasurement:'', state: false });
  };

  const handleChangeState = (e) => {
    setForm({ ...form, state: e.target.checked });
  };

  return (
    <>
    {/* <h2>{initialData ? "Editar Producto" : "Crear Producto"}</h2> */}
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
          <label className="form-check-label" htmlFor="code">Código</label>
          <input
            className="form-control mb-2"
            id="code"
            name="code"
            placeholder="Código del Producto"
            value={form.code}
            onChange={handleChange}
          />
          </div>
          <div className="col-md-4">
          <label className="form-check-label" htmlFor="name">Nombre</label>
          <input
            className="form-control mb-2"
            id="name"
            name="name"
            placeholder="Nombre del producto"
            value={form.name}
            onChange={handleChange}
          />
          </div>
          <div className="col-md-4">
          <label className="form-check-label" htmlFor="price">Precio</label>         
          <input
            className="form-control mb-2"
            id="price"
            name="price"
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
          />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-4">
          <label className="form-check-label" htmlFor="stock">Cantidad</label>
          <input
            className="form-control mb-2"
            id="stock"
            name="stock"
            type="number"
            placeholder="Cantidad en Stock"
            value={form.stock}
            onChange={handleChange}
          />
          </div>
          <div className="col-md-4">
          <label className="form-check-label" htmlFor="stockmin">Stock Mínimo</label>
          <input
            className="form-control mb-2"
            id="stockmin"
            name="stockmin"
            type="number"
            placeholder="Stock Mínimo"
            value={form.stockmin}
            onChange={handleChange}
          />
          </div>
          <div className="col-md-4">
          <label className="form-check-label" htmlFor="stockmax">Stock Máximo</label>
          <input
            className="form-control mb-2"
            id="stockmax"
            name="stockmax"
            type="number"
            placeholder="Stock Máximo"
            value={form.stockmax}
            onChange={handleChange}
          />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-3">
            <label className="form-text-label" htmlFor="idcategory">Categoría</label>         
            <input
              className="form-control mb-2"
              id="idcategory"
              name="idcategory"
              placeholder="Categoría"
              readOnly={true}
              value={form.namecategory || "No seleccionada"}
              onChange={handleChange}
            /> 
          </div>

          {/* Seleccionar Categorìa */}
          <div className="col-md-1">
            <label className="form-text-label" htmlFor="btnOpenCategoryModal">Selec.</label> 
            <button id="btnOpenCategoryModal" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#categoryModal">
              ...
            </button>             
          </div>

          <div className="col-md-3">
            <label className="form-text-label" htmlFor="idmeasurement">Unidad de Medida</label>         
            <input
              className="form-control mb-2"
              id="idmeasurement"
              name="idmeasurement"
              placeholder="Unidad Medida"
              readOnly={true}
              value={form.namemeasurement || "No seleccionado"}
              onChange={handleChange}
            />
          </div>  

          {/* Seleccionar Unidad de medida */}
          <div className="col-md-1">
            <label className="form-text-label" htmlFor="btnOpenMeasurementModal">Selec.</label> 
            <button id="btnOpenMeasurementModal" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#measurementModal">
              ...
            </button>             
          </div>          

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

    {/*{showCategoryForm && (
      <CategorySearchForm onSelectCategory={handleCategorySelect} onCancel={() => setShowCategoryForm(false)} />
    )} */}
    {/*{showMeasurementForm && (
      <MeasurementSearchForm onSelectMeasurement={handleMeasurementSelect} onCancel={() => setShowMeasurementForm(false)} />
    )} */}

    {/* modal Category */}
    <div className="modal fade" id="categoryModal" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar Categoría</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <CategorySearchForm onSelectCategory={handleCategorySelect} onCancel={() => {/* cerrar modal manual si quieres */}} />
          </div>
        </div>
      </div>
    </div>

    {/* modal Measurement*/}
    <div className="modal fade" id="measurementModal" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar Unidad de medida</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <MeasurementSearchForm onSelectMeasurement={handleMeasurementSelect} onCancel={() => {/* cerrar modal manual si quieres */}} />
          </div>
        </div>
      </div>
    </div>        

    </>
  );
};

export default ProductForm;
