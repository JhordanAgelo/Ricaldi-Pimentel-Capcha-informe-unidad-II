import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from '../../firebase/config';
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

const Menu = () => {
  const [platillos, setPlatillos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'platillos'), (snapshot) => {
      const platilloData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });
      setPlatillos(platilloData);
    });

    return () => unsubscribe(); // Limpia la suscripción cuando el componente se desmonta
  }, []);

  const actualizarDisponibilidad = async (platilloId, nuevaDisponibilidad) => {
    try {
      const platilloRef = doc(db, 'platillos', platilloId);
      await updateDoc(platilloRef, {
        existencia: nuevaDisponibilidad
      });
    } catch (error) {
      console.error("Error al actualizar la disponibilidad:", error);
    }
  };

  return (
    <div className="mt-6 ml-8">
      <div className="pb-4 text-3xl">Menu</div>
      <div className="mb-4">
        <Link className="bg-gray-700 text-xs my-8 text-white p-2 font-bold" to="/nuevo-platillo">
          AGREGAR PLATILLO
        </Link>
      </div>

      {platillos.map((platillo, index) => (
        <div className="w-full px-3 mb-4 " key={index}>
          <div className="p-5 shadow-md bg-white">
            <div className="lg:flex">
              <div className="lg:w-5/12 xl:w-3/12">
                <img src={platillo.imagen} alt={platillo.nombre} />
                <div className="sm:flex sm:-mx-2 pl-2">
                  <label className="block mt-5 sm:w-2/4">
                    <span className="block text-gray-800 mb-2">Existencia</span>
                    <select
                      className="bg-white shadow appearance-none border rounded text-center w-auto  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      value={platillo.existencia}
                      onChange={(e) => actualizarDisponibilidad(platillo.id, e.target.value === "true")}
                    >
                      <option value="true">Disponible</option>
                      <option value="false">No Disponible</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="lg:w-7/12 xl:w-9/12 pl-5">
                <p className="font-bold text-2xl text-yellow-600 mb-4">
                  {platillo.nombre}
                </p>
                <p className="text-gray-600 mb-4">Categoría:
                  <span className="text-gray-700 font-bold"> {platillo.categoria.toUpperCase()}</span>
                </p>
                <p className="text-gray-600 mb-4">{platillo.descripcion}</p>
                <p className="text-gray-600 mb-4">Precio:
                  <span className="text-gray-700 font-bold"> S/  {platillo.precio}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;
