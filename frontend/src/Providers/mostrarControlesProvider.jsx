import {createContext,useState } from "react";

export const contextContreles = createContext()
export const MostrarControlesProvider = ({children}) => {
    const [
        mostrarControlesTareasProgramadas,
        setMostrarControlesTareasProgramadas,
      ] = useState(false);
    
      const [
        mostrarControlesTareasTemporizadas,
        setMostrarControlesTareasTemporizadas,
      ] = useState(false);
    
      const [mostrarControlesTareasRandoms, setMostrarControlesTareasRandos] =
        useState(false);
  return (
    <contextContreles.Provider value={{mostrarControlesTareasProgramadas,setMostrarControlesTareasProgramadas,mostrarControlesTareasTemporizadas,setMostrarControlesTareasTemporizadas,mostrarControlesTareasRandoms,setMostrarControlesTareasRandos}}>
        {children}
    </contextContreles.Provider>
  )
}
