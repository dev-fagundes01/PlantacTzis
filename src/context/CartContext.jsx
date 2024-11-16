import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [quantityInCart, setQuantityInCart] = useState(0)
  const [divVisibility, setDivVisibility] = useState(false)


  const decrementeCart = (data) => {
    setCart(prevCart => {
      const productExists = prevCart.find(item => item.product.id === data.product.id)

      if (productExists) {
        return prevCart.map(item =>
          item.product.id === data.product.id ?
            { ...item, amount: item.amount - 1 } : item
        )
      }
    })
  }

  const addToCart = (data) => {
    setCart((prevCart) => {
      const productExists = prevCart.find(item => item.product.id === data.product.id)

      if (productExists) {
        return prevCart.map(item =>
          item.product.name === data.product.name ?
            { ...item, amount: item.amount + 1 } : item
        )
      } else {
        return [...prevCart, data]
      }
    })
    setQuantityInCart(prev => prev + data.amount)
  }

  const removeFromCart = (data) => {
    console.log(data);
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