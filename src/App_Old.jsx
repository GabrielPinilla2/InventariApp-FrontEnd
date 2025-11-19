// src/App.jsx
import React from "react";
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

import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "./assets/LogoInventariApp-mini-White.png";

/**
 * Este componente vive dentro de <Router> y puede usar useLocation().
 * Muestra <Home /> a pantalla completa si la ruta es “/”, y
 * envuelve las demás rutas en un .container de Bootstrap.
 */
function AppContent() {
  const location = useLocation();

  // Si la ruta es “/”, renderizar Home sin .container
  if (location.pathname === "/") {
    return <Home />;
  }

  // Para el resto de las rutas, usar .container para centrar contenido
  return (
    <>
      <div id="home-container" className="pt-5 pb-3">
        <div className="container mt-3 mb-3">
          <Routes>
            {/* Categorías */}
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/new" element={<CategoryForm />} />
            <Route path="/categories/edit/:id" element={<CategoryForm />} />

            {/* Unidades de Medida */}
            <Route path="/measurements" element={<MeasurementList />} />
            <Route path="/measurements/new" element={<MeasurementForm />} />
            <Route
              path="/measurements/edit/:id"
              element={<MeasurementForm />}
            />

            {/* Productos */}
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />

          <Route path="/persons" element={<PersonList />} />
          <Route path="/persons/new" element={<PersonForm />} />
          <Route path="/persons/edit/:id" element={<PersonForm />} />

            {/* Rutas provisionales para secciones en desarrollo */}
            <Route path="/sellers" element={<div>Componente Vendedores</div>} />
            <Route path="/users" element={<div>Componente Usuarios</div>} />
            <Route path="/persons" element={<div>Componente Personas</div>} />
            <Route path="/sales" element={<div>Componente Ventas</div>} />
            <Route
              path="/entries"
              element={<div>Componente Notas de entrada</div>}
            />
            <Route path="/reports" element={<div>Componente Reportes</div>} />

            {/* Error 404 */}
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
    </>
  );
}

/**
 * Componente principal: envuelve AppContent en <Router>, e incluye Navbar y Footer.
 */
function App() {
  return (
    <Router>
      {/* NAVBAR FIJA EN TOP Y DE ANCHO COMPLETO */}
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
              {/* Dropdown de Parametrización */}
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
                  <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item active" : "dropdown-item"
                      }
                    >
                      Categorías
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/measurements"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item active" : "dropdown-item"
                      }
                    >
                      Unidades
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/products"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item active" : "dropdown-item"
                      }
                    >
                      Productos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sellers"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item active" : "dropdown-item"
                      }
                    >
                      Vendedores
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/users"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item active" : "dropdown-item"
                      }
                    >
                      Usuarios
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Enlaces individuales */}
              <li className="nav-item">
                <NavLink
                  to="/persons"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Personas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/sales"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Ventas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/entries"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Entradas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/reports"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Reportes
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL (Home o rutas secundarias) */}
      <AppContent />

      {/* FOOTER FIJO */}
      <footer className="bg-dark text-white text-center py-1 fixed-bottom">
        <div className="container">
          <small>
            &copy; {new Date().getFullYear()} InventariApp - Todos los derechos
            reservados
          </small>
        </div>
      </footer>
    </Router>
  );
}

export default App;
