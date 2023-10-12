import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list"; //libreria importada y descargada, sirve para poder arrastrar un componente a la izquierda o derecha
import "react-swipeable-list/dist/styles.css";// importando la hoja de estilos de la libreria anterior

import { formatearFecha } from "../helpers";
import { formatearCantidad } from "../helpers";
import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

const Gasto = ({ gasto, setGastoEditar, eliminarGasto}) => {
  const { categoria, nombre, cantidad, id, fecha } = gasto;

  const diccionarioIconos = {
    //En este diccionario ocupamos poner a fuerza el nombre exacto de la categoria que tiene el value de la seleccion, en este caso esta en Modal y cada value del selection
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
  };
  const leadingActions = () => (// Funcion para que pueda desplazarse el componente hacia la derecha arrastrando
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}> {/* A fuerza ocupa el onclick */}
                Editar
            </SwipeAction>
        </LeadingActions>
  ) 
  const trailingActions = () => (// Funcion para que pueda desplazarse el componente hacia la izquierda arrastrando
        <TrailingActions>
            <SwipeAction 
            onClick={() => eliminarGasto(id)} //A fuerzas ocupa el onclick
            destructive={true}>   
                Eliminar
            </SwipeAction>
        </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            {/* Agregando imagen */}

            <img src={diccionarioIconos[categoria]} alt="Icono gasto" />

            {/* Mostrando los gastos */}

            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: {""}
                <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{formatearCantidad(cantidad)}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
