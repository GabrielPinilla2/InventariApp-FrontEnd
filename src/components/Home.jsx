import logo from '../assets/InventariApp.png';
import Portada from "../assets/InventariApp-Portada.png";

function Home() {
  return (
    <>
      {/* <div className="text-center py-5">
        <img src={logo} alt="Inventario App" height="150" />
      </div> */}
       <div
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <img
          src={Portada}
          alt="Portada InventariApp"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </>
  );
}

export default Home;
