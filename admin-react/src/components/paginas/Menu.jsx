
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from '../../firebase/config';
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

const Menu = () => {
  const [platillos, setPlatillos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [nombreCliente, setNombreCliente] = useState("");
  const [apellidoCliente, setApellidoCliente] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'platillos'), (snapshot) => {
      const platilloData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id, cantidad: 1 };
      });
      setPlatillos(platilloData);
    });

    return () => unsubscribe();
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

  const agregarAlPedido = (platillo) => {
    setPedido([...pedido, platillo]);
  };

  const eliminarDelPedido = (index) => {
    const nuevoPedido = [...pedido];
    nuevoPedido.splice(index, 1);
    setPedido(nuevoPedido);
  };

  const actualizarCantidad = (index, cantidad) => {
    const nuevoPedido = [...pedido];
    nuevoPedido[index].cantidad = cantidad;
    setPedido(nuevoPedido);
  };

  const calcularTotalPorPlatillo = (platillo) => {
    return platillo.precio * platillo.cantidad;
  };

  const calcularSubtotal = () => {
    return pedido.reduce((total, platillo) => total + calcularTotalPorPlatillo(platillo), 0);
  };

  const realizarPedido = () => {
    // Guardar en localStorage
    const nuevaOrden = { nombre: nombreCliente, apellido: apellidoCliente, total: calcularSubtotal() };
    const ordenesGuardadas = JSON.parse(localStorage.getItem("ordenes")) || [];
    const nuevasOrdenes = [...ordenesGuardadas, nuevaOrden];
    localStorage.setItem("ordenes", JSON.stringify(nuevasOrdenes));

    // Limpiar el pedido y cerrar el modal
    setPedido([]);
    setModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="mt-6 ml-8 w-3/4">
        <div className="pb-4 text-2xl">Menu</div>
        <div className="mb-4">
          <Link className="bg-gray-700 text-xs my-8 text-white p-2 font-bold" to="/nuevo-platillo">
            AGREGAR PLATILLO
          </Link>
        </div>

        {platillos.map((platillo, index) => (
          <div className="w-full px-3 mb-4 min-w-800" key={index}>
            <div className="p-5 shadow-md bg-gray-100">
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
                  <button
                    className="bg-green-500 text-white p-1.5 rounded mt-2"
                    onClick={() => agregarAlPedido(platillo)}
                  >
                    Agregar al pedido
                  </button>
                </div>
                <div className="lg:w-7/12 xl:w-9/12 pl-5">
                  <p className="font-bold text-2xl text-yellow-600 mb-2">{platillo.nombre}</p>
                        <Link to={`/menu/${platillo.id}`} className="text-blue-500">
                          Ver detalles
                        </Link>
                  <p className="text-gray-600 mb-4">Categoría:
                    <span className="text-gray-700 font-bold"> {platillo.categoria.toUpperCase()}</span>
                  </p>
                  <p className="text-gray-600 mb-4">{platillo.descripcion}</p>
                  <p className="text-black mb-4">Precio:
                    <span className="text-black font-bold"> S/  {platillo.precio}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Modal */}
      {modalOpen && (
        <div className="w-1/4 bg-gray-800 p-4 fixed right-0 top-0 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white text-2xl">Pedido</div>
            <button
              className="text-white text-sm"
              onClick={() => setModalOpen(false)}
            >
              Cerrar Pedido
            </button>
          </div>
          {pedido.map((item, index) => (
            <div key={index} className="bg-gray-200 p-2 mb-2 flex flex-col rounded shadow-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-black">{item.nombre}</span>
                <span className="bg-yellow-500 text-black p-1 w-12 rounded">S/ {item.precio}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-black">Cantidad:</label>
                <input
                  type="number"
                  className="bg-gray-100 text-black p-1 w-12"
                  value={item.cantidad}
                  onChange={(e) => actualizarCantidad(index, e.target.value)}
                  min="1"
                />
                <span className="text-yellow-600">Total: S/ {calcularTotalPorPlatillo(item)}</span>
                <button
                  className="text-red-500"
                  onClick={() => eliminarDelPedido(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="mb-4">
            <label className="text-white block mb-2">Nombre del Cliente:</label>
            <input
              type="text"
              className="bg-gray-100 text-black p-1 w-full mb-2"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
            />
            <label className="text-white block mb-2">Apellido del Cliente:</label>
            <input
              type="text"
              className="bg-gray-100 text-black p-1 w-full mb-4"
              value={apellidoCliente}
              onChange={(e) => setApellidoCliente(e.target.value)}
            />
          </div>
          <button
            className="bg-green-500 text-white p-2 rounded mt-2"
            onClick={realizarPedido}
          >
            Aceptar Pedido
          </button>
          <div className="text-white text-2xl mt-4">Subtotal: S/ {calcularSubtotal()}</div>
        </div>
      )}

      {/* Open Modal Button */}
      <button
        className="bg-blue-500 text-white p-2 fixed right-0 bottom-0 mb-8 mr-8 rounded"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Realizar Pedido
      </button>
    </div>
  );
}

export default Menu;

