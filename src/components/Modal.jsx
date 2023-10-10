import { useState } from 'react'
import Mensaje from './Mensaje'
import CerrarModal from '../img/cerrar.svg'




const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto}) => {

    const [nombre,setNombre] = useState('')
    const [cantidad,setCantidad] = useState('')
    const [categoria,setCategoria] = useState('')
    const [mensaje,setMensaje] = useState(false)

    const ocultarModal = () => {
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault() // En cada submit de formulario hay que poner el prevent default
        if([nombre,cantidad,categoria].includes(''))
        {
            setMensaje(true)
            setTimeout(() => {
                setMensaje(false)
            }, 3000);
            return
        }
        guardarGasto({nombre,cantidad,categoria})
    }



  return (
    <div className='modal'>
        <div className='cerrar-modal '>
            <img 
            src={CerrarModal} 
            alt="boton para cerrar modal"
            onClick={ocultarModal}
            />
        </div>
        <form 
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}
        >
            <legend>Nuevo Gasto</legend>
            {mensaje && <Mensaje tipo="error">Todos los campos son obligatorios</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label> 
                <input
                    id='nombre' 
                    type="text" 
                    placeholder='Añade el nombre del gasto'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label> 
                <input
                    id='cantidad' 
                    type="number" 
                    placeholder='Añade la cantidad'
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>
                 <select 
                 id="categoria"
                 value={categoria}
                 onChange={(e) => setCategoria(e.target.value)}
                 >
                    <option value="">-- Seleccione alguna --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                 </select>
            </div>
            <input 
                type='submit'
                value='Añadir Gasto'
            />
        </form>
        
    </div>
  )
}

export default Modal
