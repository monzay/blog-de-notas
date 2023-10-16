import { useContext, useState } from "react";
import { contextTareas } from "../Providers/tareasProvider";
import { HiChevronDown } from "react-icons/hi";
import { SlClose } from "react-icons/sl";
import { HiXCircle } from "react-icons/hi";


export const PanelDeHistorial = ({setMostrarPanelInfo}) => {
  const [mostrarEstadisticasTareas, setMostrarEstadiscasTareas] =
    useState(false);
  const [id,setId] = useState(null);
  const { tareas } = useContext(contextTareas);

  return (
    <div className="panel-informacion">
      <ul className="contenedor-de-las-estadiscas">
        {tareas.map((tarea, i) => (
          <li key={i} className="estadiscas-de-la-tarea">
            <div style={{display:"flex",justifyContent:"space-between"}} >
              <span className="tarea-escrita-del-panel-de-estadistica">{tarea.tarea}</span>
              <HiChevronDown
                onClick={() => {
                  setMostrarEstadiscasTareas(!mostrarEstadisticasTareas);
                  setId(i)
                }}
                className="icono-mostrar-estadisticas"
              />
            </div>
            {  i ===  id ?  (
              <div className="contenedor-informacion-de-las-semanas-que-se-hicieron-las-tareas">
                <span>tareas transcurridas: {tarea.tareaEcha +  tarea.tareaNoEcha } </span>
                <span>tarea echa : {tarea.tareaEcha} </span>
                <span>tarea no echa : {tarea.tareaNoEcha} </span>
              </div>
            ): null }
          </li>
        )) }
      </ul>
      <HiXCircle onClick={()  => setMostrarPanelInfo(false)} className="panel-informacion-icono-salir-del-panel" />
    </div>
  );
};
