import { db } from "../index.mjs"

export const login =(req,res)=>{
    const {email,password} = req.body
    
    if (email !== "") {
        db.serialize(()=>{
            const  verificar_si_existe = "SELECT * FROM  sing_up WHERE email = ? AND contraseña = ? "
            db.get(verificar_si_existe,[email,password],(err,row)=>{
                if(err)console.log(err)
                else {
                      const token = {
                        acceso:true
                      }
                      res.status(200).json(token)
                }
            })
        })   
    } else {
        console.log("El email está vacío");
    }
}