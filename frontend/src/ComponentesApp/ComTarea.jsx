import { useState, useContext, useEffect } from "react";
import { ContextIdTarea } from "../Providers/IdTareaProvider.jsx";
import { contextTareas } from "../Providers/tareasProvider.jsx";
import { ContextMostrarModel } from "../Providers/TrueFalseProvider/MostrarModel.jsx";
import { CiMenuKebab } from "react-icons/ci";

import audioFile from "../audios/audio.mp3";
import { BoxObcionesDeLasTareas } from "./BoxObcionesDeLasTareas.jsx";
import { contextoTareaAdio } from "../Providers/TareaAudio.jsx";

export const ComTarea = ({
  index,
  tarea,
  tiempoHora,
  tiempoMinutos,
  setMostrarModelTareaAlarma,
}) => {
  //hooks mostrar componentes
  const [mostrarObciones, setMostrarObciones] = useState(false);
  const [mostrarInput, setMostrarInput] = useState(false);

  //  guardar hora y minutos
  const [hora, setHora] = useState(0);
  const [minutos, setMinutos] = useState(0);
  // hooks obtine el nuevo valor de la tarea
  const [mostrarTodaLasObciones, setMostrarTodaLasObciones] = useState(false);
  const [textoEditado, setTextoEditado] = useState("");

  const { idTarea, setIdTarea } = useContext(ContextIdTarea);
  const { tareas, setTareas } = useContext(contextTareas);
  const { setMostrarModel, mostrarAnimacionTareas } =
    useContext(ContextMostrarModel);

  const { setTareaAudio, audioRef, setTimeoutId, timeoutId } =
    useContext(contextoTareaAdio);

  let ahora = new Date();
  let horaActual = ahora.getHours();
  let minutosActuales = ahora.getMinutes();
  let horaObjetivo = tiempoHora;
  let minutosObjetivo = tiempoMinutos;

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

  useEffect(() => {
    for (let i = 0; i < tareas.length; i++) {
      if (
        tareas[i].hora === horaActual &&
        tareas[i].minutos === minutosActuales
      ) {
        audioRef.current.play();
        setTareaAudio(i);
        console.log(i);
        setMostrarModelTareaAlarma(true);
        break;
      }
    }
  }, [minutosActuales]);

  return (
    <li
      style={{ display: "flex" }}
      onMouseOver={() => {
        setMostrarObciones(true);
        setIdTarea(index);
      }}
      onMouseLeave={() => setMostrarObciones(false)}
      className={`tarea ${
        mostrarAnimacionTareas ? "animacion-de-la-tarea-al-crearla" : ""
      } `}
      onClick={() => {
        setIdTarea(index);
        setMostrarModel(true);
      }}
    >
      <div style={{width:"95%"}}>
        {mostrarInput ? (
          <textarea
            className="texto-editado"
            value={textoEditado}
            onChange={(e) => setTextoEditado(e.target.value)}
          />
        ) : (
          <span className="tarea-escrita">{tarea}</span>
        )}
        <div className="hora-de-la-tarea">
          {index === idTarea ? (
            tareas.find((t, i) => i === index).hora === null ? null : (
              <div style={{display:"flex",width:"100%",flexDirection:"column"}}>
                <span style={{fontSize:"14px"}} >{`${hora}:${minutos}`} </span>
                <span style={{fontSize:"14px"}}  >Hora programada: {`${tiempoHora}:${tiempoMinutos}`}</span>
              </div>
            )
          ) : null}
        </div>
        <audio src={audioFile} ref={audioRef}></audio>
      </div>
      <CiMenuKebab
        onClick={() => setMostrarTodaLasObciones(!mostrarTodaLasObciones)}
        className="icono-obciones"
      />
      {mostrarTodaLasObciones && (
        <BoxObcionesDeLasTareas
          tareas={tareas}
          idTarea={idTarea}
          newTexto={textoEditado}
          setTareas={setTareas}
          setMostrarInput={setMostrarInput}
          mostrarInput={mostrarInput}
        />
      )}
    </li>
  );
};
