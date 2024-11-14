import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { ProductProvider } from './context/ProductContext'
import Login from './pages/LoginSignup'
import ManageProducts from './pages/ManageProducts'
import PlantShop from './pages/PlantShop'
import RegisterProduct from './pages/RegisterProduct'
import { CartProvider } from './context/CartContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/cadastrar-produtos',
    element:
      <ProtectedRoute>
        <RegisterProduct />
      </ProtectedRoute>
  },
  {
    path: '/gerenciar-produtos',
    element:
      <ProtectedRoute>
        <ProductProvider>
          <CartProvider>
            <ManageProducts />
          </CartProvider>
        </ProductProvider>
      </ProtectedRoute>
  },
  {
    path: '/loja',
    element:
      <ProductProvider>
        <CartProvider>
          <PlantShop />
        </CartProvider>
      </ProductProvider>
  }
])

export default router