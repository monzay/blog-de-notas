import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { MostrarControlesProvider } from "./Providers/mostrarControlesProvider";
import { TareasProvider } from "./Providers/tareasProvider";
import { IdTareaProvider } from "./Providers/IdTareaProvider";
import { MostrarModel } from "./Providers/TrueFalseProvider/MostrarModel";
import { TareaAudio } from "./Providers/TareaAudio";
import { EstadoTiempoProvider } from "./Providers/estadoTiempoProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SingUP } from "./formularios/SingUp";
import { Login } from "./formularios/Login";
import { VerificacionDelAcceso } from "./formularios/accesoApp/VerificacionDelAcceso";
import { AccesoAppProvider } from "./Providers/AccesoAppProvider"



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AccesoAppProvider>
        <SingUP />
      </AccesoAppProvider>
    ),
  },
  {
    path: "/login",
    element:(
      <AccesoAppProvider>
        <Login />
      </AccesoAppProvider>
    ),
  },
  {
    path: "/",
    element:
    (
      <AccesoAppProvider>
        <VerificacionDelAcceso />
      </AccesoAppProvider>
    ),
    children: [
      {
        path: "/app",
        element: (
          <EstadoTiempoProvider>
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
          </EstadoTiempoProvider>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
