import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

  const { guardarNuevaPassword } = useAuth();
  const [ alerta, setAlerta ] = useState(false);
  const [ password, setPassword ] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const { pwd_actual, pwd_nuevo } = password;
    if([pwd_actual, pwd_nuevo].includes('')){
      setAlerta({msg:'Todos los campos son obligatorios', error: true})
      return;
    }
    // otra manera de hacerlo
    if(Object.values(password).some( campos => campos === '')){
      setAlerta({msg: 'Varios campos vacios oyo', error: true});
      return;
    }

    if(password.pwd_nuevo.length < 6){
      setAlerta({msg: 'Password tiene un minimo de 6 caracteres', error: true})
      return;
    }

    const resp = await guardarNuevaPassword(password);

    setAlerta(resp)
}

  const { msg } = alerta;

  return (

  <>
  
    <AdminNav />

    <h2 className="font-black text-3xl text-center mt-10 ">Cambiar Password</h2>
    <p className="text-xl mt-5 mb-10 text-center">Modifica tu 
        <span className="text-teal-500 font-bold"> Password Aqui</span>
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
          <label className="uppercase font-bold text-gray-500">Password Actual</label>
          <input 
            type="password" 
            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
            name="pwd_actual"
            placeholder="Escribe tu password actual"
            onChange={ev => setPassword({
              ...password,
              [ev.target.name] : ev.target.value
            })}
          />
        </div>

        <div className="my-3">
          <label className="uppercase font-bold text-gray-500">Nuevo Password</label>
          <input 
            type="password" 
            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
            name="pwd_nuevo"
            placeholder="Escribe tu nuevo password"
            
            onChange={ev => setPassword({
              ...password,
              [ev.target.name] : ev.target.value
            })}
          />
        </div>

        <input 
          type="submit" 
          value="Actualizar password"
          className="bg-teal-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-teal-700"       
        />

        </form>
      </div>
    </div>
  
  </>

  )

}
export default CambiarPassword