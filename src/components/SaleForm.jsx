import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSales,
  createSale,
  updateSale,
  getSaleById,
} from "../services/saleService";

const SaleForm = () => {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");

  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Estado para el formulario de venta
  const [form, setForm] = useState({
    customerId: null,
    sellerId: null,
    date: "",
    products: [],
    state: true
  });

  // Estado para los vendedores
  const [sellers, setSellers] = useState([]);

  // Cargar clientes
  useEffect(() => {
    fetch("https://inventariapp.jdav01.duckdns.org/api/sellers")
      .then(res => res.json())
      .then(data => setSellers(data));
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar clientes
  useEffect(() => {
    fetch("https://inventariapp.jdav01.duckdns.org/api/customer")
      .then(res => res.json())
      .then(data => setClientes(data));
  }, []);

  // Cargar productos
  useEffect(() => {
    fetch("https://inventariapp.jdav01.duckdns.org/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Filtro de clientes
  const clientesFiltrados = clientes.filter(c =>
    c.name.toLowerCase().includes(filtro.toLowerCase())
  );

  // Filtro de productos
  useEffect(() => {
    const result = products.filter(p =>
      p.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchProduct, products]);

  const seleccionarCliente = (nombre) => {
    setClienteSeleccionado(nombre);
    setFiltro(nombre);
    // Buscar el cliente completo y actualizar en form
    const cliente = clientes.find(c => c.name === nombre);
    setForm(prev => ({ ...prev, customerId: cliente ? cliente.idcustomer : null }));
  };

  // Cuando exista un “id” en la URL, traigo datos para editar
    useEffect(() => {
      if (id) {
        getSaleById(id)
          .then((res) => {
            const s = res.data;
            setForm({
              customerId: s.customerId || "",
              sellerId: s.sellerId || "",
              date: s.date,
              products: s.products || [],
              state: s.state ?? true
            });

            // Llenar carrito con los productos de la venta
            if (Array.isArray(s.products)) {
              // Buscar los datos completos de cada producto
              const cartFromSale = s.products.map(prod => {
                const prodData = products.find(p => p.idproduct === prod.productId);
                return {
                  id: prod.productId,
                  name: prodData ? prodData.name : '',
                  price: prodData ? prodData.price : 0,
                  quantity: prod.quantity
                };
              });
              setCart(cartFromSale);
            }

            // Llenar filtro y cliente seleccionado
            const cliente = clientes.find(c => c.idcustomer === s.customerId);
            if (cliente) {
              setFiltro(cliente.name);
              setClienteSeleccionado(cliente.name);
            }
          })
          .catch((err) => {
            console.error("Error cargando ventas:", err);
          });
      }
    }, [id, products, clientes]);

  const addProduct = (product) => {
    const existing = cart.find(p => p.id === product.idproduct);
    let newCart;
    if (existing) {
      newCart = cart.map(p =>
        p.id === product.idproduct
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    } else {
      newCart = [
        ...cart,
        {
          id: product.idproduct,
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ];
    }
    setCart(newCart);
    // Actualizar products en form como SaleProductDTO
    const productsList = newCart.map(p => ({ productId: p.id, quantity: p.quantity }));
    setForm(prev => ({ ...prev, products: productsList }));
  };

  const updateQuantity = (id, value) => {
    const newCart = cart.map(p =>
      p.id === id ? { ...p, quantity: parseInt(value) || 1 } : p
    );
    setCart(newCart);
    // Actualizar products en form como SaleProductDTO
    const productsList = newCart.map(p => ({ productId: p.id, quantity: p.quantity }));
    setForm(prev => ({ ...prev, products: productsList }));
  };

  useEffect(() => {
    const sum = cart.reduce((acc, p) => acc + (p.price * p.quantity), 0);
    setTotal(sum);
  }, [cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Se disparó handleSubmit");

    // Validar datos mínimos
    if (!form.customerId || !form.products.length || !form.sellerId) {
      alert("Debes seleccionar un cliente, un vendedor y al menos un producto.");
      return;
    }

    // La fecha se envía como YYYY-MM-DD
    const saleData = {
      customerId: form.customerId,
      sellerId: form.sellerId,
      date: form.date,
      products: form.products,
      state: true
    };

    try {
      if (id) {
        console.log("Actualizando venta...");
        await updateSale(id, saleData);
      } else {
        console.log("Creando venta...");
        await createSale(saleData);
      }
      // Si la petición va bien, redirijo a la lista:
      navigate("/sales");
    } catch (error) {
      console.error("Error guardando la venta: " + error.message);
      alert("Ocurrió un error al guardar. Revisa la consola para más detalles.");
    }
  };
  
  const handleCancel = () => {
    navigate("/sales");
  };

  return (
    <div className="container">
      <h2>Nueva Venta</h2>

      <form onSubmit={handleSubmit}>
        {/* Buscar cliente */}
        <div className="mb-3">
          <label>Buscar Cliente</label>
          <input
            type="text"
            className="form-control"
            value={filtro}
            onChange={(e) => {
              setFiltro(e.target.value);
              setClienteSeleccionado("");
            }}
            placeholder="Escribe el nombre..."
          />
        </div>

        {/* Sugerencias clientes */}
        {filtro && (
          <ul className="list-group mb-3">
            {clientesFiltrados.map(c => (
              <li
                key={c.idcustomer}
                className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }}
                onClick={() => seleccionarCliente(c.name)}
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}

        {/* Cliente seleccionado */}
        <div className="mb-3">
          <label>Cliente seleccionado</label>
          <input
            type="text"
            className="form-control"
            value={clienteSeleccionado}
            readOnly
          />
        </div>

        {/* Fecha */}
        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>

        {/* Vendedor */}
        <div className="mb-3">
          <label>Vendedor</label>
          <select
            className="form-control"
            value={form.sellerId || ''}
            onChange={e => setForm(prev => ({ ...prev, sellerId: Number(e.target.value) }))}
            required
          >
            <option value="">Seleccione un vendedor</option>
            {sellers.map(s => (
              <option key={s.idseller} value={s.idseller}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Buscar producto */}
        <div className="mb-3">
          <label>Buscar Producto</label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto..."
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />

          <div className="mt-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
            {filteredProducts.map(p => (
              <button
                type="button"
                key={p.idproduct}
                className="btn btn-outline-primary btn-sm m-1"
                onClick={() => addProduct(p)}
              >
                {p.name} - ${p.price}
              </button>
            ))}
          </div>
        </div>

        {/* Carrito */}
        <h5>Productos seleccionados</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    value={p.quantity}
                    onChange={(e) => updateQuantity(p.id, e.target.value)}
                  />
                </td>
                <td>${p.price * p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Total: ${total}</h4>

        {/* --- Botones Guardar y Cancelar --- */}
          <div className="row form-button-row justify-content-center">
            <div className="col-md-3 text-center mb-2">
              {/* El botón tiene type="submit" para invocar handleSubmit */}
              <button className="btn btn-yellow w-100" type="submit">
                {id ? "Actualizar" : "Agregar"}
              </button>
            </div>
            <div className="col-md-3 text-center mb-2">
              <button
                className="btn btn-cancel w-100"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default SaleForm;
