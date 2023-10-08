import React, { useState, useContext } from "react";
import { contextContreles } from "../Providers/mostrarControlesProvider";

export const OpcionTarea = ({ nombreIcono: IconComponent, boleano, boleano2, boleano3 }) => {
  const [mostrarAnimacionIcono, setMostrarAnimacionIcono] = useState(false);

  const {
    setMostrarControlesTareasProgramadas,
    setMostrarControlesTareasRandos,
    setMostrarControlesTareasTemporizadas,
  } = useContext(contextContreles);

  return (
    <div
      onMouseLeave={() => setMostrarAnimacionIcono(false)}
      onMouseOver={() => setMostrarAnimacionIcono(true)}
      className="opciones"
      onClick={() => {
        setMostrarControlesTareasTemporizadas(boleano);
        setMostrarControlesTareasProgramadas(boleano2);
        setMostrarControlesTareasRandos(boleano3);
      }}
    >
      {IconComponent && (
        <IconComponent
          className={`opciones-tarea-icon ${
            mostrarAnimacionIcono ? "animate__animated animate__tada" : ""
          }`}
        />
      )}
    </div>
  );
};