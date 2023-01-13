import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Header = () => {

    const { cerrarSesion } = useAuth()

  return (
    <header className="py-10 bg-teal-500">

        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center ">

            <h1 className="font-bold text-2xl text-slate-700 text-center">Administrador de Pacientes de <span className="text-white font-black">Veterinaria</span></h1>

            <nav className="flex gap-4 mt-5 lg:mt-0">

                <Link to="/admin" className="text-white md:text-sm lg:text-xl font-semibold">Pacientes</Link>

                <Link to="/admin/perfil" className="text-white md:text-sm lg:text-xl font-semibold">Perfil</Link>

                <button 
                className="text-white md:text-sm lg:text-xl font-semibold" 
                type="button" 
                onClick={cerrarSesion}>
                    Cerrar sesion
                </button>
            </nav>

        </div>

    </header>
  )
}
export default Header