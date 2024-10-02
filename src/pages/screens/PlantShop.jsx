import { collection, getFirestore, onSnapshot } from 'firebase/firestore'
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '../../../config/firebaseConfig'

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

      <main className="container h-78. mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-green-800">Nossas Plantas</h2>
        <ul className='flex gap-10 '>
          {products.map((product) => (
            <li className='w-52 h-80 text-center' key={product.id}>
              <img src={product.image} alt='' className="w-full h-48 rounded-sm" />
              <h3 className="text-green-700 text-xl font-semibold mb-2">{product.name}</h3>
              <button
                type="button"
                className="btn-secondary"
              >
                Comprar
              </button>
            </li>
          ))}
        </ul>
      </main>

      <footer className="w-full py-8 bg-green-800 text-white fixed bottom-0">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Plant Shop - The Largest in the Country. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}