import { useState } from "react";
import Background from "../components/Background";
import Card from "../components/CardProduto";
import Title from '../components/Title'
import { useProduct } from '../context/ProductContext'

export default function ManageProducts() {
  const { plants, vases, other } = useProduct()
  const [products, setProducts] = useState(plants)

  return (
    <div className='h-screen p-2 bg-secondaryBackground flex flex-col overflow-y-auto md:items-center relative'>
      <Background />
      <Title>Seus Produtos</Title>

      <div className="flex">
        <div className="w-[70vw] mt-2 flex flex-wrap gap-2">
          {products?.map((plant) => (
            <Card key={plant.id} produto={plant} />
          ))}
        </div>

        <div className="mt-2 flex flex-col">
          <button className="rounded-sm bg-primaryBackground hover:opacity-80 active:opacity-50" type="button" onClick={() => setProducts(plants)}>Plantas</button>
          <button className="rounded-sm bg-primaryBackground hover:opacity-80 active:opacity-50" type="button" onClick={() => setProducts(vases)}>Vasos</button>
          <button className="rounded-sm bg-primaryBackground hover:opacity-80 active:opacity-50" type="button" onClick={() => setProducts(other)}>Outros</button>
        </div>
      </div>
    </div>
  )
}
