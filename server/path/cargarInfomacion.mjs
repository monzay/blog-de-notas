 import { db } from "../index.mjs";
 
 export const cargarInfomacion = async (req, res) => {
    try {
      const { id_user } = req.body;
  
      const query1 = await new Promise((resolve, reject) => {
        db.all(
          "SELECT nombre, id_tareas, nombre_tarea, puntuacion_tarea, descripcion, tiempo FROM Detalles_tareas AS dt INNER JOIN sing_up AS su ON dt.id_user = su.id_user WHERE dt.id_user = ?",
          [id_user],
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
  
      const query2 = await new Promise((resolve, reject) => {
        db.all(
          "SELECT nombre, nombre_tarea, descripcion, tiempo FROM sing_up su INNER JOIN Detalles_tareas dt ON su.id_user = dt.id_user ORDER BY dt.puntuacion_tarea DESC LIMIT 3",
          [],
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
  
      res.status(200).json({ dataUser: query1, top: query2 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor.' });
    }
  };