import { createBrowserRouter } from 'react-router-dom'
import RegisterProduct from './pages/RegisterProduct'
import PlantShop from './pages/screens/PlantShop'

const router = createBrowserRouter([
  {
    path: '/registrar-produto',
    element: <RegisterProduct />
  },
  {
    path: '/',
    element: <PlantShop />,
  },
])

export default router