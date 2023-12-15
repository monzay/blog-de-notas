import { db } from "../index.mjs";
export const sing_up = (req, res) => {
  const { name, password, email } = req.body;


  // console.log(req.body)
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // let validadName = name !== "" &&  (name.length >= 3 && name.length < 15)
  // let validarEmail = email !== "" && emailRegex.test(email)
  // let validarParsswor = password.length > 8 && password.length  < 25

  if (name == "") {
    return res.status(400).json({
      error: "El campo 'name' es obligatorio y no puede estar vacío.",
    });
  } else if (email == "") {
    return res.status(400).json({
      error: "El campo 'email' debe ser un correo electrónico válido.",
    });
  } else if (password == "") {
    return res
      .status(400)
      .json({ error: "El campo 'password' debe tener al menos 6 caracteres." });
  } else {
    db.serialize(() => {
      db.get(
        "SELECT email,contraseña FROM  sing_up WHERE email = ? AND contraseña = ?", [email, password],(err, row) => {
          if (err) {
            console.log(err);
          } else {
            if (row) {
                 return res.status(200).json({mensaje:"la cuenta ya existe"})
            } else {
              db.run("INSERT INTO sing_up (nombre,email,contraseña) VALUES(?,?,?)", [name, email, password], (err) => {
                if (!err){
                    db.get("SELECT * FROM sing_up WHERE email = ? ",[email],(err,row) =>{
                       if(row){
                          const credenciales = {
                            id_user: row.id_user,
                            name:row.nombre,
                            email:row.email,
                            booleanoLogin:true 
                          }
                          res.status(200).json(credenciales)
                       }
                    })
                }else{
                  console.log(err);
                }
              });
            }
          }
        }
      );
     
   
    });
    // return res.status(400).json("requisitos completados");
  }
};
