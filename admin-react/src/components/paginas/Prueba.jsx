import React, { useEffect,useState } from 'react';
import { db } from '../../firebase/config';
import { collection,onSnapshot } from 'firebase/firestore';


const Prueba = () => {

  const [platillos, setPlatillos] = useState([]);

  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db, 'platillos'), (snapshot) => {
      console.log('debug de DOCS')
      const platillosData = snapshot.docs.map((doc)=>{
        return doc.data()
      });

      setPlatillos(platillosData)

    });
    return ()=> unsubscribe()
    
  },[]) 

  return (
    <>
      {platillos.map((item,index)=> (
        <p key={index}>{item.nombre}</p>
      ))}
      <p>FIN </p>
    </>
  );
}

export default Prueba;
