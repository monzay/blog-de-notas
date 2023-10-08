export const actualizarTarea = (tareas) => {
    const tareaSeleccinada = tareas.find((t, i) => i == idTarea);
    tareas[idTarea] = { ...tareaSeleccinada, tarea: newTexto };
    localStorage.setItem("tareas", JSON.stringify(tareas));
  };