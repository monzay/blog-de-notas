import { useContext, useState,useEffect } from "react"
import { contextoTareaAdio } from "../Providers/TareaAudio"
import { contextTareas } from "../Providers/tareasProvider"


export const BoxMostrarTarea = ({setMostrarModelTareaAlarma,mostrarModelTareaAlarma}) => {
    const {tareaAudio,audioRef,timeoutId}= useContext(contextoTareaAdio)
    const {tareas,setTareas} = useContext(contextTareas)
    
    const [timeOutId,setTimeOutId] = useState(null)
       
     
    console.log(tareaAudio)
    const agregarTareaCompletada = () => {
      clearTimeout(timeoutId) 
      audioRef.current.pause()
      const tareaIndex = tareas[tareaAudio]
      const numDeVezQueHizoLaTarea = tareaIndex.tareaEcha 
      tareas[tareaAudio] = {...tareaIndex,tareaEcha: numDeVezQueHizoLaTarea + 1 }
      const newTareas = [...tareas]    
      localStorage.setItem("tareas",JSON.stringify(newTareas))

      setMostrarModelTareaAlarma(false)
        clearTimeout(timeOutId)
    }

    const agregarTareaNoCompletada = ()=> {
      audioRef.current.pause();
      const tareaIndex = tareas[tareaAudio]
      const numDeVezQueHizoLaTarea = tareaIndex.tareaEcha 
      tareas[tareaAudio] = {...tareaIndex,tareaNoEcha: numDeVezQueHizoLaTarea + 1 }
      const newTareas = [...tareas]    
      localStorage.setItem("tareas",JSON.stringify(newTareas))
      setMostrarModelTareaAlarma(false)
    }
    useEffect(() => {
      if(mostrarModelTareaAlarma){
        const timeout = setTimeout(() => {
          agregarTareaNoCompletada()
        },100);
        setTimeOutId(timeout)
      }
      return () => clearTimeout(timeOutId)
    }, [mostrarModelTareaAlarma])
    
  return (
    <div className="model-mostrar-tarea">
        <h1>{tareaAudio.tarea}</h1>
        <span>llego la hora capo</span>
            <button onClick={agregarTareaCompletada}>pausar</button>
    </div>
  )
}