import { collection, getFirestore, onSnapshot } from 'firebase/firestore'
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '../../../config/firebaseConfig'
import Slider from '../../components/Slider';

export default function PlantShop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const productCollectionRef = collection(db, 'products')

  useEffect(() => {
    const unsubscribe = onSnapshot(productCollectionRef, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }, (error) => {
      console.error("Error fetching products:", error);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [productCollectionRef]);

  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">DF-Plantas</h1>
          <div className="flex items-center">
            <button
              type="button"
              className="text-white lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} mt-4 lg:mt-0`}>
              <a href="#l" className="block lg:inline-block text-white hover:text-green-200 mt-2 lg:mt-0 lg:ml-4">Início</a>
              <a href="#l" className="block lg:inline-block text-white hover:text-green-200 mt-2 lg:mt-0 lg:ml-4">Produtos</a>
              <a href="#l" className="block lg:inline-block text-white hover:text-green-200 mt-2 lg:mt-0 lg:ml-4">Sobre</a>
              <a href="#l" className="block lg:inline-block text-white hover:text-green-200 mt-2 lg:mt-0 lg:ml-4">Contato</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-8">
        <Slider title={'Nossas Plantas'} info={products} />
      </main>
      <section className='w-max mx-auto flex gap-4'>
        <div>
          <p className='p w-56'>
            <h3 className='h2 text-lg'>
              Plantas Premium
            </h3>
            Mudas de Plantas de alta qualidade, produção artesanal.
          </p>
        </div>
        <div>
          <p className='p w-56'>
            <h3 className='h2 text-lg'>
              Espécies Exóticas
            </h3>
            Plantas Raras e Exóticas que você só encontra em nosso viveiro.
          </p>
        </div>
        <div>
          <p className='p w-56'>
            <h3 className='h2 text-lg'>
              Parcele 12x Sem Juros
            </h3>
            Parcele suas compras em até 12x sem juros no cartão de crédito.
          </p>
        </div>
        <div>
          <p className='p w-56'>
            <h3 className='h2 text-lg'>
              Entrega Grátis
            </h3>
            Entrega grátis em todo o Brasil para compras acima de R$250.
          </p>
        </div>
      </section>

      <footer className="w-full py-8 bg-green-800 text-white">
        <div className="container mx-auto flex justify-between text-center">
          <p>Todos os Direitos Reservados &copy; {new Date().getFullYear()} DF-Plantas</p>
          <a href="https://www.linkedin.com/in/diego-fagundes-da-silva/">
            <p>
              Desenvolvido por Diego Fagundes
            </p>
          </a>
        </div>
      </footer>
    </div>
  );
}