from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
import cv2
import numpy as np
import urllib.request
from PIL import Image
import io
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Ajusta esto según tus necesidades
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar el modelo previamente exportado
model = load_model('modelo_entrenado.h5')

# Inicializar el diccionario de resultados
app.results = {}


@app.get("/")
async def welcome():
    return JSONResponse(content={"message": "Bienvenido a la API NutriConti. Para consultar su uso, dirígete a /docs."})

@app.post("/predict/")
async def predict(data: dict):
    try:
        url = data.get("url")
        if not url:
            return JSONResponse(content={"error": "La URL de la imagen no puede estar vacía."}, status_code=400)

        with urllib.request.urlopen(url) as response:
            image_data = response.read()

        image = Image.open(io.BytesIO(image_data))
        image = np.array(image)

        image = cv2.resize(image, (224, 224))
        image = image / 255.0
        image = np.expand_dims(image, axis=0)
        prediction = model.predict(image)
        class_predicted = np.argmax(prediction, axis=1)

        if class_predicted == 0:
            result = "La comida en la imagen es saludable."
        else:
            result = "La comida en la imagen no es saludable."

        # Almacenar el resultado en el diccionario usando la URL como clave
        app.results[url] = {"url": url, "prediction": result}

        with open("results.json", "w") as json_file:
            # Convertir el diccionario a una lista para la escritura en JSON
            json.dump(list(app.results.values()), json_file, indent=4)

        return JSONResponse(content={"result": result})
    except urllib.error.URLError as e:
        return JSONResponse(content={"error": "Error al descargar la imagen", "details": str(e)}, status_code=400)
    except Exception as e:
        return JSONResponse(content={"error": "Error en la predicción", "details": str(e)}, status_code=500)

@app.get("/results/")
async def get_results():
    return JSONResponse(content=list(app.results.values()))
