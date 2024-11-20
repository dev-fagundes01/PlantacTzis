import SetOfPlants from '../assets/conjunto-de-plantas-em-vasos.avif'
import cn from '../lib/utils'

function Background({ className }) {
  return (
    <img className={cn('h-28 rounded-lg dm:mt-4 dm:mb-6 md:w-36. md:h-56', className)} src={SetOfPlants} alt="Imagem de conjunto de plantas" />
  )
}

export default Background