import ChartComponent from "./ChartComponent";
import PredictComponent from "./PredictComponent";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function Reportes() {
  const [data] = useState([
    { mes: "Enero", ventas: 1200 },
    { mes: "Febrero", ventas: 1900 },
    { mes: "Marzo", ventas: 1500 },
    { mes: "Abril", ventas: 2200 },
  ]);

  const descargarCSV = () => {
    const encabezados = "Mes,Ventas\n";
    const filas = data.map((d) => `${d.mes},${d.ventas}`).join("\n");
    const contenido = encabezados + filas;

    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reporte_ventas.csv";
    link.click();
  };

  const prediccionIA = () => {
    alert("Predicción generada (ejemplo local sin API externa)");
  };

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">Módulo de Reportes</h1>

      <Card className="rounded-2xl shadow-md">
        <CardContent className="grid gap-4 p-4">
          <Button onClick={descargarCSV}>Descargar CSV</Button>
          <Button variant="outline" onClick={prediccionIA}>
            Generar Predicción (IA)
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Gráfico de Ventas</h2>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="ventas" />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
}
