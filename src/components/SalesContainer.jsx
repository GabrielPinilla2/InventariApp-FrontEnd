import React, { useState } from 'react';
import SaleForm from './SaleForm';
import SaleList from './SaleList';
import { createSale, updateSale } from '../services/saleService';

const SalesContainer = () => {
  const [editingSale, setEditingSale] = useState(null);

  const handleSave = async (sale) => {
    if (editingSale) {
      await updateSale(editingSale.idsale, sale);
      setEditingSale(null);
    } else {
      await createSale(sale);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ventas</h2>
      <SaleForm onSubmit={handleSave} initialData={editingSale} />
      <SaleList onEdit={setEditingSale} />
    </div>
  );
};

export default SalesContainer;
