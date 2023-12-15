import express from "express";
import cors from "cors"
import {login} from "./path/login.mjs"
import {sing_up} from "./path/sing_up.mjs"
import morgan from "morgan";
import sqlite from "sqlite3";
import { cargarInfomacion } from "./path/cargarInfomacion.mjs";

const sqlite3 = sqlite.verbose() 
export const db =  new sqlite3.Database("C:/Users/FRANCISCO/Desktop/blog/blog-de-notas/server/database/tareas.db")

const app  = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.post("/login",login)
app.post("/singUp",sing_up)
app.get("/app",cargarInfomacion)
app.listen(3000, () => {
    console.log(`se abrio exitosamente`);
  });