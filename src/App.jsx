// Nuevo App.jsx con soporte de login y logout con JWT

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";

import ProductsList from "./components/ProductsList";
import ProductForm from "./components/ProductForm";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import MeasurementList from "./components/MeasurementList";
import MeasurementForm from "./components/MeasurementForm";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import SellerList from "./components/SellerList";
import SellerForm from "./components/SellerForm";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "./assets/logo.png";
import SaleList from "./components/SaleList";
import SaleForm from "./components/SaleForm";


function AppContent({ isAuthenticated }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <div className="container mt-5 pt-5">
        <LoginForm />
      </div>
    );
  }

  if (location.pathname === "/") {
    return <Home />;
  }

  return (
    <div id="home-container" className="pt-5 pb-3">
      <div className="container mt-3 mb-3">
        <Routes>
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/categories/edit/:id" element={<CategoryForm />} />

          <Route path="/measurements" element={<MeasurementList />} />
          <Route path="/measurements/new" element={<MeasurementForm />} />
          <Route path="/measurements/edit/:id" element={<MeasurementForm />} />

          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<ProductForm />} />

          <Route path="/persons" element={<PersonList />} />
          <Route path="/persons/new" element={<PersonForm />} />
          <Route path="/persons/edit/:id" element={<PersonForm />} />

          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/edit/:id" element={<CustomerForm />} />          

          <Route path="/sellers" element={<SellerList />} />
          <Route path="/sellers/new" element={<SellerForm />} />
          <Route path="/sellers/edit/:id" element={<SellerForm />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />}/>

          <Route path="/changepassword" element={<div>Componente Para cambiar el password</div>} />

          <Route path="/sales" element={<SaleList />} />
          <Route path="/sales/new" element={<SaleForm />} />
          <Route path="/sales/edit/:id" element={<SaleForm />} />
          <Route path="/sales" element={<div>Componente Ventas</div>} />
          <Route path="/entries" element={<div>Componente Notas de entrada</div>} />
          <Route path="/reports" element={<div>Componente Reportes</div>} />

          <Route
            path="*"
            element={
              <div className="text-center mt-5">
                <h2>404 - Página no encontrada</h2>
                <p>La ruta que buscas no existe.</p>
                <Link to="/">Volver al inicio</Link>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [roleUser, setRoleUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("roleUser");

    setUsername(storedUsername || "");
    setRoleUser(storedRole || "");   

    setIsAuthenticated(!!token); 

/*     if (isAuthenticated) {
      setUsername(storedUsername || "");
      setRole(storedRole || "");
      if (roleUser === 'ADMIN') {
        // Mostrar cosas de admin
      }       
    } */

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roleUser");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-custom text-center fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Inventario App" height="40" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="paramDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ textDecoration: "none" }}
                >
                  Parametrización
                </button>
                <ul className="dropdown-menu" aria-labelledby="paramDropdown">
                  <li><NavLink to="/persons" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Personas</NavLink></li>

                  {roleUser === "ADMIN" && (
                    <>
                    <li><NavLink to="/categories" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Categorías</NavLink></li>
                    <li><NavLink to="/measurements" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Unidades</NavLink></li>
                    <li><NavLink to="/products" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Productos</NavLink></li>
                    <li><NavLink to="/sellers" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Vendedores</NavLink></li>
                    <li><NavLink to="/users" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Usuarios</NavLink></li>
                    </>
                  )}
                </ul>
              </li> 

              <li className="nav-item"><NavLink to="/customers" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Clientes</NavLink></li>

              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="paramDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ textDecoration: "none" }}
                >
                  Movimientos
                </button>
                <ul className="dropdown-menu" aria-labelledby="paramDropdown">
                  <li><NavLink to="/sales" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Ventas</NavLink></li>
                  <li><NavLink to="/entries" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>Entradas de Inventario</NavLink></li>
                </ul>
              </li>  

              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="paramDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ textDecoration: "none" }}
                >
                  Reportes e Informes
                </button>
                <ul className="dropdown-menu" aria-labelledby="paramDropdown">
                  <li className="nav-item"><NavLink to="/reports" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Reportes</NavLink></li>
                </ul>
              </li>  

              {isAuthenticated && (
                <li className="nav-item">
                  <span className="me-2  text-white">&nbsp; &nbsp; &nbsp; 👤 {username} ({roleUser})</span>
                  <button className="btn btn-danger btn-sm ms-3" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <AppContent isAuthenticated={isAuthenticated} />

      <footer className="bg-dark text-white text-center py-1 fixed-bottom">
        <div className="container">
          <small>
            &copy; {new Date().getFullYear()} InventariApp - Todos los derechos reservados
          </small>
        </div>
      </footer>
    </Router>
  );
}

export default App;
