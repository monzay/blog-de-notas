import { createContext, useState } from "react";

export const ContextMostrarModel = createContext();
export const MostrarModel = ({ children }) => {
  const [mostrarModel, setMostrarModel] = useState(false);
  const [mostrarTiempo, setMostrarTiempo] = useState(false);
  const [mostrarAnimacionTareas, setMostrarAnimacionTarea] = useState(false);

  return (
    <ContextMostrarModel.Provider
      value={{
        mostrarModel,
        setMostrarModel,
        mostrarTiempo,
        setMostrarTiempo,
        mostrarAnimacionTareas,
        setMostrarAnimacionTarea,
      }}
    >
      {children}
    </ContextMostrarModel.Provider>
  );
};
