
export const BoxDificulad = ({funHora,number}) => {
    const dificultadElegida = () => {

    }
  return (
    <div onClick={dificultadElegida}  className='obcion-dificultad'>
        {
         funHora(number).map( n => (
            <div>
                {n}
            </div>
         ))
        }
    </div>
  )
}
