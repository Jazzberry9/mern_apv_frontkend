import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clienteAxios from "../config/axios";


const OlvidePassword = () => {

  const [ email, setEmail ] = useState('');
  const [ alerta, setAlerta ] = useState({});
  const handleSubmit = async (e) => {
      e.preventDefault();

      if( email === '' || email.length < 6){
          setAlerta({
            msg: 'Inserte el email',
            error: true
          })
        return
      }

      try {
        const { data } = await clienteAxios.post('/veterinarios/forgot-password', {email});
        setAlerta({msg: data.msg, error: false})
      } catch (error) {
        setAlerta({msg: error.response.data.msg, error: true})
      }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-teal-600 font-black text-6xl">Recupera tu Acceso y no Pierdas tus <span className="text-orange-400">Pacientes</span></h1>
        </div>
      <div className="mt-20 md:mt-15 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg && <Alert
            alerta={alerta}
        />}
        <form action="" onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase block text-xl font-bold text-gray-600" htmlFor="">
                Email
            </label>
            <input 
                type="text" 
                placeholder="Introduce tu email"
                className="border w-full p-3 mt-3 bg-slate-50 rounded-xl"
                value={email}
                onChange={ ev => setEmail(ev.target.value)}
            />
          </div>
        <input 
                type="submit" 
                value='Enviar instrucciones'
                className="bg-teal-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-700 md:w-auto" 
            />
        </form>
        <nav className="lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-slate-400" 
                to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
            <Link className="block text-center my-5 text-slate-400" 
                    to="/registrar">¿No tienes una cuenta? Regístrate</Link>
        </nav>
      </div>
    </>
  )
}
export default OlvidePassword