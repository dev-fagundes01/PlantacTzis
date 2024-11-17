import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [quantityInCart, setQuantityInCart] = useState(0)
  const [divVisibility, setDivVisibility] = useState(false)

  const productExists = (prevCart, data) => {
    if (!Array.isArray(prevCart)) return false
    return prevCart.find(item => item.product.id === data.product.id)
  }

  const decrementeCart = (data) => {
    setCart(prevCart => {
      if (productExists(prevCart, data)) {
        return prevCart.map(item =>
          item.product.id === data.product.id ?
            { ...item, amount: item.amount - 1 } : item,
        )
      }
      return prevCart
    })
    setQuantityInCart(prev => prev - 1)
  }

  const incrementeCart = (data) => {
    setCart(prevCart => {
      if (productExists(prevCart, data)) {
        return prevCart.map(item =>
          item.product.id === data.product.id ?
            { ...item, amount: item.amount + 1 } : item
        )
      }
      return prevCart
    })
    setQuantityInCart(prev => prev + 1)
  }

  const addToCart = (data) => {
    setCart(prevCart => {
      const product = productExists(prevCart, data)

      if (product) {
        return prevCart.map(item =>
          item.product.id === data.product.id ?
            { ...item, amount: item.amount + data.amount } : item
        )
      }
      return [...prevCart, data]
    })
    setQuantityInCart(prev => prev + data.amount)
  }

  const removeFromCart = (data) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== data.product.id))
    setQuantityInCart(prev => prev - data.amount)
  }

  const value = {
    cart,
    quantityInCart,
    divVisibility,
    setCart,
    setQuantityInCart,
    setDivVisibility,
    decrementeCart,
    incrementeCart,
    addToCart,
    removeFromCart
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