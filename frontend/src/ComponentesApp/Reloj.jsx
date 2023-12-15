import React from 'react'

export const Reloj = () => {
    const data = new Date()
    let hora = data.getHours()
    let minutos = data.getMinutes()
    let segundos = data.getSeconds()
    
    console.log(hora)
    
  return (
    <div  className='espacio-reloj'>
        reloj
    </div>
  )
}
