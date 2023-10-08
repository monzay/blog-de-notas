
export const  generarBox = (tiempo) => {
  
    let elementos = [];
    for (let i = 0; i <= tiempo; i++) {
      if (tiempo  == 24) {
       const hora = `${i}:00`
       elementos.push(hora)  
          
      }else if(tiempo == 60){
        elementos.push(i)
      }
       else {
        break;
      }
    }
    return elementos;
  };


