import { useEffect, useState } from 'react'
import { formatearCantidad } from '../helpers'

const ControlPresupuesto = ({presupuesto,gastos}) => {
   
    const [disponible,setDisponible] = useState(0)
    const [gastado,setGastado] = useState(0)

    useEffect(() => { // Calculando lo gastado
        const totalGastado = gastos.reduce( (total,gasto) => gasto.cantidad + total,0) 
        // reduce ocupa de dos variables, el que va a ir sumando y el acumulado, asi como tambien despues tenemos que indicar con cuando va a iniciar total
        // total es el acumulado y gasto es el que va a ir iterando dentro del arreglo y propiedad "gastos"
        setGastado(totalGastado)

        const totalDisponible = presupuesto - totalGastado

        setDisponible(totalDisponible)

    },[gastos])

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <p>Grafica aqui</p>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
