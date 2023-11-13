import React, { useState } from 'react';
import axios from 'axios';

const Prediccion = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    try {
      // Verificar si imageUrl está vacío antes de enviar la solicitud
      if (!imageUrl.trim()) {
        console.error('La URL de la imagen no puede estar vacía.');
        return;
      }

      setLoading(true);

      const response = await axios.post('http://localhost:8000/predict/', { url: imageUrl });
      setPrediction(response.data.result); // Ajusta esto según la respuesta de tu servidor
    } catch (error) {
      console.error('Error al predecir:', error);
      setPrediction('Error en la predicción');
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    // Realizar la predicción solo cuando se presiona el botón "Predecir"
    handlePredict();
  };

  const handleImageLoad = () => {
    // Esta función se ejecuta cuando la imagen ha cargado
    // Se puede usar para realizar acciones después de que la imagen se haya cargado completamente
    console.log('Imagen cargada');
  };

  const handleImageUrlChange = (newUrl) => {
    // Limpiar la información de la predicción al cambiar la URL
    setImageUrl(newUrl);
    setPrediction('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 mt-10 rounded-md shadow-md">
      <h1 className='text-2xl font-bold text-center mb-4'>Realizar Predicción</h1>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='URL de la imagen'
          value={imageUrl}
          onChange={(e) => handleImageUrlChange(e.target.value)}
          className='w-full border p-2'
        />
      </div>
      <div className='mb-4'>
        <button onClick={handleButtonClick} className='w-full bg-blue-500 text-white p-2' disabled={loading}>
          {loading ? 'Prediciendo...' : 'Predecir'}
        </button>
      </div>
      {prediction && (
        <div className='text-center mb-4'>
          <strong>Resultado de la predicción:</strong> {prediction}
        </div>
      )}
      {imageUrl && !loading && (
        <div className='text-center'>
          <img
            src={imageUrl}
            alt='Imagen a predecir'
            className='max-w-full h-auto mx-auto rounded-md shadow-md'
            onLoad={handleImageLoad}
          />
        </div>
      )}
    </div>
  );
};

export default Prediccion;
