import { useEffect, useState } from "react";
import Background from "../components/Background";
import { Card } from "../components/CardProduto";
import Title from '../components/Title'
import { useProduct } from '../context/ProductContext'

export default function ManageProducts() {
  const { plants, vases, other } = useProduct()
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (plants.length > 0) {
      setProducts(plants)
    }
  }, [plants])

  return (
    <div className='h-screen p-2 bg-secondaryBackground flex flex-col items-center overflow-y-auto relative'>
      <Background />
      <Title>Seus Produtos</Title>

      <div className="flex gap-3">
        <button className="px-2 rounded-sm bg-primaryBackground hover:opacity-80 active:opacity-50" type="button" onClick={() => setProducts(plants)}>Plantas</button>
        <button className="px-2 rounded-sm bg-primaryBackground hover:opacity-80 active:opacity-50" type="button" onClick={() => setProducts(vases)}>Vasos</button>
        <button className="px-2 rounded-sm bg-primaryBackground hover:opacity-80 active:opacity-50" type="button" onClick={() => setProducts(other)}>Outros</button>
      </div>

      <div className="max-w-[80vw] mt-2 flex flex-wrap justify-center gap-2">
        {products.map((product) => (
          <Card key={product.id} product={product} admin={true} />
        ))}
      </div>
    </div>
  )
}
