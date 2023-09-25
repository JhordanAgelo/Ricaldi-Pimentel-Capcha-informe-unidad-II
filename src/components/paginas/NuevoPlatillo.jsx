import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { db } from '../../firebase/config'
import { Navigate, useNavigate } from 'react-router-dom'
import { collection,addDoc } from 'firebase/firestore'

const NuevoPlatillo = () => {

    const navigate =useNavigate();

    //validacion y lectura de datos
    const formik = useFormik({
        initialValues:{
            nombre: '',
            precio:'',
            categoria:'',
            imagen:'',
            descripcion:''

        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                    .min(3,'El platillo debe tener mas de 3 caracteres')
                    .required('Se requiere completar este campo'),
            precio: Yup.number()
                    .min(1,'El precio es obligatorio'),
            categoria: Yup.string()
                    .required('La categoria es obligatoria'),
            // imagen: Yup.file()
            //         .required('Falto agregar imagen'),
            descripcion: Yup.string()
                    .required('Debes agregar una descripcion')
    
        }),
        onSubmit: async (values) => {
            try {
        
              // Envía los datos del formulario a Firestore
              values.existencia=true
              await addDoc(collection(db, 'platillos'), values);
              console.log('Datos enviados correctamente a Firestore');
              navigate('/menu');
            } catch (error) {
              console.error('Error al enviar datos a Firestore:', error);
            }
        }
    })


    return ( 
        <>
            <div className=" font-gray-400 mt-6 ml-5 font-bold text-lg">
                Agregar Platillo
            </div>

            {/* posicionar elementos del formulario */}
            <div className=" flex justify-center mb-4">
                <div className=" w-full max-w-xl m-8">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label className="block font-semibold text-sm mb-2 text-gray-700" htmlFor="nombre" >Nombre</label>
                            <input 
                            type="text" className=" shadow appearance-none border rounded px-3 py-2 w-full leading-tight focus:outline-none focus:outline"
                            id="nombre"
                            placeholder="Nombre platillo"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
               
                            />
                        </div>
                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className='bg-red-100 border-l-4 border-red-500 text-red-400 text-sm mt-4 mb-2' role='alert'>
                                <p className=' font-bold ml-4 pt-2'>Hubo un error</p>
                                <p className='ml-4 pb-4'>{formik.errors.nombre}</p>
                            </div>
                        ):null}
                        <div>
                            <label className="block font-semibold text-sm mb-2 text-gray-700" htmlFor="precio" >Precio</label>
                            <input 
                            type="number" className=" shadow appearance-none border rounded px-3 py-2 w-full leading-tight focus:outline-none focus:outline"
                            id="precio"
                            placeholder="S/0"
                            value={formik.values.precio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.precio && formik.errors.precio ? (
                            <div className=' text-red-400'>
                                <p className=' text-sm m-2 mt-0 pt-0' >{formik.errors.precio}</p>
                            </div>
                        ):null}
                        <div>
                            <label className="block font-semibold text-sm mb-2 text-gray-700" htmlFor="categoria" >Categoria</label>
                            <select className="shadow appearance-none border rounded px-3 py-2 w-full leading-tight focus:outline-none focus:outline"
                                    id="categoria" name="categoria"
                                    value={formik.values.categoria}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                            >

                                <option value="">--Seleccione--</option>
                                <option value="desayuno">Desayuno</option>
                                <option value="comida">Comida</option>
                                <option value="cena">Cena</option>
                                <option value="postre">Postre</option>
                                <option value="bebida">Bebida</option>
                                <option value="ensalada">Ensalada</option>
                            </select>
                        </div>
                        {formik.touched.categoria && formik.errors.categoria ? (
                            <div className=' text-red-400'>
                                <p className=' text-sm m-2 mt-0 pt-0' >{formik.errors.categoria}</p>
                            </div>
                        ):null}
                        <div>
                            <label className="block font-semibold text-sm mb-2 text-gray-700" htmlFor="imagen" >Imagen</label>
                            <input 
                            type="file" className=" shadow appearance-none border rounded px-3 py-2 w-full leading-tight focus:outline-none focus:outline"
                            id='imagen'
                            value={formik.values.imagen}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.imagen && formik.errors.imagen ? (
                            <div className=' text-red-400'>
                                <p className=' text-sm m-2 mt-0 pt-0' >{formik.errors.imagen}</p>
                            </div>
                        ):null}

                        <div>
                            <label className="block font-semibold text-sm mb-2 text-gray-700" htmlFor="descripcion" >Descripcion</label>
            
                            <textarea  type="text" className=" shadow appearance-none border rounded px-3 py-2 w-full leading-tight focus:outline-none focus:outline h-24"
                                id="descripcion"
                                placeholder="descripcion"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                
                            ></textarea>
                        </div>
                        {formik.touched.descripcion && formik.errors.descripcion ? (
                            <div className=' text-red-400'>
                                <p className=' text-sm m-2 mt-0 pt-0' >{formik.errors.descripcion}</p>
                            </div>
                        ):null}
                        <input type="submit" value="Agregar platillo" className="mt-4 bg-gray-800 block w-full text-white uppercase py-2 font-bold text-sm"/>
                    </form>
                </div>
            </div>
        </>

     );
}
 
export default NuevoPlatillo;