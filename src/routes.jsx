import { createBrowserRouter } from 'react-router-dom'
import RegisterProduct from './pages/RegisterProduct'
import PlantShop from './pages/PlantShop'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RegisterProduct />
  },
  {
    path: '/loja',
    element: <PlantShop />,
  },
])

export default router