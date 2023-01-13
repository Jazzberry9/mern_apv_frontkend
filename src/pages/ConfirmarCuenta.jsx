import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import clienteAxios from "../config/axios";


const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada ] = useState(false);
    const [cargando, setCargando ] = useState(true);
    const [alerta, setAlerta ] = useState({});


  // obtiene id de la url
    const { id } = useParams();
    
    useEffect( () => {
      const confirmarAcc = async () => {
        // confirma al usuario
        try {
          const { data } = await clienteAxios(`/veterinarios/confirmar/${id}`);
          setCuentaConfirmada(true);
          setAlerta({
            msg: data.msg
          })

        } catch (error) {

          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }
        setCargando(false)
      }
      confirmarAcc();
    }, [])

    return (
      <>
        <div>
          <h1 className="text-teal-600 font-black text-6xl">Confirma tu cuenta para Administrar tus<span className="text-orange-400">Pacientes</span></h1>
        </div>

        <div className="shadow-lg px-5 py-5 rounded-xl bg-white">
            {!cargando && <Alert 
              alerta={alerta}
            />}

            {cuentaConfirmada && (
              <Link className="block text-center my-5 text-slate-400" 
              to="/registrar">Iniciar Sesion</Link>
            )}
        </div>
      
      </>
    )
  }
  export default ConfirmarCuenta