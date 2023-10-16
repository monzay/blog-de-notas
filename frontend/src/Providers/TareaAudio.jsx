import { useState,createContext,useRef} from "react"
export const contextoTareaAdio = createContext()

export const  TareaAudio = ({children}) => {
    const [tareaAudio,setTareaAudio] = useState({})
    const audioRef = useRef(null) 
    const [timeoutId, setTimeoutId] = useState(null);

  return (
    <contextoTareaAdio.Provider value={{tareaAudio,setTareaAudio,audioRef,timeoutId,setTimeoutId}}>
        {children}
    </contextoTareaAdio.Provider>
  )
}
