import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Alert from "../components/Alert";
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPass] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [linkInicio, setLinkInicio] = useState(false);

  const { token } = useParams();
  
  useEffect( () => {
    const checkToken = async () => {
      try {
        await clienteAxios(`/veterinarios/forgot-password/${token}`)
        setTokenValido(true)
        setAlerta({msg: 'Coloca tu nueva clave', error: false})  
      } catch (error) {
        setAlerta({msg: 'Hubo un error en el enlace', error: true})   
      }
    }
    checkToken();
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if( password.length < 6){
      setAlerta({msg: 'La contrasena ha de tener mas de 6 caracteres', error: true})
      return;
    }
    if( password !== confirmarPassword){
      setAlerta({msg: 'La contrasena no coincide', error: true})
      return;
    }

    try {
      const url = `/veterinarios/forgot-password/${token}`
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({msg: data.msg, error: false})
      setLinkInicio(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }

  const { msg } = alerta

  return (
    <>
      <div>
          <h1 className="text-teal-600 font-black text-6xl">Restablece tu Password y no pierdas Acceso a tus <span className="text-orange-400">Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg && <Alert
            alerta={alerta}
        />}

        { tokenValido && (
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase block font-bold text-gray-600" htmlFor="">
                Nuevo Password
            </label>
            <input 
                type="password" 
                placeholder="introduce tu nueva clave"
                className="border w-full p-3 mt-3 bg-slate-50 rounded-xl"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
          </div>

          <div className="my-5">
                <label className="uppercase block font-bold text-gray-600" htmlFor="">
                    Confirmar password
                </label>
                <input 
                    type="password" 
                    placeholder="confirma tu nueva clave"
                    className="border w-full p-2 mt-3 bg-slate-50 rounded-xl"
                    value={confirmarPassword}
                    onChange={ ev => setConfirmarPass(ev.target.value)}
                />
          </div>
            <input 
              type="submit" 
              value='Guardar'
              className="bg-teal-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-700 md:w-auto" 
              
            />
        </form>
        )}
        {linkInicio &&  (
        <nav>
            <Link className="block text-center my-5 items-center text-gray-500 font-bold underline" 
                to="/">Haz click acá para iniciar sesión</Link>
        </nav>)
        }
        
      </div>
    </>
  )
}
export default NuevoPassword