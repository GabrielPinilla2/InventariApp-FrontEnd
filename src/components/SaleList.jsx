import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  deleteSale,
  getSales
} from "../services/saleService";
import { getSellers } from "../services/sellerService";
import { getCustomers } from "../services/customerService";
import { getProducts } from "../services/productService";
import imgedit from "../assets/edit.png";
import imgdelete from "../assets/delete.png";

const SaleList = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchSales = async () => {
    try {
      const res = await getSales();
      setSales(res.data);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };

  useEffect(() => {
    fetchSales();
    getSellers().then(res => setSellers(res.data));
    getCustomers().then(res => setCustomers(res.data));
    getProducts().then(res => setProducts(res.data));
  }, []);

  const handleEdit = (sale) => {
    navigate(`/sales/edit/${sale.idSale}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta venta?")) {
      try {
        await deleteSale(id);
        fetchSales();
      } catch (error) {
        console.error("Error al eliminar la venta:", error);
      }
    }
  };

  // Helpers para mostrar nombres
  const getSellerName = (id) => {
    const seller = sellers.find(s => s.idseller === id || s.id === id);
    return seller ? seller.name : id;
  };
  const getCustomerName = (id) => {
    const customer = customers.find(c => c.idcustomer === id || c.id === id);
    return customer ? customer.name : id;
  };
  const getProductName = (id) => {
    const product = products.find(p => p.idproduct === id || p.id === id);
    return product ? product.name : id;
  };

  return (
    <div className="container">
      <h2>Ventas</h2>

      <Link to="/sales/new" className="btn btn-primary mb-3">
        Nueva Venta
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendedor</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Observacion</th>
            <th>Estado</th>
            <th>Productos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <React.Fragment key={s.idSale}>
              <tr style={{ cursor: "pointer" }} onClick={() => setOpenDropdown(openDropdown === s.idSale ? null : s.idSale)}>
                <td>{s.idSale}</td>
                <td>{getSellerName(s.sellerId)}</td>
                <td>{getCustomerName(s.customerId)}</td>
                <td>{s.date}</td>
                <td>{s.totalAmount}</td>
                <td>{s.observation}</td>
                <td>{s.state ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <button className="btn btn-sm btn-info">
                    {openDropdown === s.idSale ? 'Ocultar' : 'Ver productos'}
                  </button>
                </td>
                <td>
                  <img
                    src={imgedit}
                    title="Editar"
                    alt="Editar"
                    height="20"
                    className="action-icon"
                    onClick={e => { e.stopPropagation(); handleEdit(s); }}
                  />
                  <img
                    src={imgdelete}
                    title="Eliminar"
                    alt="Eliminar"
                    height="20"
                    className="action-icon"
                    onClick={e => { e.stopPropagation(); handleDelete(s.idSale); }}
                  />
                </td>
              </tr>
              {openDropdown === s.idSale && s.products && (
                <tr>
                  <td colSpan="9">
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {s.products.map((prod, idx) => (
                        <li key={idx}>
                          {getProductName(prod.productId)} - Cantidad: {prod.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SaleList;
