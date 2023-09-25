import { Link } from "react-router-dom";
const Menu = () => {
    return ( 
        <div className="mt-6 ml-8" >
        
            <div className="pb-4 text-3xl">Menu</div>
            <Link className="bg-gray-700 text-xs text-white p-2 font-bold" to="/nuevo-platillo">
               AGREGAR PLATILLO
            </Link>
        </div>


     );
}
 
export default Menu;