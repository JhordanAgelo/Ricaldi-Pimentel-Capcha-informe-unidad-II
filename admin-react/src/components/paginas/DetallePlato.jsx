import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const DetallePlato = () => {
  const { platilloId } = useParams();
  const [platillo, setPlatillo] = useState(null);

  useEffect(() => {
    const cargarPlatillo = async () => {
      try {
        const platilloDoc = await getDoc(doc(db, 'platillos', platilloId));
        if (platilloDoc.exists()) {
          setPlatillo({ id: platilloDoc.id, ...platilloDoc.data() });
        } else {
          console.error('Platillo no encontrado');
        }
      } catch (error) {
        console.error('Error al cargar el platillo:', error);
      }
    };

    cargarPlatillo();
  }, [platilloId]);

  if (!platillo) {
    return <div>Cargando...</div>;
  }

  const { nombre, carbohidratos, proteinas, grasas, imagen, descripcion, precio } = platillo;

  return (
    <div className='mt-10 mb-10'>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden">
        {/* Card con nombre, imagen y descripción */}
        <div className="bg-gray-100 p-4">
          <h1 className="text-2xl font-bold mb-2 text-center">{nombre}</h1>
          <img src={imagen} alt={nombre} className="max-w-full h-auto mb-2" />
          <p className="text-gray-700">{descripcion}</p>
        </div>

        {/* Detalles del platillo */}
        <div className="p-4">
          <p className="text-gray-700 mb-2 text-center">Precio: {precio ? `S/ ${precio.toFixed(2)}` : 'No disponible'}</p>

          {/* Tabla de valores nutricionales */}
          <table className="w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Nutriente</th>
                <th className="py-2 px-4 border-b">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b font-bold">Carbohidratos</td>
                <td className="py-2 px-4 border-b">{carbohidratos ? carbohidratos.toFixed(2) : 'No disponible'} g</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-bold">Proteínas</td>
                <td className="py-2 px-4 border-b">{proteinas ? proteinas.toFixed(2) : 'No disponible'} g</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-bold">Grasas</td>
                <td className="py-2 px-4 border-b">{grasas ? grasas.toFixed(2) : 'No disponible'} g</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetallePlato;
