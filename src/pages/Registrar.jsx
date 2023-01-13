import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert";
import clienteAxios from "../config/axios";


const registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPass] = useState('');

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        // validaciones
        if([nombre,email,password,confirmarPassword].includes('')){
            setAlerta({msg: 'Faltan campos por llenar', error: true})
            return;
        }
        if( password.length < 6){
            setAlerta({msg: 'La contrasena ha de tener mas de 6 caracteres', error: true})
            return;
        }
        if( password !== confirmarPassword){
            setAlerta({msg: 'La contrasena no coincide', error: true})
            return;
        }
        setAlerta({})

        // crear usuario en la api
        try {
            await clienteAxios.post('/veterinarios', {nombre, email, password})
            setAlerta({
                msg: 'Cuenta creada satisfactoriamente, revisa tu correo',
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.error,
                error: true
            })
        }
    }

    

    const { msg } = alerta;

    return (
      <>
      <div>
        <h1 className="text-teal-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span className="text-orange-400">Pacientes</span></h1>
      </div>

      <div className="shadow-lg px-5 py-5 rounded-xl bg-white">

        {msg && <Alert
            alerta={alerta}
        />}

        <form action="" onSubmit={handleSubmit}>
            
            <div className="my-5">
                <label className="uppercase block font-bold text-gray-600" htmlFor="">
                    Nombre
                </label>
                <input 
                    type="text" 
                    placeholder="Introduce tu nombre"
                    className="border w-full p-2 mt-3 bg-slate-50 rounded-xl"
                    value={nombre}
                    onChange={ ev => setNombre(ev.target.value)}
                />
            </div>
            <div className="my-5">
                <label className="uppercase block font-bold text-gray-600" htmlFor="">
                    Email
                </label>
                <input 
                    type="text" 
                    placeholder="Introduce tu email"
                    className="border w-full p-2 mt-3 bg-slate-50 rounded-xl"
                    value={email}
                    onChange={ ev => setEmail(ev.target.value)}
                />
            </div>

            <div className="my-5">
                <label className="uppercase block font-bold text-gray-600" htmlFor="">
                    Password
                </label>
                <input 
                    type="password" 
                    placeholder="introduce tu contraseña"
                    className="border w-full p-2 mt-3 bg-slate-50 rounded-xl"
                    value={password}
                    onChange={ ev => setPassword(ev.target.value)}
                />
            </div>
            <div className="my-5">
                <label className="uppercase block font-bold text-gray-600" htmlFor="">
                    Confirmar password
                </label>
                <input 
                    type="password" 
                    placeholder="confirma tu contraseña"
                    className="border w-full p-2 mt-3 bg-slate-50 rounded-xl"
                    value={confirmarPassword}
                    onChange={ ev => setConfirmarPass(ev.target.value)}
                />
            </div>

            <input 
                type="submit" 
                value='Registrar'
                className="bg-teal-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-700 md:w-auto" 
            />
        </form>

        <nav className="lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-slate-400" 
                to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
            <Link className="block text-center my-5 text-slate-400" 
                to="/olvide-password">Olvidé mi contraseña</Link>
        </nav>
      </div>      
      </>
    )
  }
  export default registrar