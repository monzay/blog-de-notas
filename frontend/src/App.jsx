import React, { useContext, useEffect, useState, useRef } from "react";

// estilos y bibliotecas
import "./styles/app.css";
import "animate.css";

//bibliotecas de react-icons
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";

// contextos
import { contextTareas } from "./Providers/tareasProvider";
// componentes app
import { ComTarea } from "./ComponentesApp/ComTarea";
import { ControlesFrom } from "./ComponentesApp/ControlesFrom";
import { OccionesTareas } from "./ComponentesApp/OccionesTareas";
import { ContextMostrarModel } from "./Providers/TrueFalseProvider/MostrarModel";

import { generarBox } from "./funciones/GenerarBox";
import { PanelDeHistorial } from "./ComponentesApp/PanelDeHistorial";
import { BoxMostrarTarea } from "./ComponentesApp/BoxMostrarTarea";
export const App = () => {
  //contextos
  const { tareas, setTareas } = useContext(contextTareas);
  const { mostrarTiempo, setMostrarTiempo } = useContext(ContextMostrarModel);
  const [hora, setHora] = useState(null);
  const [minutos, setMinnuto] = useState(null);

  const [mostrarBoxNumber, setMostrarBoxNumeber] = useState(true);
  const [idBoxMinutos, setIdBoxMinutos] = useState(0);
  const [idBoxHoras, setIdBoxHoras] = useState(0);
  const [mostrarMensajeDeBienvenida, setMostrarMensajeDeBienvenida] =
    useState(false);
  
    const [mostrarModelTareaAlarma,setMostrarModelTareaAlarma] = useState(false)
    const [mostrarPanelInfo,setMostrarPanelInfo] = useState(false)


    useEffect(() => {
      if(localStorage.length === 1 ){
        localStorage.setItem("tareas",JSON.stringify([]))
      }
    }, [])
        
  useEffect(() => {
    if (tareas.length === 0) setMostrarMensajeDeBienvenida(true);
    else setMostrarMensajeDeBienvenida(false);
  }, [tareas]);



  const info = [
    {
      name: FaPencilAlt,
      boleano1: false,
      boleano2: true,
      boleano3: false,
      title: "Tarea Programadas",
    },
    {
      name: AiOutlineFieldTime,
      boleano1: true,
      boleano2: false,
      boleano3: false,
      title: "Tareas Temporizadas",
    },
    {
      name: BiTimeFive,
      boleano1: false,
      boleano2: false,
      boleano3: true,
      title: "Tarea Randoms",
    },
  ];

  return (
    <div className="app">
      <div className="panel-occiones-tareas">
        {mostrarTiempo ? (
          <div className="panel-elegir-tiempo">
            <div className="contenedor-box-tiempo-y-icono">

              <div onClick={() => setMostrarTiempo(false)}  className="volever-atras-icono"  >
                <BiChevronLeft />
              </div>
              
              <div className="conteiner-horas">
                {mostrarBoxNumber
                  ? generarBox(24).map((num, index) => (
                      <div
                        style={
                          index === idBoxHoras 
                            ? { backgroundColor: "black", color: "white" }
                            : null
                        }
                        className="number"
                        key={num}
                        onClick={() => {
                          setHora(num);
                          setIdBoxHoras(index);
                          setMostrarBoxNumeber(false);
                        }}
                      >
                        {num}
                      </div>
                    ))
                  : generarBox(60).map((num, index) => (
                      <div
                        className="number"
                        key={num}
                        onClick={() => {
                          setMinnuto(num);
                          setIdBoxMinutos(index);
                        }}
                        style={
                          index === idBoxMinutos
                            ? { backgroundColor: "black", color: "white" }
                            : null
                        }
                      >
                        {num}
                      </div>
                    ))}
              </div>
            </div>
            <div className="contenedor-btns">
              <button
                onClick={() => setMostrarBoxNumeber(true)}
                className="contenedor-btns-btn"
              >
                hora
              </button>
              <button
                onClick={() => setMostrarBoxNumeber(false)}
                className="contenedor-btns-btn"
              >
                minutos
              </button>
            </div>
          </div>
        ) : null}
        {!mostrarTiempo &&
          info.map((info, i) => (
            <OccionesTareas
              key={i}
              icono={info.name}
              boleano1={info.boleano1}
              boleano2={info.boleano2}
              boleano3={info.boleano3}
              title={info.title}
            />
          ))}
      </div>
      <div className="conteiner-paneles">

        {mostrarMensajeDeBienvenida && (
          <h1
            className={`mensaje-de-bienvenida ${
              mostrarMensajeDeBienvenida
                ? "mostrar-mensaje-de-la-bienvenida"
                : null
            }`}
          >
            Bienvenido{" "}
          </h1>
        )}
        <div className="panel-mostrar-tareas">
          {tareas &&
            [1, 2, 3, 4].map((number) => (
              <ul key={number} className="ul-contenedor-tareas">
                {tareas.map((tarea, i) =>
                  tarea.id === number ? (
                    <ComTarea
                      key={i}
                      index={i}
                      tarea={tarea.tarea}
                      tiempoHora={tarea.hora}
                      tiempoMinutos={tarea.minutos}
                      setMostrarModelTareaAlarma={setMostrarModelTareaAlarma}
                    />
                  ) : null
                )}
              </ul>
            ))}
        </div>
        {
          mostrarPanelInfo &&   <PanelDeHistorial setMostrarPanelInfo={setMostrarPanelInfo} /> 
        }
        <div className="contenedor-form-y-panel"> 
        <ControlesFrom
          hora={hora}
          minutos={minutos}
          mostrarBoxNumber={mostrarBoxNumber}
          setMostrarBoxNumeber={setMostrarBoxNumeber}
        />
        <div className="icono-panel" onClick={()  => setMostrarPanelInfo(!mostrarPanelInfo)}>
        </div>
        </div>
        {
          mostrarModelTareaAlarma && <BoxMostrarTarea mostrarModelTareaAlarma={mostrarModelTareaAlarma} setMostrarModelTareaAlarma={setMostrarModelTareaAlarma} />
        }
      </div>
    </div>
  ); 
};