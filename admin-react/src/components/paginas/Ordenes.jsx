// Ordenes.js
import React, { useEffect, useState } from "react";

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    // Lógica para obtener las órdenes desde el localStorage
    const ordenesGuardadas = JSON.parse(localStorage.getItem("ordenes")) || [];
    setOrdenes(ordenesGuardadas);
  }, []);

  const borrarOrden = (index) => {
    const nuevasOrdenes = [...ordenes];
    nuevasOrdenes.splice(index, 1);
    setOrdenes(nuevasOrdenes);
    // Actualizar localStorage después de borrar la orden
    localStorage.setItem("ordenes", JSON.stringify(nuevasOrdenes));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-6 text-center">Ordenes Realizadas</h1>
      {ordenes.map((orden, index) => (
        <div key={index} className="bg-white p-4 mb-4 ml-4 mr-4 shadow-md">
          <p className="text-lg font-bold">Cliente: {orden.nombre} {orden.apellido}</p>
          <p className="text-gray-600">Total a pagar: S/ {orden.total}</p>
          <button
            onClick={() => borrarOrden(index)}
            className="bg-red-500 text-white p-2 mt-2"
          >
            Borrar Orden
          </button>
        </div>
      ))}
    </div>
  );
};

export default Ordenes;
