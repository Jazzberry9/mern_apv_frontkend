import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListaPacientes = () => {

  const { pacientes } = usePacientes();

  return (
    <>
      { pacientes.length ? 
      (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus
            <span className="text-teal-600 font-bold"> Pacientes</span>
          </p>

          {pacientes.map( patient => (
            <Paciente 
              key={patient._id}
              patient={patient}
            />
          ))}
        
        </>
      ) : 
      (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes
            <span className="text-teal-600 font-bold"> y apareceran en este lugar</span>
          </p>
        </>
      )}
    </>
  )
}
export default ListaPacientes