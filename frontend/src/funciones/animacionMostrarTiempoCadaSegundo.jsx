import React, { useContext, useEffect } from 'react'
import { EstadoTiempoContexto } from '../Providers/EstadoTiempoContexto'
import { ContextMostrarModel } from '../Providers/TrueFalseProvider/MostrarModel';


export const animacionMostrarTiempoCadaSegundo = () => {
    const {setTiempoHora,setTiempoMinutos} = useContext(EstadoTiempoContexto)
  const { mostrarTiempo } = useContext(ContextMostrarModel);

    
    useEffect(() => {
      let numeros = []
      for(let i=0;i<=24;i++){
        numeros.push(i<10? `0${i}` : i)
        console.log(i)
      }
   
       let index = 0
        const interval  = setInterval(() => {
          if (index === numeros.length) {
            clearInterval(interval);
            return;
          }
          setTiempoHora( prevHoras => [...prevHoras,numeros[index]])
           index++
         },300);
    
        return () => clearInterval(interval)
    }, [mostrarTiempo])

    useEffect(() => {
        let numeros = []
        for(let i=0;i<=60;i++){
          numeros.push(i<10? `0${i}` : i)
        }
         let index = 0
          const interval  = setInterval(() => {
            if (index === numeros.length) {
              clearInterval(interval);
              return;
            }
            setTiempoMinutos( prevHoras => [...prevHoras,numeros[index]])
             index++
           },300);
      
          return () => clearInterval(interval)
      }, [])

}
