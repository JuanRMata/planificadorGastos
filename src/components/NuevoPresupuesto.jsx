import React from 'react'
import { useState } from 'react'
import Mensaje from './Mensaje'


const NuevoPresupuesto = ({presupuesto, setPresupuesto}) => {
  const [mensaje,setMensaje] = useState('')
  
  
  const handlePresupuesto = (e) => {
    e.preventDefault()

    if(!Number(presupuesto) || Number(presupuesto) < 0){//Convirtiendo el input de string a Numero
      setMensaje('No es un presupuesto valido')
    }else {
      
    }
  }

  return (
    <div className=' contenedor-presupuesto contenedor  sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label>Definir Presupuesto</label>
                <input 
                    className='nuevo-presupuesto'
                    type='text'
                    placeholder='Añade un presupuesto'
                    value={presupuesto}
                    onChange={ (e) => setPresupuesto(e.target.value)}
                />
            </div>
            <input type="submit" value='Añadir'/>

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto