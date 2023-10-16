
export const BoxObcionesDeLasTareas = ({newTexto,tareas,idTarea,setTareas,setMostrarInput,mostrarInput}) => {
    
    const eliminarTarea = () => {
        const newTareas = tareas.filter((t, i) => i !== idTarea);
        localStorage.setItem("tareas", JSON.stringify(newTareas));
        setTareas(newTareas);
      };
  
  const actualizarTarea = () => {
    const tareaSeleccinada = tareas.find((t, i) => i == idTarea);
    tareas[idTarea] = { ...tareaSeleccinada, tarea: newTexto };
    localStorage.setItem("tareas", JSON.stringify(tareas));
    const newTareas = JSON.parse(localStorage.getItem("tareas"));
    setTareas(newTareas);
  };
  
  return (
    <div className='contenedor-todas-obciones-de-las-tareas' >
        <button onClick={eliminarTarea} className='contenedor-todas-obciones-obciones'>Eliminar</button>
        <button  onClick={() =>{
            actualizarTarea()
            setMostrarInput(!mostrarInput);
        }}  className='contenedor-todas-obciones-obciones'>Editar</button>
    </div> 
  )
}
