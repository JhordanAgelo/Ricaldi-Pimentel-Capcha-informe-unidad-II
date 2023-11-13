import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route, Form} from 'react-router-dom'
import './App.css'

import Ordenes from './components/paginas/Ordenes'
import Menu from './components/paginas/Menu'
import NuevoPlatillo from './components/paginas/NuevoPlatillo'
import SideBar from './components/ui/SideBar'
import Prediccion from './components/paginas/Prediccion'
import DetallePlato from './components/paginas/DetallePlato'


function App() {


  return (
      <div className='flex md:flex'>
        <SideBar />

        <div className='md:w-2/3 ml-auto overflow-y-scroll'>
          <Routes>
            <Route path="/" element={<Ordenes/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/nuevo-platillo" element={<NuevoPlatillo/>}/>
            <Route path="/prediccion" element={<Prediccion/>}/>
            <Route path="/menu/:platilloId" element={<DetallePlato />} />
          </Routes>
        </div>

    </div>

  );
}

export default App
