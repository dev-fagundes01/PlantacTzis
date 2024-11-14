import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [quantityInCart, setQuantityInCart] = useState(0)
  const [divVisibility, setDivVisibility] = useState(false)

  const value = {
    cart,
    quantityInCart,
    divVisibility,
    setCart,
    setQuantityInCart,
    setDivVisibility
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}


export function useCart() {
  return useContext(CartContext)
}