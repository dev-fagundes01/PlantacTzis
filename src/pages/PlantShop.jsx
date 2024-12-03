import Slider from '../components/Slider';

import { CreditCard, Flower, Leaf, Mail, Phone, Truck } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import DfMobileBanner from '../assets/banner-df-mobile.png'
import DfBanner from '../assets/banner-df.png'
import Header from '../components/Header';
import { useProduct } from '../context/ProductContext';
import Cart from '../components/Cart';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react';


export default function PlantShop() {
  const { plants, vases, other } = useProduct()
  const benefitsRef = useRef()
  const aboutUsRef = useRef()

  gsap.registerPlugin(ScrollTrigger)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      gsap.to('.product', {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: '.container',
          start: 'top 600px',
          end: 'bottom 900px',
          scrub: true
        }
      })
    })

    mm.add('(max-width: 767px)', () => {
      gsap.to('.product', {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: '.container',
          start: 'top 300px',
          end: 'bottom 200px',
          scrub: true
        }
      })
    })
  }, [])

  useLayoutEffect(() => {
    if (!benefitsRef.current) return

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top 700px',
          end: 'bottom 400px',
          scrub: true,
        },
      }).fromTo(
        '.benefits',
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, stagger: 0.2 }
      );
    }, benefitsRef)

    return () => {
      ctx.revert();
    }
  }, [])

  useLayoutEffect(() => {
    if (!aboutUsRef.current) return

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: aboutUsRef.current,
          start: 'top 700px',
          end: 'bottom 600px',
          scrub: true,
        },
      }).fromTo(
        '.about',
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, stagger: 0.2 }
      );
    }, aboutUsRef);

    return () => {
      ctx.revert();
    }
  }, [])

  useLayoutEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-primaryBackground overflow-hidden">
      <Header className='animate-fade-down animate-once animate-duration-600' />

      <div className='animate-fade-down animate-duration-[4s] mx-auto mt-6 flex justify-center md:mt-8' id='home'>
        <img className='hidden w-10/12 h-[55vh] md:h-[80vh] md:block' src={DfBanner} alt="Imagem do banner da loja" />
        <img className='w-10/12 h-[55vh] block md:h-[80vh] md:hidden' src={DfMobileBanner} alt="Imagem do banner da loja" />
      </div>

      <main className="container mx-auto p-4 md:p-8" id='products'>
        <Slider className='product translate-y-[-10rem] opacity-0' title={'Nossas Plantas'} info={plants} first={true} />
        <Slider className='product translate-y-[-10rem] opacity-0 dm:mr-[-5rem]' title={'Nossos Vasos'} info={vases} />
        <Slider className='product translate-y-[-10rem] opacity-0 dm:mr-[-5rem]' title={'Outros Produtos'} info={other} />

        <Cart />
      </main>

      <section className='h-[20rem] mx-auto mt-4 flex flex-wrap justify-center items-center gap-2 md:gap-8 md:w-max md:mt-8' ref={benefitsRef}>
        <div className='benefits'>
          <h3 className='h3-c flex-col md:text-lg'>
            <Flower className='icon' />
            Plantas Premium
          </h3>
          <p className='p-c w-32 md:w-56'>
            Mudas de Plantas de alta qualidade, produção artesanal.
          </p>
        </div>
        <div className='benefits'>
          <h3 className='h3-c flex-col md:text-lg'>
            <Leaf className='icon' />
            Espécies Exóticas
          </h3>
          <p className='p-c w-32 md:w-56'>
            Plantas Raras e Exóticas que você só encontra em nosso viveiro.
          </p>
        </div>
        <div className='benefits'>
          <h3 className='h3-c flex-col md:text-lg'>
            <CreditCard className='icon' />
            Parcele em 12x
          </h3>
          <p className='p-c w-32 md:w-56'>
            Parcele suas compras em até 12x sem juros no cartão de crédito.
          </p>
        </div>
        <div className='benefits'>
          <h3 className='h3-c flex-col md:text-lg'>
            <Truck className='icon' />
            Entrega Grátis
          </h3>
          <p className='p-c w-32 md:w-56'>
            Entrega grátis em todo o Brasil para compras acima de R$250.
          </p>
        </div>
      </section>

      <div className='w-9/12 mx-auto dm:my-6 flex flex-col items-center md:py-16' id='about-us' ref={aboutUsRef}>
        <h2 className='about h2-c md:text-3xl'>Sobre Nós</h2>
        <h3 className='about h3-c text-base text-center'>Bem-vindo à nossa loja de plantas! 🌿</h3>
        <div className='about'>
          <p className='p-c'>Aqui, na <b>DF-Plantas</b>, acreditamos que cada planta conta uma história única, trazendo mais vida, cor e frescor para o seu ambiente. Nós nos dedicamos a oferecer uma grande variedade de plantas, desde as mais clássicas até as espécies mais exóticas, todas cuidadas com o máximo de atenção para garantir que cheguem até você saudáveis e vibrantes.</p>
          <p className='p-c my-4'>Se você está em busca de um toque verde para a sua casa, escritório, ou presente perfeito para alguém especial, temos exatamente o que você precisa. Nossa equipe está sempre pronta para ajudar, seja para dar dicas sobre cuidados, sugestões de combinações ou até ajudar a encontrar aquela planta que vai transformar seu espaço.</p>
          <p className='p-c'>Venha nos visitar e descubra como o poder das plantas pode mudar o seu dia a dia!</p>
        </div>
      </div>

      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7894.496372492319!2d-35.24118454950209!3d-8.377230898066777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1727961728152!5m2!1spt-BR!2sbr" className="iframe" style={{ border: "0", marginInline: "auto", padding: "10px" }} allowFullScreen={true} loading="lazy" title="loja PlantacTzis" referrerPolicy="no-referrer-when-downgrade">PlantacTzis</iframe>

      <footer className="animate-fade-up animate-once animate-duration-[3s] w-full py-8 bg-thirdBackground text-secondaryForeground" id='contact'>
        <div className="mx-auto flex gap-1 justify-evenly items-center text-center">
          <p className='p-c-secondary dm:w-28'>Todos os Direitos Reservados &copy; {new Date().getFullYear()} PlantacTzis</p>
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