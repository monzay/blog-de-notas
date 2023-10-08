import { useContext, useRef, useState, useEffect } from "react";
import { contextContreles } from "../Providers/mostrarControlesProvider";
import { contextTareas } from "../Providers/tareasProvider";
import { ContextIdTarea } from "../Providers/IdTareaProvider";
import {
  ContextMostrarModel,
  MostrarModel,
} from "../Providers/TrueFalseProvider/MostrarModel";

export const ControlesFrom = ({ hora, minutos }) => {
  // estados
  const [mensaje, setMensaje] = useState("");
  const [id,setId]= useState(1)

  const {
    mostrarControlesTareasProgramadas,
    mostrarControlesTareasRandoms,
    mostrarControlesTareasTemporizadas,
    setMostrarControlesTareasProgramadas
  } = useContext(contextContreles);
  const { tareas, setTareas } = useContext(contextTareas);
  const { tiempo, setTiempo } = useContext(ContextIdTarea);
  const { setMostrarModel, setMostrarAnimacionTarea, setMostrarTiempo } =
    useContext(ContextMostrarModel);

  const inputTarea = useRef();

  useEffect(() => {
    if(tareas.length > 0){
      const ultimoId = tareas.slice(-1)[0] 
      setId(ultimoId) 
    }
  }, [])

  const tareasProgramadas = (e) => {
    e.preventDefault();

    if (mensaje !== "") {
      if (mostrarControlesTareasProgramadas) {
       
          setId( prev => prev === 4 ? 1 : prev + 1)

        if (hora === null) {
          let dataTarea = {
            id ,
            tarea: mensaje,
            hora: hora,
            minutos: minutos,
          };
          setTareas((prev) => [...prev, dataTarea]);
          localStorage.setItem("tareas", JSON.stringify(tareas));
        } else {
          const b = hora.split(":");
          const horaSacada = Number(b[0]);
          let dataTarea = {
            id,
            tarea: mensaje,
            hora: horaSacada,
            minutos: minutos,
          };

          setTareas((prev) => [...prev, dataTarea]);
          localStorage.setItem("tareas", JSON.stringify(tareas));
          setMostrarControlesTareasProgramadas(false)
        }

        setMostrarAnimacionTarea(true);
        setMostrarTiempo(false);
        
      } else if (mostrarControlesTareasTemporizadas) {
        if (tiempo) {
          localStorage.setItem("tareasTemporizadas", mensaje);
          setMostrarModel(true);
          setTimeout(() => {
            localStorage.removeItem("tareasTemporizadas");
            setMostrarModel(false);
          }, tiempo);
        }
      } else if (mostrarControlesTareasRandoms) {
        const timepoRandomTarea = Math.floor(Math.random() * 60000);
        setMostrarModel(true);
        setTimeout(() => {
          localStorage.setItem("tareaTiempoRandom", mensaje);
          setMostrarModel(false);
        }, timepoRandomTarea);
      }
    } else {
      console.log("che loco pero escribi algo");
    }
  };

  return (
    <form className="conteiner-mandar-menjases" onSubmit={tareasProgramadas}>
      {(mostrarControlesTareasProgramadas ) && (
        <>
          <div>hola</div>
          <input
            className="input-escribir-mensaje"
            type="text"
            placeholder="tarea programada"
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button className="btn-mandar-mensaje">Enviar</button>
        </>
      )}
      {mostrarControlesTareasTemporizadas && (
        <>
          <input
            className="input-escribir-mensaje"
            type="text"
            placeholder="tareaTemporizada"
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button className="btn-mandar-mensaje">Enviar</button>
        </>
      )}
      {mostrarControlesTareasRandoms && (
        <>
          <input
            ref={inputTarea}
            className="input-escribir-mensaje"
            type="text"
            placeholder="tara random"
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button className="btn-mandar-mensaje">Enviar</button>
        </>
      )}
    </form>
  );
};
