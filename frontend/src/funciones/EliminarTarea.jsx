export const  EliminarTarea = (tareas) => {
    const newTareas = tareas.filter((t, i) => i !== idTarea);
    localStorage.setItem("tareas", JSON.stringify(newTareas));
  };