import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";
import { generarId } from "./helpers"; //Aqui estamos importando un archivo previamente generado para tener una funcion, se importa el nombre de la funcion y como la carpeta solo tiene un archivo, solo se pone el nombre de la carpeta
import IconoNuevoGasto from "./img/nuevo-gasto.svg";


function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem(('gastos')) ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem('presupuesto') ?? 0 // Aqui estamos especificando que tome el valor que esta en el localStorage, en caso de no tener uno (??) el valor va a ser 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro,setFiltro] = useState('')

  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    Number(localStorage.setItem('presupuesto', presupuesto ?? 0)) // 'presupuesto' es el nombre de la variable del localStorage
  },[presupuesto])

  useEffect(() => { //Este useEffect nos sirve para poder pasar la validacion con el prespuesto que esta en Local Storage
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  },[])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []) // 'presupuesto' es el nombre de la variable del localStorage
  },[gastos])


  
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {//Con Object.keys() estamos analizando si el objeto de gastoEditar contiene algo, ya que tambien usamos .length
      
      setModal(true); //Aqui estamos llamando al modal

      setTimeout(() => {
        setAnimarModal(true);
      }, 100); 
    }
  }, [gastoEditar]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 100);
  };

  const guardarGasto = (gasto) => {
    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
   
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos 
            gastos={gastos} 
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto} 
            gastosFiltrados={gastosFiltrados}
            filtro={filtro}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto" //texto alternativo alt
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
