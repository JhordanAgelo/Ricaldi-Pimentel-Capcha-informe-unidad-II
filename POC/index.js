const { ComputerVisionClient } = require("@azure/cognitiveservices-computervision");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");
const async = require("async");

// Configuración de las credenciales
const KEY = "a3cad71f57b946c99d2e69a81f8e124d";
const ENDPOINT = "https://cvwalter.cognitiveservices.azure.com/";

// Inicialización del cliente de Computer Vision
const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": KEY } }), ENDPOINT
);

// Función para analizar una imagen de un plato de comida
async function analizarImagenPlatoDeComida(imagenUrl) {
  try {
    // Llamada al servicio de Computer Vision para analizar la imagen
    const resultados = await computerVisionClient.analyzeImage(imagenUrl, {
      visualFeatures: ["Objects"],
    });

    // Extraer y mostrar los objetos detectados en la imagen
    const objetosDetectados = resultados.objects;
    objetosDetectados.forEach((objeto) => {
      console.log(`Objeto: ${objeto.object}, Confianza: ${objeto.confidence}`);
    });
  } catch (error) {
    console.error("Error al analizar la imagen:", error);
  }
}

// URL de la imagen del plato de comida que deseas analizar
const imagenUrl = "https://www.recetaslamasia.es/wp-content/uploads/2012/10/foto_plato-equilibrado-scaled.jpg";

// Llamada a la función para analizar la imagen
analizarImagenPlatoDeComida(imagenUrl);