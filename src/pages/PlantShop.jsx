import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { db } from '../../config/firebaseConfig'
import Slider from '../components/Slider';

import { CreditCard, Flower, Leaf, Truck } from 'lucide-react';
import Header from '../components/Header';

export default function PlantShop() {
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
    <div className="min-h-screen bg-primaryBackground">
      <Header />

      <main className="container mx-auto p-8">
        <Slider title={'Nossas Plantas'} info={products} />
      </main>
      <section className='h-32 w-max mx-auto flex gap-8'>
        <div>
          <p className='p w-56'>
            <h3 className='h3 text-lg'>
              <Flower />
              Plantas Premium
            </h3>
            Mudas de Plantas de alta qualidade, produção artesanal.
          </p>
        </div>
        <div>
          <p className='p w-56'>
            <h3 className='h3 text-lg'>
              <Leaf />
              Espécies Exóticas
            </h3>
            Plantas Raras e Exóticas que você só encontra em nosso viveiro.
          </p>
        </div>
        <div>
          <p className='p w-56'>
            <h3 className='h3 text-lg'>
              <CreditCard />
              Parcele 12x Sem Juros
            </h3>
            Parcele suas compras em até 12x sem juros no cartão de crédito.
          </p>
        </div>
        <div>
          <p className='p w-56'>
            <h3 className='h3 text-lg'>
              <Truck />
              Entrega Grátis
            </h3>
            Entrega grátis em todo o Brasil para compras acima de R$250.
          </p>
        </div>
      </section>

      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7894.496372492319!2d-35.24118454950209!3d-8.377230898066777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1727961728152!5m2!1spt-BR!2sbr" width="1000" height="450" style={{border: "0", marginInline: "auto", padding: "10px"}} allowfullscreen="" loading="lazy" title="loja df-plantas" referrerpolicy="no-referrer-when-downgrade">DF-Plantas</iframe>

      <footer className="w-full py-8 bg-thirdBackground text-secondaryForeground">
        <div className="container mx-auto flex justify-between text-center">
          <p>Todos os Direitos Reservados &copy; {new Date().getFullYear()} DF-Plantas</p>
          <a href="https://diego-fagundes-links.netlify.app/?fbclid=PAZXh0bgNhZW0CMTEAAaYKeVzi1XXM9tgpIFd_ZjC8z1dDtiTkAPR0Ttj9o6LtylYial0w_Ur86Do_aem_MK27d1KMJgfb4miHo5RofQ" target="_blank" rel="noreferrer">
            <p>
              Desenvolvido por Diego Fagundes
            </p>
          </a>
        </div>
      </footer>
    </div>
  );
}