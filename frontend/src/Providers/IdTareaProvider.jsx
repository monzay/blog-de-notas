import { useState,createContext } from "react"
export const ContextIdTarea = createContext()

export const IdTareaProvider = ({children}) => {
    const [idTarea, setIdTarea] = useState(0);
    const [tiempo, setTiempo] = useState(0);

    
  return (
    <ContextIdTarea.Provider value={{idTarea,setIdTarea,tiempo,setTiempo}}>
        {children}
    </ContextIdTarea.Provider>
  )
}
