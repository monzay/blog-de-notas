import { createContext, useEffect, useState } from "react"

export  const EstadoTiempoContexto= createContext()

export const EstadoTiempoProvider = ({children}) => {
    const [tiempoHora,setTiempoHora] = useState([])
    const [tiempoMinutos,setTiempoMinutos] = useState([])

    useEffect(() => {
       console.log(tiempoHora)
    }, [tiempoHora])
    
  return (
    <EstadoTiempoContexto.Provider value={{tiempoHora,setTiempoHora,tiempoMinutos,setTiempoMinutos}}>
        {children}
    </EstadoTiempoContexto.Provider>
  )
}
