import { useState,createContext } from "react"
export const contextTareas = createContext()

export const TareasProvider = ({children}) => {
    const [tareas, setTareas] = useState([]);
    
  return (
    <contextTareas.Provider value={{tareas,setTareas}}>
        {children}
    </contextTareas.Provider>
  )
}
