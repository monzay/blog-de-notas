import { useContext, useRef, useState, useEffect } from "react";
import { contextContreles } from "../Providers/mostrarControlesProvider";
import { contextTareas } from "../Providers/tareasProvider";
import { ContextIdTarea } from "../Providers/IdTareaProvider";
import {
  ContextMostrarModel,
  MostrarModel,
} from "../Providers/TrueFalseProvider/MostrarModel";

export const ControlesFrom = ({ hora, minutos ,setMostrarBoxNumeber}) => {


  const [mensaje, setMensaje] = useState("");
  const [id,setId]= useState(1)

  const { mostrarControlesTareasProgramadas,  mostrarControlesTareasRandoms, mostrarControlesTareasTemporizadas,setMostrarControlesTareasProgramadas} = useContext(contextContreles);

  const { tareas, setTareas } = useContext(contextTareas);
  const { tiempo } = useContext(ContextIdTarea);
  const { setMostrarModel, setMostrarAnimacionTarea, setMostrarTiempo } = useContext(ContextMostrarModel);


// cada vez  que se manda una tarea a loaclStorage agarra el ultimo id y se lo pone a la siguiente parea
  useEffect(() => {
    if (tareas.length > 0) {
      const ultimoId = tareas.slice(-1)[0].id;
      setId( prev => prev === 4 ? 1 : ultimoId + 1 );
    } else {
      setId(1);
    }
  }, [tareas]);

  useEffect(() => {
    setTareas(JSON.parse(localStorage.getItem("tareas")))
  }, [])
  
  useEffect(() => {
     if(tareas.length > 0 ){
      localStorage.setItem("tareas", JSON.stringify(tareas));
     }
  }, [tareas]);

  const tareasProgramadas = (e) => {
    e.preventDefault();

    if (mensaje !== "") {
      if (mostrarControlesTareasProgramadas) {

        if (hora === null  ) {
          let dataTarea = {
            id ,
            tarea: mensaje,
            hora: hora,
            minutos: minutos,
            tareaEcha:0,
            tareaNoEcha:0
          };
          setTareas((prev) => [...prev, dataTarea]);

        } else {
          let dataTarea = {
            id,
            tarea: mensaje,
            hora: hora,
            minutos: minutos,
            tareaEcha:0,
            tareaNoEcha:0
          };
          setTareas((prev) => [...prev, dataTarea]);
          setMostrarControlesTareasProgramadas(false)
        }
        setMostrarAnimacionTarea(true);
        setMostrarTiempo(false);
        setMostrarBoxNumeber(true)
        
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
      {/* {mostrarControlesTareasTemporizadas && (
        <>
          <input
            className="input-escribir-mensaje"
            type="text"
            placeholder="tareaTemporizada"
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button className="btn-mandar-mensaje">Enviar</button>
        </>
      )} */}
      {/* {mostrarControlesTareasRandoms && (
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
      )} */}
    </form>
  );
};
