import Slider from '../components/Slider';

import { CreditCard, Flower, Leaf, Mail, Phone, Truck } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import DfMobileBanner from '../assets/banner-df-mobile.png'
import DfBanner from '../assets/banner-df.png'
import Header from '../components/Header';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { gerarLinkWhatsApp } from '../components/CardProduto';

export default function PlantShop() {
  const { plants, vases, other } = useProduct()
  const { cart, divVisibility, setDivVisibility, addToCart, removeFromCart, decrementeCart } = useCart()

  console.log(cart)
  return (
    <div className="min-h-screen bg-primaryBackground overflow-hidden">
      <Header />

      <div className='mx-auto mt-6 flex justify-center md:mt-8' id='home'>
        <img className='hidden w-10/12 h-[55vh] md:h-[80vh] md:block' src={DfBanner} alt="Imagem do banner da loja" />
        <img className='w-10/12 h-[55vh] block md:h-[80vh] md:hidden' src={DfMobileBanner} alt="Imagem do banner da loja" />
      </div>

      <main className="container mx-auto p-4 md:p-8" id='product'>
        <Slider title={'Nossas Plantas'} info={plants} />
        <Slider title={'Nossos Vasos'} info={vases} className='dm:mr-[-5rem]' />
        <Slider title={'Outros Produtos'} info={other} className='dm:mr-[-5rem]' />

        <div>
          <div className={`w-full opacity-50 z-10 fixed top-0 left-0 bg-disabled ${divVisibility ? 'h-full' : 'h-0'}`} onClick={() => setDivVisibility(false)} />
          <aside className={`h-screen z-10 fixed top-[2.6rem] right-0 transition-all duration-1000 transform bg-primaryBackground ${divVisibility ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
            <h3 className='h3-c py-2 px-[4.5rem] bg-secondaryBackground text-secondaryForeground'>Carrinho de Compras</h3>
            <div className='h-5/6 flex flex-col justify-between'>
              <div>
                {Array.isArray(cart) && cart.map((item, index) => (
                  <div className='relative grid grid-template' key={item.product.id && item.product.name ? item.product.id + item.product.name : index}>
                    <div className='product-image flex gap-x-1 items-center'>
                      <button className='btn-third w-4 h-4 mx-0 text-base flex justify-center items-center' onClick={() => decrementeCart(item)}>-</button>
                      <img className='h-12' src={item.product.image} alt={item.product.name} />
                      <button className='btn-third w-4 h-4 mx-0 z-20 text-base flex justify-center items-center' onClick={() => addToCart(item)}>+</button>
                    </div>
                    <p className='w-5 h-5 p-c rounded-full absolute left-14 bg-secondaryBackground text-secondaryForeground flex justify-center items-center'>{item.amount}</p>
                    <h3 className='h3-c product-name'>{item.product.name}</h3>
                    <p className='p-c product-price'><b>R$ {item.product.price},00</b></p>
                    <div className='text-2xl x relative flex items-center cursor-pointer' onClick={() => removeFromCart(item)}>
                      <div className='p-3 absolute right-[0.85rem] bottom-[1rem] rounded-full border border-solid border-black' />
                      x
                    </div>
                  </div>
                ))}
              </div>
              <footer className='text-center'>
                <p className='p-c'><b>Total: R$ {Array.isArray(cart) && cart.length > 0 ?
                  cart.reduce((acc, item) => acc + Number(item.product.price * item.amount), 0).toFixed(2) : "0,00"},00</b></p>
                <button className='btn-secondary w-72' onClick={() => {
                  const url = gerarLinkWhatsApp(cart)
                  if (url) window.open(url, "_blank")
                }}>Comprar</button>
              </footer>
            </div>
          </aside>
        </div>

        <section className='h-auto mx-auto mt-4 flex flex-wrap justify-center gap-2 md:gap-8 md:w-max md:mt-8'>
          <div>
            <h3 className='h3-c flex-col md:text-lg'>
              <Flower className='icon' />
              Plantas Premium
            </h3>
            <p className='p-c w-32 md:w-56'>
              Mudas de Plantas de alta qualidade, produção artesanal.
            </p>
          </div>
          <div>
            <h3 className='h3-c flex-col md:text-lg'>
              <Leaf className='icon' />
              Espécies Exóticas
            </h3>
            <p className='p-c w-32 md:w-56'>
              Plantas Raras e Exóticas que você só encontra em nosso viveiro.
            </p>
          </div>
          <div>
            <h3 className='h3-c flex-col md:text-lg'>
              <CreditCard className='icon' />
              Parcele em 12x
            </h3>
            <p className='p-c w-32 md:w-56'>
              Parcele suas compras em até 12x sem juros no cartão de crédito.
            </p>
          </div>
          <div>
            <h3 className='h3-c flex-col md:text-lg'>
              <Truck className='icon' />
              Entrega Grátis
            </h3>
            <p className='p-c w-32 md:w-56'>
              Entrega grátis em todo o Brasil para compras acima de R$250.
            </p>
          </div>
        </section>
      </main>

      <div className='w-9/12 mx-auto my-6 flex flex-col items-center md:my-16' id='about'>
        <h2 className='h2-c md:text-3xl'>Sobre Nós</h2>
        <h3 className='h3-c text-base text-center'>Bem-vindo à nossa loja de plantas! 🌿</h3>
        <div>
          <p className='p-c'>Aqui, na <b>DF-Plantas</b>, acreditamos que cada planta conta uma história única, trazendo mais vida, cor e frescor para o seu ambiente. Nós nos dedicamos a oferecer uma grande variedade de plantas, desde as mais clássicas até as espécies mais exóticas, todas cuidadas com o máximo de atenção para garantir que cheguem até você saudáveis e vibrantes.</p>
          <p className='p-c my-4'>Se você está em busca de um toque verde para a sua casa, escritório, ou presente perfeito para alguém especial, temos exatamente o que você precisa. Nossa equipe está sempre pronta para ajudar, seja para dar dicas sobre cuidados, sugestões de combinações ou até ajudar a encontrar aquela planta que vai transformar seu espaço.</p>
          <p className='p-c'>Venha nos visitar e descubra como o poder das plantas pode mudar o seu dia a dia!</p>
        </div>
      </div>

      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7894.496372492319!2d-35.24118454950209!3d-8.377230898066777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1727961728152!5m2!1spt-BR!2sbr" className="iframe" style={{ border: "0", marginInline: "auto", padding: "10px" }} allowFullScreen={true} loading="lazy" title="loja df-plantas" referrerPolicy="no-referrer-when-downgrade">DF-Plantas</iframe>

      <footer className="w-full py-8 bg-thirdBackground text-secondaryForeground" id='contact'>
        <div className="mx-auto flex gap-1 justify-center items-center text-center">
          <p className='p-c-secondary dm:w-28'>Todos os Direitos Reservados &copy; {new Date().getFullYear()} DF-Plantas</p>
          <div className='flex gap-1 md:gap-4'>
            <Mail className='icon-secondary' />
            <Phone className='icon-secondary' />
            <FaWhatsapp className='icon-secondary' />
            <FaInstagram className='icon-secondary' />
          </div>
          <a href="https://diego-fagundes-links.netlify.app/?fbclid=PAZXh0bgNhZW0CMTEAAaYKeVzi1XXM9tgpIFd_ZjC8z1dDtiTkAPR0Ttj9o6LtylYial0w_Ur86Do_aem_MK27d1KMJgfb4miHo5RofQ" target="_blank" rel="noreferrer">
            <p className='p-c-secondary dm:w-20'>
              Desenvolvido por <span className='text-[#dfc672]'><b>Diego Fagundes</b></span>
            </p>
          </a>
        </div>
      </footer>
    </div>
  );
}