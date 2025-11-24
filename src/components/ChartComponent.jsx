import React from "react";

function ChartComponent() {
  return (
    <div className="mt-4">
      <h5>Gráfico de Ventas</h5>
      <img
        src="https://quickchart.io/chart?c={type:'bar',data:{labels:['Ene','Feb','Mar'],datasets:[{label:'Ventas',data:[10,20,15]}]}}"
        alt="Gráfico"
        className="img-fluid"
      />
    </div>
  );
}

export default ChartComponent;
