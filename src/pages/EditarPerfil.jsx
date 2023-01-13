import { useState } from "react";
import { useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert"

const EditarPerfil = () => {

    const { auth, setAuth, guardarPerfil } = useAuth();
    const [ perfil, setPerfil ] = useState({});
    const [ alerta, setAlerta ] = useState(false);

    useEffect( () => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const { nombre, email} = perfil;
        if([nombre, email].includes('')){
            setAlerta({
                msg: 'error puto, correo y nombre son necesarios',
                error: true
            });
            return;
        }
        // guardar cambios
        const resultado = await guardarPerfil(perfil);
        setAlerta(resultado)
        setAuth(perfil)
    }

    const { msg } = alerta;

  return (

    <>
    
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10 ">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu 
            <span className="text-teal-500 font-bold"> Informacion Aqui</span>
        </p>
    
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                <form
                    onSubmit={handleSubmit}
                >
                        { msg && <Alert 
                            alerta={alerta}
                        />}

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-500">Nombre</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="nombre"
                            value={perfil.nombre || ''}
                            onChange={ ev => setPerfil({
                                ...perfil,
                                [ev.target.name] : ev.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-500">Sitio Web</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="web"
                            value={perfil.web || ''}
                            onChange={ ev => setPerfil({
                                ...perfil,
                                [ev.target.name] : ev.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-500">Telefono</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="telefono"
                            value={perfil.telefono || ''}
                            onChange={ ev => setPerfil({
                                ...perfil,
                                [ev.target.name] : ev.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-500">Email</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="email"
                            value={perfil.email || ''}
                            onChange={ ev => setPerfil({
                                ...perfil,
                                [ev.target.name] : ev.target.value
                            })}
                        />
                    </div>


                    <input 
                        type="submit" 
                        value="Guardar cambios"
                        className="bg-teal-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-teal-700"       
                    />

                </form>
            </div>
        </div>
    </>

  )

}
export default EditarPerfil