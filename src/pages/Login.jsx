import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const { msg } = alerta;

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        if( [email, password].includes('') ){
            setAlerta({
                msg: 'Todos los campos son requeridos', 
                error: true
            });

            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', {email,password});
            localStorage.setItem('token', data.token);
            setAuth(data)
            navigate('/admin')
        } catch (error) {
            console.log(error.response.data.msg);
            setAlerta({
                msg: error.response.data.msg, 
                error: true
            })
        }
    }

  return (
    <>
        <div>
            <h1 className="text-teal-600 font-black text-6xl">Inicia Sesion y Administra tus <span className="text-orange-400">Pacientes</span></h1>
        </div>
        
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg && <Alert
            alerta={alerta}
        />}

            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="uppercase block text-xl font-bold text-gray-600" htmlFor="">
                        Email
                    </label>
                    <input 
                        type="text" 
                        placeholder="Introduce el email"
                        className="border w-full p-3 mt-3 bg-slate-50 rounded-xl"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label className="uppercase block text-xl font-bold text-gray-600" htmlFor="">
                        Password
                    </label>
                    <input 
                        type="password" 
                        placeholder="Introduce el email"
                        className="border w-full p-3 mt-3 bg-slate-50 rounded-xl"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value='Iniciar sesion'
                    className="bg-teal-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-700 md:w-auto" 
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-400" 
                    to="/registrar">¿No tienes una cuenta? Regístrate</Link>
                <Link className="block text-center my-5 text-slate-400" 
                    to="/olvide-password">Olvidé mi contraseña</Link>
            </nav>
        </div>

    
    </>
  )
}
export default Login