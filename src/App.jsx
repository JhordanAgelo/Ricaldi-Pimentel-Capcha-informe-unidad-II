import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route, Form} from 'react-router-dom'
import './App.css'

import Ordenes from './components/paginas/Ordenes'
import Menu from './components/paginas/Menu'
import NuevoPlatillo from './components/paginas/NuevoPlatillo'
import SideBar from './components/ui/SideBar'


function App() {
  return (
      <div className=' md:flex'>
        <SideBar/>
        <div className='md:w-2/3'>
          <Routes>
            <Route path="/" element={<Ordenes/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/nuevo-platillo" element={<NuevoPlatillo/>}/>
          </Routes>
        </div>

    </div>

  );
}

export default App
