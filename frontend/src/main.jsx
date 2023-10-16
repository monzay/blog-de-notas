import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { MostrarControlesProvider } from "./Providers/mostrarControlesProvider";
import { TareasProvider } from "./Providers/tareasProvider";
import { IdTareaProvider } from "./Providers/IdTareaProvider";
import { MostrarModel } from "./Providers/TrueFalseProvider/MostrarModel";
import { TareaAudio } from "./Providers/TareaAudio";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TareaAudio>
    <MostrarModel>
      <IdTareaProvider>
        <TareasProvider>
          <MostrarControlesProvider>
            <App />
          </MostrarControlesProvider>
        </TareasProvider>
      </IdTareaProvider>
    </MostrarModel>
    </TareaAudio>
  </React.StrictMode>
);
