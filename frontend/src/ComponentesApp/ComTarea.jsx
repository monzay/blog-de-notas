import { useState, useContext, useEffect, useRef } from "react";
import { ContextIdTarea } from "../Providers/IdTareaProvider.jsx";
import { contextTareas } from "../Providers/tareasProvider.jsx";
import { ContextMostrarModel } from "../Providers/TrueFalseProvider/MostrarModel.jsx";
import { MdDelete } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";

import audioFile  from "../audios/audio.mp3"

export const ComTarea = ({ index, tarea, tiempoHora, tiempoMinutos }) => {
  //hooks mostrar componentes 
  const [mostrarObciones, setMostrarObciones] = useState(false);
  const [mostrarInput, setMostrarInput] = useState(false);



  //  guardar hora y minutos 
  const [hora, setHora] = useState(0);
  const [minutos, setMinutos] = useState(0);
  // hooks obtine el nuevo valor de la tarea
  const [newTexto, setNewTexto] = useState("");


  const { idTarea, setIdTarea } = useContext(ContextIdTarea);
  const { tareas, setTareas } = useContext(contextTareas);
  const { setMostrarModel,mostrarAnimacionTareas } = useContext(ContextMostrarModel);

  const audioRef = useRef(null)

  const funEliminar = () => {
    const newTareas = tareas.filter((t, i) => i !== idTarea);
    localStorage.setItem("tareas", JSON.stringify(newTareas));
    setTareas(newTareas)
  };

  let ahora = new Date();
  let horaActual = ahora.getHours();
  let minutosActuales = ahora.getMinutes();
  let horaObjetivo = tiempoHora
  let minutosObjetivo =tiempoMinutos

  useEffect(() => {
    let horasRestantes;
    let minutosRestantes;
    if (
      horaActual > horaObjetivo ||
      (horaActual === horaObjetivo && minutosActuales >= minutosObjetivo)
    ) {
      horasRestantes = 24 - horaActual + horaObjetivo;
    } else {
      horasRestantes = horaObjetivo - horaActual;
    }

    minutosRestantes = minutosObjetivo - minutosActuales;
    if (minutosRestantes < 0) {
      minutosRestantes += 60;
      horasRestantes -= 1;
    }
    setHora(horasRestantes);
    setMinutos(minutosRestantes);
  }, [minutosActuales]);

  const actualizarTarea = () => {
    const tareaSeleccinada = tareas.find((t, i) => i == idTarea);
    console.log(tareaSeleccinada)
    tareas[idTarea] = { ...tareaSeleccinada, tarea: newTexto };
    localStorage.setItem("tareas", JSON.stringify(tareas));
    const  newTareas = JSON.parse(localStorage.getItem("tareas"))
    setTareas(newTareas)
  };

   useEffect(() => {
    for(let i = 0 ; i < tareas.length ; i++ ){
      if(tareas[i].hora  === horaActual  && tareas[i].minutos  === minutosActuales ){
        audioRef.current.play();
        break 
      }
    }     
   }, [minutosActuales])
   

  return (
    <li
      onMouseOver={() => {
        setMostrarObciones(true)
        setIdTarea(index)
      }}
      onMouseLeave={() => setMostrarObciones(false)}
    
      className={`tarea ${ mostrarAnimacionTareas ? "animacion-de-la-tarea-al-crearla" : ""} `}
      onClick={() => {
        setIdTarea(index);
        setMostrarModel(true);
      }}
    >
      {mostrarInput ? (
        <form>
          <input 
            className="input-new-tarea"
            type="text"
            onChange={(e) => setNewTexto(e.target.value)}
          />
        </form>
      ) : (
        <div className="tarea-escrita">{tarea}</div>
      )}
      <div className="hora-de-la-tarea">
        {  tareas.find( (t,i) => i == idTarea  ).hora  === null  ? "no tiene tiempo" :  `${hora} : ${minutos}`}
      </div>
      <audio src={audioFile} ref={audioRef} ></audio>
      <div className="contenedor-obciones">
        {mostrarObciones && (
          <>
            <button
              title="eliminar"
              className="btn-de-las-acciones-de-las-tareas"
              onClick={funEliminar}
            >
              <MdDelete />
            </button>
            <button
              title="editar"
              className="btn-de-las-acciones-de-las-tareas"
              onClick={() => {
                actualizarTarea();
                setMostrarInput(!mostrarInput);
              }}
            >
              <BiSolidPencil />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

