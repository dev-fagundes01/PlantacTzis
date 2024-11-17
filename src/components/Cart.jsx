import { gerarLinkWhatsApp } from '../components/CardProduto';
import { useCart } from '../context/CartContext';


export default function Cart() {
  const { cart, divVisibility, setDivVisibility, removeFromCart, decrementeCart, incrementeCart } = useCart()

  return (
    <div>
      <div className={`w-full opacity-50 z-10 fixed top-0 left-0 bg-disabled ${divVisibility ? 'h-full' : 'h-0'}`} onClick={() => setDivVisibility(false)} />
      <aside className={`h-screen z-10 fixed right-0 transition-all duration-1000 transform bg-primaryBackground top-[2.1rem] dm:w-60 md:top-[2.6rem] ${divVisibility ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
        <h3 className='h3-c py-2 px-[2.5rem] bg-secondaryBackground text-secondaryForeground md:px-[4.5rem]'>Carrinho de Compras</h3>
        <div className='h-5/6 flex flex-col justify-between'>
          <div>
            {Array.isArray(cart) && cart.map((item, index) => (
              <div className='relative grid grid-template justify-between' key={item.product?.id && item.product?.name ? item.product.id + item.product.name : index}>
                <div className='product-image mr-4 relative flex items-center'>
                  <button className='btn-third w-4 h-4 mx-0 text-base absolute left-1 flex justify-center items-center' onClick={() => decrementeCart(item)}>-</button>
                  <img className='w-12 h-12 mx-5' src={item.product?.image || ""} alt={item.product?.name || "Imagem indisponível"} />
                  <button className='btn-third w-4 h-4 mx-0 text-base absolute right-[-2.25rem] flex justify-center items-center md:right-[-0.25rem]' onClick={() => incrementeCart(item)}>+</button>
                </div>
                <p className='w-5 h-5 p-c rounded-full absolute left-14 bg-secondaryBackground text-secondaryForeground flex justify-center items-center'>{item.amount}</p>
                <h3 className='h3-c product-name'>{item.product?.name || "Nome indisponível"}</h3>
                <p className='p-c product-price'><b>R$ {item.product?.price || "0"},00</b></p>
                <div className='x relative flex items-center cursor-pointer md:text-2xl' onClick={() => removeFromCart(item)}>
                  <div className='p-2 absolute right-[1.2rem] bottom-[1.3rem] rounded-full border border-solid border-black md:p-3 md:right-[0.85rem] md:bottom-[1rem]' />
                  x
                </div>
              </div>
            ))}
          </div>
          <footer className='text-center'>
            <p className='p-c'><b>Total: R$ {Array.isArray(cart) && cart.length > 0 ?
              cart.reduce((acc, item) => acc + Number(item.product?.price * item.amount), 0).toFixed(2) : "0,00"},00</b></p>
            <button className='btn-secondary md:w-72' onClick={() => {
              const url = gerarLinkWhatsApp(cart)
              if (url) window.open(url, "_blank")
            }}>Comprar</button>
          </footer>
        </div>
      </aside>
    </div>
  )
}
