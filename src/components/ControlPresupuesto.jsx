import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatearCantidad } from "../helpers";

const ControlPresupuesto = ({ 
  presupuesto, 
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    // Calculando lo gastado
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    // reduce ocupa de dos variables, el que va a ir sumando y el acumulado, asi como tambien despues tenemos que indicar con cuando va a iniciar total
    // total es el acumulado y gasto es el que va a ir iterando dentro del arreglo y propiedad "gastos"
    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje = ((totalGastado * 100) / presupuesto).toFixed(2); //Con .toFixed(numeroDeDecimales) retorna la cantidad de decimales que indiquemos

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 500);

    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);



  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar todo el contenido?')
    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }


  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
            value={porcentaje}
            text={`${porcentaje}% Gastado`}
            //Colocando estilos que contiene el archivo styles de la libreria descargada CircularProgressBar
            styles={{ 
                path: {
                    stroke: porcentaje > 100 ? '#dc2626' : '#3B82F6'
                },
                text: {
                    fill: porcentaje > 100 ? '#dc2626' : '#3B82F6'
                }
            }}
            
        />
      </div>

      <div className="contenido-presupuesto">
        <button 
        className="reset-app"
        type="button"
        onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
