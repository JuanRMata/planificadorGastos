import React from 'react'
import { useState } from 'react'
import Mensaje from './Mensaje'


const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
  const [mensaje,setMensaje] = useState('')
  
  
  const handlePresupuesto = (e) => {
    e.preventDefault()

    if(!presupuesto || presupuesto < 0){//Convirtiendo el input de string a Numero
      setMensaje('No es un presupuesto valido')
      return // Este return es para romper el ciclo y que no siga
    }
    setMensaje('') //Si es un presupuesto valido reseteamos el state de mensaje
    setIsValidPresupuesto(true)
  }

  return (
    <div className=' contenedor-presupuesto contenedor  sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label>Definir Presupuesto</label>
                <input 
                    className='nuevo-presupuesto'
                    type='number'
                    placeholder='Añade un presupuesto'
                    value={presupuesto}
                    onChange={ (e) => setPresupuesto(Number(e.target.value))}
                />
            </div>
            <input type="submit" value='Añadir'/>

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto
