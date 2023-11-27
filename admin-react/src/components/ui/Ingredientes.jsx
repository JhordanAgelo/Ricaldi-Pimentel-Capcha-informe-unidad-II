import React from 'react';
import check from '../../assets/check.png';

const Ingredientes = ({ formik }) => {
  const agregarIngrediente = (e) => {
    e.preventDefault();
    if (formik.values.nuevoIngrediente.trim() !== '') {
      formik.setFieldValue('ingredientes', [...formik.values.ingredientes, formik.values.nuevoIngrediente]);
      formik.setFieldValue('nuevoIngrediente', ''); // Cambiado para usar formik para establecer el valor
      console.log('Lista de ingredientes:', formik.values.ingredientes);
    }
  };

  return (
    <div>
      <label className="block font-semibold text-sm mb-2 text-gray-700" htmlFor="descripcion">
        Ingredientes
      </label>
      <div className="flex flex-row items-center">
        <input
          type="text"
          className="mt-4 h-full shadow appearance-none border rounded px-3 py-2 w-1/2 leading-tight focus:outline-none focus:outline"
          placeholder="100 gr ingrediente"
          value={formik.values.nuevoIngrediente}
          onChange={(e) => formik.setFieldValue('nuevoIngrediente', e.target.value)}
        />
        <button
          onClick={agregarIngrediente}
          className="mt-4 ml-2 text-center h-full bg-gray-800 block hover:bg-gray-600 w-1/2 text-white uppercase py-2.5 px-3 font-bold text-sm cursor-pointer transition duration-150 ease-in-out transform-gpu group-hover:scale-105"
        >
          Agregar
        </button>
      </div>
      <div className="mt-4">
        <p className="font-semibold mb-2">Lista de ingredientes:</p>
        <div className="grid grid-cols-2 gap-4">
          {formik.values.ingredientes.map((ingrediente, index) => (
            <div key={index} className="bg-white p-4 shadow rounded flex items-center mb-2">
              <img src={check} className="w-5 mr-2" alt="check" />
              <p>{ingrediente}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ingredientes;

