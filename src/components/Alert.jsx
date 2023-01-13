const Alert = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' :'from-teal-400 to-teal-600'} bg-gradient-to-br text-center p-3 rounded-xl text-white font-bold uppercase text-sm`}>
        {alerta.msg}
    </div>
  )
}
export default Alert