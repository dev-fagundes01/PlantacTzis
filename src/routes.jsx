import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import PlantShop from './pages/PlantShop'
import RegisterProduct from './pages/RegisterProduct'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/cadastrar-produtos',
    element:
      < ProtectedRoute >
        <RegisterProduct />
      </ ProtectedRoute >
  },
  {
    path: '/loja',
    element: <PlantShop />,
  }
])

export default router