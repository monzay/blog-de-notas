import { Outlet,Navigate } from "react-router-dom";
import { AccesoAppContexto } from "../../Providers/AccesoAppProvider";
import { useContext } from "react";
export const  VerificacionDelAcceso  = () => {
  const {token} = useContext(AccesoAppContexto)
    return  token  ? <Outlet/> :<Navigate to= "/"/>
  }