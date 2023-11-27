import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const DetallePlato = () => {
  const { platilloId } = useParams();
  const [platillo, setPlatillo] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);
  const [infoNutricional, setInfoNutricional] = useState(null);

  useEffect(() => {
    const cargarPlatillo = async () => {
      try {
        const platilloDoc = await getDoc(doc(db, 'platillos', platilloId));
        if (platilloDoc.exists()) {
          setPlatillo({ id: platilloDoc.id, ...platilloDoc.data() });
          const ingredientesArray = platilloDoc.data().ingredientes || [];
          setIngredientes(ingredientesArray);
        } else {
          console.error('Platillo no encontrado');
        }
      } catch (error) {
        console.error('Error al cargar el platillo:', error);
      }
    };

    cargarPlatillo();
  }, [platilloId]);

  const obtenerInformacionNutricional = async () => {
    try {
      const ingredientesParaApi = ingredientes.map(ingrediente => `${ingrediente}`);
      const ingredientData = { ingr: ingredientesParaApi };
      const apiUrl = "https://api.edamam.com/api/nutrition-details";
      const apiId = "0313ae7c";
      const apiKey = "0ec826140af9690479cef395eb2e1881";
      const url = `${apiUrl}?app_id=${apiId}&app_key=${apiKey}`;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredientData)
      };

      const response = await fetch(url, requestOptions);
      const data = await response.json();
      
      // Lineas para ver la informacion en la consola antes de imprimirla
      console.log('TOTAL DAYLI:', data.totalDaily);
      console.log('TOTAL DAYLI:', data.toalNutrients);
      console.log('TOTAL DAYLI:', data.toalNutrientsKcal);

      setInfoNutricional(data);
    } catch (error) {
      console.error('Error al obtener la información nutricional:', error);
    }
  };

  if (!platillo) {
    return <div>Cargando...</div>;
  }

  const { nombre, carbohidratos, proteinas, grasas, imagen, descripcion, precio } = platillo;

  return (
    <div className='mt-10 mb-10'>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden">
        <div className="bg-gray-100 p-4">
          <h1 className="text-2xl font-bold mb-2 text-center">{nombre}</h1>
          <img src={imagen} alt={nombre} className="max-w-full h-auto mb-2 flex justify-center mx-auto pb-10" />
          <p className="text-gray-700">{descripcion}</p>
        </div>

        <div className="p-4">
          <p className="text-gray-700 mb-2 text-center">Precio: {precio ? `S/ ${precio.toFixed(2)}` : 'No disponible'}</p>

          <table className="w-full border border-gray-300 text-center">
            {/* ... (resto del código de la tabla) */}
          </table>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 text-center">Ingredientes</h2>
          <ul className="list-none text-center">
            {ingredientes.map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
        </div>
        <div className='w-full text-center'>
          <button onClick={obtenerInformacionNutricional} className="bg-blue-500 text-white p-2 mt-4 mb-4 flex-row items-center mx-auto">
            Ver Información Nutricional
          </button>

        </div>
 

        {infoNutricional && (
  <div className="p-4 flex flex-col items-center">
    <h2 className="text-xl font-bold mb-4 text-center">Información Nutricional por Porción</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <p>Calorías</p>
        <p className='text-xl font-bold'>{infoNutricional.calories.toFixed(2)}</p>
      </div>
      <div className="text-center">
        <p>Carbohidratos</p>
        <p className='text-xl font-bold'>
          {infoNutricional.totalNutrients.CHOCDF.quantity.toFixed(2)}g
          ({infoNutricional.totalDaily.CHOCDF.quantity.toFixed(2)}%)
        </p>
      </div>
      <div className="text-center">
        <p>Proteínas</p>
        <p className='text-xl font-bold'>
          {infoNutricional.totalNutrients.PROCNT.quantity.toFixed(2)}g
          ({infoNutricional.totalDaily.PROCNT.quantity.toFixed(2)}%)
        </p>
      </div>
      <div className="text-center">
        <p>Grasas</p>
        <p className='text-xl font-bold'>
          {infoNutricional.totalNutrients.FAT.quantity.toFixed(2)}g
          ({infoNutricional.totalDaily.FAT.quantity.toFixed(2)}%)
        </p>
      </div>
      {/* Añade el resto de la información nutricional según tus necesidades */}
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default DetallePlato;
