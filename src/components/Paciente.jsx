import usePacientes from "../hooks/usePacientes";

const Paciente = ({patient}) => {

    const { email, fecha, nombre, propietario, sintomas, _id } = patient;
    const { setEdicion, eliminarPaciente } = usePacientes();

    // formatear fecha
    const formatFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha);
    }


    return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-lg">
        <p className="font-bold uppercase text-teal-800">Nombre:
            <span className="font-normal normal-case text-black"> {nombre}</span>
        </p>
        <p className="font-bold uppercase text-teal-800">Propietario:
            <span className="font-normal normal-case text-black"> {propietario}</span>
        </p>
        <p className="font-bold uppercase text-teal-800">Email:
            <span className="font-normal normal-case text-black"> {email}</span>
        </p>
        <p className="font-bold uppercase text-teal-800">Fecha:
            <span className="font-normal normal-case text-black"> {formatFecha(fecha)}</span>
        </p>
        <p className="font-bold uppercase text-teal-800">Sintomas:
            <span className="font-normal normal-case text-black"> {sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button
            className="py-2 px-10 bg-teal-600 hover:bg-teal-700 text-white uppercase font-bold rounded-lg"
            onClick={() => setEdicion(patient)}
            >Editar</button>

            <button
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
            onClick={() => eliminarPaciente(_id)}
            >Eliminar</button>
            
        </div>
    </div>
    
  )
}

export default Paciente