import React, { useState, useContext } from "react";
import { contextContreles } from "../Providers/mostrarControlesProvider";
import { ContextMostrarModel } from "../Providers/TrueFalseProvider/MostrarModel";

export const OccionesTareas = ({ icono, boleano1, boleano2, boleano3 ,title}) => {
  
  // datos globales 
  const {setMostrarControlesTareasProgramadas,setMostrarControlesTareasRandos,setMostrarControlesTareasTemporizadas} = useContext(contextContreles);
  const {setMostrarTiempo} = useContext(ContextMostrarModel)

  //hoocks
  const [mostrarAnimacionIcono, setMostrarAnimacionIcono] = useState(false);

  return (
    <div
    title={`${title}`} 
      onMouseLeave={() => setMostrarAnimacionIcono(false)}
      onMouseOver={() => setMostrarAnimacionIcono(true)}
      className="obciones"
      onClick={() => {
        setMostrarControlesTareasTemporizadas(boleano1);
        setMostrarControlesTareasProgramadas(boleano2);
        setMostrarControlesTareasRandos(boleano3);
        setMostrarTiempo(true)
      }}
    >
      {icono && React.createElement(icono, {
        className: `obciones-tarea-icon ${
          mostrarAnimacionIcono ? "animate__animated animate__tada" : ""
        }`
      })}
    </div>
  );
};