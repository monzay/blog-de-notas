import {createContext,useState ,useEffect} from "react";

export const AccesoAppContexto = createContext()
export const  AccesoAppProvider  = ({children}) => {
   
   const [token,setToken] =  useState(false)


   useEffect(() => {
     console.log(token)
   }, [token])
   
   return (
      <AccesoAppContexto.Provider value={{setToken,token}}>
          {children}
      </AccesoAppContexto.Provider>
    )
  }