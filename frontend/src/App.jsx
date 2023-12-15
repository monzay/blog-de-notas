import React, { useContext, useEffect, useState, useRef } from "react";

// estilos y bibliotecas
import "./styles/app.css";
import "animate.css";

//bibliotecas de react-icons

import { BiChevronLeft, BiNoEntry } from "react-icons/bi";

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
import { EstadoTiempoContexto } from "./Providers/estadoTiempoProvider";
import { info } from "./variableGlobales/Info";
export const App = () => {
  //contextos
  const { tareas, setTareas } = useContext(contextTareas);
  const { mostrarTiempo, setMostrarTiempo } = useContext(ContextMostrarModel);


  const [tiempoHora,setTiempoHora] = useState([])
  const [tiempoMinutos,setTiempoMinutos ] =  useState([])
  //esto  
  const [hora, setHora] = useState(null);
  const [minutos, setMinnuto] = useState(null);

  const [mostrarBoxNumber, setMostrarBoxNumeber] = useState(true);
  const [mostrarMensajeDeBienvenida, setMostrarMensajeDeBienvenida] =
    useState(false);

  const [mostrarModelTareaAlarma, setMostrarModelTareaAlarma] = useState(false);
  const [mostrarPanelInfo, setMostrarPanelInfo] = useState(false);


  //cargar datos de la base de datos


  useEffect(() => {
    if (localStorage.length === 1) {
      localStorage.setItem("tareas", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (tareas.length === 0) setMostrarMensajeDeBienvenida(true);
    else setMostrarMensajeDeBienvenida(false);
  }, [tareas]);

  // logica para agregar el tiempo a las box en horas 
  useEffect(() => {
    setTiempoHora([])
    let numeros = []
    for(let i=0;i<=24;i++){
      numeros.push(i)
    }
     let index = 0
      const interval  = setInterval(() => {
        if (index === numeros.length) {
          clearInterval(interval);
          return;
        }
        setTiempoHora( prevHoras => [...prevHoras,numeros[index]])
         index++
       },200);
  
      return () => clearInterval(interval)
  }, [!mostrarTiempo,mostrarBoxNumber])

  // logica para agregar el tiempo en la box en minutos 
  useEffect(() => {
    setTiempoMinutos([])
    let numeros = []
    for(let i=0;i<=60;i++){
      numeros.push(i)
    }
     let index = 0
      const interval  = setInterval(() => {
        if (index === numeros.length) {
          clearInterval(interval);
          return;
        }
        setTiempoMinutos( prevMinutos => [...prevMinutos,numeros[index]])
         index++
       },100);
  
      return () => clearInterval(interval)
  }, [mostrarBoxNumber])


  return (
    <div className="app">
      <div className="panel-occiones-tareas">
      {mostrarTiempo ? (
          <div className="panel-elegir-tiempo">
            <div className="contenedor-box-tiempo-y-icono">
              <div
                onClick={() => setMostrarTiempo(false)}
                className="volever-atras-icono"
              >
                <BiChevronLeft />
              </div>
              <div className="conteiner-horas">
                {mostrarBoxNumber
                  ? tiempoHora.map((num, index) => (
                      <div
                      className="number animar-el-ultimo-box"
                        key={index}
                        onClick={() => {
                          setHora(num);
                          setMostrarBoxNumeber(false)
                        }}
                      >
                       { num < 10  ? `0${num}` : num}
                      </div>
                    ))
                  : tiempoMinutos.map((num, index) => (
                      <div
                        className="number animar-el-ultimo-box"
                        key={index}
                        onClick={()=> setMinnuto(num)}
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
                style={mostrarBoxNumber ? {backgroundColor:"green"} : null}
              >
                hora
              </button>
              <button
                onClick={() => setMostrarBoxNumeber(false)}
                className="contenedor-btns-btn"
                style={!mostrarBoxNumber ? {backgroundColor:"green"} : null}
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
                {tareas.map((tarea,i) => 
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
        {mostrarPanelInfo && (
          <PanelDeHistorial setMostrarPanelInfo={setMostrarPanelInfo} />
        )}
        <div className="contenedor-form-y-panel">
          <ControlesFrom
            hora={hora}
            minutos={minutos}
            mostrarBoxNumber={mostrarBoxNumber}
            setMostrarBoxNumeber={setMostrarBoxNumeber}
          />
          <div
            className="icono-panel"
            onClick={() => setMostrarPanelInfo(!mostrarPanelInfo)}
          ></div>
        </div>
        {mostrarModelTareaAlarma && (
          <BoxMostrarTarea
            mostrarModelTareaAlarma={mostrarModelTareaAlarma}
            setMostrarModelTareaAlarma={setMostrarModelTareaAlarma}
          />
        )}
      </div>
    </div>
  );
};
