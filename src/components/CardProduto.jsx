import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FilePenLine, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { db, storage } from "../../config/firebaseConfig";
import cn from '../lib/utuls'

export default function Card({ product, admin, store }) {
  const [divUpdate, setDivUpdate] = useState(false)
  const [productData, setProductData] = useState({})
  const numeroLoja = "5581991943001"

  const gerarLinkWhatsApp = (product) => {
    const mensagem = `Olá, gostaria de comprar o produto: ${product?.name}, Preço: ${product?.price}`
    const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`
    return url
  }

  function confirmUpdate(product) {
    setProductData(product)
    setDivUpdate(true)
  }

  async function updateProduct(updatedData) {
    try {
      let imgURL = productData.image

      if (updatedData.image instanceof File) {
        imgURL = await uploadImage(updatedData)
      }

      const updatedProductData = {
        ...updatedData,
        image: imgURL
      }

      const productDocRef = doc(db, updatedData.category, updatedProductData.id);
      await updateDoc(productDocRef, updatedProductData);
      alert('Produto atualizado com sucesso!')
      setDivUpdate(false)
    } catch (error) {
      alert('Erro ao atualizar o produto')
      console.error('Erro ao atualizar o produto:', error);
    }
  }

  async function uploadImage(updatedData) {
    if (!updatedData.image) return null

    const storageRef = ref(storage, `${updatedData.category}/${updatedData.image.name}`)
    await uploadBytes(storageRef, updatedData.image)
    const imgURL = await getDownloadURL(storageRef)
    return imgURL
  }

  async function removeProduct(product) {
    try {
      removeImg(product)

      const productDocRef = doc(db, product.category, product.id);
      await deleteDoc(productDocRef)
      alert('Produto removido com sucesso!')
    } catch (error) {
      console.log(error);
      alert('Erro ao remover o produto')
    }
  }

  async function removeImg(product) {
    const imgRef = ref(storage, `${product.category}/${product.id}`)
    await deleteObject(imgRef)
  }

  return (
    <div className={cn('w-max flex flex-col items-center justify-center relative md:mx-2', admin && 'relative', store && 'cursor-grab')}>
      {product?.image ? (
        <img className="img-c" src={product.image} alt={product?.name} />) : (<p>Imagem não disponível</p>
      )}

      <h3 className="h3-c">{product?.name}</h3>
      <p className='p-c'>Preço: R$ {product?.price},00</p>
      <p className={cn('text-[0.3rem] text-disabledForeground z-10 text-center hidden md:mx-auto md:text-[0.96rem]', !product.visibility && 'block', store && 'md:mb-2')}>Indisponível no momento</p>

      {store &&
        <button className={cn('btn-secondary', !product.visibility && 'hidden')} type="button">
          <a
            href={gerarLinkWhatsApp(product)}
            target="_blank"
            rel="noopener noreferrer"
          >Comprar</a>
        </button>
      }

      {admin &&
        <div className="z-10">
          <button type="button" onClick={() => removeProduct(product)}><Trash2 className='h-3' /></button>
          <button type="button" onClick={() => confirmUpdate(product)}><FilePenLine className='h-3' /></button>
        </div>
      }

      {!product?.visibility && (
        <div className='w-full h-full absolute'>
          <div className='w-full h-full opacity-55 rounded-sm bg-disabled absolute' />
        </div>
      )}

      {divUpdate && (
        <div className='h-screen w-full z-20 fixed top-0 right-0 flex justify-center items-center'>
          <div className='p-4 rounded-lg bg-primaryBackground flex flex-col'>
            <h2 className='h2-c'>Verificar Dados do Produto</h2>

            <input className='input-c !w-44 md:!w-auto' type="text" value={productData.name || ""} onChange={(e) => setProductData({ ...productData, name: e.target.value })} />
            <input className='input-c !w-44 md:!w-auto' type="number" value={productData.price || ""} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />

            <div className="relative">
              <label className='label-c !text-black' htmlFor="visibility">Visibilidade</label>
              <input className="ml-2 absolute bottom-1" type="checkbox" name="visibility" checked={productData.visibility} onChange={(e) => setProductData({ ...productData, visibility: !productData.visibility })} />
            </div>

            <select
              className='input-c !w-44 md:!w-auto'
              value={productData.category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione a categoria</option>
              <option value="plants">Plantas</option>
              <option value="vases">Vasos</option>
              <option value="other_products">Outros Produtos</option>
            </select>

            <input className='input-c !w-44 md:!w-auto' type="file" accept="image/" onChange={(e) => setProductData({ ...productData, image: e.target.files[0] })} />

            <div className='flex gap-2 justify-center'>
              <button className='btn-third mt-1 mx-0  px-1 py-0 text-xs md:text-sm md:leading-4' type="button" id="confirm-btn" onClick={() => updateProduct(productData)}>
                Confirmar
              </button>
              <button className='btn-third mt-1 mx-0 px-1 py-0 text-xs md:text-sm md:leading-4' type="button" id="cancel-btn" onClick={() => setDivUpdate(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
