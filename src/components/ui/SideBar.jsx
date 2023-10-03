import React from 'react'
import { NavLink ,useLocation} from 'react-router-dom';
import '../ui/Custom.css'
const SideBar = () => {
    const location = useLocation() 
    return ( 
        <div className=' md:w-1/3 bg-gray-800  min-h-screen fixed left-0 top-0 overflow-y-scroll hide-scrollbar' >
            <div className=' p-6 '>
                <p className=' text-white text-center font-extrabold text-3xl ' >NutriContiAPP</p>
                <p className=" mt-6 text-center text-white text-lg" >Gestiona el  restaurant con las siguientes opciones</p>

                <nav className=' pt-7'>
                    <NavLink  
                        // renderizado condicional
                        className={`${ location.pathname == '/'
                         ? " text-yellow-500 block text-lg" 
                         : " text-white block  text-lg hover:text-gray-900 hover:bg-yellow-500"} `}
                        to="/"
                    >
                        Ordenes
                    </NavLink>
                    <NavLink 
                   
                        className={`${ location.pathname == '/menu'
                        ? " text-yellow-500 block text-lg" 
                        : " text-white block  text-lg hover:text-gray-900 hover:bg-yellow-500"} `}
                        to="/menu"
                     >
                        Menu
                    </NavLink>
                </nav>

            </div>

        </div>

      );
}
 
export default SideBar;